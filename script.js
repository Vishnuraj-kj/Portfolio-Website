// Simple JavaScript without GSAP
document.addEventListener('DOMContentLoaded', function() {
    initPageLoader();
    initCursor();
    initInteractions();
    initScrollAnimations();
    initNavbarScroll();
    initAboutScrollReveal();
    initHeroScrollAnimation();
    initTimelineProgress();
});

// ---- CUSTOM CURSOR ----
function initCursor() {
    const cursor = document.querySelector('.cursor');
    if (!cursor) return;

    // Skip on touch-only devices
    if (!window.matchMedia('(pointer: fine)').matches) {
        cursor.style.display = 'none';
        return;
    }

    const outer = cursor.querySelector('.outer');
    const inner = cursor.querySelector('.inner');
    const label = cursor.querySelector('.cursor-label');

    let mouse    = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    let outerPos = { ...mouse };
    let innerPos = { ...mouse };

    document.addEventListener('mousemove', function(e) {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    // Hover detection — expand ring over clickable elements
    document.addEventListener('mouseover', function(e) {
        if (e.target.closest('a, button, [role="button"], label, .faq-question, .hamburger')) {
            cursor.classList.add('cursor--hover');
        }
    });
    document.addEventListener('mouseout', function(e) {
        if (e.target.closest('a, button, [role="button"], label, .faq-question, .hamburger')) {
            cursor.classList.remove('cursor--hover');
        }
    });

    // Experience card hover — large ring + label
    document.querySelectorAll('.timeline-content[data-cursor-label]').forEach(function(card) {
        card.addEventListener('mouseenter', function() {
            cursor.classList.remove('cursor--hover');
            cursor.classList.add('cursor--exp');
            if (label) label.textContent = card.dataset.cursorLabel;
        });
        card.addEventListener('mouseleave', function() {
            cursor.classList.remove('cursor--exp');
            if (label) label.textContent = '';
        });
    });

    // Click feedback
    document.addEventListener('mousedown', function() {
        cursor.classList.add('cursor--click');
    });
    document.addEventListener('mouseup', function() {
        cursor.classList.remove('cursor--click');
    });

    // Hide cursor when it leaves the window
    document.addEventListener('mouseleave', function() {
        cursor.style.opacity = '0';
    });
    document.addEventListener('mouseenter', function() {
        cursor.style.opacity = '1';
    });

    function animateCursor() {
        // Outer ring — slow/lagging (lerp factor 0.1)
        outerPos.x += (mouse.x - outerPos.x) * 0.1;
        outerPos.y += (mouse.y - outerPos.y) * 0.1;
        outer.style.left = outerPos.x + 'px';
        outer.style.top  = outerPos.y + 'px';
        // Label rides with the outer ring
        if (label) {
            label.style.left = outerPos.x + 'px';
            label.style.top  = outerPos.y + 'px';
        }

        // Inner dot — fast/snappy (lerp factor 0.3)
        innerPos.x += (mouse.x - innerPos.x) * 0.3;
        innerPos.y += (mouse.y - innerPos.y) * 0.3;
        inner.style.left = innerPos.x + 'px';
        inner.style.top  = innerPos.y + 'px';

        requestAnimationFrame(animateCursor);
    }
    animateCursor();
}

function initInteractions() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const targetPosition = target.offsetTop - 80;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Mobile menu toggle — updated for new nav structure
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navRight = document.querySelector('.nav-right');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            document.body.classList.toggle('menu-open');
            if (navLinks) navLinks.classList.toggle('mobile-open');
            if (navRight) navRight.classList.toggle('mobile-open');
        });
        
        // Close menu when clicking a link
        if (navLinks) {
            navLinks.querySelectorAll('a').forEach(function(link) {
                link.addEventListener('click', function() {
                    hamburger.classList.remove('active');
                    document.body.classList.remove('menu-open');
                    navLinks.classList.remove('mobile-open');
                    if (navRight) navRight.classList.remove('mobile-open');
                });
            });
        }
        
        // Close on outside click
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && navLinks && !navLinks.contains(e.target)) {
                hamburger.classList.remove('active');
                document.body.classList.remove('menu-open');
                navLinks.classList.remove('mobile-open');
                if (navRight) navRight.classList.remove('mobile-open');
            }
        });
    }

    // FAQ toggle functionality
    document.querySelectorAll('.faq-question').forEach(function(question) {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            const answer = faqItem.querySelector('.faq-answer');
            const toggle = this.querySelector('.faq-toggle');
            
            // Close other FAQ items
            document.querySelectorAll('.faq-item').forEach(function(item) {
                if (item !== faqItem && item.classList.contains('active')) {
                    item.classList.remove('active');
                    const otherAnswer = item.querySelector('.faq-answer');
                    const otherToggle = item.querySelector('.faq-toggle');
                    otherAnswer.style.maxHeight = '0';
                    otherToggle.style.transform = 'rotate(0deg)';
                }
            });
            
            // Toggle current FAQ item
            if (faqItem.classList.contains('active')) {
                faqItem.classList.remove('active');
                answer.style.maxHeight = '0';
                toggle.style.transform = 'rotate(0deg)';
            } else {
                faqItem.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
                toggle.style.transform = 'rotate(45deg)';
            }
        });
    });

    // Animate skill bars on scroll
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };

    const skillObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                const skillBars = entry.target.querySelectorAll('.skill-progress');
                skillBars.forEach(function(bar) {
                    const width = bar.getAttribute('data-width');
                    setTimeout(function() {
                        bar.style.width = width;
                    }, 200);
                });
            }
        });
    }, observerOptions);

    // Observe skill categories
    document.querySelectorAll('.skill-category').forEach(function(category) {
        skillObserver.observe(category);
    });
}

// Add CSS for mobile menu
const additionalStyles = document.createElement('style');
additionalStyles.textContent = `
    .nav-links.mobile-open {
        display: flex !important;
        position: fixed;
        top: 70px;
        left: 1rem;
        right: 1rem;
        background: rgba(10, 10, 10, 0.97);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        flex-direction: column;
        padding: 1.25rem;
        border: 1px solid rgba(255,255,255,0.1);
        border-radius: 16px;
        box-shadow: 0 20px 40px rgba(0,0,0,0.5);
        z-index: 999;
        gap: 0.25rem;
    }

    .nav-links.mobile-open li a {
        padding: 0.75rem 1rem;
        display: block;
        font-size: 0.85rem;
        border-radius: 8px;
    }

    .nav-right.mobile-open {
        display: flex !important;
        position: fixed;
        top: calc(70px + 12px);
        right: 1rem;
        z-index: 998;
    }

    .hamburger.active span:nth-child(1) {
        transform: rotate(45deg) translate(4px, 4px);
    }
    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }
    .hamburger.active span:nth-child(3) {
        transform: rotate(-45deg) translate(4px, -4px);
    }

    @media (max-width: 768px) {
        .nav-links { display: none; }
        .nav-right  { display: none; }
        body.menu-open { overflow: hidden; }
    }
`;
document.head.appendChild(additionalStyles);


// Scroll animations — IntersectionObserver reveal
// Deferred inside rAF so the browser has completed first paint before we
// register observers. This prevents elements that are already in-viewport
// from getting "stuck" in their hidden state (observer fires before paint).
function initScrollAnimations() {
    requestAnimationFrame(function() {
        const observerOpts = {
            threshold: 0.08,
            rootMargin: '0px 0px -40px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // Once revealed, stop watching — no need to re-hide
                    observer.unobserve(entry.target);
                }
            });
        }, observerOpts);

        // Work cards — primary reveal
        document.querySelectorAll('.work-card').forEach(function(card) {
            card.classList.add('fade-in');
            observer.observe(card);
        });

        document.querySelectorAll('.edu-card').forEach(function(card) {
            observer.observe(card);
        });

        document.querySelectorAll('.skill-category').forEach(function(el) {
            el.classList.add('fade-in');
            observer.observe(el);
        });

        document.querySelectorAll('.experience-item').forEach(function(el) {
            el.classList.add('fade-in');
            observer.observe(el);
        });

        document.querySelectorAll('.faq-item').forEach(function(el) {
            el.classList.add('fade-in');
            observer.observe(el);
        });

        document.querySelectorAll('.logo-item, .break-logo').forEach(function(el) {
            el.classList.add('scale-in');
            observer.observe(el);
        });

        document.querySelectorAll('.section-header').forEach(function(el) {
            el.classList.add('fade-in');
            observer.observe(el);
        });
    });
}

// Navbar background on scroll
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-links li a');

    // Active link on scroll
    const sections = document.querySelectorAll('section[id], footer[id]');

    function setActiveLink() {
        const scrollY = window.pageYOffset + 120;
        sections.forEach(function(section) {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const id = section.getAttribute('id');
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLinks.forEach(function(link) {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', function() {
        const currentScroll = window.scrollY;
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        setActiveLink();
    }, { passive: true });
}

// Typewriter animation
function initTypewriter() {
    // Replaced by scroll-opacity reveal — see initAboutScrollReveal()
}

// --- HERO SECTION SCROLL ANIMATIONS ---
// Current 3-column layout:
//   Left  col — greeting block, avail badge, spec list  → slide LEFT  + fade
//   Center col — photo frame, CTA row                   → scale/fade center
//   Right  col — descriptor (top), name lines (bottom)  → slide RIGHT + fade
//
// Industry-standard hand-off pattern:
//   1. CSS entrance runs with fill-mode:both (keeps final visible state).
//   2. animationend on the LAST element triggers stripAnimations().
//   3. stripAnimations() sets animation:none + resets opacity/transform
//      so JS inline styles take sole ownership — no cascade conflict.
//   4. rAF-throttled scroll listener drives tick() from that point on.
function initHeroScrollAnimation() {
    const heroSection = document.querySelector('.hero-section');
    if (!heroSection) return;

    // ── Element references (match current HTML) ──
    const photoFrame    = heroSection.querySelector('.hero-photo-frame');

    // Left column
    const greetingBlock = heroSection.querySelector('.hero-greeting-block');
    const availBadge    = heroSection.querySelector('.hero-avail');
    const specList      = heroSection.querySelector('.hero-spec-list');

    // Center column
    const ctaRow        = heroSection.querySelector('.hero-cta-row');

    // Right column
    const descriptor    = heroSection.querySelector('.hero-descriptor');
    const nameLines     = heroSection.querySelectorAll('.hn-line');

    // Every element JS will drive — used for animation strip + tick
    const allAnimated = [
        photoFrame,
        greetingBlock, availBadge, specList,
        ctaRow,
        descriptor,
        ...Array.from(nameLines)
    ].filter(Boolean);

    // Directional groups
    const leftEls  = [greetingBlock, availBadge, specList].filter(Boolean);
    const centerEls = [ctaRow].filter(Boolean);     // CTA fades straight down
    const rightEls = [descriptor].filter(Boolean);  // nameLines handled separately

    // ── Strip CSS animations → hand control to JS ──
    let scrollReady = false;
    let stripped    = false;

    function stripAnimations() {
        if (stripped) return;
        stripped = true;
        allAnimated.forEach(function(el) {
            el.style.animation = 'none';
            el.style.opacity   = '1';
            el.style.transform = 'none';
        });
        scrollReady = true;
        tick();
    }

    // Last element to animate: hn-line[2] at delay 0.72s + duration 0.70s = 1.42s
    const lastLine = heroSection.querySelector('.hn-line[data-line="2"]');
    if (lastLine) {
        lastLine.addEventListener('animationend', stripAnimations, { once: true });
    }
    setTimeout(stripAnimations, 1700); // safety net

    // ── Scroll progress helpers ──
    function getProgress() {
        return Math.min(window.pageYOffset / (heroSection.offsetHeight * 0.55), 1);
    }
    function smoothstep(t) { return t * t * (3 - 2 * t); }

    // ── Main tick ──
    function tick() {
        if (!scrollReady) return;

        const p    = getProgress();
        const ease = smoothstep(p);

        // ── CENTER: photo scales down + fades (parallax anchor) ──
        if (photoFrame) {
            photoFrame.style.transform = `scale(${1 - ease * 0.08})`;
            photoFrame.style.opacity   = String(Math.max(0, 1 - ease * 0.95));
        }

        // ── CENTER: CTA row slides down + fades (opposite of entrance) ──
        centerEls.forEach(function(el) {
            el.style.transform = `translateY(${ease * 24}px)`;
            el.style.opacity   = String(Math.max(0, 1 - ease * 1.4));
        });

        // ── LEFT: each element slides left with slight stagger ──
        const move    = ease * 140;
        const opacity = Math.max(0, 1 - ease * 1.2);

        leftEls.forEach(function(el, i) {
            // Stagger: greeting moves furthest, avail middle, specs least
            const mult = 1 + (leftEls.length - 1 - i) * 0.15;
            el.style.transform = `translateX(${-move * mult}px)`;
            el.style.opacity   = String(Math.max(0, opacity - i * 0.05));
        });

        // ── RIGHT: descriptor slides right + fades ──
        rightEls.forEach(function(el) {
            el.style.transform = `translateX(${move}px)`;
            el.style.opacity   = String(opacity);
        });

        // ── RIGHT: name lines — each moves progressively further right ──
        nameLines.forEach(function(line, i) {
            // VISHNU slowest, KJ fastest — feels like it's rushing offscreen
            const mult = 1 + i * 0.30;
            line.style.transform = `translateX(${move * mult}px)`;
            line.style.opacity   = String(Math.max(0, opacity - i * 0.04));
        });
    }

    // rAF-throttled scroll listener
    let rafPending = false;
    window.addEventListener('scroll', function() {
        if (rafPending) return;
        rafPending = true;
        requestAnimationFrame(function() { tick(); rafPending = false; });
    }, { passive: true });
}

// --- EXPERIENCE TIMELINE SCROLL PROGRESS ---
function initTimelineProgress() {
    const timelineFill = document.getElementById('timelineFill');
    const timelineTrack = document.querySelector('.timeline-track');
    const timelineItems = document.querySelectorAll('.timeline-item');
    const dots = document.querySelectorAll('.timeline-dot');

    if (!timelineFill || !timelineTrack) return;

    function updateTimeline() {
        const trackRect = timelineTrack.getBoundingClientRect();
        const viewportH = window.innerHeight;

        // How far the track top has scrolled into view
        // Start animating when top of track enters viewport bottom
        // Complete when bottom of track reaches viewport center
        const trackTop    = trackRect.top;
        const trackHeight = trackRect.height;

        // progress: 0 when track top is at viewport bottom, 1 when track bottom is at viewport center
        const start = viewportH;
        const end   = viewportH * 0.4 - trackHeight;
        const raw   = (start - trackTop) / (start - end);
        const progress = Math.max(0, Math.min(1, raw));

        // Animate the fill line height
        timelineFill.style.height = (progress * 100) + '%';

        // Light up dots as the line passes them
        dots.forEach(function(dot, i) {
            const dotRect = dot.getBoundingClientRect();
            const dotCenter = dotRect.top + dotRect.height / 2;
            // Dot "lit" when the fill line has reached it
            // Fill line position in viewport = trackRect.top + progress * trackHeight
            const fillY = trackRect.top + progress * trackHeight;
            if (fillY >= dotCenter - 10) {
                dot.classList.add('lit');
            } else {
                dot.classList.remove('lit');
            }
        });
    }

    // Run on scroll
    let tlRaf = null;
    window.addEventListener('scroll', function() {
        if (tlRaf) return;
        tlRaf = requestAnimationFrame(function() {
            updateTimeline();
            tlRaf = null;
        });
    }, { passive: true });

    // Initial state
    updateTimeline();
}

// --- ABOUT SECTION SCROLL OPACITY REVEAL ---
function initAboutScrollReveal() {
    const aboutSection  = document.getElementById('about');
    const aboutContainer = document.querySelector('.about-container');
    const aboutText     = document.getElementById('about-text');

    if (!aboutText || !aboutSection || !aboutContainer) return;

    // 1. Split text into individual letter spans grouped by word
    const textContent = aboutText.innerText;
    const words = textContent.trim().split(/\s+/);
    aboutText.innerHTML = '';

    words.forEach(function(word) {
        const wordSpan = document.createElement('span');
        wordSpan.className = 'about-word';

        for (let i = 0; i < word.length; i++) {
            const letterSpan = document.createElement('span');
            letterSpan.className = 'about-letter';
            letterSpan.textContent = word[i];
            wordSpan.appendChild(letterSpan);
        }

        aboutText.appendChild(wordSpan);
        // Space between words (plain text node, not a span)
        aboutText.appendChild(document.createTextNode('\u00A0'));
    });

    const letterElements = document.querySelectorAll('.about-letter');

    // 2. Scroll-driven opacity reveal
    function updateAboutReveal() {
        const scrollY      = window.pageYOffset;
        const sectionTop   = aboutSection.offsetTop;
        const sectionH     = aboutSection.offsetHeight;
        const viewH        = window.innerHeight;

        // Keep container hidden once fully scrolled past
        if (scrollY > sectionTop + sectionH) {
            aboutContainer.style.opacity = '0';
            aboutContainer.style.pointerEvents = 'none';
            return;
        }

        // Only animate while near / inside the section
        if (scrollY > sectionTop - viewH && scrollY <= sectionTop + sectionH) {

            // Full container visible while in section
            aboutContainer.style.opacity = '1';
            aboutContainer.style.pointerEvents = 'auto';

            // Progress 0→1 as the section scrolls through the viewport.
            // We map: section enters viewport (scrollY = sectionTop - viewH) → 0
            //         section centre aligns with viewport centre           → 1
            const totalRange = sectionH * 0.85;
            const raw = (scrollY - (sectionTop - viewH * 0.6)) / totalRange;
            const progress = Math.max(0, Math.min(1, raw));

            // How many letters should be lit at this scroll position
            const litCount = Math.ceil(progress * letterElements.length);

            letterElements.forEach(function(letter, idx) {
                if (idx < litCount) {
                    letter.classList.add('highlighted');
                } else {
                    letter.classList.remove('highlighted');
                }
            });
        }
    }

    // Throttle with rAF
    let rafPending = false;
    window.addEventListener('scroll', function() {
        if (rafPending) return;
        rafPending = true;
        requestAnimationFrame(function() {
            updateAboutReveal();
            rafPending = false;
        });
    }, { passive: true });

    // Run once on load so initial state is correct
    updateAboutReveal();
}


// ---- PAGE LOADER ----
function initPageLoader() {
    var loader = document.getElementById('page-loader');
    var fill   = document.getElementById('pl-bar-fill');
    if (!loader) return;

    // Prevent scroll while loading
    document.body.classList.add('loading');

    // Simulate a realistic progress curve:
    // fast to ~70%, then pause, then jump to 100% on window load
    var progress = 0;
    var target   = 72;
    var raf      = null;

    function step() {
        if (progress < target) {
            // Ease into the target — faster at start, slower near target
            progress += (target - progress) * 0.055;
            if (progress > target - 0.5) progress = target;
            if (fill) fill.style.width = progress + '%';
            raf = requestAnimationFrame(step);
        }
    }

    // Start progressing immediately
    requestAnimationFrame(step);

    function finish() {
        // Cancel any pending rAF
        if (raf) cancelAnimationFrame(raf);

        // Jump to 100%
        progress = 100;
        if (fill) fill.style.width = '100%';

        // Short pause at 100% so the user sees it complete, then fade out
        setTimeout(function () {
            loader.classList.add('pl-done');
            document.body.classList.remove('loading');

            // Remove from DOM after transition ends (keeps it clean)
            loader.addEventListener('transitionend', function onEnd() {
                loader.removeEventListener('transitionend', onEnd);
                if (loader.parentNode) loader.parentNode.removeChild(loader);
            });
        }, 220);
    }

    // Finish on window load (all resources ready)
    if (document.readyState === 'complete') {
        // Page already loaded (e.g. bfcache restore)
        setTimeout(finish, 380);
    } else {
        window.addEventListener('load', function () {
            // Give a brief beat after load so the bar reaches 100% visibly
            setTimeout(finish, 320);
        });
    }

    // Safety net: never show loader for more than 4 seconds
    setTimeout(finish, 4000);
}


// ---- BACK TO TOP ----
(function () {
    const btn = document.getElementById('backToTop');
    if (!btn) return;

    // Show/hide on scroll
    window.addEventListener('scroll', function () {
        if (window.scrollY > 400) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    }, { passive: true });

    // Scroll to top with pulse animation
    btn.addEventListener('click', function () {
        btn.classList.add('pulse');
        btn.addEventListener('animationend', function () {
            btn.classList.remove('pulse');
        }, { once: true });

        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
})();
