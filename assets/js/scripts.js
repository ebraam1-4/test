const themeToggleBtn = document.getElementById("theme-toggle");
const mobileToggleBtn = document.getElementById("mobile-toggle");
const navLinks = document.getElementById("nav-links");
const themeIcon = document.getElementById("theme-icon");
const navbar = document.getElementById("navbar");

// Theme Management
const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
const savedTheme = localStorage.getItem("theme") || systemTheme;
document.documentElement.setAttribute("data-theme", savedTheme);
updateThemeIcon(savedTheme);

themeToggleBtn.addEventListener("click", () => {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";

  document.documentElement.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
  updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
  if (theme === "dark") {
    // Sun Icon
    themeIcon.innerHTML =
      '<path d="M12 2.25a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1 .75-.75ZM7.5 12a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM18.894 6.166a.75.75 0 0 0-1.06-1.06l-1.591 1.59a.75.75 0 1 0 1.06 1.061l1.591-1.59ZM21.75 12a.75.75 0 0 1-.75.75h-2.25a.75.75 0 0 1 0-1.5H21a.75.75 0 0 1 .75.75ZM17.834 18.894a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 1 0-1.061 1.06l1.59 1.591ZM12 18.75a.75.75 0 0 1 .75.75V21a.75.75 0 0 1-1.5 0v-1.5a.75.75 0 0 1 .75-.75ZM6.166 18.894a.75.75 0 0 1-1.06-1.06l1.59-1.591a.75.75 0 1 1 1.061 1.06l-1.59 1.591ZM2.25 12a.75.75 0 0 1 .75-.75H5.25a.75.75 0 0 1 0 1.5H3a.75.75 0 0 1-.75-.75ZM6.166 6.166a.75.75 0 0 1 1.06-1.06l1.59 1.591a.75.75 0 1 1-1.061 1.06l-1.59-1.591Z" />';
  } else {
    // Moon Icon
    themeIcon.innerHTML = '<path fill-rule="evenodd" clip-rule="evenodd" d="M9.528 1.718a.75.75 0 0 1 .162.819A8.97 8.97 0 0 0 9 6a9 9 0 0 0 9 9 8.97 8.97 0 0 0 3.463-.69.75.75 0 0 1 .981.98 10.503 10.503 0 0 1-9.694 6.46c-5.799 0-10.5-4.7-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 0 1 .818.162Z" />';
  }
}

// Mobile Navigation Toggle
mobileToggleBtn.addEventListener("click", () => {
  const isActive = navLinks.classList.toggle("active");
  document.body.style.overflow = isActive ? "hidden" : "";

  // Toggle icon between hamburger and close (X)
  if (isActive) {
    mobileToggleBtn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>`;
  } else {
    mobileToggleBtn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
      </svg>`;
  }
});

// Close mobile menu when a navigation link is clicked
navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
    document.body.style.overflow = "";
    mobileToggleBtn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
      </svg>`;
  });
});

// Update Year in Footer
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Active section navigation
const sections = document.querySelectorAll(".portfolio-section");
const sectionLinks = navLinks.querySelectorAll("a");

if (sections.length) {
  const updateActiveSection = () => {
    const activeSection = [...sections]
      .filter((section) => section.getBoundingClientRect().top <= navbar.offsetHeight + 120)
      .pop() || sections[0];

    sectionLinks.forEach((link) => {
      link.classList.toggle("active", link.hash === `#${activeSection.id}`);
    });
  };

  window.addEventListener("scroll", updateActiveSection, { passive: true });
  window.addEventListener("hashchange", updateActiveSection);
  updateActiveSection();
}

// Carousel Logic (About Page)
const slideEls = document.querySelectorAll(".carousel-slide");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

if (slideEls.length && prevBtn && nextBtn) {
  let index = 0;
  slideEls[index].classList.add("active");

  function goTo(i) {
    slideEls[index].classList.remove("active");
    index = (i + slideEls.length) % slideEls.length;
    slideEls[index].classList.add("active");
  }

  prevBtn.addEventListener("click", () => goTo(index - 1));
  nextBtn.addEventListener("click", () => goTo(index + 1));
}

// Contact Form Logic
// There is no backend, so the form opens the visitor's email app with the
// message pre-filled. To send directly from the page instead, connect a
// service such as Formspree or EmailJS.
const CONTACT_EMAIL = "abramamed772@gmail.com";
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

if (contactForm) {
  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    if (!contactForm.checkValidity()) {
      contactForm.reportValidity();
      return;
    }

    const name = contactForm.elements["name"].value.trim();
    const email = contactForm.elements["email"].value.trim();
    const message = contactForm.elements["message"].value.trim();

    const subject = encodeURIComponent(`Portfolio message from ${name}`);
    const body = encodeURIComponent(`${message}\n\n- ${name} (${email})`);

    formStatus.textContent = "Opening your email app...";
    formStatus.className = "form-status success";
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    contactForm.reset();
  });
}


/* ===== Improvements ===== */
(function () {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Reveal sections as they scroll into view
  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !reduce) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add("in");
            io.unobserve(en.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -6% 0px" },
    );
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("in"));
  }

  // Mobile menu: aria-expanded + Escape to close
  const syncExpanded = () =>
    mobileToggleBtn.setAttribute(
      "aria-expanded",
      String(navLinks.classList.contains("active")),
    );
  mobileToggleBtn.addEventListener("click", syncExpanded);
  navLinks.querySelectorAll("a").forEach((a) => a.addEventListener("click", syncExpanded));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && navLinks.classList.contains("active")) {
      mobileToggleBtn.click();
      mobileToggleBtn.focus();
    }
  });
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768 && navLinks.classList.contains("active")) {
      navLinks.classList.remove("active");
      document.body.style.overflow = "";
      syncExpanded();
    }
  });

  // aria-current on the active nav link
  const markCurrent = () =>
    navLinks.querySelectorAll("a").forEach((a) => {
      if (a.classList.contains("active")) a.setAttribute("aria-current", "true");
      else a.removeAttribute("aria-current");
    });
  const mo = new MutationObserver(markCurrent);
  navLinks.querySelectorAll("a").forEach((a) =>
    mo.observe(a, { attributes: true, attributeFilter: ["class"] }),
  );
  markCurrent();

  // Keep the browser UI color in sync with the theme
  const themeMeta = document.querySelector('meta[name="theme-color"]');
  const syncThemeColor = () => {
    if (!themeMeta) return;
    themeMeta.setAttribute(
      "content",
      document.documentElement.getAttribute("data-theme") === "dark" ? "#070910" : "#f8f6f0",
    );
  };
  new MutationObserver(syncThemeColor).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  syncThemeColor();

  // Project filters
  const filterBtns = document.querySelectorAll(".filter-btn");
  const cards = document.querySelectorAll(".project-card[data-category]");
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const f = btn.dataset.filter;
      filterBtns.forEach((b) => {
        const on = b === btn;
        b.classList.toggle("active", on);
        b.setAttribute("aria-pressed", String(on));
      });
      cards.forEach((c) =>
        c.classList.toggle("is-hidden", f !== "all" && c.dataset.category !== f),
      );
    });
  });

  // Load the PDF preview only when the resume section is near the viewport
  const frame = document.querySelector(".resume-frame[data-src]");
  if (frame && window.innerWidth > 768) {
    const load = () => {
      frame.src = frame.dataset.src;
      frame.removeAttribute("data-src");
    };
    if ("IntersectionObserver" in window) {
      const fo = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) {
            load();
            fo.disconnect();
          }
        },
        { rootMargin: "400px 0px" },
      );
      fo.observe(frame);
    } else {
      load();
    }
  }

  // Scroll progress + back to top
  const bar = document.getElementById("scroll-progress");
  const toTop = document.getElementById("to-top");
  let ticking = false;
  const onScroll = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    if (bar) bar.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
    if (toTop) toTop.classList.toggle("show", window.scrollY > 700);
    ticking = false;
  };
  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(onScroll);
      }
    },
    { passive: true },
  );
  onScroll();
})();


/* ===== Smooth scrolling (Lenis) + scroll effects ===== */
(function () {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const nav = document.getElementById("navbar");
  const heroWrap = document.querySelector(".hero-image-wrapper");

  // Stagger index for items inside each group
  document.querySelectorAll(".reveal").forEach((sec) => {
    const groups = new Map();
    sec.querySelectorAll(".reveal-item").forEach((el) => {
      const key = el.parentElement;
      const n = groups.get(key) || 0;
      el.style.setProperty("--i", n);
      groups.set(key, n + 1);
    });
  });

  let lenis = null;
  if (typeof Lenis !== "undefined" && !reduce) {
    lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    window.lenis = lenis;
    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    // Smooth anchor navigation
    document.querySelectorAll('a[href^="#"]').forEach((a) => {
      a.addEventListener("click", (e) => {
        const id = a.getAttribute("href");
        if (id.length < 2) return;
        const target = document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        lenis.scrollTo(target, {
          // Lenis already honors the sections' scroll-margin-top
          offset: 0,
          duration: 1.4,
        });
        history.pushState(null, "", id);
        window.dispatchEvent(new Event("hashchange"));
      });
    });

    // Pause smooth scrolling while the mobile menu is open
    new MutationObserver(() => {
      if (navLinks.classList.contains("active")) lenis.stop();
      else lenis.start();
    }).observe(navLinks, { attributes: true, attributeFilter: ["class"] });
  }

  // Navbar state + hero parallax
  let ticking = false;
  const onScroll = () => {
    const y = window.scrollY;
    if (nav) nav.classList.toggle("scrolled", y > 20);
    if (heroWrap && !reduce && y < window.innerHeight * 1.2) {
      heroWrap.style.setProperty("--py", (y * -0.08).toFixed(1));
    }
    ticking = false;
  };
  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(onScroll);
      }
    },
    { passive: true },
  );
  onScroll();
})();
