// Mobile nav toggle
const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");
const navLinks = document.querySelectorAll(".nav__link");

navToggle.addEventListener("click", () => {
  navMenu.classList.toggle("open");
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("open");
  });
});

// Active link on scroll
const sections = document.querySelectorAll("section[id]");
const observerOptions = {
  root: null,
  threshold: 0.35,
};

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    const id = entry.target.getAttribute("id");
    const navLink = document.querySelector(`.nav__link[href="#${id}"]`);

    if (entry.isIntersecting && navLink) {
      document.querySelectorAll(".nav__link").forEach((l) => l.classList.remove("active"));
      navLink.classList.add("active");
    }
  });
}, observerOptions);

sections.forEach((section) => sectionObserver.observe(section));

// Reveal animation
const revealEls = document.querySelectorAll(
  ".section, .project-card, .skills-block, .about-card, .timeline__item, .edu-card, .cert-card, .contact-form"
);

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("reveal--visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.18 }
);

revealEls.forEach((el) => {
  el.classList.add("reveal");
  revealObserver.observe(el);
});

// Simple project filter
const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const filter = btn.getAttribute("data-filter");

    filterButtons.forEach((b) => b.classList.remove("filter-btn--active"));
    btn.classList.add("filter-btn--active");

    projectCards.forEach((card) => {
      const categories = card.getAttribute("data-category") || "";
      if (filter === "all" || categories.includes(filter)) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });
});

// Theme toggle (dark / light)
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.querySelector(".theme-toggle__icon");

const THEME_KEY = "amogh-theme";

function applyTheme(theme) {
  if (theme === "light") {
    document.body.classList.add("light");
    themeIcon.textContent = "☀";
  } else {
    document.body.classList.remove("light");
    themeIcon.textContent = "☾";
  }
}

const storedTheme = localStorage.getItem(THEME_KEY) || "dark";
applyTheme(storedTheme);

themeToggle.addEventListener("click", () => {
  const current = document.body.classList.contains("light") ? "light" : "dark";
  const next = current === "light" ? "dark" : "light";
  applyTheme(next);
  localStorage.setItem(THEME_KEY, next);
});

// Set footer year
document.getElementById("year").textContent = new Date().getFullYear();
