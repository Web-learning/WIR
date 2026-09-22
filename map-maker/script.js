/* =========================================================
   CONFIG
========================================================= */

const CONFIG = {
  wikidataEndpoint: "https://query.wikidata.org/sparql",
  commonsWiki: "https://commons.wikimedia.org/wiki/",
  commonsApi: "https://commons.wikimedia.org/w/api.php",

  defaultCenter: [-30.5595, 22.9375],
  defaultZoom: 5,

  geoStyle: {
    color: "#14866d",
    weight: 2,
    opacity: 1,
    fillColor: "#14866d",
    fillOpacity: 0.25
  },

  pointStyle: {
    radius: 6,
    color: "#0f6b58",
    weight: 2,
    fillColor: "#45c2a2",
    fillOpacity: 0.85
  }
};


/* =========================================================
   WIKIDATA QUERY
========================================================= */

const SPARQL_QUERY = `
SELECT DISTINCT
  ?item
  ?itemLabel
  ?geojsonFile
WHERE {
  ?item wdt:P3896 ?geojsonFile ;
        wdt:P31 wd:Q1589568 ;
        wdt:P17 wd:Q258 .

  SERVICE wikibase:label {
    bd:serviceParam
      wikibase:language "en" .
  }
}
ORDER BY ?itemLabel
LIMIT 100
`;


/* =========================================================
   DOM
========================================================= */

const $ = (selector) =>
  document.querySelector(selector);

const els = {
  map: $("#map"),
  mapSelect: $("#mapSelect"),

  themeToggle: $("#themeToggle"),
  wikidataButton: $("#wikidataButton"),

  entityName: $("#entityName"),
  entityId: $("#entityId"),
  propertyP3896: $("#propertyP3896"),
  entityLinks: $("#entityLinks"),

  mapSource: $("#mapSource"),

  geoStatus: $("#geoStatus"),
  geoStatusText: $("#geoStatusText"),

  footerSource: $("#footerSource"),
  footerGeometry: $("#footerGeometry")
};


/* =========================================================
   STATE
========================================================= */

const state = {
  maps: [],
  currentIndex: -1,
  currentLayer: null,
  currentItem: null
};


/* =========================================================
   LEAFLET MAP
========================================================= */

const map = L.map(els.map, {
  zoomControl: true,
  preferCanvas: true
}).setView(
  CONFIG.defaultCenter,
  CONFIG.defaultZoom
);


/* =========================================================
   BASE MAP
========================================================= */

const lightTiles = L.tileLayer(
  "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
  {
    maxZoom: 19,
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">' +
      "OpenStreetMap</a>"
  }
).addTo(map);


/*
 * A deliberately restrained dark-map layer.
 * This uses Carto's dark basemap and is switched when
 * the "Dark map" control is enabled.
 */
const darkTiles = L.tileLayer(
  "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
  {
    maxZoom: 20,
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">' +
      "OpenStreetMap</a> &copy; CARTO"
  }
);


/* =========================================================
   STATUS
========================================================= */

function setStatus(
  message,
  type = "ready"
) {
  els.geoStatus.classList.remove(
    "loading",
    "error"
  );

  if (type === "loading") {
    els.geoStatus.classList.add("loading");
  }

  if (type === "error") {
    els.geoStatus.classList.add("error");
  }

  els.geoStatusText.textContent =
    message;
}


/* =========================================================
   COMMONS TITLE NORMALIZATION
========================================================= */

function normalizeCommonsTitle(value) {
  if (!value) {
    throw new Error("Empty P3896 value.");
  }

  let title = value.trim();

  if (title.startsWith("Data:")) {
    return decodeURIComponent(title);
  }

  const dataIndex =
    title.indexOf("Data:");

  if (dataIndex !== -1) {
    return decodeURIComponent(
      title.substring(dataIndex)
    );
  }

  const wikiIndex =
    title.indexOf("/wiki/");

  if (wikiIndex !== -1) {
    return decodeURIComponent(
      title.substring(wikiIndex + 6)
    );
  }

  return decodeURIComponent(title);
}


/* =========================================================
   COMMONS URL
========================================================= */

function commonsPageURL(title) {
  return (
    CONFIG.commonsWiki +
    encodeURIComponent(title)
      .replace(/%3A/gi, ":")
      .replace(/%2F/gi, "/")
  );
}


/* =========================================================
   WIKIDATA REQUEST
========================================================= */

async function getWikidataMaps() {
  const params = new URLSearchParams({
    query: SPARQL_QUERY,
    format: "json",
    origin: "*"
  });

  const url =
    `${CONFIG.wikidataEndpoint}?${params.toString()}`;

  console.log("WDQS request:", url);

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/sparql-results+json"
    }
  });

  if (!response.ok) {
    const message =
      await response.text().catch(() => "");

    throw new Error(
      `Wikidata request failed (${response.status})`
    );
  }

  const data = await response.json();

  if (
    !data.results ||
    !Array.isArray(data.results.bindings)
  ) {
    throw new Error(
      "Wikidata returned an unexpected response."
    );
  }

  return data;
}


/* =========================================================
   COMMONS GEOJSON
========================================================= */

async function fetchCommonsGeoJSON(title) {
  const pageURL =
    commonsPageURL(title);

  /* -----------------------------------------------
     Method 1 — action=raw
  ------------------------------------------------ */

  try {
    const rawURL =
      `${pageURL}?action=raw`;

    const response =
      await fetch(rawURL, {
        headers: {
          Accept:
            "application/json,text/plain,*/*"
        }
      });

    if (response.ok) {
      const text =
        await response.text();

      if (text.trim()) {
        try {
          return JSON.parse(text);
        } catch {
          console.warn(
            "Commons raw response was not JSON."
          );
        }
      }
    }
  } catch (error) {
    console.warn(
      "Commons raw request failed:",
      error
    );
  }


  /* -----------------------------------------------
     Method 2 — MediaWiki API
  ------------------------------------------------ */

  const params =
    new URLSearchParams({
      action: "query",
      prop: "revisions",
      rvprop: "content",
      rvslots: "main",
      format: "json",
      formatversion: "2",
      titles: title,
      origin: "*"
    });

  const response =
    await fetch(
      `${CONFIG.commonsApi}?${params}`
    );

  if (!response.ok) {
    throw new Error(
      `Commons API failed: HTTP ${response.status}`
    );
  }

  const result =
    await response.json();

  const page =
    result?.query?.pages?.[0];

  if (!page || page.missing) {
    throw new Error(
      `Commons map not found: ${title}`
    );
  }

  const content =
    page?.revisions?.[0]
      ?.slots?.main
      ?.content;

  if (!content) {
    throw new Error(
      `Commons page contains no map data: ${title}`
    );
  }

  try {
    return JSON.parse(content);
  } catch {
    throw new Error(
      `Commons page contains invalid JSON: ${title}`
    );
  }
}


/* =========================================================
   GEOJSON EXTRACTION
========================================================= */

function extractGeoJSON(value) {
  if (!value) {
    throw new Error(
      "Empty GeoJSON response."
    );
  }

  const validTypes = new Set([
    "FeatureCollection",
    "Feature",
    "GeometryCollection",
    "Point",
    "LineString",
    "Polygon",
    "MultiPoint",
    "MultiLineString",
    "MultiPolygon"
  ]);

  if (
    value.type &&
    validTypes.has(value.type)
  ) {
    return value;
  }

  if (value.data) {
    return extractGeoJSON(value.data);
  }

  throw new Error(
    "Commons data does not contain recognizable GeoJSON."
  );
}


/* =========================================================
   HTML ESCAPING
========================================================= */

function escapeHTML(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}


/* =========================================================
   GEOJSON GEOMETRY TYPE
========================================================= */

function getGeometryType(geojson) {
  if (geojson.type === "FeatureCollection") {
    const features =
      geojson.features || [];

    const types =
      [
        ...new Set(
          features
            .map(
              feature =>
                feature?.geometry?.type
            )
            .filter(Boolean)
        )
      ];

    return types.length
      ? types.join(", ")
      : "FeatureCollection";
  }

  if (geojson.type === "Feature") {
    return (
      geojson.geometry?.type ||
      "Feature"
    );
  }

  return geojson.type;
}


/* =========================================================
   FEATURE POPUP
========================================================= */

function createPopupHTML(feature, label) {
  const properties =
    feature?.properties || {};

  const title =
    properties.title ||
    properties.name ||
    label;

  const description =
    properties.description || "";

  const wikipediaURL =
    createWikipediaURL(title);


  /* -------------------------------------------------------
     Wikipedia title
  ------------------------------------------------------- */

  let html = `
    <div class="geo-popup">
  `;


  if (wikipediaURL) {
    html += `
      <a
        class="geo-popup-title"
        href="${escapeHTML(wikipediaURL)}"
        target="_blank"
        rel="noopener noreferrer"
        title="Open ${escapeHTML(title)} on Wikipedia"
      >
        ${escapeHTML(title)}
        <span
          class="external-icon"
          aria-hidden="true"
        >↗</span>
      </a>
    `;
  } else {
    html += `
      <div class="geo-popup-title">
        ${escapeHTML(title)}
      </div>
    `;
  }


  /* -------------------------------------------------------
     Description
  ------------------------------------------------------- */

  if (description) {
    html += `
      <div class="geo-popup-description">
        ${escapeHTML(description)}
      </div>
    `;
  }


  html += `
    </div>
  `;


  return html;
}

/* =========================================================
   DISPLAY GEOJSON
========================================================= */

function displayGeoJSON(
  geojson,
  label,
  wikidataURL,
  commonsURL
) {
  /* Remove old layer */

  if (state.currentLayer) {
    map.removeLayer(
      state.currentLayer
    );
  }


  /* Create new layer */

  state.currentLayer =
    L.geoJSON(
      geojson,
      {
        style: () => ({
          ...CONFIG.geoStyle
        }),

        pointToLayer:
          (_, latlng) =>
            L.circleMarker(
              latlng,
              {
                ...CONFIG.pointStyle
              }
            ),

        onEachFeature:
          (feature, layer) => {
            layer.bindPopup(
              createPopupHTML(
                feature,
                label
              )
            );
          }
      }
    );


  state.currentLayer.addTo(map);


  /* Fit map */

  const bounds =
    state.currentLayer.getBounds();

  if (bounds.isValid()) {
    map.fitBounds(
      bounds,
      {
        padding: [40, 40],
        maxZoom: 12
      }
    );
  }


  /* Update interface */

  els.footerGeometry.textContent =
    getGeometryType(geojson);

  els.footerSource.textContent =
    "Wikimedia Commons";

  els.mapSource.textContent =
    `${label} · Wikimedia Commons · GeoJSON`;


  els.entityLinks.innerHTML = `
    <a
      href="${escapeHTML(wikidataURL)}"
      target="_blank"
      rel="noopener noreferrer"
    >
      Wikidata
    </a>
    <span aria-hidden="true"> · </span>
    <a
      href="${escapeHTML(commonsURL)}"
      target="_blank"
      rel="noopener noreferrer"
    >
      Commons map
    </a>
  `;
}


/* =========================================================
   UPDATE ENTITY PANEL
========================================================= */

function updateEntityPanel(result) {
  const item =
    result.item.value;

  const label =
    result.itemLabel?.value ||
    item.split("/").pop();

  const rawP3896 =
    result.geojsonFile.value;

  const commonsTitle =
    normalizeCommonsTitle(
      rawP3896
    );

  const commonsURL =
    commonsPageURL(
      commonsTitle
    );


  els.entityName.textContent =
    label;

  els.entityId.textContent =
    item.split("/").pop();

  els.propertyP3896.textContent =
    commonsTitle;

  els.entityLinks.innerHTML = `
    <a
      href="${escapeHTML(item)}"
      target="_blank"
      rel="noopener noreferrer"
    >
      View on Wikidata
    </a>
  `;


  els.wikidataButton.dataset.url =
    item;


  return {
    item,
    label,
    rawP3896,
    commonsTitle,
    commonsURL
  };
}


/* =========================================================
   LOAD SELECTED MAP
========================================================= */

async function loadSelectedMap() {
  const index =
    Number(els.mapSelect.value);

  const result =
    state.maps[index];

  if (!result) {
    return;
  }

  state.currentIndex =
    index;


  const entity =
    updateEntityPanel(result);


  setStatus(
    `Loading ${entity.label}…`,
    "loading"
  );


  els.mapSource.textContent =
    `${entity.label} · Wikimedia Commons · GeoJSON`;

  els.entityLinks.innerHTML = "";


  try {
    const commonsData =
      await fetchCommonsGeoJSON(
        entity.commonsTitle
      );

    const geojson =
      extractGeoJSON(
        commonsData
      );


    displayGeoJSON(
      geojson,
      entity.label,
      entity.item,
      entity.commonsURL
    );


    setStatus(
      "Map loaded",
      "ready"
    );

  } catch (error) {
    console.error(error);

    setStatus(
      "Unable to load map",
      "error"
    );

    els.footerGeometry.textContent =
      "—";

    els.entityLinks.innerHTML = `
      <a
        href="${escapeHTML(entity.commonsURL)}"
        target="_blank"
        rel="noopener noreferrer"
      >
        Open Commons map manually
      </a>
    `;
  }
}


/* =========================================================
   POPULATE MAP SELECTOR
========================================================= */

async function populateDropdown() {
  setStatus(
    "Querying Wikidata…",
    "loading"
  );

  els.mapSelect.disabled = true;

  els.mapSelect.innerHTML = `
    <option value="">
      Loading maps…
    </option>
  `;

  try {
    const data =
      await getWikidataMaps();

    state.maps =
      data.results.bindings || [];

    console.log(
      `Wikidata returned ${state.maps.length} maps.`
    );

    if (!state.maps.length) {
      els.mapSelect.innerHTML = `
        <option value="">
          No maps found
        </option>
      `;

      setStatus(
        "No South African maps found",
        "error"
      );

      els.entityName.textContent =
        "No maps available";

      els.entityId.textContent =
        "—";

      return;
    }

    els.mapSelect.innerHTML = "";

    state.maps.forEach(
      (result, index) => {
        const label =
          result.itemLabel?.value ||
          result.item?.value ||
          `Map ${index + 1}`;

        const option =
          document.createElement("option");

        option.value = index;
        option.textContent = label;

        els.mapSelect.appendChild(option);
      }
    );

    els.mapSelect.disabled = false;

    els.mapSelect.value = "0";

    setStatus(
      `${state.maps.length} maps found`,
      "ready"
    );

    await loadSelectedMap();

  } catch (error) {
    console.error(
      "Wikidata loading error:",
      error
    );

    els.mapSelect.innerHTML = `
      <option value="">
        Unable to load maps
      </option>
    `;

    els.mapSelect.disabled = true;

    els.entityName.textContent =
      "Wikidata unavailable";

    els.entityId.textContent =
      "—";

    setStatus(
      "Wikidata request failed",
      "error"
    );

    els.entityLinks.innerHTML = `
      <span>
        ${escapeHTML(error.message)}
      </span>
    `;
  }
}

/* =========================================================
   WIKIDATA BUTTON
========================================================= */

els.wikidataButton.addEventListener(
  "click",
  () => {
    const url =
      els.wikidataButton.dataset.url;

    if (!url) {
      return;
    }

    window.open(
      url,
      "_blank",
      "noopener,noreferrer"
    );
  }
);


/* =========================================================
   MAP SELECTOR
========================================================= */

els.mapSelect.addEventListener(
  "change",
  loadSelectedMap
);


/* =========================================================
   DARK MAP TOGGLE
========================================================= */

els.themeToggle.addEventListener(
  "change",
  event => {
    const dark =
      event.target.checked;

    document.body.classList.toggle(
      "dark-map",
      dark
    );


    if (dark) {
      map.removeLayer(
        lightTiles
      );

      darkTiles.addTo(map);

    } else {
      map.removeLayer(
        darkTiles
      );

      lightTiles.addTo(map);
    }


    /*
     * Leaflet needs a size recalculation
     * after the layout/theme changes.
     */

    requestAnimationFrame(() => {
      map.invalidateSize();
    });
  }
);


/* =========================================================
   MAP RESIZE
========================================================= */

const resizeObserver =
  new ResizeObserver(() => {
    map.invalidateSize();
  });

resizeObserver.observe(
  els.map
);

/* =========================================================
   WIKIPEDIA LINK
========================================================= */

function createWikipediaURL(title) {
  if (!title) {
    return null;
  }

  const cleanTitle =
    String(title)
      .trim()
      .replace(/^Wikipedia:\s*/i, "")
      .replace(/^https?:\/\/(?:www\.)?wikipedia\.org\/wiki\//i, "");

  if (!cleanTitle) {
    return null;
  }

  return (
    "https://en.wikipedia.org/wiki/" +
    encodeURIComponent(
      cleanTitle.replace(/ /g, "_")
    )
  );
}

/* =========================================================
   CLEAN WIKIPEDIA TITLE
========================================================= */

function cleanWikipediaTitle(value) {
  if (!value) {
    return "";
  }

  let title = String(value).trim();

  /* Remove Wikipedia URL */
  title = title.replace(
    /^https?:\/\/(?:www\.)?wikipedia\.org\/wiki\//i,
    ""
  );

  /* Remove Wikipedia prefix */
  title = title.replace(
    /^Wikipedia:\s*/i,
    ""
  );

  /*
   * Remove unsupported square brackets.
   *
   * [Cape Town] → Cape Town
   * Cape [Town] → Cape Town
   */
  title = title.replace(/[\[\]]/g, "");

  /*
   * Decode URL encoding where possible.
   */
  try {
    title = decodeURIComponent(title);
  } catch {
    /* Keep original value if decoding fails */
  }

  /*
   * Convert underscores to spaces.
   */
  title = title.replace(/_/g, " ");

  /*
   * Collapse repeated whitespace.
   */
  title = title.replace(/\s+/g, " ");

  return title.trim();
}


/* =========================================================
   CREATE WIKIPEDIA URL
========================================================= */

function createWikipediaURL(title) {
  const cleanTitle =
    cleanWikipediaTitle(title);

  if (!cleanTitle) {
    return null;
  }

  return (
    "https://en.wikipedia.org/wiki/" +
    encodeURIComponent(
      cleanTitle.replace(/ /g, "_")
    )
  );
}


/* =========================================================
   START
========================================================= */

populateDropdown();
