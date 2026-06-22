/**
 * project-detail.js
 * Self-contained: project data is embedded directly so there is
 * no external dependency or load-order risk.
 *
 * Flow:
 *  1. Read ?id= from URL
 *  2. Find project in embedded data
 *  3. Render all content into the pre-existing HTML slots
 *  4. Show content / error state
 *  5. Boot cursor, navbar, scroll-reveal (same as main site)
 */

(function () {
  'use strict';

  /* ================================================================
     PROJECT DATA  (single source — same as projects/data.js)
     ================================================================ */
  var PROJECTS = [
    {
      id: 'hotel-booking',
      title: 'Hotel Booking',
      chip: 'Hospitality · Travel',
      image: 'projects/Hotel Booking (Case study)  4.jpg.jpeg',
      tags: ['UI/UX', 'UX Research', 'Mobile', 'Case Study'],
      desc: 'End-to-end hotel booking experience — user research, journey mapping, information architecture, and high-fidelity UI for a seamless travel booking flow.',
      overview: 'A comprehensive UX case study redesigning the hotel booking experience from scratch. Focused on reducing friction in the search-to-checkout flow while improving trust signals and visual clarity.',
      role: 'Lead UI/UX Designer',
      duration: '8 Weeks',
      platform: 'Mobile & Web',
      process: [
        { phase: 'Research',                detail: 'User interviews, competitor analysis, and journey mapping to identify pain points in existing booking flows.' },
        { phase: 'Information Architecture', detail: 'Restructured navigation and content hierarchy to reduce cognitive load during the booking process.' },
        { phase: 'Wireframing',             detail: 'Low and mid-fidelity wireframes iterated through 3 rounds of usability testing.' },
        { phase: 'Visual Design',           detail: 'High-fidelity UI with a refined design system — typography, colour palette, and component library.' }
      ],
      behanceUrl: 'https://behance.net/vishnurajkj'
    },
    {
      id: 'ovia',
      title: 'Ovia',
      chip: 'Health · Wellness',
      image: 'projects/Ovia.jpg.jpeg',
      tags: ['Product Design', 'UI/UX', 'Mobile', 'Health Tech'],
      desc: 'Health and wellness product design — intuitive onboarding, personalised dashboards, and a clean visual language that puts user wellbeing first.',
      overview: 'Ovia is a health and wellness platform designed to make personal health tracking approachable and empowering. The design prioritises clarity, calm, and progressive disclosure.',
      role: 'UI/UX Designer',
      duration: '6 Weeks',
      platform: 'Mobile App',
      process: [
        { phase: 'Discovery',    detail: 'Stakeholder workshops and user persona development to define core health tracking needs.' },
        { phase: 'UX Design',   detail: 'Onboarding flow, goal-setting wizard, and dashboard architecture designed for daily engagement.' },
        { phase: 'Prototyping', detail: 'Interactive Figma prototype tested with 12 users to validate navigation and readability.' },
        { phase: 'UI Polish',   detail: 'Calming colour palette, soft typography, and micro-interactions to reduce anxiety in health tracking.' }
      ],
      behanceUrl: 'https://behance.net/vishnurajkj'
    },
    {
      id: 'pemmin',
      title: 'Pemmin Task',
      chip: 'Productivity · SaaS',
      image: 'projects/Pemmin_Task.jpg.jpeg',
      tags: ['Dashboard', 'UI/UX', 'SaaS', 'Productivity'],
      desc: 'Task and project management SaaS — designed for teams that need clarity. Clean dashboards, smart workflows, and a design system built for scale.',
      overview: 'Pemmin Task is a productivity SaaS tool for distributed teams. Balancing feature density with visual simplicity — giving power users depth without overwhelming newcomers.',
      role: 'Product Designer',
      duration: '10 Weeks',
      platform: 'Web App',
      process: [
        { phase: 'Audit & Research',  detail: 'Competitive audit of Asana, Linear, and Notion to identify differentiation opportunities.' },
        { phase: 'Design System',     detail: 'Built a scalable component library with tokens for spacing, colour, and typography.' },
        { phase: 'Interaction Design',detail: 'Drag-and-drop board, kanban lanes, and inline editing with real-time feedback states.' },
        { phase: 'Handoff',           detail: 'Detailed specs and annotated components delivered to the engineering team via Figma.' }
      ],
      behanceUrl: 'https://behance.net/vishnurajkj'
    },
    {
      id: 'sks-website',
      title: 'SKS Website',
      chip: 'Corporate · Branding',
      image: 'projects/SKS WEBSITE JPEG(3 SLIDE).jpg.jpeg',
      tags: ['Web Design', 'Branding', 'UI/UX', 'Corporate'],
      desc: 'Corporate website redesign with a strong visual identity — modern layout system, brand-consistent design language, and conversion-optimised page structures.',
      overview: 'A full corporate website redesign for SKS, focusing on brand elevation and lead generation. Structured content hierarchy, strong visual language, and responsive layouts across all breakpoints.',
      role: 'UI Designer',
      duration: '4 Weeks',
      platform: 'Web',
      process: [
        { phase: 'Brand Review',   detail: 'Analysed existing brand assets and identified inconsistencies to resolve in the new design.' },
        { phase: 'Layout System',  detail: 'Designed a modular grid system with reusable page sections for scalable content updates.' },
        { phase: 'Visual Design',  detail: 'High-fidelity mockups for homepage, about, services, and contact pages across 3 breakpoints.' },
        { phase: 'Delivery',       detail: 'Pixel-perfect assets and developer-ready specs exported from Figma.' }
      ],
      behanceUrl: 'https://behance.net/vishnurajkj'
    },
    {
      id: 'web-1920-v1',
      title: 'Web 1920 — I',
      chip: 'Web · UI Design',
      image: 'projects/Web 1920  1.jpg.jpeg',
      tags: ['UI Design', 'Web', 'Responsive', 'Visual Design'],
      desc: 'Full-scale web UI design at 1920px — bold layout composition, strong visual hierarchy, and a refined design system for a modern digital experience.',
      overview: 'A desktop-first web UI exploration at 1920px canvas width. Bold typographic composition, generous whitespace, and a cohesive visual system that scales gracefully across viewports.',
      role: 'UI/UX Designer',
      duration: '3 Weeks',
      platform: 'Web',
      process: [
        { phase: 'Concept',              detail: 'Moodboarding and style exploration to define the visual direction and tone.' },
        { phase: 'Layout',               detail: '1920px grid layout with intentional breakpoints at 1440px, 1024px, and 768px.' },
        { phase: 'Typography & Colour',  detail: 'Custom type scale and colour system built for contrast and accessibility.' },
        { phase: 'Final UI',             detail: 'Polished screens delivered as exportable Figma frames with auto-layout.' }
      ],
      behanceUrl: 'https://behance.net/vishnurajkj'
    },
    {
      id: 'web-1920-v2',
      title: 'Web 1920 — II',
      chip: 'Web · UI Design',
      image: 'projects/Web 1920  2.jpg.jpeg',
      tags: ['UI Design', 'Web', 'Interaction', 'Visual Design'],
      desc: 'Continuation of the Web 1920 series — deeper interaction design, refined motion principles, and a more sophisticated visual language.',
      overview: 'The second chapter of the Web 1920 series pushes into interaction design and motion. More complex component states, hover behaviours, and an evolved design language.',
      role: 'UI/UX Designer',
      duration: '3 Weeks',
      platform: 'Web',
      process: [
        { phase: 'Design Review',      detail: 'Iterated on feedback from Web 1920 — I to refine layout density and component reuse.' },
        { phase: 'Interaction States', detail: 'Defined hover, focus, active, and disabled states for all interactive components.' },
        { phase: 'Motion Principles',  detail: 'Documented animation guidelines: duration, easing, and transition patterns.' },
        { phase: 'Prototype',          detail: 'High-fidelity interactive Figma prototype for stakeholder review.' }
      ],
      behanceUrl: 'https://behance.net/vishnurajkj'
    },
    {
      id: 'hotel-booking-2',
      title: 'Hotel Booking — II',
      chip: 'Hospitality · Travel',
      image: 'projects/Hotel Booking (Case study) 4.png',
      tags: ['Visual Design', 'UI/UX', 'Responsive', 'Travel'],
      desc: 'High-fidelity visual design iteration — refined UI components, updated colour system, and polished responsive layouts for the hotel booking platform.',
      overview: 'A visual design deep-dive building on the original hotel booking case study. Focused on refining the UI component library, improving accessibility, and elevating the overall aesthetic.',
      role: 'UI Designer',
      duration: '4 Weeks',
      platform: 'Mobile & Web',
      process: [
        { phase: 'Component Audit',    detail: 'Reviewed all existing components for consistency and accessibility compliance.' },
        { phase: 'Colour Refinement',  detail: 'Updated colour palette to meet WCAG AA contrast ratios throughout.' },
        { phase: 'UI Components',      detail: 'Rebuilt card, form, and navigation components with improved visual polish.' },
        { phase: 'Responsive Layouts', detail: 'Full responsive design across mobile (375px), tablet (768px), and desktop (1440px).' }
      ],
      behanceUrl: 'https://behance.net/vishnurajkj'
    }
  ];

  /* ================================================================
     HELPERS
     ================================================================ */

  function esc(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function getEl(id) {
    return document.getElementById(id);
  }

  function getProjectId() {
    try {
      return new URLSearchParams(window.location.search).get('id') || '';
    } catch (e) {
      return '';
    }
  }

  /* ================================================================
     RENDER
     ================================================================ */

  function renderProject(project, all) {
    /* Page title + meta */
    document.title = project.title + ' \u2014 Vishnuraj KJ';
    var metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', project.desc);

    /* Breadcrumb */
    var bcTitle = getEl('pd-bc-title');
    if (bcTitle) bcTitle.textContent = project.title;

    /* Chip, title, subtitle */
    var chip = getEl('pd-chip');
    if (chip) chip.textContent = project.chip;

    var titleEl = getEl('pd-title');
    if (titleEl) titleEl.textContent = project.title;

    var subtitle = getEl('pd-subtitle');
    if (subtitle) subtitle.textContent = project.desc;

    /* Meta pills */
    var metaRow = getEl('pd-meta-row');
    if (metaRow) {
      var metas = [
        { label: 'Role',     value: project.role },
        { label: 'Duration', value: project.duration },
        { label: 'Platform', value: project.platform }
      ];
      metaRow.innerHTML = metas.map(function (m) {
        return '<div class="pd-meta-pill">'
          + '<span class="pd-meta-label">' + esc(m.label) + '</span>'
          + '<span class="pd-meta-value">' + esc(m.value) + '</span>'
          + '</div>';
      }).join('');
    }

    /* Hero image */
    var img = getEl('pd-hero-img');
    if (img) {
      img.src = project.image;
      img.alt = project.title + ' \u2014 project screenshot';

      // Show the image frame as soon as the img starts loading
      // (don't wait for IntersectionObserver which may miss hidden-container elements)
      var frame = img.parentElement;
      if (frame) {
        frame.classList.add('visible');
        frame.classList.remove('fade-in');
      }

      // Debug: log any load errors to the console
      img.addEventListener('error', function () {
        console.error('[detail] Image failed to load:', project.image);
      });
    }

    /* Overview */
    var overview = getEl('pd-overview');
    if (overview) overview.textContent = project.overview;

    /* Tags */
    var tagsEl = getEl('pd-tags');
    if (tagsEl) {
      tagsEl.innerHTML = project.tags.map(function (tag) {
        return '<span class="pd-tag">' + esc(tag) + '</span>';
      }).join('');
    }

    /* Process list */
    var processList = getEl('pd-process-list');
    if (processList) {
      processList.innerHTML = project.process.map(function (step, i) {
        var num = (i + 1 < 10 ? '0' : '') + (i + 1);
        return '<li class="pd-process-item">'
          + '<span class="pd-process-num">' + esc(num) + '</span>'
          + '<div class="pd-process-body">'
          + '<p class="pd-process-phase">' + esc(step.phase) + '</p>'
          + '<p class="pd-process-detail">' + esc(step.detail) + '</p>'
          + '</div></li>';
      }).join('');
    }

    /* Behance CTA */
    var behBtn = getEl('pd-behance-btn');
    if (behBtn) behBtn.href = project.behanceUrl;

    /* Prev / Next navigation */
    var navEl = getEl('pd-proj-nav');
    if (navEl) {
      var idx  = all.findIndex(function (p) { return p.id === project.id; });
      var prev = idx > 0           ? all[idx - 1] : null;
      var next = idx < all.length - 1 ? all[idx + 1] : null;
      var html = '';

      if (prev) {
        html += '<a href="project-detail.html?id=' + encodeURIComponent(prev.id)
          + '" class="pd-nav-card pd-nav-prev">'
          + '<div class="pd-nav-direction">'
          + '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>'
          + 'Previous</div>'
          + '<p class="pd-nav-project-title">' + esc(prev.title) + '</p>'
          + '</a>';
      } else {
        html += '<div></div>';
      }

      if (next) {
        html += '<a href="project-detail.html?id=' + encodeURIComponent(next.id)
          + '" class="pd-nav-card pd-nav-next">'
          + '<div class="pd-nav-direction">Next '
          + '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>'
          + '</div>'
          + '<p class="pd-nav-project-title">' + esc(next.title) + '</p>'
          + '</a>';
      }

      navEl.innerHTML = html;
    }
  }

  /* ================================================================
     SHOW / HIDE STATES
     All three panels start: loading=visible, error=none, content=none.
     Only one panel is ever visible at a time.
     ================================================================ */

  function showContent() {
    var loading = getEl('detail-loading');
    var error   = getEl('detail-error');
    var content = getEl('detail-content');

    if (loading) loading.style.display = 'none';
    if (error)   error.style.display   = 'none';
    if (content) content.style.display = 'block';

    // Force-show any fade-in elements already in the viewport
    // (IntersectionObserver may miss them if they were in a hidden container)
    requestAnimationFrame(function () {
      document.querySelectorAll('.fade-in').forEach(function (el) {
        var rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight + 100) {
          el.classList.add('visible');
        }
      });
    });
  }

  function showError() {
    var loading = getEl('detail-loading');
    var error   = getEl('detail-error');
    var content = getEl('detail-content');

    if (loading) loading.style.display = 'none';
    if (error)   { error.style.display = 'flex'; }
    if (content) content.style.display = 'none';
  }

  /* ================================================================
     SCROLL REVEAL
     ================================================================ */

  function initScrollReveal() {
    if (!('IntersectionObserver' in window)) {
      // Fallback: just show everything
      document.querySelectorAll('.fade-in').forEach(function (el) {
        el.classList.add('visible');
      });
      return;
    }
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.fade-in').forEach(function (node) {
      observer.observe(node);
    });
  }

  /* ================================================================
     CURSOR  (mirrors script.js exactly)
     ================================================================ */

  function initCursor() {
    var cursor = document.querySelector('.cursor');
    if (!cursor) return;
    if (!window.matchMedia('(pointer: fine)').matches) {
      cursor.style.display = 'none';
      return;
    }
    var outer = cursor.querySelector('.outer');
    var inner = cursor.querySelector('.inner');
    var label = cursor.querySelector('.cursor-label');
    var mouse    = { x: window.innerWidth / 2,  y: window.innerHeight / 2 };
    var outerPos = { x: mouse.x, y: mouse.y };
    var innerPos = { x: mouse.x, y: mouse.y };

    document.addEventListener('mousemove', function (e) { mouse.x = e.clientX; mouse.y = e.clientY; });
    document.addEventListener('mouseover', function (e) {
      if (e.target.closest('a, button, [role="button"], .hamburger')) cursor.classList.add('cursor--hover');
    });
    document.addEventListener('mouseout', function (e) {
      if (e.target.closest('a, button, [role="button"], .hamburger')) cursor.classList.remove('cursor--hover');
    });
    document.addEventListener('mousedown', function () { cursor.classList.add('cursor--click'); });
    document.addEventListener('mouseup',   function () { cursor.classList.remove('cursor--click'); });
    document.addEventListener('mouseleave', function () { cursor.style.opacity = '0'; });
    document.addEventListener('mouseenter', function () { cursor.style.opacity = '1'; });

    (function loop() {
      outerPos.x += (mouse.x - outerPos.x) * 0.1;
      outerPos.y += (mouse.y - outerPos.y) * 0.1;
      outer.style.left = outerPos.x + 'px';
      outer.style.top  = outerPos.y + 'px';
      if (label) { label.style.left = outerPos.x + 'px'; label.style.top = outerPos.y + 'px'; }
      innerPos.x += (mouse.x - innerPos.x) * 0.3;
      innerPos.y += (mouse.y - innerPos.y) * 0.3;
      inner.style.left = innerPos.x + 'px';
      inner.style.top  = innerPos.y + 'px';
      requestAnimationFrame(loop);
    }());
  }

  /* ================================================================
     NAVBAR + MOBILE MENU
     ================================================================ */

  function initNavbar() {
    var navbar    = document.querySelector('.navbar');
    var hamburger = document.querySelector('.hamburger');
    var navLinks  = document.querySelector('.nav-links');
    var navRight  = document.querySelector('.nav-right');

    if (navbar) {
      window.addEventListener('scroll', function () {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
      }, { passive: true });
    }

    if (hamburger) {
      hamburger.addEventListener('click', function () {
        hamburger.classList.toggle('active');
        document.body.classList.toggle('menu-open');
        if (navLinks) navLinks.classList.toggle('mobile-open');
        if (navRight) navRight.classList.toggle('mobile-open');
      });
      document.addEventListener('click', function (e) {
        if (!hamburger.contains(e.target) && navLinks && !navLinks.contains(e.target)) {
          hamburger.classList.remove('active');
          document.body.classList.remove('menu-open');
          if (navLinks) navLinks.classList.remove('mobile-open');
          if (navRight) navRight.classList.remove('mobile-open');
        }
      });
    }

    /* Inject mobile nav styles */
    var s = document.createElement('style');
    s.textContent = '.nav-links.mobile-open{display:flex!important;position:fixed;top:70px;left:1rem;right:1rem;background:rgba(10,10,10,.97);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);flex-direction:column;padding:1.25rem;border:1px solid rgba(255,255,255,.1);border-radius:16px;box-shadow:0 20px 40px rgba(0,0,0,.5);z-index:999;gap:.25rem}.nav-links.mobile-open li a{padding:.75rem 1rem;display:block;font-size:.85rem;border-radius:8px}.nav-right.mobile-open{display:flex!important;position:fixed;top:calc(70px + 12px);right:1rem;z-index:998}.hamburger.active span:nth-child(1){transform:rotate(45deg) translate(4px,4px)}.hamburger.active span:nth-child(2){opacity:0}.hamburger.active span:nth-child(3){transform:rotate(-45deg) translate(4px,-4px)}@media(max-width:768px){.nav-links{display:none}.nav-right{display:none}body.menu-open{overflow:hidden}}';
    document.head.appendChild(s);
  }

  /* ================================================================
     BOOT
     ================================================================ */

  /* ================================================================
     PAGE LOADER  (same logic as script.js)
     ================================================================ */

  function initPageLoader() {
    var loader = document.getElementById('page-loader');
    var fill   = document.getElementById('pl-bar-fill');
    if (!loader) return;

    document.body.classList.add('loading');

    var progress = 0;
    var target   = 72;
    var raf      = null;

    function step() {
      if (progress < target) {
        progress += (target - progress) * 0.055;
        if (progress > target - 0.5) progress = target;
        if (fill) fill.style.width = progress + '%';
        raf = requestAnimationFrame(step);
      }
    }
    requestAnimationFrame(step);

    function finish() {
      if (raf) cancelAnimationFrame(raf);
      progress = 100;
      if (fill) fill.style.width = '100%';
      setTimeout(function () {
        loader.classList.add('pl-done');
        document.body.classList.remove('loading');
        loader.addEventListener('transitionend', function onEnd() {
          loader.removeEventListener('transitionend', onEnd);
          if (loader.parentNode) loader.parentNode.removeChild(loader);
        });
      }, 220);
    }

    if (document.readyState === 'complete') {
      setTimeout(finish, 380);
    } else {
      window.addEventListener('load', function () { setTimeout(finish, 320); });
    }
    setTimeout(finish, 4000);
  }

  /* ================================================================
     BOOT
     ================================================================ */

  document.addEventListener('DOMContentLoaded', function () {
    initPageLoader();
    initCursor();
    initNavbar();

    var id      = getProjectId();
    var project = null;

    for (var i = 0; i < PROJECTS.length; i++) {
      if (PROJECTS[i].id === id) { project = PROJECTS[i]; break; }
    }

    if (!project) {
      showError();
      return;
    }

    renderProject(project, PROJECTS);
    showContent();
    window.scrollTo(0, 0);

    // All fade-in elements: force visible after a short paint cycle.
    // IntersectionObserver alone is unreliable when content transitions
    // from display:none to display:block — elements in the viewport at
    // that moment are already "intersecting" and never re-trigger.
    setTimeout(function () {
      document.querySelectorAll('.fade-in').forEach(function (node) {
        node.classList.add('visible');
      });
    }, 80);
  });

}());


// ---- BACK TO TOP ----
(function () {
    var btn = document.getElementById('backToTop');
    if (!btn) return;

    window.addEventListener('scroll', function () {
        if (window.scrollY > 400) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    }, { passive: true });

    btn.addEventListener('click', function () {
        btn.classList.add('pulse');
        btn.addEventListener('animationend', function () {
            btn.classList.remove('pulse');
        }, { once: true });

        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
})();
