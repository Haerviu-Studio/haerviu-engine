document.addEventListener("DOMContentLoaded", () => {

  /* =====================================================
     HAERVIU ENGINE — UNIVERSAL NAVIGATION
  ===================================================== */

  const menu = document.querySelector(".menu");

  if (menu) {

    // Transform existing menu element into accessible button
    menu.setAttribute("role", "button");
    menu.setAttribute("tabindex", "0");
    menu.setAttribute("aria-label", "Open navigation");

    // Create overlay
    const overlay = document.createElement("div");
    overlay.className = "engine-menu-overlay";

    overlay.innerHTML = `
      <nav class="engine-menu-panel">

        <a href="index.html" class="engine-menu-link">Home</a>

        <a href="studio.html" class="engine-menu-link">Studio</a>

        <a href="methods.html" class="engine-menu-link">Methods</a>

        <a href="setup.html" class="engine-menu-link">Setup</a>

        <a href="support.html" class="engine-menu-link">Support</a>

        <a href="privacy.html" class="engine-menu-link">Privacy Policy</a>

      </nav>
    `;

    document.body.appendChild(overlay);

    // Open / Close menu
    const toggleMenu = () => {

      const isOpen = overlay.classList.contains("active");

      overlay.classList.toggle("active");

      menu.innerHTML = isOpen ? "☰" : "✕";

      menu.setAttribute(
        "aria-label",
        isOpen ? "Open navigation" : "Close navigation"
      );

      document.body.classList.toggle("menu-open");

    };

    menu.addEventListener("click", toggleMenu);

    menu.addEventListener("keydown", (event) => {

      if (
        event.key === "Enter" ||
        event.key === " "
      ) {

        event.preventDefault();

        toggleMenu();

      }

    });

    // Close when clicking outside panel
    overlay.addEventListener("click", (event) => {

      if (event.target === overlay) {

        overlay.classList.remove("active");

        menu.innerHTML = "☰";

        menu.setAttribute(
          "aria-label",
          "Open navigation"
        );

        document.body.classList.remove("menu-open");

      }

    });

    // Close when clicking a link
    overlay
      .querySelectorAll(".engine-menu-link")
      .forEach((link) => {

        link.addEventListener("click", () => {

          overlay.classList.remove("active");

          menu.innerHTML = "☰";

          document.body.classList.remove("menu-open");

        });

      });

    // Close with Escape key
    document.addEventListener("keydown", (event) => {

      if (event.key === "Escape") {

        overlay.classList.remove("active");

        menu.innerHTML = "☰";

        menu.setAttribute(
          "aria-label",
          "Open navigation"
        );

        document.body.classList.remove("menu-open");

      }

    });

  }


  /* =====================================================
     SMOOTH SCROLLING
  ===================================================== */

  document
    .querySelectorAll('a[href^="#"]')
    .forEach((link) => {

      link.addEventListener("click", (event) => {

        const targetId = link.getAttribute("href");

        if (targetId === "#") {

          event.preventDefault();

          return;

        }

        const target =
          document.querySelector(targetId);

        if (target) {

          event.preventDefault();

          target.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });

        }

      });

    });


  /* =====================================================
     REVEAL ANIMATION
  ===================================================== */

  const revealElements =
    document.querySelectorAll(
      ".card, .section-title, .hero-content, .instrument, .setup"
    );

  if (
    "IntersectionObserver" in window &&
    revealElements.length > 0
  ) {

    const observer =
      new IntersectionObserver(

        (entries) => {

          entries.forEach((entry) => {

            if (entry.isIntersecting) {

              entry.target.classList.add(
                "visible"
              );

              observer.unobserve(
                entry.target
              );

            }

          });

        },

        {
          threshold: 0.08
        }

      );

    revealElements.forEach((element) => {

      element.classList.add("reveal");

      observer.observe(element);

    });

  }


  /* =====================================================
     CURRENT YEAR
  ===================================================== */

  const year =
    document.querySelector("#year");

  if (year) {

    year.textContent =
      new Date().getFullYear();

  }


  console.log(
    "HAERVIU ENGINE — Universal navigation initialized."
  );

});
