/**
 * Pastel Yellow Birthday Website Scrapbook
 * Features: Live Customize Drawer, LocalStorage persistence,
 * Web Audio lo-fi synthesizer, interactive candles & polaroids,
 * floating petals & butterfly canvas.
 */

// ========================================================
// DEFAULT CONFIGURATION & DATA
// ========================================================
const DEFAULT_CONFIG = {
  name: "Aaradhya",
  moniker: "Sunshine 🌻",
  birthdate: "",
  heroPre: "A VERY SPECIAL CELEBRATION",
  heroSubtitle: "Wishing the sweetest, brightest, and most peaceful year to someone who naturally brings warmth and happiness wherever she goes.",
  wishText: "May this new lap around the sun bring you endless warm coffee, laughter that makes your stomach hurt, golden hour skies, and all the peaceful happiness you deserve.",
  theme: "theme-vintage-sunflower",
  customBg: null,
  bgOpacity: 0.35,
  floatingPetals: true,
  presentationMode: false,
  
  // Letter
  letterDate: "October 2026",
  letterSalutation: "Dear Aaradhya,",
  letterBody: `Happy Birthday! Another year wiser, brighter, and undeniably more awesome.\n\nI just wanted to take a moment today to remind you how genuinely appreciated you are. In a world that is often fast and chaotic, you have this natural way of making everything feel calm, warm, and effortless. Whether it's your infectious laugh, your thoughtful questions, or just the lighthearted energy you bring into every conversation, you make ordinary days feel noticeably better.\n\nI hope today treats you to your absolute favorite things—the best cup of coffee, the coziest playlist, people who make you smile till your cheeks hurt, and all the pastel yellow vibes in the world.\n\nHere’s to another year of exciting adventures, new memories, quiet peaceful mornings, and big dreams coming true. The world is honestly so much better with you in it.`,
  letterClosing: "Have the happiest day,",
  letterSender: "Your Friend & Well-Wisher ✨",

  // Polaroids
  polaroids: [
    {
      id: "p1",
      image: "photo1.jpg",
      caption: "Sunshine & Daisies 🌻",
      note: "Finding beauty in everyday ordinary moments and simple joys.",
      date: "August 2023"
    },
    {
      id: "p2",
      image: "photo2.jpg",
      caption: "Golden Hour Picnic 🍰",
      note: "Laughter, sweet treats, chamomile blooms, and calm summer vibes.",
      date: "Summer Memories"
    },
    {
      id: "p3",
      image: "photo3.jpg",
      caption: "Sunny Cafe Moments ☕",
      note: "Always the best conversations and warmest laughs over coffee.",
      date: "Cozy Afternoons"
    }
  ],

  // Sunshine Reasons
  reasons: [
    {
      id: "r1",
      icon: "✨",
      title: "Your Contagious Laugh",
      text: "The kind of genuine laugh that effortlessly brightens the entire room and makes everyone smile too."
    },
    {
      id: "r2",
      icon: "🌻",
      title: "Your Thoughtful Nature",
      text: "How you always remember the subtle details and go out of your way to make others feel appreciated."
    },
    {
      id: "r3",
      icon: "☕",
      title: "That Calming Energy",
      text: "Conversations with you are comforting and peaceful—you just make long, busy days feel noticeably lighter."
    },
    {
      id: "r4",
      icon: "🎵",
      title: "Your Incredible Playlist",
      text: "Always discovering and sharing the best music vibes and songs that turn into instant memories."
    },
    {
      id: "r5",
      icon: "🌟",
      title: "Passion For What You Love",
      text: "The way your eyes light up whenever you talk about your favorite hobbies and creative ideas."
    },
    {
      id: "r6",
      icon: "💛",
      title: "Simply Being Genuine",
      text: "In a world that can be complicated, you stay authentic, kind-hearted, and wonderfully yourself."
    }
  ]
};

// Templates for non-confessional heartfelt letters
const LETTER_TEMPLATES = {
  sunshine: {
    salutation: "Dear [Name],",
    body: `Happy Birthday! Another year wiser, brighter, and undeniably more awesome.\n\nI just wanted to take a moment today to remind you how genuinely appreciated you are. In a world that is often fast and chaotic, you have this natural way of making everything feel calm, warm, and effortless. Whether it's your infectious laugh, your thoughtful questions, or just the lighthearted energy you bring into every conversation, you make ordinary days feel noticeably better.\n\nI hope today treats you to your absolute favorite things—the best cup of coffee, the coziest playlist, people who make you smile till your cheeks hurt, and all the pastel yellow vibes in the world.\n\nHere’s to another year of exciting adventures, new memories, quiet peaceful mornings, and big dreams coming true. The world is honestly so much better with you in it.`,
    closing: "Have the happiest day,",
    sender: "Your Friend & Well-Wisher ✨"
  },
  cheerful: {
    salutation: "Happy Birthday, [Name]! 🎉",
    body: `It's officially your day! Time to celebrate the coolest, funniest, and most radiant person around.\n\nThank you for always bringing so much good humor, energy, and witty banter to the table. Life would definitely be way more boring without your commentary and hilarious hot-takes.\n\nI hope you eat an obnoxious amount of cake, receive only good news, and get treated like the royalty you are today. May this year be filled with spontaneous road trips, zero stress, and endless reasons to smile!`,
    closing: "Cheering for you always,",
    sender: "Your Biggest Fan & Friend 🎈"
  },
  cozy: {
    salutation: "Dearest [Name],",
    body: `Wishing you a birthday as gentle, warm, and peaceful as golden hour.\n\nYou have such a grounding presence and a rare kind of empathy that makes everyone around you feel heard and understood. It's a true gift to know someone as sincere and caring as you.\n\nMay this year unfold like a favorite book—full of wonder, comfort, beautiful surprises, and dreams quietly coming to life. Keep shining your light, because it truly makes a difference.`,
    closing: "With warm admiration,",
    sender: "Always rooting for you 🌼"
  }
};

// State Object
let AppState = {};

function initAppState() {
  const saved = localStorage.getItem("sunshine_birthday_config");
  if (saved) {
    try {
      AppState = JSON.parse(saved);
      // Merge with defaults to ensure all keys exist
      AppState = { ...DEFAULT_CONFIG, ...AppState };
    } catch (e) {
      console.warn("Error parsing saved config, using default", e);
      AppState = JSON.parse(JSON.stringify(DEFAULT_CONFIG));
    }
  } else {
    AppState = JSON.parse(JSON.stringify(DEFAULT_CONFIG));
  }
}

function saveAppState() {
  localStorage.setItem("sunshine_birthday_config", JSON.stringify(AppState));
}

// ========================================================
// DOM ELEMENTS & EVENT BINDINGS
// ========================================================
document.addEventListener("DOMContentLoaded", () => {
  initAppState();
  renderApp();
  initCustomizeDrawer();
  initInteractiveCake();
  initLetterInteraction();
  initAmbientCanvas();
  initAudioSynthesizer();
  initCountdown();
});

// ========================================================
// RENDER MAIN APPLICATION
// ========================================================
function renderApp() {
  const name = AppState.name || "Aaradhya";
  const moniker = AppState.moniker || "Sunshine 🌻";

  // Document Title
  document.title = `Happy Birthday, ${name}! ☀️`;

  // Hero Section
  document.getElementById("display-name").textContent = name;
  document.getElementById("display-hero-pre").textContent = AppState.heroPre || "A VERY SPECIAL CELEBRATION";
  document.getElementById("display-subtitle").textContent = AppState.heroSubtitle || "";

  // Envelope and Letter
  document.getElementById("display-letter-name").textContent = name;
  document.getElementById("display-letter-moniker").textContent = moniker;
  document.getElementById("display-letter-salutation").textContent = (AppState.letterSalutation || "Dear Aaradhya,").replace(/\[Name\]/g, name);
  
  // Format letter paragraphs
  const letterBodyContainer = document.getElementById("display-letter-body");
  const paragraphs = (AppState.letterBody || "").split("\n\n");
  letterBodyContainer.innerHTML = paragraphs
    .map(p => `<p>${escapeHTML(p).replace(/\[Name\]/g, name)}</p>`)
    .join("");

  document.getElementById("display-letter-closing").textContent = AppState.letterClosing || "Have the happiest day,";
  document.getElementById("display-letter-sender").textContent = AppState.letterSender || "Your Friend ✨";

  // Wish Text
  document.getElementById("display-wish-text").textContent = `"${AppState.wishText || ""}"`;
  const wishRecipients = document.querySelectorAll(".wish-recipient-name");
  wishRecipients.forEach(el => el.textContent = name);

  // Footer & Cassette
  document.getElementById("footer-name").textContent = name;
  document.getElementById("cassette-recipient").textContent = name.toUpperCase();

  // Apply Background Theme
  document.body.className = AppState.theme || "theme-vintage-sunflower";
  const bgOverlay = document.getElementById("bg-overlay");
  if (AppState.customBg) {
    bgOverlay.style.backgroundImage = `url('${AppState.customBg}')`;
  } else {
    bgOverlay.style.backgroundImage = "";
  }

  // Scrim Darkness
  const scrim = document.getElementById("bg-texture-scrim");
  scrim.style.background = `radial-gradient(circle at 50% 20%, rgba(255, 254, 245, ${Math.max(0.15, AppState.bgOpacity - 0.1)}) 0%, rgba(254, 243, 199, ${AppState.bgOpacity}) 100%)`;

  // Presentation Mode Toggle
  if (AppState.presentationMode) {
    document.body.classList.add("presentation-mode");
  } else {
    document.body.classList.remove("presentation-mode");
  }

  // Render Dynamic Sections
  renderPolaroids();
  renderReasons();
}

function escapeHTML(str) {
  return str.replace(/[&<>'"]/g, 
    tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag)
  );
}

// ========================================================
// POLAROID GALLERY
// ========================================================
function renderPolaroids() {
  const container = document.getElementById("polaroid-container");
  container.innerHTML = "";

  (AppState.polaroids || []).forEach((item, index) => {
    const card = document.createElement("div");
    card.className = "polaroid-flip-card";
    card.setAttribute("role", "button");
    card.setAttribute("tabindex", "0");
    card.title = "Click to flip and read memory note";

    card.innerHTML = `
      <div class="polaroid-inner">
        <!-- Front Side -->
        <div class="polaroid-front">
          <div class="card-washi"></div>
          <div class="polaroid-photo-frame">
            <img src="${item.image}" alt="${escapeHTML(item.caption)}" class="polaroid-img" loading="lazy">
          </div>
          <div class="polaroid-caption-area">
            <h3 class="polaroid-caption">${escapeHTML(item.caption)}</h3>
            <span class="polaroid-flip-hint">↺ Click to flip note</span>
          </div>
        </div>

        <!-- Back Side -->
        <div class="polaroid-back">
          <div class="polaroid-back-flower">🌻</div>
          <p class="polaroid-back-text">"${escapeHTML(item.note)}"</p>
          <div class="polaroid-back-date">${escapeHTML(item.date || "Forever cherished")}</div>
          <span class="polaroid-flip-hint" style="margin-top: 12px;">↺ Click to flip photo</span>
        </div>
      </div>
    `;

    // Click to Flip
    card.addEventListener("click", () => {
      card.classList.toggle("is-flipped");
    });

    container.appendChild(card);
  });
}

// ========================================================
// SUNSHINE REASONS
// ========================================================
function renderReasons() {
  const container = document.getElementById("reasons-container");
  container.innerHTML = "";

  (AppState.reasons || []).forEach(reason => {
    const card = document.createElement("div");
    card.className = "reason-card";

    card.innerHTML = `
      <div class="reason-pin"></div>
      <div class="reason-card-header">
        <span class="reason-icon">${reason.icon || "☀️"}</span>
        <h3 class="reason-title">${escapeHTML(reason.title)}</h3>
      </div>
      <p class="reason-body">${escapeHTML(reason.text)}</p>
    `;

    container.appendChild(card);
  });
}

// ========================================================
// INTERACTIVE CAKE & CANDLE BLOWING
// ========================================================
let candlesBlown = false;

function initInteractiveCake() {
  const cakeContainer = document.getElementById("cake-container");
  const flames = document.getElementById("candle-flames");
  const smoke = document.getElementById("candle-smoke");
  const statusLabel = document.getElementById("cake-status-label");
  const wishRevealBox = document.getElementById("wish-reveal-box");
  const wishAgainBtn = document.getElementById("footer-wish-again-btn");

  function blowCandles() {
    if (candlesBlown) return;
    candlesBlown = true;

    // Hide flames, show smoke
    flames.style.display = "none";
    smoke.style.display = "block";

    // Play chime sound
    playCelebrationChime();

    // Trigger Confetti Burst
    burstConfetti();

    // Update Status
    statusLabel.innerHTML = `<span>🎉</span> Candles blown! Your wish is on its way!`;
    wishRevealBox.style.display = "block";
    showToast("🌟 Candles blown! Happy Birthday!");
  }

  cakeContainer.addEventListener("click", blowCandles);

  if (wishAgainBtn) {
    wishAgainBtn.addEventListener("click", () => {
      candlesBlown = false;
      flames.style.display = "block";
      smoke.style.display = "none";
      statusLabel.innerHTML = `<span class="tap-icon">✨</span> Tap the cake to blow the candles & make a wish!`;
      wishRevealBox.style.display = "none";
      cakeContainer.scrollIntoView({ behavior: "smooth" });
      showToast("🕯️ Candles re-lit! Make another wish!");
    });
  }
}

// ========================================================
// LETTER UNSEALING INTERACTION
// ========================================================
function initLetterInteraction() {
  const waxSealBtn = document.getElementById("wax-seal-btn");
  const unfoldedLetter = document.getElementById("unfolded-letter");

  waxSealBtn.addEventListener("click", () => {
    waxSealBtn.style.transform = "scale(0.8) rotate(15deg)";
    waxSealBtn.style.opacity = "0.7";

    setTimeout(() => {
      waxSealBtn.parentElement.style.display = "none";
      unfoldedLetter.style.display = "block";
      unfoldedLetter.scrollIntoView({ behavior: "smooth", block: "center" });
      playPaperSound();
      showToast("💌 Letter opened!");
    }, 350);
  });
}

// ========================================================
// BIRTHDAY COUNTDOWN / TODAY BANNER
// ========================================================
function initCountdown() {
  const countdownText = document.getElementById("nav-countdown-text");

  function updateCountdown() {
    if (!AppState.birthdate) {
      countdownText.textContent = "Today is a beautiful day to celebrate!";
      return;
    }

    const today = new Date();
    const bday = new Date(AppState.birthdate);
    
    // Set birthday to this year
    let targetDate = new Date(today.getFullYear(), bday.getMonth(), bday.getDate());

    // If already passed this year, point to next year
    if (today > targetDate && today.getDate() !== targetDate.getDate()) {
      targetDate = new Date(today.getFullYear() + 1, bday.getMonth(), bday.getDate());
    }

    const diffTime = targetDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (today.getMonth() === bday.getMonth() && today.getDate() === bday.getDate()) {
      countdownText.innerHTML = `🎉 <strong>TODAY IS HER BIRTHDAY!</strong> 🌻`;
    } else if (diffDays === 1) {
      countdownText.textContent = `⏳ Only 1 day until her birthday!`;
    } else {
      countdownText.textContent = `⏳ ${diffDays} days until her birthday!`;
    }
  }

  updateCountdown();
  setInterval(updateCountdown, 60000);
}

// ========================================================
// QUICK ACCESSIBLE CUSTOMIZE BAR DRAWER LOGIC
// ========================================================
function initCustomizeDrawer() {
  const drawer = document.getElementById("customize-drawer");
  const openBtn = document.getElementById("open-customize-btn");
  const closeBtn = document.getElementById("close-customize-btn");
  const footerCustomizeBtn = document.getElementById("footer-customize-btn");
  const secretUnhideBtn = document.getElementById("secret-unhide-btn");
  const saveCloseBtn = document.getElementById("btn-save-close");

  function openDrawer() {
    drawer.classList.add("is-open");
    drawer.setAttribute("aria-hidden", "false");
    populateFormValues();
  }

  function closeDrawer() {
    drawer.classList.remove("is-open");
    drawer.setAttribute("aria-hidden", "true");
  }

  openBtn.addEventListener("click", openDrawer);
  closeBtn.addEventListener("click", closeDrawer);
  if (footerCustomizeBtn) footerCustomizeBtn.addEventListener("click", openDrawer);
  if (saveCloseBtn) saveCloseBtn.addEventListener("click", () => {
    closeDrawer();
    showToast("💾 Changes saved successfully!");
  });

  // Secret trigger for Presentation Mode
  secretUnhideBtn.addEventListener("click", () => {
    AppState.presentationMode = false;
    saveAppState();
    renderApp();
    openDrawer();
    showToast("🔓 Presentation Mode disabled. Customize Bar restored!");
  });

  // Keyboard shortcut: Shift + E to toggle Customize Bar
  window.addEventListener("keydown", (e) => {
    if (e.shiftKey && (e.key === "E" || e.key === "e")) {
      e.preventDefault();
      if (drawer.classList.contains("is-open")) {
        closeDrawer();
      } else {
        openDrawer();
      }
    } else if (e.key === "Escape" && drawer.classList.contains("is-open")) {
      closeDrawer();
    }
  });

  // Tab Switching
  const tabs = document.querySelectorAll(".drawer-tab");
  const panes = document.querySelectorAll(".tab-pane");

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      panes.forEach(p => p.classList.remove("active"));

      tab.classList.add("active");
      const targetPane = document.getElementById(tab.dataset.tab);
      if (targetPane) targetPane.classList.add("active");
    });
  });

  // Bind Form Inputs for Instant Live Preview & Auto-Save
  bindFormInputs();
  bindThemeInputs();
  bindPolaroidEditor();
  bindReasonEditor();
  bindLetterTemplates();
  bindBackupAndShare();
}

function populateFormValues() {
  document.getElementById("input-name").value = AppState.name || "";
  document.getElementById("input-moniker").value = AppState.moniker || "";
  document.getElementById("input-birthdate").value = AppState.birthdate || "";
  document.getElementById("input-hero-title-pre").value = AppState.heroPre || "";
  document.getElementById("input-subtitle").value = AppState.heroSubtitle || "";
  document.getElementById("input-wish-text").value = AppState.wishText || "";

  document.getElementById("input-letter-salutation").value = AppState.letterSalutation || "";
  document.getElementById("input-letter-body").value = AppState.letterBody || "";
  document.getElementById("input-letter-closing").value = AppState.letterClosing || "";
  document.getElementById("input-letter-sender").value = AppState.letterSender || "";

  document.getElementById("bg-overlay-opacity").value = AppState.bgOpacity || 0.35;
  document.getElementById("toggle-floating-petals").checked = AppState.floatingPetals !== false;

  // Active theme highlight
  document.querySelectorAll(".theme-option-btn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.theme === AppState.theme);
  });

  renderPolaroidEditList();
  renderReasonEditList();
}

function bindFormInputs() {
  const nameInput = document.getElementById("input-name");
  nameInput.addEventListener("input", (e) => {
    AppState.name = e.target.value.trim() || "Aaradhya";
    saveAppState();
    renderApp();
  });

  const monikerInput = document.getElementById("input-moniker");
  monikerInput.addEventListener("input", (e) => {
    AppState.moniker = e.target.value;
    saveAppState();
    renderApp();
  });

  const dateInput = document.getElementById("input-birthdate");
  dateInput.addEventListener("change", (e) => {
    AppState.birthdate = e.target.value;
    saveAppState();
    initCountdown();
  });

  const heroPreInput = document.getElementById("input-hero-title-pre");
  heroPreInput.addEventListener("input", (e) => {
    AppState.heroPre = e.target.value;
    saveAppState();
    renderApp();
  });

  const subtitleInput = document.getElementById("input-subtitle");
  subtitleInput.addEventListener("input", (e) => {
    AppState.heroSubtitle = e.target.value;
    saveAppState();
    renderApp();
  });

  const wishInput = document.getElementById("input-wish-text");
  wishInput.addEventListener("input", (e) => {
    AppState.wishText = e.target.value;
    saveAppState();
    renderApp();
  });

  const salutationInput = document.getElementById("input-letter-salutation");
  salutationInput.addEventListener("input", (e) => {
    AppState.letterSalutation = e.target.value;
    saveAppState();
    renderApp();
  });

  const letterBodyInput = document.getElementById("input-letter-body");
  letterBodyInput.addEventListener("input", (e) => {
    AppState.letterBody = e.target.value;
    saveAppState();
    renderApp();
  });

  const closingInput = document.getElementById("input-letter-closing");
  closingInput.addEventListener("input", (e) => {
    AppState.letterClosing = e.target.value;
    saveAppState();
    renderApp();
  });

  const senderInput = document.getElementById("input-letter-sender");
  senderInput.addEventListener("input", (e) => {
    AppState.letterSender = e.target.value;
    saveAppState();
    renderApp();
  });

  const opacitySlider = document.getElementById("bg-overlay-opacity");
  opacitySlider.addEventListener("input", (e) => {
    AppState.bgOpacity = parseFloat(e.target.value);
    saveAppState();
    renderApp();
  });

  const petalsCheckbox = document.getElementById("toggle-floating-petals");
  petalsCheckbox.addEventListener("change", (e) => {
    AppState.floatingPetals = e.target.checked;
    saveAppState();
  });
}

function bindThemeInputs() {
  const themeBtns = document.querySelectorAll(".theme-option-btn");
  themeBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      themeBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      AppState.theme = btn.dataset.theme;
      AppState.customBg = null;
      saveAppState();
      renderApp();
      showToast("🌻 Background theme updated!");
    });
  });

  const customBgFile = document.getElementById("custom-bg-file");
  customBgFile.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        AppState.customBg = evt.target.result;
        saveAppState();
        renderApp();
        showToast("🖼️ Custom background applied!");
      };
      reader.readAsDataURL(file);
    }
  });
}

function bindLetterTemplates() {
  const chips = document.querySelectorAll(".chip-btn");
  chips.forEach(chip => {
    chip.addEventListener("click", () => {
      const templateKey = chip.dataset.template;
      const t = LETTER_TEMPLATES[templateKey];
      if (t) {
        AppState.letterSalutation = t.salutation;
        AppState.letterBody = t.body;
        AppState.letterClosing = t.closing;
        AppState.letterSender = t.sender;
        saveAppState();
        populateFormValues();
        renderApp();
        showToast("💌 Template loaded!");
      }
    });
  });
}

// Polaroid Card Editor
function bindPolaroidEditor() {
  const addBtn = document.getElementById("btn-add-polaroid");
  addBtn.addEventListener("click", () => {
    const newId = "p_" + Date.now();
    AppState.polaroids.push({
      id: newId,
      image: "photo1.jpg",
      caption: "Sweet Memory 🌻",
      note: "Another wonderful moment worth remembering.",
      date: "Special Day"
    });
    saveAppState();
    renderApp();
    renderPolaroidEditList();
    showToast("📷 Added new polaroid card!");
  });
}

function renderPolaroidEditList() {
  const list = document.getElementById("polaroid-edit-list");
  list.innerHTML = "";

  AppState.polaroids.forEach((item, index) => {
    const itemCard = document.createElement("div");
    itemCard.className = "polaroid-edit-card";

    itemCard.innerHTML = `
      <div class="edit-card-header">
        <span class="card-num-badge">Polaroid #${index + 1}</span>
        ${AppState.polaroids.length > 1 ? `<button class="delete-mini-btn" data-id="${item.id}">Remove</button>` : ''}
      </div>

      <div class="form-group">
        <label>Caption</label>
        <input type="text" class="styled-input input-polaroid-caption" data-id="${item.id}" value="${escapeHTML(item.caption)}">
      </div>

      <div class="form-group">
        <label>Memory Note (Back of Card)</label>
        <input type="text" class="styled-input input-polaroid-note" data-id="${item.id}" value="${escapeHTML(item.note)}">
      </div>

      <div class="form-group">
        <label>Date or Tag</label>
        <input type="text" class="styled-input input-polaroid-date" data-id="${item.id}" value="${escapeHTML(item.date || '')}">
      </div>

      <div class="form-group">
        <label>Change Photo (Upload Image)</label>
        <input type="file" accept="image/*" class="styled-file-input input-polaroid-file" data-id="${item.id}">
      </div>
    `;

    // Bind inputs
    itemCard.querySelector(".input-polaroid-caption").addEventListener("input", (e) => {
      item.caption = e.target.value;
      saveAppState();
      renderPolaroids();
    });

    itemCard.querySelector(".input-polaroid-note").addEventListener("input", (e) => {
      item.note = e.target.value;
      saveAppState();
      renderPolaroids();
    });

    itemCard.querySelector(".input-polaroid-date").addEventListener("input", (e) => {
      item.date = e.target.value;
      saveAppState();
      renderPolaroids();
    });

    const fileInput = itemCard.querySelector(".input-polaroid-file");
    fileInput.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (evt) => {
          item.image = evt.target.result;
          saveAppState();
          renderPolaroids();
          showToast("📷 Photo updated!");
        };
        reader.readAsDataURL(file);
      }
    });

    const deleteBtn = itemCard.querySelector(".delete-mini-btn");
    if (deleteBtn) {
      deleteBtn.addEventListener("click", () => {
        AppState.polaroids = AppState.polaroids.filter(p => p.id !== item.id);
        saveAppState();
        renderApp();
        renderPolaroidEditList();
        showToast("Card removed.");
      });
    }

    list.appendChild(itemCard);
  });
}

// Sunshine Reasons Editor
function bindReasonEditor() {
  const addBtn = document.getElementById("btn-add-reason");
  addBtn.addEventListener("click", () => {
    const newId = "r_" + Date.now();
    AppState.reasons.push({
      id: newId,
      icon: "💛",
      title: "Another Reason You're Great",
      text: "Something uniquely wonderful that makes you appreciate having her around."
    });
    saveAppState();
    renderApp();
    renderReasonEditList();
    showToast("✨ Added new reason!");
  });
}

function renderReasonEditList() {
  const list = document.getElementById("reasons-edit-list");
  list.innerHTML = "";

  AppState.reasons.forEach((reason, index) => {
    const itemCard = document.createElement("div");
    itemCard.className = "reason-edit-card";

    itemCard.innerHTML = `
      <div class="edit-card-header">
        <span class="card-num-badge">Reason #${index + 1}</span>
        ${AppState.reasons.length > 1 ? `<button class="delete-mini-btn" data-id="${reason.id}">Remove</button>` : ''}
      </div>

      <div style="display: flex; gap: 8px; margin-bottom: 8px;">
        <div style="width: 70px;">
          <label style="font-size:0.75rem; font-weight:700;">Icon</label>
          <input type="text" class="styled-input input-reason-icon" data-id="${reason.id}" value="${escapeHTML(reason.icon || '✨')}">
        </div>
        <div style="flex:1;">
          <label style="font-size:0.75rem; font-weight:700;">Title</label>
          <input type="text" class="styled-input input-reason-title" data-id="${reason.id}" value="${escapeHTML(reason.title)}">
        </div>
      </div>

      <div class="form-group" style="margin-bottom:0;">
        <label>Description</label>
        <textarea class="styled-textarea input-reason-text" data-id="${reason.id}" rows="2">${escapeHTML(reason.text)}</textarea>
      </div>
    `;

    itemCard.querySelector(".input-reason-icon").addEventListener("input", (e) => {
      reason.icon = e.target.value;
      saveAppState();
      renderReasons();
    });

    itemCard.querySelector(".input-reason-title").addEventListener("input", (e) => {
      reason.title = e.target.value;
      saveAppState();
      renderReasons();
    });

    itemCard.querySelector(".input-reason-text").addEventListener("input", (e) => {
      reason.text = e.target.value;
      saveAppState();
      renderReasons();
    });

    const deleteBtn = itemCard.querySelector(".delete-mini-btn");
    if (deleteBtn) {
      deleteBtn.addEventListener("click", () => {
        AppState.reasons = AppState.reasons.filter(r => r.id !== reason.id);
        saveAppState();
        renderApp();
        renderReasonEditList();
        showToast("Reason removed.");
      });
    }

    list.appendChild(itemCard);
  });
}

// Backup, Presentation Mode & Reset
function bindBackupAndShare() {
  const enterPresentationBtn = document.getElementById("btn-enter-presentation");
  enterPresentationBtn.addEventListener("click", () => {
    AppState.presentationMode = true;
    saveAppState();
    renderApp();
    document.getElementById("customize-drawer").classList.remove("is-open");
    showToast("✨ Presentation Mode enabled! Toolbar hidden. Press Shift+E anytime to reopen.");
  });

  // Export JSON
  const exportBtn = document.getElementById("btn-export-json");
  exportBtn.addEventListener("click", () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(AppState, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `birthday_website_${AppState.name.toLowerCase() || 'config'}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast("📥 Backup exported successfully!");
  });

  // Import JSON
  const importInput = document.getElementById("import-json-file");
  importInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        try {
          const imported = JSON.parse(evt.target.result);
          AppState = { ...DEFAULT_CONFIG, ...imported };
          saveAppState();
          populateFormValues();
          renderApp();
          showToast("📤 Configuration imported successfully!");
        } catch (err) {
          alert("Invalid JSON file. Please check and try again.");
        }
      };
      reader.readAsText(file);
    }
  });

  // Reset to Defaults
  const resetBtn = document.getElementById("btn-reset-defaults");
  resetBtn.addEventListener("click", () => {
    if (confirm("Reset everything to original pastel yellow defaults? This will erase your custom edits.")) {
      AppState = JSON.parse(JSON.stringify(DEFAULT_CONFIG));
      saveAppState();
      populateFormValues();
      renderApp();
      showToast("🔄 Reset to default template!");
    }
  });
}

// Toast System
function showToast(msg) {
  const container = document.getElementById("toast-container");
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = msg;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transition = "opacity 0.4s ease";
    setTimeout(() => toast.remove(), 400);
  }, 3200);
}

// ========================================================
// AMBIENT FLOATING CANVAS (Petals & Butterflies)
// ========================================================
function initAmbientCanvas() {
  const canvas = document.getElementById("ambient-canvas");
  const ctx = canvas.getContext("2d");

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener("resize", () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  // Particle items (Petals & gentle butterflies)
  const particles = [];
  const COUNT = 32;

  class Particle {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      this.x = Math.random() * width;
      this.y = initial ? Math.random() * height : -30;
      this.size = Math.random() * 9 + 6;
      this.speedY = Math.random() * 0.8 + 0.5;
      this.speedX = Math.random() * 0.6 - 0.3;
      this.angle = Math.random() * Math.PI * 2;
      this.angularSpeed = (Math.random() - 0.5) * 0.02;
      this.type = Math.random() > 0.85 ? "butterfly" : "petal";
      this.color = Math.random() > 0.5 ? "#FDE047" : "#FEF08A";
      this.alpha = Math.random() * 0.5 + 0.35;
      this.flap = 0;
    }

    update() {
      this.y += this.speedY;
      this.x += Math.sin(this.angle) * 0.8 + this.speedX;
      this.angle += this.angularSpeed;
      this.flap += 0.15;

      if (this.y > height + 40 || this.x < -40 || this.x > width + 40) {
        this.reset();
      }
    }

    draw() {
      if (AppState.floatingPetals === false) return;

      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.angle);
      ctx.globalAlpha = this.alpha;

      if (this.type === "petal") {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(this.size / 2, -this.size, this.size, -this.size / 2, 0, this.size * 1.4);
        ctx.bezierCurveTo(-this.size, -this.size / 2, -this.size / 2, -this.size, 0, 0);
        ctx.fill();
      } else {
        // Butterfly
        const flapScale = Math.sin(this.flap);
        ctx.fillStyle = "#FACC15";
        
        // Left wing
        ctx.save();
        ctx.scale(flapScale, 1);
        ctx.beginPath();
        ctx.ellipse(-6, 0, this.size * 0.7, this.size * 0.45, Math.PI / 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Right wing
        ctx.save();
        ctx.scale(flapScale, 1);
        ctx.beginPath();
        ctx.ellipse(6, 0, this.size * 0.7, this.size * 0.45, -Math.PI / 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Body
        ctx.fillStyle = "#78350F";
        ctx.fillRect(-1, -this.size * 0.3, 2, this.size * 0.6);
      }

      ctx.restore();
    }
  }

  for (let i = 0; i < COUNT; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(animate);
  }

  animate();
}

// Confetti Burst Effect on Candle Blow
function burstConfetti() {
  const colors = ["#FDE047", "#FEF08A", "#FACC15", "#D97706", "#FFFBEA", "#FFFFFF"];
  const pieces = 70;
  const originX = window.innerWidth / 2;
  const originY = window.innerHeight * 0.4;

  for (let i = 0; i < pieces; i++) {
    const el = document.createElement("div");
    el.style.position = "fixed";
    el.style.left = `${originX}px`;
    el.style.top = `${originY}px`;
    el.style.width = `${Math.random() * 10 + 6}px`;
    el.style.height = `${Math.random() * 12 + 6}px`;
    el.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    el.style.borderRadius = Math.random() > 0.4 ? "50%" : "2px";
    el.style.zIndex = "99999";
    el.style.pointerEvents = "none";
    el.style.boxShadow = "0 2px 6px rgba(0,0,0,0.1)";

    document.body.appendChild(el);

    const angle = Math.random() * Math.PI * 2;
    const velocity = Math.random() * 450 + 150;
    const destX = Math.cos(angle) * velocity;
    const destY = Math.sin(angle) * velocity + 150;
    const rot = Math.random() * 720;

    el.animate([
      { transform: "translate(0, 0) rotate(0deg)", opacity: 1 },
      { transform: `translate(${destX}px, ${destY}px) rotate(${rot}deg)`, opacity: 0 }
    ], {
      duration: Math.random() * 1000 + 1200,
      easing: "cubic-bezier(0.25, 1, 0.5, 1)"
    }).onfinish = () => el.remove();
  }
}

// ========================================================
// ZERO-DEPENDENCY WEB AUDIO LO-FI BIRTHDAY SYNTHESIZER
// ========================================================
let audioCtx = null;
let isPlayingMusic = false;
let musicInterval = null;
let masterGain = null;

// Happy Birthday Notes (C Major transposed warmly)
// C4, C4, D4, C4, F4, E4
// C4, C4, D4, C4, G4, F4
// C4, C4, C5, A4, F4, E4, D4
// Bb4, Bb4, A4, F4, G4, F4
const NOTES = {
  C4: 261.63,
  D4: 293.66,
  E4: 329.63,
  F4: 349.23,
  G4: 392.00,
  A4: 440.00,
  Bb4: 466.16,
  C5: 523.25
};

const MELODY = [
  { note: "C4", dur: 0.35, pause: 0.1 },
  { note: "C4", dur: 0.25, pause: 0.05 },
  { note: "D4", dur: 0.6, pause: 0.1 },
  { note: "C4", dur: 0.6, pause: 0.1 },
  { note: "F4", dur: 0.6, pause: 0.1 },
  { note: "E4", dur: 1.1, pause: 0.3 },

  { note: "C4", dur: 0.35, pause: 0.1 },
  { note: "C4", dur: 0.25, pause: 0.05 },
  { note: "D4", dur: 0.6, pause: 0.1 },
  { note: "C4", dur: 0.6, pause: 0.1 },
  { note: "G4", dur: 0.6, pause: 0.1 },
  { note: "F4", dur: 1.1, pause: 0.3 },

  { note: "C4", dur: 0.35, pause: 0.1 },
  { note: "C4", dur: 0.25, pause: 0.05 },
  { note: "C5", dur: 0.6, pause: 0.1 },
  { note: "A4", dur: 0.6, pause: 0.1 },
  { note: "F4", dur: 0.6, pause: 0.1 },
  { note: "E4", dur: 0.6, pause: 0.1 },
  { note: "D4", dur: 1.0, pause: 0.3 },

  { note: "Bb4", dur: 0.35, pause: 0.1 },
  { note: "Bb4", dur: 0.25, pause: 0.05 },
  { note: "A4", dur: 0.6, pause: 0.1 },
  { note: "F4", dur: 0.6, pause: 0.1 },
  { note: "G4", dur: 0.6, pause: 0.1 },
  { note: "F4", dur: 1.4, pause: 1.2 } // gentle loop delay
];

function initAudioSynthesizer() {
  const topNavBtn = document.getElementById("music-toggle-btn");
  const cassettePlayBtn = document.getElementById("btn-mixtape-play");
  const volumeSlider = document.getElementById("audio-volume");
  const spoolLeft = document.getElementById("spool-left");
  const spoolRight = document.getElementById("spool-right");

  function getAudioContext() {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      masterGain = audioCtx.createGain();
      masterGain.gain.value = parseFloat(volumeSlider.value);
      masterGain.connect(audioCtx.destination);
    }
    if (audioCtx.state === "suspended") {
      audioCtx.resume();
    }
    return audioCtx;
  }

  function playLoFiNote(freq, duration) {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const noteGain = ctx.createGain();

    // Gentle warm sine/triangle blend for lo-fi chime sound
    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, ctx.currentTime);

    // Warm envelope
    const now = ctx.currentTime;
    noteGain.gain.setValueAtTime(0, now);
    noteGain.gain.linearRampToValueAtTime(0.18, now + 0.04);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc.connect(noteGain);
    noteGain.connect(masterGain);

    osc.start(now);
    osc.stop(now + duration + 0.05);
  }

  let noteIndex = 0;
  function scheduleNextNote() {
    if (!isPlayingMusic) return;

    const item = MELODY[noteIndex];
    if (item && NOTES[item.note]) {
      playLoFiNote(NOTES[item.note], item.dur);
      noteIndex = (noteIndex + 1) % MELODY.length;
      musicInterval = setTimeout(scheduleNextNote, (item.dur + item.pause) * 1000);
    }
  }

  function toggleMusic() {
    getAudioContext();
    isPlayingMusic = !isPlayingMusic;

    if (isPlayingMusic) {
      document.getElementById("music-icon").textContent = "⏸";
      document.getElementById("music-label").textContent = "Pause Music";
      document.getElementById("mixtape-play-icon").textContent = "⏸ Pause";
      spoolLeft.classList.add("spinning");
      spoolRight.classList.add("spinning");
      scheduleNextNote();
      showToast("🎵 Playing Sweet Pastel Birthday Lo-Fi");
    } else {
      clearTimeout(musicInterval);
      document.getElementById("music-icon").textContent = "🎵";
      document.getElementById("music-label").textContent = "Play Music";
      document.getElementById("mixtape-play-icon").textContent = "▶ Play";
      spoolLeft.classList.remove("spinning");
      spoolRight.classList.remove("spinning");
    }
  }

  topNavBtn.addEventListener("click", toggleMusic);
  cassettePlayBtn.addEventListener("click", toggleMusic);

  volumeSlider.addEventListener("input", (e) => {
    if (masterGain) {
      masterGain.gain.value = parseFloat(e.target.value);
    }
  });
}

function playCelebrationChime() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const chord = [523.25, 659.25, 783.99, 1046.50]; // C Major arpeggio
    chord.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      const startTime = ctx.currentTime + idx * 0.08;
      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(0.2, startTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 1.2);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(startTime);
      osc.stop(startTime + 1.25);
    });
  } catch (e) {
    console.log(e);
  }
}

function playPaperSound() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(140, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.2);
    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.2);
  } catch (e) {
    console.log(e);
  }
}
