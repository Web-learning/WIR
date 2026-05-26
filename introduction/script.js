//Prompted with CHAT GPT
const presentationData = {
  meta: {
    presentationTitle: "May-Sept 2026 Wikipedian in Residence",
    companyName: "Weblearning"
  },

  branding: {
    colors: {
      primary: "#003366",
      accent: "#00AEEF"
    },

    footer: {
      "text": "CC BY  Weblearning  | Code for Africa | AWA",
    }
  },

  slides: [
    {
      type: "cover",
      title: "May-Sept 2026 | Wikipedian in Residence",
      subtitle: "AWA/C4A Inclusion Project"
    },

    {
      type: "agenda",
      title: "Agenda",
      items: [
       "The African Wikipedian Alliance (AWA) and Code for Africa (C4A() 2026 fellowships",
        "The Inclusion Project",
        "Our Focus:Xenophobia, Election, government, gender equity,and LGBTQ Rights",
        "My Roadmap and Plans",
        "https://outreachdashboard.wmflabs.org/users/Derek%20J%20Moore",
        "Other Fellows"
       ]
    },

    {
      type: "two-column-content",
      title: "Who We Are",
      leftColumn: {
        heading: "About AWA",
        body: [
          "Founded in ?",
          "Operating in 12 countries in Africa",
          "Insert Tag line"
        ]
      }
    },

    {
      type: "statistics",
      title: "Every month I intend to",
      statistics: [
        {
          label: "Engagae with Wikipedians",
          value: "30"
        },
        {
          label: "Recruit new editors",
          value: "10"
        },
        {
          label: "Run public events",
          value: "3"
        }
      ]
    },

    {
      type: "timeline",
      title: "Strategic Roadmap",
      timeline: [
        {
          quarter: "May 2026",
          milestone: "Planning and Roadmap"
        },
        {
          quarter: "June 2026",
          milestone: "Workshops"
        },
        {
          quarter: "July 2026",
          milestone: "Wikimedia Conference"
        },
        {
          quarter: "August 2026",
          milestone: "Workshops"
        },
        {
          quarter: "September 2026",
          milestone: "Wrap Up"
        }
      ]
    },

    {
      type: "theme",
      title: "Themes",
      members: [
        {
          name: "Maps Making",
          role: "Link to be added"
        },
        {
          name: "Inclusion",
          role: "Link to be added"
        },
        {
          name: "SLAM",
          role: "Link to be added"
        }
      ]
    },

    {
      type: "quote",
      title: "Testimonial",
      quote:
        "We are thrilled to share some fantastic news with you all! Our very own Twin Mosia and Derek Moore have been selected for the Wikipedian-in-Residence (WiR) Fellowships...This is a remarkable achievement and a testament to their dedication, technical skills, and the impact they’ve made within the community.",
      author: "Nomfundo Zungu Communications intern WMZA"
    },

    {
      type: "closing",
      title: "Thank You",
      subtitle: "Questions & Discussion"
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
