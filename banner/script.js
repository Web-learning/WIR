document.addEventListener("DOMContentLoaded", () => {
  fetch("./hero.json")
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }

      return response.json();
    })
    .then(hero => {
      document.getElementById("hero-eyebrow").textContent =
        hero.eyebrow;

      document.getElementById("hero-title").textContent =
        hero.title;

      document.getElementById("hero-description").textContent =
        hero.description;

      const button = document.getElementById("hero-button");

      button.textContent = hero.button.text;
      button.href = hero.button.url;
    })
    .catch(error => {
      console.error("Could not load hero.json:", error);
    });
});
