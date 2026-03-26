/* ============================================================
   script.js  —  Abishek Moses J Portfolio
   All duplicate declarations removed; all logic consolidated.
   ============================================================ */

/* ─────────────────────────────────────────────
   1. DARK / LIGHT MODE TOGGLE
   ───────────────────────────────────────────── */
const themeToggle = document.getElementById('themeToggle');
const themeIcon   = document.getElementById('themeIcon');

function applyTheme(dark) {
    if (dark) {
        document.body.classList.add('dark-mode');
        themeIcon.classList.replace('bx-moon', 'bx-sun');
    } else {
        document.body.classList.remove('dark-mode');
        themeIcon.classList.replace('bx-sun', 'bx-moon');
    }
}

// Load saved preference on startup
applyTheme(localStorage.getItem('theme') === 'dark');

themeToggle.addEventListener('click', () => {
    const isDark = document.body.classList.toggle('dark-mode');
    themeIcon.classList.toggle('bx-sun', isDark);
    themeIcon.classList.toggle('bx-moon', !isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
});


/* ─────────────────────────────────────────────
   2. HAMBURGER MENU
   ───────────────────────────────────────────── */
const menuIcon = document.querySelector('.menu-icon');
const navlist  = document.querySelector('.navlist');

menuIcon.addEventListener('click', () => {
    menuIcon.classList.toggle('active');
    navlist.classList.toggle('active');
    document.body.classList.toggle('open');
});

// Close nav when any link is clicked
navlist.addEventListener('click', () => {
    navlist.classList.remove('active');
    menuIcon.classList.remove('active');
    document.body.classList.remove('open');
});


/* ─────────────────────────────────────────────
   3. ROTATING HERO TEXT
   Fixed: template-literal had a stray `"` after deg —
   `rotate(${i * 6.3}deg"` should be `rotate(${i * 6.3}deg)`
   ───────────────────────────────────────────── */
const rotateTextEl = document.querySelector('.text p');
if (rotateTextEl) {
    rotateTextEl.innerHTML = rotateTextEl.innerText
        .split('')
        .map((char, i) => `<b style="transform:rotate(${i * 6.3}deg)">${char}</b>`)
        .join('');
}


/* ─────────────────────────────────────────────
   4. ABOUT SECTION — TAB SWITCHER
   Uses data-tab attribute on buttons to identify index.
   ───────────────────────────────────────────── */
const aboutButtons = document.querySelectorAll('.about-btn button');
const aboutContents = document.querySelectorAll('.content-btn .content');

aboutButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
        const idx = parseInt(btn.dataset.tab, 10);

        // Toggle active class on buttons
        aboutButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Show the matching content block
        aboutContents.forEach(c => c.classList.remove('active-tab'));
        if (aboutContents[idx]) {
            aboutContents[idx].classList.add('active-tab');
        }
    });
});


/* ─────────────────────────────────────────────
   5. "READ MORE" TOGGLES (bio + about tab extras)
   ───────────────────────────────────────────── */

// Hero Bio — show/hide extended bio text
const bioReadMore = document.getElementById('bioReadMore');
const bioFull     = document.querySelector('.bio-full');

if (bioReadMore && bioFull) {
    bioReadMore.addEventListener('click', (e) => {
        e.preventDefault();
        const isHidden = bioFull.classList.toggle('hidden');
        const icon = bioReadMore.querySelector('i');
        bioReadMore.childNodes[0].textContent = isHidden ? 'Read More ' : 'Read Less ';
        icon.className = isHidden ? 'bx bx-chevron-down' : 'bx bx-chevron-up';
    });
}

// About tabs — "Read More" inside each tab expands extra text-boxes
document.querySelectorAll('.tab-read-more').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const parent = btn.closest('.content');
        if (!parent) return;
        const extras = parent.querySelectorAll('.extra-content');
        const isNowShown = !extras[0]?.classList.contains('hidden');
        // toggle
        extras.forEach(el => el.classList.toggle('hidden'));
        const icon = btn.querySelector('i');
        btn.childNodes[0].textContent = isNowShown ? 'Read More ' : 'Read Less ';
        icon.className = isNowShown ? 'bx bx-chevron-down' : 'bx bx-chevron-up';
    });
});


/* ─────────────────────────────────────────────
   6. PORTFOLIO FILTER — MixItUp
   ───────────────────────────────────────────── */
if (document.querySelector('.portfolio-gallery')) {
    var mixer = mixitup('.portfolio-gallery', {
        selectors: { target: '.portfolio-box' },
        animation: { duration: 500 }
    });
}


/* ─────────────────────────────────────────────
   7. SWIPER — Gallery
   ───────────────────────────────────────────── */
if (document.querySelector('.mySwiper')) {
    var swiper = new Swiper('.mySwiper', {
        slidesPerView: 1,
        spaceBetween: 30,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
        breakpoints: {
            576:  { slidesPerView: 1, spaceBetween: 10 },
            1200: { slidesPerView: 2, spaceBetween: 20 },
        }
    });
}


/* ─────────────────────────────────────────────
   8. SKILL CIRCLES — animated counter + SVG progress
   ───────────────────────────────────────────── */
const firstSkill     = document.querySelector('.skill:first-child');
const skillCounters  = document.querySelectorAll('.counter span');
const progressBars   = document.querySelectorAll('.skills svg circle');

let skillsPlayed = false;

function hasReached(el) {
    if (!el) return false;
    const topPos = el.getBoundingClientRect().top;
    return window.innerHeight >= topPos + el.offsetHeight;
}

function updateCount(numEl, maxNum) {
    const current = +numEl.innerText;
    if (current < maxNum) {
        numEl.innerText = current + 1;
        setTimeout(() => updateCount(numEl, maxNum), 12);
    }
}

function skillsCounter() {
    if (!hasReached(firstSkill)) return;
    skillsPlayed = true;

    skillCounters.forEach((counter, i) => {
        const target      = +counter.dataset.target;
        const strokeValue = 465 - 465 * (target / 100);

        progressBars[i].style.setProperty('--target', strokeValue);

        setTimeout(() => updateCount(counter, target), 400);
    });

    progressBars.forEach(p => {
        p.style.animation = 'progress 2s ease-in-out forwards';
    });
}

window.addEventListener('scroll', () => {
    if (!skillsPlayed) skillsCounter();
});


/* ─────────────────────────────────────────────
   9. SCROLL-TO-TOP PROGRESS RING
   ───────────────────────────────────────────── */
const scrollProgress = document.getElementById('progress');

function calcScrollValue() {
    const pos        = document.documentElement.scrollTop;
    const calcHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const pct        = Math.round((pos * 100) / calcHeight);

    scrollProgress.style.display = pos > 100 ? 'grid' : 'none';
    scrollProgress.style.background =
        `conic-gradient(#fff ${pct}%, #e6006d ${pct}%)`;
}

scrollProgress.addEventListener('click', () => {
    document.documentElement.scrollTop = 0;
});

window.addEventListener('scroll', calcScrollValue);
window.addEventListener('load',   calcScrollValue);


/* ─────────────────────────────────────────────
   10. ACTIVE NAV LINK ON SCROLL
   ───────────────────────────────────────────── */
const menuLinks  = document.querySelectorAll('header ul li a');
const sections   = document.querySelectorAll('section');

function activeMenu() {
    let len = sections.length;
    while (--len && window.scrollY + 97 < sections[len].offsetTop) {}
    menuLinks.forEach(a => a.classList.remove('active'));
    if (menuLinks[len]) menuLinks[len].classList.add('active');
}

activeMenu();
window.addEventListener('scroll', activeMenu);


/* ─────────────────────────────────────────────
   11. SCROLL REVEAL
   ───────────────────────────────────────────── */
ScrollReveal({
    distance: '90px',
    duration: 2000,
    delay:    200,
});

ScrollReveal().reveal('.hero-info, .main-text, .proposal, .heading',      { origin: 'top' });
ScrollReveal().reveal('.about-img, .fillter-buttons, .contact-info',       { origin: 'left' });
ScrollReveal().reveal('.about-content, .skills',                           { origin: 'right' });
ScrollReveal().reveal('.allServices, .portfolio-gallery, .blog-box, footer, .img-hero', { origin: 'bottom' });
