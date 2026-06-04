//Prompted with CHAT GPT
//https://raw.githubusercontent.com/Web-learning/WIR/refs/heads/main/json/introduction.json
const presentationData = {
  "meta": {
    "presentationTitle": "Onboarding",
    "companyName": "Weblearning"
  },

  "branding": {
    "colors": {
      "primary": "#003366",
      "accent": "#00AEEF"
    },

    "footer": {
      "text": "Weblearning | User Page"
    }
  },

   "slides": [
    {
      "type": "cover",
      "title": "Want to learn about creating a userpage?",
      "subtitle": "with Weblearning"
    },
         {
      "type": "agenda",
      "title": "Agenda",

      "items": [
       "Some amazing examples",
	   "Find a user image that represents you",
        "Upload your user image to commons",
        "Lets be fabulous!"
      ]
    },
    {
      "type": "two-column-content",

      "title": "Ever had a friendship with someone you never met?",

      "leftColumn": {
        "heading": "Ambient Friendships",

        "body": [
          "We are social creatures",
          "We interact in person and remotely",
          "We like learning things together or from each other"
        ]
      },

      "rightColumn": {
        "heading": "Typical Wikipedian",

        "body": [
          "Is passionate and knowledgeable about certain things ",
          "Would like to improve and share information about those things",
          "Goes ahead and is BOLD and makes things happen"
        ]
      }
    },
    {
      "type": "theme",

      "title": "What makes for a credeble Wikipedian?",

      "members": [
        {
          "name": "Wikipedia heading and lede",
          "role": "To quickly introduce the person"
        },
        {
          "name": "Wikidata identifiers",
          "role": "A collection of credible links to the person"
        },
		        {
          "name": "Infobox",
          "role": "Visual reference points (map, photo, collage)"
        }
      ]
    },
    {
      "type": "timeline",

      "title": "Getting onboard",

      "timeline": [
        {
          "quarter": "Step 1",
          "milestone": "Choose a user image and upload it"
        },

        {
          "quarter": "Step 2",
          "milestone": "Identify the latitude and longitude (home or work)"
        },

        {
          "quarter": "Step 3",
          "milestone": "Share your identifiers on Wikidata"
        },

        {
          "quarter": "Step 4",
          "milestone": "Insert your inforbox"
        },

        {
          "quarter": "Step 5",
          "milestone": "Pull it all together"
        }
      ]
    },

     {
      "type": "closing",

      "title": "Thank You",

      "subtitle": "Questions & Discussion"
    }
  ]
};

const container = document.getElementById("presentation");

presentationData.slides.forEach((slideData) => {
  const slide = document.createElement("section");
  slide.classList.add("slide");

  switch (slideData.type) {

    case "cover":
      slide.classList.add("dark");
      slide.innerHTML = `
        <h1 class="slide-title">${slideData.title}</h1>
        <p class="slide-subtitle">${slideData.subtitle}</p>
      `;
      break;

    case "agenda":
      slide.innerHTML = `
        <h1 class="slide-title">${slideData.title}</h1>
        <ol class="agenda-list">
          ${slideData.items.map(item => `<li>${item}</li>`).join("")}
        </ol>
      `;
      break;

    case "two-column-content":
      slide.innerHTML = `
        <h1 class="slide-title">${slideData.title}</h1>

        <div class="two-column">
          <div class="column">
            <h3>${slideData.leftColumn.heading}</h3>
            <ul>
              ${slideData.leftColumn.body.map(
                item => `<li>${item}</li>`
              ).join("")}
            </ul>
          </div>
        </div>
      `;
      break;

    case "statistics":
      slide.innerHTML = `
        <h1 class="slide-title">${slideData.title}</h1>

        <div class="stats">
          ${slideData.statistics.map(stat => `
            <div class="stat-card">
              <div class="stat-value">${stat.value}</div>
              <div class="stat-label">${stat.label}</div>
            </div>
          `).join("")}
        </div>
      `;
      break;

    case "timeline":
      slide.innerHTML = `
        <h1 class="slide-title">${slideData.title}</h1>

        <div class="timeline">
          ${slideData.timeline.map(item => `
            <div class="timeline-item">
              <strong>${item.quarter}</strong>
              <p>${item.milestone}</p>
            </div>
          `).join("")}
        </div>
      `;
      break;

    case "theme":
      slide.innerHTML = `
        <h1 class="slide-title">${slideData.title}</h1>

        <div class="theme-grid">
          ${slideData.members.map(member => `
            <div class="theme-number">
              <h3>${member.name}</h3>
              <p>${member.role}</p>
            </div>
          `).join("")}
        </div>
      `;
      break;

    case "quote":
      slide.innerHTML = `
        <h1 class="slide-title">${slideData.title}</h1>

        <div class="quote-box">
          "${slideData.quote}"
        </div>

        <div class="quote-author">
          — ${slideData.author}
        </div>
      `;
      break;

    case "closing":
      slide.classList.add("dark");

      slide.innerHTML = `
        <h1 class="slide-title">${slideData.title}</h1>
        <p class="slide-subtitle">${slideData.subtitle}</p>
      `;
      break;
  }

  const footer = document.createElement("div");
  footer.classList.add("footer");
  footer.textContent = presentationData.branding.footer.text;

  slide.appendChild(footer);

  container.appendChild(slide);
});

async function exportPresentationToPDF() {

  const { jsPDF } = window.jspdf;

  const pdf = new jsPDF({
    orientation: "landscape",
    unit: "px",
    format: [1280, 720]
  });

  const slides = document.querySelectorAll(".slide");

  for (let i = 0; i < slides.length; i++) {

    const slide = slides[i];

    const canvas = await html2canvas(slide, {
      scale: 2,
      useCORS: true
    });

    const imgData = canvas.toDataURL("image/png");

    if (i > 0) {
      pdf.addPage();
    }

    pdf.addImage(
      imgData,
      "PNG",
      0,
      0,
      1280,
      720
    );
  }

  pdf.save("WIR Introduction.pdf");
}

document
  .getElementById("exportBtn")
  .addEventListener("click", exportPresentationToPDF);
