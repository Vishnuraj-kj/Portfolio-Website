// about.js — interactions for the About page
// Mirrors the patterns from script.js (cursor, loader, navbar, scroll anims, timeline)

document.addEventListener('DOMContentLoaded', function () {
    initPageLoader();
    initCursor();
    initNavbar();
    initMobileMenu();
    initScrollAnimations();
    initTimelineProgress();
    initBackToTop();
});

/* ============================================================
   PAGE LOADER
   ============================================================ */
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
        window.addEventListener('load', function () {
            setTimeout(finish, 320);
        });
    }
    setTimeout(finish, 4000);
}

/* ============================================================
   CUSTOM CURSOR
   ============================================================ */
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

    document.addEventListener('mousemove', function (e) {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    // Hover over interactive elements
    document.addEventListener('mouseover', function (e) {
        if (e.target.closest('a, button, [role="button"], label, .faq-question, .hamburger, .service-card, .value-card')) {
            cursor.classList.add('cursor--hover');
        }
    });
    document.addEventListener('mouseout', function (e) {
        if (e.target.closest('a, button, [role="button"], label, .faq-question, .hamburger, .service-card, .value-card')) {
            cursor.classList.remove('cursor--hover');
        }
    });

    // Experience card — large ring + label
    document.querySelectorAll('.timeline-content[data-cursor-label]').forEach(function (card) {
        card.addEventListener('mouseenter', function () {
            cursor.classList.remove('cursor--hover');
            cursor.classList.add('cursor--exp');
            if (label) label.textContent = card.dataset.cursorLabel;
        });
        card.addEventListener('mouseleave', function () {
            cursor.classList.remove('cursor--exp');
            if (label) label.textContent = '';
        });
    });

    // Click feedback
    document.addEventListener('mousedown', function () { cursor.classList.add('cursor--click'); });
    document.addEventListener('mouseup',   function () { cursor.classList.remove('cursor--click'); });

    // Hide when leaving window
    document.addEventListener('mouseleave', function () { cursor.style.opacity = '0'; });
    document.addEventListener('mouseenter', function () { cursor.style.opacity = '1'; });

    function animateCursor() {
        // Outer ring — lagging (lerp 0.1)
        outerPos.x += (mouse.x - outerPos.x) * 0.1;
        outerPos.y += (mouse.y - outerPos.y) * 0.1;
        outer.style.left = outerPos.x + 'px';
        outer.style.top  = outerPos.y + 'px';
        if (label) {
            label.style.left = outerPos.x + 'px';
            label.style.top  = outerPos.y + 'px';
        }
        // Inner dot — snappy (lerp 0.3)
        innerPos.x += (mouse.x - innerPos.x) * 0.3;
        innerPos.y += (mouse.y - innerPos.y) * 0.3;
        inner.style.left = innerPos.x + 'px';
        inner.style.top  = innerPos.y + 'px';

        requestAnimationFrame(animateCursor);
    }
    animateCursor();
}

/* ============================================================
   NAVBAR — scroll shrink
   ============================================================ */
function initNavbar() {
    var navbar = document.querySelector('.navbar');
    if (!navbar) return;

    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }, { passive: true });
}

/* ============================================================
   MOBILE MENU
   ============================================================ */
function initMobileMenu() {
    var hamburger = document.querySelector('.hamburger');
    var navLinks  = document.querySelector('.nav-links');
    var navRight  = document.querySelector('.nav-right');
    if (!hamburger) return;

    // Inject mobile styles once (same approach as script.js)
    var mobileStyles = document.createElement('style');
    mobileStyles.textContent = [
        '.nav-links.mobile-open {',
        '  display: flex !important; position: fixed; top: 70px; left: 1rem; right: 1rem;',
        '  background: rgba(10,10,10,0.97); backdrop-filter: blur(20px);',
        '  -webkit-backdrop-filter: blur(20px); flex-direction: column; padding: 1.25rem;',
        '  border: 1px solid rgba(255,255,255,0.1); border-radius: 16px;',
        '  box-shadow: 0 20px 40px rgba(0,0,0,0.5); z-index: 999; gap: 0.25rem;',
        '}',
        '.nav-links.mobile-open li a { padding: 0.75rem 1rem; display: block; font-size: 0.85rem; border-radius: 8px; }',
        '.nav-right.mobile-open { display: flex !important; position: fixed; top: calc(70px + 12px); right: 1rem; z-index: 998; }',
        '.hamburger.active span:nth-child(1) { transform: rotate(45deg) translate(4px,4px); }',
        '.hamburger.active span:nth-child(2) { opacity: 0; }',
        '.hamburger.active span:nth-child(3) { transform: rotate(-45deg) translate(4px,-4px); }',
        '@media (max-width: 768px) { .nav-links { display: none; } .nav-right { display: none; } body.menu-open { overflow: hidden; } }'
    ].join('\n');
    document.head.appendChild(mobileStyles);

    hamburger.addEventListener('click', function () {
        hamburger.classList.toggle('active');
        document.body.classList.toggle('menu-open');
        if (navLinks) navLinks.classList.toggle('mobile-open');
        if (navRight) navRight.classList.toggle('mobile-open');
    });

    if (navLinks) {
        navLinks.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                hamburger.classList.remove('active');
                document.body.classList.remove('menu-open');
                navLinks.classList.remove('mobile-open');
                if (navRight) navRight.classList.remove('mobile-open');
            });
        });
    }

    document.addEventListener('click', function (e) {
        if (!hamburger.contains(e.target) && navLinks && !navLinks.contains(e.target)) {
            hamburger.classList.remove('active');
            document.body.classList.remove('menu-open');
            navLinks.classList.remove('mobile-open');
            if (navRight) navRight.classList.remove('mobile-open');
        }
    });
}

/* ============================================================
   SCROLL ANIMATIONS — IntersectionObserver reveal
   Handles: .fade-up  .fade-in  .fade-in-left  .fade-in-right
   ============================================================ */
function initScrollAnimations() {
    requestAnimationFrame(function () {
        var opts = { threshold: 0.08, rootMargin: '0px 0px -40px 0px' };

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, opts);

        // Hero elements — fade-up (set by class in HTML)
        document.querySelectorAll('.fade-up').forEach(function (el) {
            observer.observe(el);
        });

        // Generic scroll-reveal elements
        document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right').forEach(function (el) {
            observer.observe(el);
        });

        // Service cards — staggered fade-in
        document.querySelectorAll('.service-card').forEach(function (card, i) {
            card.style.transitionDelay = (i * 0.08) + 's';
            observer.observe(card);
        });

        // Value cards — staggered fade-in
        document.querySelectorAll('.value-card').forEach(function (card, i) {
            card.style.transitionDelay = (i * 0.1) + 's';
            observer.observe(card);
        });

        // Skill groups
        document.querySelectorAll('.skill-group').forEach(function (el, i) {
            el.style.transitionDelay = (i * 0.1) + 's';
            observer.observe(el);
        });

        // Education cards
        document.querySelectorAll('.edu-card').forEach(function (el) {
            observer.observe(el);
        });

        // Timeline items
        document.querySelectorAll('.timeline-item').forEach(function (el, i) {
            el.classList.add('fade-in');
            el.style.transitionDelay = (i * 0.12) + 's';
            observer.observe(el);
        });
    });
}

/* ============================================================
   EXPERIENCE TIMELINE SCROLL PROGRESS
   ============================================================ */
function initTimelineProgress() {
    var timelineFill  = document.getElementById('timelineFill');
    var timelineTrack = document.querySelector('.timeline-track');
    var dots          = document.querySelectorAll('.timeline-dot');

    if (!timelineFill || !timelineTrack) return;

    function updateTimeline() {
        var trackRect   = timelineTrack.getBoundingClientRect();
        var viewportH   = window.innerHeight;
        var trackTop    = trackRect.top;
        var trackHeight = trackRect.height;

        var start    = viewportH;
        var end      = viewportH * 0.4 - trackHeight;
        var raw      = (start - trackTop) / (start - end);
        var progress = Math.max(0, Math.min(1, raw));

        timelineFill.style.height = (progress * 100) + '%';

        dots.forEach(function (dot) {
            var dotRect   = dot.getBoundingClientRect();
            var dotCenter = dotRect.top + dotRect.height / 2;
            var fillY     = trackRect.top + progress * trackHeight;
            if (fillY >= dotCenter - 10) {
                dot.classList.add('lit');
            } else {
                dot.classList.remove('lit');
            }
        });
    }

    var tlRaf = null;
    window.addEventListener('scroll', function () {
        if (tlRaf) return;
        tlRaf = requestAnimationFrame(function () {
            updateTimeline();
            tlRaf = null;
        });
    }, { passive: true });

    updateTimeline();
}

/* ============================================================
   BACK TO TOP
   ============================================================ */
function initBackToTop() {
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
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}
