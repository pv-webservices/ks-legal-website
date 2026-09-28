const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
const $$ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) =>
  [...root.querySelectorAll<T>(sel)] as T[];

/* ---------- Mobile drawer ---------- */
function initDrawer() {
  const toggle = document.querySelector<HTMLButtonElement>(".menu-toggle");
  const drawer = document.querySelector<HTMLElement>("#mobile-nav");
  if (!toggle || !drawer) return;
  const setOpen = (open: boolean) => {
    toggle.setAttribute("aria-expanded", String(open));
    document.documentElement.classList.toggle("drawer-open", open);
    if (open) {
      drawer.hidden = false;
      requestAnimationFrame(() => drawer.classList.add("is-open"));
      drawer.querySelector<HTMLElement>(".drawer-close")?.focus();
    } else {
      drawer.classList.remove("is-open");
      window.setTimeout(() => (drawer.hidden = true), 350);
      toggle.focus();
    }
  };
  toggle.addEventListener("click", () => setOpen(true));
  $$("[data-close-drawer]", drawer).forEach((el) =>
    el.addEventListener("click", () => setOpen(false)),
  );
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") setOpen(false);
  });
}

/* ---------- Header state, back-to-top, scroll-driven effects ---------- */
function initScroll() {
  const header = document.querySelector(".site-header");
  const toTop = document.querySelector<HTMLButtonElement>(".to-top");
  const ring = toTop?.querySelector<SVGCircleElement>("circle");
  const parallax = reduceMotion ? [] : $$("[data-parallax]");
  const zooms = reduceMotion ? [] : $$("[data-scroll-zoom]");
  const progressTracks = $$("[data-progress]");
  const circumference = 2 * Math.PI * 22;
  if (ring) ring.style.strokeDasharray = String(circumference);

  let ticking = false;
  const update = () => {
    ticking = false;
    const y = window.scrollY;
    const vh = window.innerHeight;
    header?.classList.toggle("scrolled", y > 40);
    if (toTop && ring) {
      const max = document.documentElement.scrollHeight - vh;
      toTop.hidden = y < vh * 0.8;
      ring.style.strokeDashoffset = String(circumference * (1 - Math.min(1, y / Math.max(1, max))));
    }
    parallax.forEach((el) => {
      const rect = el.parentElement!.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > vh) return;
      const speed = Number(el.dataset.parallax) || 0.15;
      const offset = (rect.top + rect.height / 2 - vh / 2) * speed;
      el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
    });
    zooms.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > vh) return;
      const p = Math.min(1, Math.max(0, (vh - rect.top) / (vh + rect.height)));
      el.style.setProperty("--zoom", (1.18 - p * 0.18).toFixed(3));
    });
    progressTracks.forEach((track) => {
      const rect = track.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, (vh * 0.55 - rect.top) / rect.height));
      track.style.setProperty("--progress", p.toFixed(3));
    });
  };
  const onScroll = () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  toTop?.addEventListener("click", () =>
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" }),
  );
  update();
}

/* ---------- Reveal on scroll + counters + process steps ---------- */
function animateCount(el: HTMLElement) {
  const target = Number(el.dataset.count);
  if (reduceMotion || !target) return;
  const duration = 1600;
  const start = performance.now();
  const step = (now: number) => {
    const p = Math.min(1, (now - start) / duration);
    el.textContent = String(Math.round(target * (1 - Math.pow(1 - p, 3))));
    if (p < 1) requestAnimationFrame(step);
  };
  el.textContent = "0";
  requestAnimationFrame(step);
}

function initObservers() {
  if (!("IntersectionObserver" in window)) return;
  if (!reduceMotion) {
    const reveal = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("revealed");
          reveal.unobserve(entry.target);
        }),
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    $$("[data-reveal]").forEach((el) => {
      el.classList.add("will-reveal");
      reveal.observe(el);
    });
  }
  const counters = new IntersectionObserver(
    (entries) =>
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        animateCount(entry.target as HTMLElement);
        counters.unobserve(entry.target);
      }),
    { threshold: 0.6 },
  );
  $$("[data-count]").forEach((el) => counters.observe(el));

  const steps = new IntersectionObserver(
    (entries) =>
      entries.forEach((entry) =>
        entry.target.classList.toggle("is-active", entry.isIntersecting),
      ),
    { rootMargin: "-40% 0px -40% 0px" },
  );
  $$(".process-step").forEach((el) => steps.observe(el));
}

/* ---------- Header dropdowns (hover via CSS; click/keyboard/touch here) ---------- */
function initDropdowns() {
  const dropdowns = $$(".nav-dropdown");
  const closeAll = (except?: HTMLElement) =>
    dropdowns.forEach((dd) => {
      if (dd === except) return;
      dd.classList.remove("is-open");
      dd.querySelector(".dropdown-toggle")?.setAttribute("aria-expanded", "false");
    });
  dropdowns.forEach((dd) => {
    const toggle = dd.querySelector<HTMLButtonElement>(".dropdown-toggle");
    toggle?.addEventListener("click", (e) => {
      e.stopPropagation();
      const open = !dd.classList.contains("is-open");
      closeAll(dd);
      dd.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", String(open));
    });
  });
  document.addEventListener("click", (e) => {
    if (!(e.target as Element).closest(".nav-dropdown")) closeAll();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeAll();
  });
}

/* ---------- Tabs (home: expertise / services) ---------- */
function initTabs() {
  $$("[data-tabs]").forEach((root) => {
    const tabs = $$<HTMLButtonElement>("[role=tab]", root);
    const panels = $$("[role=tabpanel]", root);
    const select = (index: number) => {
      tabs.forEach((tab, i) => {
        const on = i === index;
        tab.setAttribute("aria-selected", String(on));
        tab.tabIndex = on ? 0 : -1;
        panels[i].hidden = !on;
      });
    };
    tabs.forEach((tab, i) => {
      tab.addEventListener("click", () => select(i));
      tab.addEventListener("keydown", (e) => {
        if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
        const next = (i + (e.key === "ArrowRight" ? 1 : -1) + tabs.length) % tabs.length;
        select(next);
        tabs[next].focus();
      });
    });
    root.classList.add("tabs-ready");
    select(0);
  });
}

/* ---------- Horizontal carousels ---------- */
function initCarousels() {
  $$("[data-carousel]").forEach((wrap) => {
    const track = wrap.querySelector<HTMLElement>(".carousel-track");
    if (!track) return;
    const scrollByCard = (dir: number) => {
      const card = track.firstElementChild as HTMLElement | null;
      const gap = parseFloat(getComputedStyle(track).columnGap) || 24;
      track.scrollBy({
        left: dir * ((card?.offsetWidth ?? 300) + gap),
        behavior: reduceMotion ? "auto" : "smooth",
      });
    };
    wrap.querySelector("[data-prev]")?.addEventListener("click", () => scrollByCard(-1));
    wrap.querySelector("[data-next]")?.addEventListener("click", () => scrollByCard(1));
  });
}

/* ---------- Button colour fill follows the pointer; touch feedback on cards ---------- */
function initPointerEffects() {
  document.addEventListener(
    "pointerover",
    (e) => {
      const btn = (e.target as Element).closest<HTMLElement>(".button");
      if (!btn) return;
      const rect = btn.getBoundingClientRect();
      btn.style.setProperty("--x", `${e.clientX - rect.left}px`);
      btn.style.setProperty("--y", `${e.clientY - rect.top}px`);
    },
    { passive: true },
  );
  document.addEventListener(
    "touchstart",
    (e) => {
      const card = (e.target as Element).closest<HTMLElement>("[data-touch]");
      if (!card) return;
      card.classList.add("is-touched");
      window.setTimeout(() => card.classList.remove("is-touched"), 700);
    },
    { passive: true },
  );
}

/* ---------- Bar Council of India disclaimer ---------- */
function initDisclaimer() {
  const dialog = document.querySelector<HTMLDialogElement>(".bci-dialog");
  if (!dialog || typeof dialog.showModal !== "function") return;
  const KEY = "ks-bci-accepted";
  let accepted = false;
  try {
    accepted = localStorage.getItem(KEY) === "1";
  } catch {
    accepted = false;
  }
  if (accepted || location.pathname.startsWith("/disclaimer")) return;
  dialog.showModal();
  dialog.addEventListener("cancel", (e) => e.preventDefault());
  dialog.querySelector("[data-bci-accept]")?.addEventListener("click", () => {
    try {
      localStorage.setItem(KEY, "1");
    } catch {
      /* storage unavailable: accept for this page view only */
    }
    dialog.close();
  });
}

initDrawer();
initScroll();
initObservers();
initDropdowns();
initTabs();
initCarousels();
initPointerEffects();
initDisclaimer();
