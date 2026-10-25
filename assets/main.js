/*=============== DEMO DATA ===============*/
const demoUsers = [
  { id: 4, name: "Alex Morgan" },
  { id: 5, name: "Jordan Lee" },
  { id: 6, name: "Taylor Reed" }
];

/*=============== INITIALIZATION ===============*/
document.addEventListener("DOMContentLoaded", () => {
  initReveal();
  initHeaderScroll();
  initMobileMenu();
  initDemo();
});

/*=============== REVEAL ON SCROLL ===============*/
function initReveal() {
  const revealItems = document.querySelectorAll("[data-reveal]");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  const siblingCounts = new Map();
  revealItems.forEach((item) => {
    const parent = item.parentElement;
    const index = siblingCounts.get(parent) || 0;
    item.style.transitionDelay = `${Math.min(index * 80, 320)}ms`;
    siblingCounts.set(parent, index + 1);
  });

  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        currentObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: "0px 0px -40px 0px"
  });

  revealItems.forEach((item) => observer.observe(item));
}

/*=============== HEADER SCROLL ===============*/
function initHeaderScroll() {
  const header = document.querySelector(".site-header");
  if (!header) return;

  const updateHeader = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  };

  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });
}

/*=============== MOBILE NAVIGATION ===============*/
function initMobileMenu() {
  const toggle = document.querySelector(".menu-toggle");
  const navigation = document.querySelector(".site-nav");
  if (!toggle || !navigation) return;

  const setMenuOpen = (isOpen) => {
    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
    navigation.classList.toggle("is-open", isOpen);
  };

  toggle.addEventListener("click", () => {
    setMenuOpen(toggle.getAttribute("aria-expanded") !== "true");
  });

  navigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setMenuOpen(false));
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
      setMenuOpen(false);
      toggle.focus();
    }
  });

  document.addEventListener("click", (event) => {
    if (toggle.getAttribute("aria-expanded") !== "true") return;
    if (!navigation.contains(event.target) && !toggle.contains(event.target)) {
      setMenuOpen(false);
    }
  });

  window.matchMedia("(min-width: 640px)").addEventListener("change", (event) => {
    if (event.matches) setMenuOpen(false);
  });
}

/*=============== INTERACTIVE DEMO ===============*/
function initDemo() {
  const scenarioSelect = document.querySelector("#demo-scenario");
  const runButton = document.querySelector("#run-demo");
  const output = document.querySelector("#demo-output");
  const status = document.querySelector("#demo-status");

  if (!scenarioSelect || !runButton || !output || !status) return;

  const setStatus = (state, label) => {
    status.className = `status-badge status-${state}`;
    status.innerHTML = `<span aria-hidden="true"></span>${label}`;
  };

  runButton.addEventListener("click", () => {
    try {
      const scenario = scenarioSelect.value;
      const users = scenario === "one"
        ? demoUsers.slice(0, 1)
        : scenario === "empty"
          ? []
          : [...demoUsers];

      if (users.length === 0) {
        throw new Error("No users found. Choose a dataset with at least one record.");
      }

      const transformedUsers = users.map((user) => ({
        ...user,
        message: `Hello, ${user.name}! We're glad to have you with us.`
      }));

      const log = [
        `$ extract  ${users.length} sample user${users.length === 1 ? "" : "s"} ready`,
        "$ transform  personalized messages added",
        "$ load  JSON output prepared",
        "",
        JSON.stringify(transformedUsers, null, 2)
      ].join("\n");

      output.textContent = log;
      setStatus("ok", "ok");
    } catch (error) {
      const message = error instanceof Error ? error.message : "The demo could not process this dataset.";
      output.textContent = `$ pipeline error\n${message}`;
      setStatus("error", "error");
    }
  });
}
