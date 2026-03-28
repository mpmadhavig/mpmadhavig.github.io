/* ============================================================
   MADHAVI GAYATHRI — Portfolio JS
   ============================================================ */

(function () {
  'use strict';

  /* ----------------------------------------------------------
     1. Navbar: Scroll Shadow
  ---------------------------------------------------------- */
  const header = document.querySelector('.site-header');
  if (header) {
    const onScroll = () => {
      header.classList.toggle('scrolled', window.scrollY > 20);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ----------------------------------------------------------
     2. Navbar: Active Link via IntersectionObserver
  ---------------------------------------------------------- */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav__link');

  if (sections.length && navLinks.length) {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((link) => {
            link.classList.remove('active');
            link.removeAttribute('aria-current');
          });
          const activeLink = document.querySelector(
            `.nav__link[href="#${entry.target.id}"]`
          );
          if (activeLink) {
            activeLink.classList.add('active');
            activeLink.setAttribute('aria-current', 'page');
          }
        }
      });
    }, { rootMargin: '-35% 0px -55% 0px' });

    sections.forEach((s) => sectionObserver.observe(s));
  }

  /* ----------------------------------------------------------
     3. Navbar: Mobile Hamburger Toggle
  ---------------------------------------------------------- */
  const toggle = document.querySelector('.nav__toggle');
  const menu = document.querySelector('.nav__menu');

  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      const isOpen = menu.classList.toggle('open');
      toggle.classList.toggle('open', isOpen);
      toggle.setAttribute('aria-expanded', String(isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close on nav link click
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        menu.classList.remove('open');
        toggle.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!header.contains(e.target) && menu.classList.contains('open')) {
        menu.classList.remove('open');
        toggle.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }

  /* ----------------------------------------------------------
     4. Scroll Reveal with Staggered Delays
  ---------------------------------------------------------- */
  const animatedEls = document.querySelectorAll('[data-animate]');

  if (animatedEls.length) {
    // Assign stagger delays based on sibling order
    const parents = new Set();
    animatedEls.forEach((el) => parents.add(el.parentElement));

    parents.forEach((parent) => {
      const children = parent.querySelectorAll('[data-animate]');
      children.forEach((child, i) => {
        if (i > 0) {
          child.style.setProperty('--delay', `${i * 110}ms`);
        }
      });
    });

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.08,
      rootMargin: '0px 0px -40px 0px',
    });

    animatedEls.forEach((el) => revealObserver.observe(el));
  }

  /* ----------------------------------------------------------
     5. Smooth Scroll (polyfill-safe)
  ---------------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  /* ----------------------------------------------------------
     6. Footer Year
  ---------------------------------------------------------- */
  const yearEl = document.getElementById('footer-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ----------------------------------------------------------
     7. Years of Experience — sum of actual working periods only
        Codegen internship: Oct 2020 – Mar 2021 (6 months)
        Gap (not counted):  Apr 2021 – Apr 2022
        WSO2:               May 2022 – present
  ---------------------------------------------------------- */
  const MS_PER_YEAR = 365.25 * 24 * 60 * 60 * 1000;
  const codegenMs = new Date('2021-04-01') - new Date('2020-10-01'); // 6 months
  const wso2Ms    = Date.now()             - new Date('2022-05-01');
  const yearsExp  = Math.floor((codegenMs + wso2Ms) / MS_PER_YEAR);

  ['years-exp', 'years-exp-inline'].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.textContent = yearsExp + '+';
  });

})();
