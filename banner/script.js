async function loadHero() {
  try {
    const response = await fetch("hero.json");

    if (!response.ok) {
      throw new Error("Could not load hero.json");
    }

    const hero = await response.json();

    document.getElementById("hero-eyebrow").textContent =
      hero.eyebrow;

    document.getElementById("hero-title").textContent =
      hero.title;

    document.getElementById("hero-description").textContent =
      hero.description;

    const button = document.getElementById("hero-button");

    button.textContent = hero.button.text;
    button.href = hero.button.url;

  } catch (error) {
    console.error("Hero loading error:", error);
  }
}

loadHero();
```
