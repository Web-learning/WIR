const slides = [...document.querySelectorAll(".slide")];
const currentSlideEl = document.getElementById("currentSlide");
const chapterLabel = document.getElementById("chapterLabel");
const progressBar = document.getElementById("progressBar");

const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

const overview = document.getElementById("overview");
const overviewGrid = document.getElementById("overviewGrid");
const menuBtn = document.getElementById("menuBtn");
const closeOverview = document.getElementById("closeOverview");

const navDots = [...document.querySelectorAll(".nav-dot")];

let current = 0;
let touchStartX = 0;
let touchEndX = 0;

const total = slides.length;


/* -----------------------------
   SLIDE TITLES
----------------------------- */

const slideTitles = [
  "Wikifying a Conference?",
  "Conferences are knowledge hubs",
  "Many Wikimedia opportunities",
  "Before the event",
  "Planning",
  "Pitching",
  "Communications",
  "Data preparation",
  "Commons",
  "Attendees",
  "During the event",
  "Visibility",
  "Photography",
  "Photo booth",
  "Engagement",
  "Capture",
  "Sketchnoting",
  "After the event",
  "Tools",
  "Conference video",
  "Reporting",
  "The field guide",
  "Be bold"
];


/* -----------------------------
   GO TO SLIDE
----------------------------- */

function goTo(index) {

  if (index < 0) {
    index = total - 1;
  }

  if (index >= total) {
    index = 0;
  }

  slides[current].classList.remove("active");

  current = index;

  slides[current].classList.add("active");

  updateUI();
}


/* -----------------------------
   UI
----------------------------- */

function updateUI() {

  const number = String(current + 1).padStart(2, "0");

  currentSlideEl.textContent = number;

  const section = slides[current].dataset.section || "WELCOME";

  chapterLabel.textContent = section;

  const progress = ((current + 1) / total) * 100;

  progressBar.style.width = `${progress}%`;

  navDots.forEach(dot => dot.classList.remove("active"));

  if (current < 3) {
    navDots[0].classList.add("active");
  } else if (current < 10) {
    navDots[1].classList.add("active");
  } else if (current < 17) {
    navDots[2].classList.add("active");
  } else {
    navDots[3].classList.add("active");
  }
}


/* -----------------------------
   KEYBOARD
----------------------------- */

document.addEventListener("keydown", event => {

  if (overview.classList.contains("open")) {

    if (event.key === "Escape") {
      closeOverviewPanel();
    }

    return;
  }

  switch (event.key) {

    case "ArrowRight":
    case "ArrowDown":
    case " ":
    case "PageDown":
      event.preventDefault();
      goTo(current + 1);
      break;

    case "ArrowLeft":
    case "ArrowUp":
    case "PageUp":
      event.preventDefault();
      goTo(current - 1);
      break;

    case "Home":
      event.preventDefault();
      goTo(0);
      break;

    case "End":
      event.preventDefault();
      goTo(total - 1);
      break;

    case "Escape":
      openOverviewPanel();
      break;
  }
});


/* -----------------------------
   BUTTONS
----------------------------- */

nextBtn.addEventListener("click", () => {
  goTo(current + 1);
});

prevBtn.addEventListener("click", () => {
  goTo(current - 1);
});


/* -----------------------------
   TOUCH / SWIPE
----------------------------- */

document.addEventListener("touchstart", event => {
  touchStartX = event.changedTouches[0].screenX;
}, { passive: true });

document.addEventListener("touchend", event => {

  touchEndX = event.changedTouches[0].screenX;

  const distance = touchEndX - touchStartX;

  if (Math.abs(distance) < 50) return;

  if (distance < 0) {
    goTo(current + 1);
  } else {
    goTo(current - 1);
  }
}, { passive: true });


/* -----------------------------
   CHAPTER NAVIGATION
----------------------------- */

navDots.forEach(button => {

  button.addEventListener("click", () => {

    const index = Number(button.dataset.go);

    goTo(index);
  });

});


/* -----------------------------
   OVERVIEW
----------------------------- */

function buildOverview() {

  overviewGrid.innerHTML = "";

  slides.forEach((slide, index) => {

    const card = document.createElement("button");

    card.className = "overview-card";

    card.innerHTML = `
      <small>${String(index + 1).padStart(2, "0")}</small>
      <strong>${slideTitles[index]}</strong>
    `;

    card.addEventListener("click", () => {
      goTo(index);
      closeOverviewPanel();
    });

    overviewGrid.appendChild(card);
  });
}


function openOverviewPanel() {
  overview.classList.add("open");
}

function closeOverviewPanel() {
  overview.classList.remove("open");
}

menuBtn.addEventListener("click", openOverviewPanel);

closeOverview.addEventListener("click", closeOverviewPanel);


/* -----------------------------
   INITIALISE
----------------------------- */

buildOverview();
updateUI();
