document.addEventListener("DOMContentLoaded", () => {
  // Mobile navigation
  const nav = document.querySelector(".nav");
  const navLinks = document.querySelector(".nav-links");

  if (nav && navLinks) {
    const menuButton = document.createElement("button");

    menuButton.className = "menu-toggle";
    menuButton.setAttribute("aria-label", "Open navigation");
    menuButton.innerHTML = "☰";

    nav.insertBefore(menuButton, navLinks);

    menuButton.addEventListener("click", () => {
      navLinks.classList.toggle("open");
      menuButton.innerHTML = navLinks.classList.contains("open") ? "✕" : "☰";
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuButton.innerHTML = "☰";
      });
    });
  }

  // Smooth scrolling
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");
      const target = document.querySelector(targetId);

      if (target) {
        event.preventDefault();

        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    });
  });

  // Reveal elements when they enter the screen
  const revealElements = document.querySelectorAll(
    ".card, .section-title, .hero-content"
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12
    }
  );

  revealElements.forEach((element) => {
    element.classList.add("reveal");
    observer.observe(element);
  });

  // Current year
  const year = document.querySelector("#year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  // Prevent empty links from jumping to the top
  document.querySelectorAll('a[href="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
    });
  });

  console.log("HAERVIU ENGINE initialized.");
});
