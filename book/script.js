const bookData = {
  meta: {
    logo: "📖",
    title: "“Wikifying”",
    eyebrow: "A wikipedians fieldguide",
    bookTitle: "To Wikifying",
    subtitle: "A Conference",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/e/e9/Wikimedia_and_me.jpg"
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const meta = bookData.meta;

  const eyebrow = document.getElementById("bookEyebrow");
  const title = document.getElementById("bookTitle");
  const subtitle = document.getElementById("bookSubtitle");
  const book = document.querySelector(".book-content");

  if (eyebrow) {
    eyebrow.textContent = meta.eyebrow || "";
  }

  if (title) {
    title.textContent = meta.bookTitle || meta.title || "";
  }

  if (subtitle) {
    subtitle.textContent = meta.subtitle || "";
  }

  /*
   * Use the JSON image as the actual cover artwork.
   */
  if (book && meta.image) {
    book.style.backgroundImage = `
      linear-gradient(
        180deg,
        rgba(0, 0, 0, 0.78) 0%,
        rgba(0, 0, 0, 0.25) 35%,
        rgba(0, 0, 0, 0.35) 65%,
        rgba(0, 0, 0, 0.9) 100%
      ),
      url("${meta.image}")
    `;
  }

  /*
   * Keep the full metadata available to other scripts.
   */
  if (book) {
    book.dataset.title = meta.title || "";
    book.dataset.image = meta.image || "";
  }
});