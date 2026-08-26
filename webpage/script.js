const jsonURL =
  "./json/hero.json";


fetch(jsonURL)
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    return response.json();
  })
  .then(data => {

    // Watermark
    document.getElementById("watermark").textContent =
      data.watermark;

    // Eyebrow
    document.getElementById("eyebrow").textContent =
      data.hero.eyebrow;

    // Title
    document.getElementById("title-before").textContent =
      data.hero.title.before;

    document.getElementById("title-highlight").textContent =
      data.hero.title.highlight;

    // Link
    document.getElementById("hero-link").href =
      data.hero.title.link || "#";

    // Subtitle
    document.getElementById("subtitle").textContent =
      data.hero.subtitle;

    // Author
    document.getElementById("author-name").textContent =
      data.author.name;

  })
  .catch(error => {
    console.error("Error loading hero.json:", error);
  });
