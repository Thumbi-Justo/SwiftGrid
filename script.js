// SwiftGrid careers page interactions
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation menu");
    });
  });

  document.addEventListener("click", (event) => {
    if (!navLinks.contains(event.target) && !menuToggle.contains(event.target)) {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    }
  });
}

// Keep the copyright year current.
const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

// Reveal content as sections enter the viewport. Content remains visible if
// IntersectionObserver is unavailable or reduced motion is requested.
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if ("IntersectionObserver" in window && !reduceMotion) {
  const revealTargets = document.querySelectorAll(
    ".principle-card, .role-card, .qualification-item, .tech-panel, .benefits-list article, .apply-panel"
  );
  revealTargets.forEach((element) => element.classList.add("reveal"));

  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealTargets.forEach((element, index) => {
    element.style.transitionDelay = `${(index % 3) * 70}ms`;
    observer.observe(element);
  });
}

// The application link uses a placeholder email until the company supplies
// its real recruitment contact. Update the mailto address in index.html.
