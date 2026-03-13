/* =============================================
   PetVesta – Animations & Interactivity
   Uses GSAP 3 + ScrollTrigger
   ============================================= */

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const qs = (s, ctx = document) => ctx.querySelector(s);
const qsa = (s, ctx = document) => [...ctx.querySelectorAll(s)];

/* =============================================
   SCROLL PROGRESS BAR
   ============================================= */
(function scrollProgress() {
  const bar = qs('#scrollProgressBar');
  if (!bar) return;
  gsap.to(bar, {
    width: '100%',
    ease: 'none',
    scrollTrigger: {
      trigger: 'body',
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.15,
    },
  });
})();

/* =============================================
   SPLIT TEXT & REVEAL (words/chars)
   ============================================= */
function initSplitText() {
  qsa('.reveal-text[data-split]').forEach((el) => {
    const splitType = el.getAttribute('data-split');
    const text = el.innerText.trim();
    el.innerHTML = '';
    el.classList.add('reveal-text-container');
    if (splitType === 'words') {
      text.split(/\s+/).forEach((word) => {
        const wordSpan = document.createElement('span');
        wordSpan.className = 'word-wrap';
        wordSpan.innerHTML = '<span class="char">' + word + '</span>';
        el.appendChild(wordSpan);
        el.appendChild(document.createTextNode(' '));
      });
    } else if (splitType === 'chars') {
      text.split('').forEach((char) => {
        const span = document.createElement('span');
        span.className = 'char';
        span.textContent = char === ' ' ? '\u00A0' : char;
        el.appendChild(span);
      });
    }
  });
}

/* =============================================
   PRELOADER
   ============================================= */
(function preloader() {
  const pl = qs('#preloader');
  const fill = qs('.preloader-fill');
  if (!pl) return;

  let pct = 0;
  const interval = setInterval(() => {
    pct += Math.random() * 18;
    if (pct >= 100) { pct = 100; clearInterval(interval); }
    fill.style.width = pct + '%';
  }, 80);

  window.addEventListener('load', () => {
    gsap.delayedCall(0.4, () => {
      pl.classList.add('hidden');
      document.body.style.overflow = '';
      // Trigger hero entrance after preloader hides
      heroEntrance();
    });
  });

  document.body.style.overflow = 'hidden';
})();

/* =============================================
   HEADER – scroll-aware
   ============================================= */
(function stickyHeader() {
  const header = qs('#site-header');
  const hamburger = qs('#hamburger');
  const nav = qs('#nav');
  if (!header) return;

  ScrollTrigger.create({
    start: 'top -80px',
    onEnter: () => header.classList.add('scrolled'),
    onLeaveBack: () => header.classList.remove('scrolled'),
  });

  hamburger?.addEventListener('click', () => {
    nav.classList.toggle('open');
    hamburger.classList.toggle('active');
  });

  // Close nav on link click (mobile)
  qsa('.nav a').forEach(a => a.addEventListener('click', () => {
    nav.classList.remove('open');
    hamburger?.classList.remove('active');
  }));
})();

/* =============================================
   BACK-TO-TOP
   ============================================= */
(function backToTop() {
  const btn = qs('#backTop');
  if (!btn) return;
  ScrollTrigger.create({
    start: 'top -300px',
    onEnter: () => btn.classList.add('visible'),
    onLeaveBack: () => btn.classList.remove('visible'),
  });
  btn.addEventListener('click', () => gsap.to(window, { scrollTo: 0, duration: 0.8, ease: 'power3.inOut' }));
})();

/* =============================================
   HERO ENTRANCE
   ============================================= */
function heroEntrance() {
  const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 0.45 } });
  tl
    .from('.hero-badge-pill', { y: 16, opacity: 0 })
    .from('.hero-title', { y: 28, opacity: 0, duration: 0.55 }, '-=0.25')
    .from('.hero-sub', { y: 20, opacity: 0, duration: 0.4 }, '-=0.4')
    .from('.hero-actions', { y: 16, opacity: 0 }, '-=0.3')
    .from('.hero-trust', { y: 16, opacity: 0 }, '-=0.3')
    .from('.hero-img-wrap', { x: 40, opacity: 0, duration: 0.7, ease: 'power3.out' }, '-=0.6')
    .from('.hero-float-1', { x: -20, opacity: 0, duration: 0.4 }, '-=0.25')
    .from('.hero-float-2', { x: 20, opacity: 0, duration: 0.4 }, '-=0.35')
    .from('.hero-orange-badge', { scale: 0.92, opacity: 0, duration: 0.4, ease: 'back.out(1.5)' }, '-=0.3');

  gsap.to('.hero-img', {
    yPercent: -10,
    ease: 'none',
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1.2 },
  });
}

/* =============================================
   GENERIC SCROLL REVEAL (fast, high-end)
   ============================================= */
(function scrollReveal() {
  const items = qsa('.reveal-up, .reveal-left, .reveal-right');
  items
    .filter((el) => !el.classList.contains('feat-card') && !el.classList.contains('process-step'))
    .forEach((el) => {
    const delay = parseFloat(el.dataset.delay || 0) / 1000;
    gsap.to(el, {
      opacity: 1,
      x: 0,
      y: 0,
      duration: 0.48,
      delay,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
        once: true,
      },
    });
  });
})();

/* =============================================
   TEXT SPLIT REVEAL (words/chars)
   ============================================= */
(function textSplitReveal() {
  initSplitText();
  qsa('.reveal-text[data-split="words"]').forEach((el) => {
    const words = el.querySelectorAll('.word-wrap');
    if (!words.length) return;
    gsap.fromTo(
      words,
      { y: '110%', opacity: 0 },
      {
        y: '0%',
        opacity: 1,
        duration: 0.5,
        stagger: 0.028,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 90%', once: true },
      }
    );
  });
  qsa('.reveal-text[data-split="chars"]').forEach((el) => {
    const chars = el.querySelectorAll('.char');
    if (!chars.length) return;
    gsap.fromTo(
      chars,
      { y: '110%', opacity: 0 },
      {
        y: '0%',
        opacity: 1,
        duration: 0.45,
        stagger: 0.018,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 90%', once: true },
      }
    );
  });
})();

/* =============================================
   IMAGE CLIP REVEAL
   ============================================= */
(function imageReveal() {
  qsa('.image-reveal').forEach((el) => {
    gsap.fromTo(
      el,
      { clipPath: 'inset(100% 0 0 0)' },
      {
        clipPath: 'inset(0% 0 0 0)',
        duration: 1,
        ease: 'power3.inOut',
        scrollTrigger: { trigger: el, start: 'top 85%', once: true },
      }
    );
  });
})();

/* =============================================
   SECTION LINE SCALE
   ============================================= */
(function sectionLine() {
  const line = qs('.section-line');
  if (!line) return;
  gsap.to(line, {
    scaleX: 1,
    duration: 0.9,
    ease: 'power3.out',
    scrollTrigger: { trigger: line, start: 'top 92%', once: true },
  });
})();

/* =============================================
   PARALLAX ELEMENTS
   ============================================= */
(function parallax() {
  qsa('.parallax-element').forEach((el) => {
    const speed = parseFloat(el.getAttribute('data-speed') || 1);
    gsap.to(el, {
      y: -80 * speed,
      ease: 'none',
      scrollTrigger: { trigger: el.closest('section') || el, start: 'top bottom', end: 'bottom top', scrub: 1.2 },
    });
  });
})();

/* =============================================
   PROCESS STEP ACTIVE STATE
   ============================================= */
(function stepActive() {
  qsa('.step-item').forEach((step) => {
    ScrollTrigger.create({
      trigger: step,
      start: 'top 82%',
      onEnter: () => step.classList.add('step-active'),
      onLeaveBack: () => step.classList.remove('step-active'),
    });
  });
})();

/* =============================================
   MAGNETIC BUTTONS
   ============================================= */
(function magneticButtons() {
  qsa('.magnetic-btn-wrap').forEach((wrap) => {
    const btn = wrap.querySelector('.magnetic-btn');
    if (!btn) return;
    wrap.addEventListener('mousemove', (e) => {
      const rect = wrap.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) * 0.35;
      const y = (e.clientY - rect.top - rect.height / 2) * 0.35;
      gsap.to(btn, { x, y, scale: 1.03, duration: 0.4, ease: 'power2.out' });
    });
    wrap.addEventListener('mouseleave', () => {
      gsap.to(btn, { x: 0, y: 0, scale: 1, duration: 0.6, ease: 'elastic.out(1.1, 0.5)' });
    });
  });
})();

/* =============================================
   HERO TICKER
   ============================================= */
// CSS handles the ticker animation; JS just ensures it duplicates for seamless loop
(function ticker() {
  const track = qs('.ticker-track');
  if (!track) return;
  track.innerHTML += track.innerHTML;
})();

/* =============================================
   COUNTER ANIMATION
   ============================================= */
(function counters() {
  qsa('.counter').forEach(el => {
    const target = parseInt(el.dataset.target, 10);
    ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to({ val: 0 }, {
          val: target,
          duration: 2,
          ease: 'power2.out',
          onUpdate: function () {
            el.textContent = Math.round(this.targets()[0].val).toLocaleString();
          },
        });
      },
    });
  });
})();

/* =============================================
   PROGRESS BARS (about section)
   ============================================= */
(function progressBars() {
  qsa('.progress-fill').forEach(bar => {
    const width = bar.dataset.width;
    ScrollTrigger.create({
      trigger: bar,
      start: 'top 92%',
      once: true,
      onEnter: () => {
        gsap.to(bar, { width: width + '%', duration: 0.9, ease: 'power3.out', delay: 0.1 });
      },
    });
  });
})();

/* =============================================
   FEATURES – stagger on scroll
   ============================================= */
(function featuresAnim() {
  gsap.from('.feat-card', {
    y: 32,
    opacity: 0,
    duration: 0.5,
    stagger: 0.06,
    ease: 'power3.out',
    scrollTrigger: { trigger: '.features', start: 'top 82%', once: true },
  });
})();

/* =============================================
   TEAM CARDS – tilt on hover
   ============================================= */
(function teamTilt() {
  qsa('.team-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const rx = (y / rect.height) * -8;
      const ry = (x / rect.width) * 8;
      gsap.to(card, { rotateX: rx, rotateY: ry, duration: 0.3, ease: 'power1.out', transformPerspective: 800 });
    });
    card.addEventListener('mouseleave', () => {
      gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.5, ease: 'power3.out' });
    });
  });
})();

/* =============================================
   PROCESS STEPS – stagger + connector line
   ============================================= */
(function processAnim() {
  gsap.from('.process-step', {
    y: 28,
    opacity: 0,
    duration: 0.5,
    stagger: 0.08,
    ease: 'power3.out',
    scrollTrigger: { trigger: '.process', start: 'top 82%', once: true },
  });
})();

/* =============================================
   PRICING TOGGLE
   ============================================= */
(function pricingToggle() {
  const btns = qsa('.toggle-btn');
  const vals = qsa('.price-val');
  let currentPlan = 'monthly';

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (btn.dataset.plan === currentPlan) return;
      currentPlan = btn.dataset.plan;
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      vals.forEach(val => {
        const next = val.dataset[currentPlan];
        gsap.to(val, {
          y: -10, opacity: 0, duration: 0.2, ease: 'power2.in',
          onComplete: () => {
            val.textContent = next;
            const suffix = qs('.price-per', val.closest('.price-card'));
            if (suffix) suffix.textContent = currentPlan === 'monthly' ? '/mo' : '/mo (billed annually)';
            gsap.fromTo(val, { y: 10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.3, ease: 'power2.out' });
          },
        });
      });
    });
  });
})();

/* =============================================
   SERVICE PILLS (booking)
   ============================================= */
(function servicePills() {
  const pills = qsa('.pill');
  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      pills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      gsap.from(pill, { scale: 0.9, duration: 0.3, ease: 'back.out(2)' });
    });
  });
})();

/* =============================================
   BOOKING FORM – submit animation
   ============================================= */
(function bookingForm() {
  const form = qs('#bookingForm');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('[type=submit]');
    const orig = btn.textContent;
    btn.textContent = 'Booking confirmed! ✓';
    btn.style.background = '#22c55e';
    gsap.from(btn, { scale: 0.95, duration: 0.4, ease: 'back.out(2)' });
    setTimeout(() => {
      btn.textContent = orig;
      btn.style.background = '';
      form.reset();
    }, 3000);
  });
})();

/* =============================================
   FAQ ACCORDION
   ============================================= */
(function faqAccordion() {
  const items = qsa('.faq-item');
  items.forEach(item => {
    const q = item.querySelector('.faq-q');
    q?.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      items.forEach(i => i.classList.remove('open'));
      if (!isOpen) {
        item.classList.add('open');
        gsap.from(item.querySelector('.faq-a'), { y: -8, opacity: 0.5, duration: 0.3, ease: 'power2.out' });
      }
    });
  });
})();

/* =============================================
   TESTIMONIAL SLIDER
   ============================================= */
(function testimonialSlider() {
  const track = qs('#testimonialsTrack');
  const cards = qsa('.testi-card', track);
  const prevBtn = qs('#testiPrev');
  const nextBtn = qs('#testiNext');
  if (!track || cards.length < 2) return;

  // On mobile show 1 card, on tablet 2, on desktop 3
  function getVisible() {
    if (window.innerWidth < 640) return 1;
    if (window.innerWidth < 900) return 2;
    return 3;
  }

  let current = 0;

  function slide(dir) {
    const visible = getVisible();
    const max = cards.length - visible;
    current = Math.max(0, Math.min(current + dir, max));
    const cardW = cards[0].offsetWidth + 24; // gap
    gsap.to(track, { x: -(current * cardW), duration: 0.5, ease: 'power3.out' });
  }

  track.style.display = 'flex';
  track.style.gap = '1.5rem';

  prevBtn?.addEventListener('click', () => slide(-1));
  nextBtn?.addEventListener('click', () => slide(1));
})();

/* =============================================
   BEYOND SECTION – parallax
   ============================================= */
(function beyondParallax() {
  gsap.to('.beyond-image', {
    yPercent: 12,
    ease: 'none',
    scrollTrigger: { trigger: '.beyond', start: 'top bottom', end: 'bottom top', scrub: 1.2 },
  });
})();

/* =============================================
   BRAND LOGOS – stagger fade
   ============================================= */
(function brandLogos() {
  gsap.from('.brand-logos span', {
    opacity: 0,
    y: 10,
    stagger: 0.08,
    duration: 0.5,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.brand-strip',
      start: 'top 90%',
      once: true,
    },
  });
})();

/* =============================================
   CTA CARD – entrance
   ============================================= */
(function ctaCardAnim() {
  gsap.from('.cta-card', {
    scale: 0.98,
    opacity: 0,
    duration: 0.55,
    ease: 'power3.out',
    scrollTrigger: { trigger: '.cta-card', start: 'top 90%', once: true },
  });
})();

/* =============================================
   APP MOCK – card stagger
   ============================================= */
(function appMockAnim() {
  gsap.from('.app-card', {
    x: -16,
    opacity: 0,
    duration: 0.4,
    stagger: 0.06,
    ease: 'power3.out',
    scrollTrigger: { trigger: '.app-mock', start: 'top 88%', once: true },
  });
})();

/* =============================================
   BLOG CARDS – stagger
   ============================================= */
(function blogAnim() {
  gsap.from('.blog-card', {
    y: 28,
    opacity: 0,
    duration: 0.5,
    stagger: 0.07,
    ease: 'power3.out',
    scrollTrigger: { trigger: '.blog-grid', start: 'top 90%', once: true },
  });
})();

/* =============================================
   NEWSLETTER FORM
   ============================================= */
(function newsletterForm() {
  const form = qs('.newsletter-form');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('button');
    btn.textContent = 'Subscribed ✓';
    btn.style.background = '#22c55e';
    setTimeout(() => {
      btn.textContent = 'Subscribe';
      btn.style.background = '';
      form.reset();
    }, 3000);
  });
})();

/* =============================================
   SMOOTH ANCHOR SCROLL
   ============================================= */
(function smoothAnchors() {
  qsa('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = qs(a.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      gsap.to(window, {
        scrollTo: { y: target, offsetY: 72 },
        duration: 0.9,
        ease: 'power3.inOut',
      });
    });
  });
})();
