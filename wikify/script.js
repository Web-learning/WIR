/* =====================================================
   SCENES
===================================================== */

const scenes = [
{
    image: "https://upload.wikimedia.org/wikipedia/commons/1/15/Roughtrack.jpg",
    text: "Wikifying a Conference",
    tags: " 1 | Welcome | #Wikification | Routes to Knowledge"
  },
  {
    image: "https://upload.wikimedia.org/wikipedia/commons/b/b0/Albasani_road.jpg",
    text: "Conferences are knowledge hubs.",
    tags: " 2 | Intro| #Wikification | Visible Knowledge"
  },
  {
    image: "https://upload.wikimedia.org/wikipedia/commons/c/ca/Storm_Clouds_breaking.jpg",
    text: "Multiple opportunities for sharing.",
    tags: " 3 | #WOpenEducation | Threat or an opportunity?"
    },
  {
    image: "https://upload.wikimedia.org/wikipedia/commons/a/a4/Steynsburg_ground.jpg",
    text: "Ready for Wikification",
    tags: " 4 | Before | #Wikification | People, images, relationships"
  },
  {
    image: "https://upload.wikimedia.org/wikipedia/commons/6/61/TUT_South_Campus_Council_Chambers.jpg",
    text: "Start early. Think strategically. ",
    tags: " 5 | Before | #Wikidata, #Commons | Pitching to event organisers."

  },
  {
    image: "https://upload.wikimedia.org/wikipedia/commons/f/fc/Dirt_road%2C_Petrusstrrom.jpg",
    text: "What does a Wikimedian offer?",
    tags: " 6 | Before | #Wikification | Advice about Wikimedia platforms."
  },
  {
    image: "https://upload.wikimedia.org/wikipedia/commons/b/b5/Wikimania2026geodisic.jpg",
    text: "How knowledge become visible.",
    tags: " 7 | Before | #Wikification | Space, data permissions, conference photographer"
  },
  {
    image: "https://upload.wikimedia.org/wikipedia/commons/d/de/WorldClockAlexanderPlatz.jpg",
    text: "Wikidata work before the conference rush.",
    tags: " 8 | Before | #Wikification | People, Identifiers, Gaps"
  },
  {
    image: "https://upload.wikimedia.org/wikipedia/commons/1/18/Goethe_JHB_-_Entrance_stairs.jpg",
    text:  "Categories, photo shot lists and data structures",
    tags: " 9 | Before | #Wikification | #Commons"
  },
  {
    image: "https://upload.wikimedia.org/wikipedia/commons/2/2e/Ndlopfu_drive_tunnel.jpg",
    text:  "Be proactive, don't wait for people to find you.",
    tags: " 10 | Before | #Wikification, #Commons"
  },
  {
    image: "https://upload.wikimedia.org/wikipedia/commons/4/42/Hilton_Station_4.jpg",
    text: "Be useful. Be available. Be real",
    tags: " 11 | During | #Wikification, #Commons"
  },
  {
    image: "https://upload.wikimedia.org/wikipedia/commons/9/9c/Artists_palette.jpg",
    text: "Do people recognise you and can they locate you?",
    tags: " 12 | During | #Wikification | Setup, Branding, Advertisements"
  },
  {
    image: "https://upload.wikimedia.org/wikipedia/commons/c/ca/Coul%C3%A9e_Verte_Ren%C3%A9-Dumont_Stairs_2.jpg",
    text: "Small steps towards open education.",
    tags: " 13 | During | #Wikification, #Photography"
  },
  {
    image: "https://upload.wikimedia.org/wikipedia/commons/3/35/Hertzog_Bridge.jpg",
    text: "Something to engage around.",
    tags: " 14 | During | #Wikification, #Engagement"
  },
  {
    image: "https://upload.wikimedia.org/wikipedia/commons/2/2e/Ndlopfu_drive_tunnel.jpg",
    text: "What's the plot.",
    tags: " 15 | During | #Wikification"
  },
  {
    image: "https://upload.wikimedia.org/wikipedia/commons/c/cd/Lenong_drive.jpg?",
    text: "Make all the invisible efforts now visible.",
    tags: " 16 | After | #Wikification"
  },
  {
    image: "https://upload.wikimedia.org/wikipedia/commons/e/e2/All%C3%A9es_Jacques-Brel.jpg",
    text:  "Data Wrangling.",
    tags: " 17 | After | #Wikification"
  },
  {
    image: "https://upload.wikimedia.org/wikipedia/commons/a/a4/Andr%C3%A9-L%C3%A9o_footbridge.jpg",
    text:  "Conference Media.",
    tags: " 18 | After | #Wikification"
  },
  {
    image: "https://upload.wikimedia.org/wikipedia/commons/a/ae/Rosebank_Trees_in_Cradock_st.jpg",
    text:  "Plan your reporting before you need it.",
    tags: " 19 | After | #Wikification"
  },
  {
    image: "https://upload.wikimedia.org/wikipedia/commons/a/ae/Rosebank_Trees_in_Cradock_st.jpg",
    text:  "The Field Guide make a conference much more than an event.",
    tags: " 20 | After | #Wikification"
  },
  {
    image: "https://upload.wikimedia.org/wikipedia/commons/2/2d/Field_guide_cover.png",
    text:  "Be bold. Thank-you",
    tags: " 21 | After | #Wikification"
  }
];


/* =====================================================
   ELEMENTS
===================================================== */

const phone = document.getElementById("phone");
const scene = document.getElementById("scene");
const sceneImage = document.getElementById("sceneImage");
const caption = document.getElementById("caption");
const description = document.getElementById("description");
const hashtag = document.getElementById("hashtag");
const progressBar = document.getElementById("progressBar");
const floating = document.getElementById("floating");

const likeButton = document.getElementById("like");
const likeCount = document.getElementById("likeCount");

const commentButton = document.getElementById("comment");
const shareButton = document.getElementById("share");
const saveButton = document.getElementById("save");

const commentPanel = document.getElementById("commentPanel");
const commentInput = document.getElementById("commentInput");
const commentReply = document.getElementById("commentReply");
const postCommentButton = document.getElementById("postComment");
const closeCommentsButton = document.getElementById("closeComments");

const saveLabel = document.getElementById("saveLabel");


/* =====================================================
   VIDEO STATE
===================================================== */

let currentScene = 0;
let elapsed = 0;
const duration = 5;

let playing = true;
let liked = false;
let saved = false;

let likes = 12400;
let toastTimer = null;
let animationFrame = null;
let lastFrameTime = 0;
let touchStartX = 0;
let touchStartY = 0;


/* =====================================================
   TOAST NOTIFICATIONS
===================================================== */

function showToast(icon, title, message) {
  let toast = document.getElementById("toast");

  // Create notification if it isn't in the HTML yet.
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast";
    toast.className = "toast";
    toast.setAttribute("role", "status");
    toast.setAttribute("aria-live", "polite");

    toast.innerHTML = `
      <div class="toastIcon" id="toastIcon"></div>
      <div class="toastTitle" id="toastTitle"></div>
      <div class="toastText" id="toastText"></div>
    `;

    phone.appendChild(toast);
  }

  document.getElementById("toastIcon").textContent = icon;
  document.getElementById("toastTitle").textContent = title;
  document.getElementById("toastText").textContent = message;

  toast.classList.remove("show");
  void toast.offsetWidth;
  toast.classList.add("show");

  clearTimeout(toastTimer);

  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2400);
}


/* =====================================================
   SHOW SCENE
===================================================== */

function showScene(index) {
  currentScene = (index + scenes.length) % scenes.length;

  const item = scenes[currentScene];

  caption.classList.remove("show");
  scene.classList.remove("transitioning");

  void scene.offsetWidth;

  scene.classList.add("transitioning");

  sceneImage.src = item.image;
  sceneImage.alt = item.text;

  sceneImage.classList.remove("zoom");

  setTimeout(() => {
    if (currentScene === indexModulo(index)) {
      sceneImage.classList.add("zoom");
    }
  }, 100);

  setTimeout(() => {
    if (currentScene !== indexModulo(index)) return;

    description.textContent = item.text;
    hashtag.textContent = item.tags;
    caption.classList.add("show");
  }, 250);

  elapsed = 0;
  progressBar.style.width = "0%";
}

function indexModulo(index) {
  return (index + scenes.length) % scenes.length;
}


/* =====================================================
   NEXT / PREVIOUS SCENES
===================================================== */

function nextScene() {
  showScene(currentScene + 1);
}

function previousScene() {
  showScene(currentScene - 1);
}


/* =====================================================
   PROGRESS LOOP
===================================================== */

function updateProgress(timestamp) {
  if (!playing) {
    animationFrame = null;
    lastFrameTime = 0;
    return;
  }

  if (!lastFrameTime) lastFrameTime = timestamp;

  const delta = Math.min((timestamp - lastFrameTime) / 1000, 0.1);
  lastFrameTime = timestamp;

  elapsed += delta;

  const percentage = Math.min((elapsed / duration) * 100, 100);

  progressBar.style.width = percentage + "%";

  if (elapsed >= duration) {
    nextScene();
  }

  animationFrame = requestAnimationFrame(updateProgress);
}

function startProgress() {
  if (animationFrame !== null) return;

  lastFrameTime = 0;
  animationFrame = requestAnimationFrame(updateProgress);
}

function stopProgress() {
  if (animationFrame !== null) {
    cancelAnimationFrame(animationFrame);
    animationFrame = null;
  }

  lastFrameTime = 0;
}


/* =====================================================
   PAUSE / PLAY
===================================================== */

function togglePlayback() {
  playing = !playing;

  phone.classList.toggle("paused", !playing);

  if (playing) {
    startProgress();
  } else {
    stopProgress();
  }
}

phone.addEventListener("click", event => {
  if (
    event.target.closest("button") ||
    event.target.closest(".commentPanel") ||
    event.target.closest(".toast") ||
    event.target.closest("input") ||
    event.target.closest("textarea")
  ) {
    return;
  }

  togglePlayback();
});


/* =====================================================
   CREATE FLOATING HEART
===================================================== */

function createHeart() {
  const heart = document.createElement("div");

  heart.className = "heart";

  const emojis = ["♥", "❤", "💜", "💙", "✨"];

  heart.textContent =
    emojis[Math.floor(Math.random() * emojis.length)];

  heart.style.setProperty("--random", Math.random());

  heart.style.right = Math.random() * 50 + "px";

  floating.appendChild(heart);

  setTimeout(() => heart.remove(), 1800);
}


/* =====================================================
   ACTION 1: LIKE
===================================================== */

likeButton.addEventListener("click", event => {
  event.stopPropagation();

  liked = !liked;
  likes += liked ? 1 : -1;

  likeButton.textContent = liked ? "♥" : "♡";

  likeButton.style.color = liked ? "#ff3b72" : "white";

  likeButton.classList.toggle("selected", liked);

  likeCount.textContent =
    likes >= 1000
      ? (likes / 1000).toFixed(1) + "K"
      : String(likes);

  if (liked) {
    createHeart();
    createHeart();
    createHeart();

    showToast(
      "❤️",
      "You liked this moment!",
      "A little love goes a long way."
    );
  } else {
    showToast(
      "♡",
      "Like removed",
      "You can always like it again."
    );
  }
});


/* =====================================================
   ACTION 2: COMMENT
===================================================== */

commentButton.addEventListener("click", event => {
  event.stopPropagation();

  if (commentPanel) {
    commentPanel.classList.add("open");

    if (commentInput) {
      setTimeout(() => commentInput.focus(), 250);
    }
  } else {
    showToast(
      "💬",
      "Join the conversation",
      "What do you think about this architectural project?"
    );
  }
});

if (closeCommentsButton && commentPanel) {
  closeCommentsButton.addEventListener("click", event => {
    event.stopPropagation();
    commentPanel.classList.remove("open");
  });
}

function postComment() {
  if (!commentInput || !commentReply) return;

  const message = commentInput.value.trim();

  if (!message) {
    commentReply.textContent = "Write a comment before posting.";
    return;
  }

  commentReply.textContent = `✓ You said: "${message}"`;

  commentInput.value = "";

  showToast(
    "💬",
    "Comment posted!",
    "Thanks for sharing your thoughts."
  );
}

if (postCommentButton) {
  postCommentButton.addEventListener("click", event => {
    event.stopPropagation();
    postComment();
  });
}

if (commentInput) {
  commentInput.addEventListener("keydown", event => {
    if (event.key === "Enter") {
      event.preventDefault();
      postComment();
    }
  });
}


/* =====================================================
   ACTION 3: SHARE
===================================================== */

shareButton.addEventListener("click", async event => {
  event.stopPropagation();

  const shareData = {
    title: "Open Studios | Architecture",
    text: scenes[currentScene].text + " " + scenes[currentScene].tags,
    url: window.location.href
  };

  if (navigator.share) {
    try {
      await navigator.share(shareData);

      showToast(
        "✓",
        "Shared successfully!",
        "Thanks for sharing this architectural moment."
      );
    } catch (error) {
      if (error.name !== "AbortError") {
        showToast(
          "↗",
          "Ready to share",
          "Copy this page URL to share the project."
        );
      }
    }

    return;
  }

  try {
    await navigator.clipboard.writeText(
      `${shareData.title}\n${shareData.text}\n${shareData.url}`
    );

    showToast(
      "✓",
      "Link copied!",
      "Paste it into a message to share this project."
    );
  } catch {
    showToast(
      "↗",
      "Share this project",
      shareData.text
    );
  }
});


/* =====================================================
   ACTION 4: SAVE
===================================================== */

saveButton.addEventListener("click", event => {
  event.stopPropagation();

  saved = !saved;

  saveButton.textContent = saved ? "✓" : "🔖";

  saveButton.classList.toggle("selected", saved);

  if (saveLabel) {
    saveLabel.textContent = saved ? "Saved" : "Save";
  }

  showToast(
    saved ? "🔖" : "✓",
    saved ? "Project saved!" : "Removed from saved",
    saved
      ? "You can revisit this architectural moment anytime."
      : "This project was removed from your saved list."
  );
});


/* =====================================================
   DOUBLE-CLICK REACTION
===================================================== */

phone.addEventListener("dblclick", event => {
  if (
    event.target.closest("button") ||
    event.target.closest(".commentPanel") ||
    event.target.closest("input")
  ) {
    return;
  }

  if (!liked) {
    liked = true;
    likes++;

    likeButton.textContent = "♥";
    likeButton.style.color = "#ff3b72";
    likeButton.classList.add("selected");

    likeCount.textContent =
      likes >= 1000
        ? (likes / 1000).toFixed(1) + "K"
        : String(likes);
  }

  createHeart();
  createHeart();
  createHeart();
});


/* =====================================================
   KEYBOARD CONTROLS
===================================================== */

document.addEventListener("keydown", event => {
  if (
    event.target.matches("input, textarea") ||
    event.target.isContentEditable
  ) {
    return;
  }

  if (event.code === "Space") {
    event.preventDefault();
    togglePlayback();
  }

  if (event.key === "ArrowRight") {
    nextScene();
  }

  if (event.key === "ArrowLeft") {
    previousScene();
  }
});


/* =====================================================
   TOUCH / SWIPE
===================================================== */

phone.addEventListener("touchstart", event => {
  touchStartX = event.changedTouches[0].clientX;
  touchStartY = event.changedTouches[0].clientY;
}, { passive: true });

phone.addEventListener("touchend", event => {
  if (
    event.target.closest("button") ||
    event.target.closest(".commentPanel") ||
    event.target.closest("input")
  ) {
    return;
  }

  const endX = event.changedTouches[0].clientX;
  const endY = event.changedTouches[0].clientY;

  const dx = endX - touchStartX;
  const dy = endY - touchStartY;

  // Vertical swipe changes scenes.
  if (Math.abs(dy) > 60 && Math.abs(dy) > Math.abs(dx)) {
    if (dy < 0) {
      nextScene();
    } else {
      previousScene();
    }
  }
}, { passive: true });


/* =====================================================
   INITIALIZE PLAYER
===================================================== */

showScene(0);
startProgress();
