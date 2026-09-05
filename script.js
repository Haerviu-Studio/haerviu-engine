document.addEventListener("DOMContentLoaded", () => {

  /* =========================================
     HAERVIU ENGINE — UNIVERSAL MENU SYSTEM
  ========================================= */

  const menuButton =
    document.querySelector(".menu-toggle") ||
    document.querySelector(".hamburger") ||
    document.querySelector(".nav-toggle");

  const navLinks =
    document.querySelector(".nav-links") ||
    document.querySelector(".menu-links") ||
    document.querySelector(".mobile-menu");

  if (menuButton && navLinks) {

    menuButton.setAttribute("aria-expanded", "false");

    menuButton.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();

      const isOpen = navLinks.classList.toggle("open");

      menuButton.classList.toggle("active", isOpen);
      menuButton.setAttribute(
        "aria-expanded",
        isOpen ? "true" : "false"
      );

      if (isOpen) {
        menuButton.innerHTML = "✕";
      } else {
        menuButton.innerHTML = "☰";
      }
    });


    /* Close menu when clicking a link */

    navLinks.querySelectorAll("a").forEach((link) => {

      link.addEventListener("click", () => {

        navLinks.classList.remove("open");

        menuButton.classList.remove("active");

        menuButton.setAttribute(
          "aria-expanded",
          "false"
        );

        menuButton.innerHTML = "☰";

      });

    });


    /* Close menu when clicking outside */

    document.addEventListener("click", (event) => {

      if (
        !navLinks.contains(event.target) &&
        !menuButton.contains(event.target)
      ) {

        navLinks.classList.remove("open");

        menuButton.classList.remove("active");

        menuButton.setAttribute(
          "aria-expanded",
          "false"
        );

        menuButton.innerHTML = "☰";

      }

    });


    /* Close menu with Escape */

    document.addEventListener("keydown", (event) => {

      if (event.key === "Escape") {

        navLinks.classList.remove("open");

        menuButton.classList.remove("active");

        menuButton.setAttribute(
          "aria-expanded",
          "false"
        );

        menuButton.innerHTML = "☰";

      }

    });

  }


  /* =========================================
     SMOOTH SCROLL
  ========================================= */

  document
    .querySelectorAll('a[href^="#"]:not([href="#"])')
    .forEach((link) => {

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


  /* =========================================
     PREVENT EMPTY LINKS
  ========================================= */

  document
    .querySelectorAll('a[href="#"]')
    .forEach((link) => {

      link.addEventListener("click", (event) => {
        event.preventDefault();
      });

    });


  /* =========================================
     REVEAL ANIMATIONS
  ========================================= */

  const revealElements = document.querySelectorAll(
    ".card, .section-title, .hero-content, .setup-card, .method-card"
  );

  if ("IntersectionObserver" in window) {

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

  } else {

    revealElements.forEach((element) => {
      element.classList.add("visible");
    });

  }


  /* =========================================
     CURRENT YEAR
  ========================================= */

  const year = document.querySelector("#year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }


  console.log("HAERVIU ENGINE initialized.");

});
