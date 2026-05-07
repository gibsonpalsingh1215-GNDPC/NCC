// ── LOADER ──
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    const fill = document.querySelector('.loader-fill');
    const pct = document.getElementById('loadPct');
    let p = 0;
    const interval = setInterval(() => {
        p = Math.min(p + Math.random() * 18, 100);
        fill.style.width = p + '%';
        pct.textContent = Math.floor(p) + '%';
        if (p >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                loader.classList.add('hidden');
                animateCounters();
            }, 400);
        }
    }, 80);
});

// ── CURSOR ──
const cursor = document.getElementById('cursor');
const trail = document.getElementById('cursorTrail');
let mx = 0, my = 0, tx = 0, ty = 0;

document.addEventListener('mousemove', (e) => {
    mx = e.clientX; my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top = my + 'px';
});

function animateTrail() {
    tx += (mx - tx) * 0.15;
    ty += (my - ty) *.15;
    trail.style.left = tx + 'px';
    trail.style.top = ty + 'px';
    requestAnimationFrame(animateTrail);
}
animateTrail();

document.querySelectorAll('a, button, .qa-card, .mission-card, .camp-card, .cert-card').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.style.transform = 'translate(-50%,-50%) scale(2.5)');
    el.addEventListener('mouseleave', () => cursor.style.transform = 'translate(-50%,-50%) scale(1)');
});

// ── PAGE ROUTING ──
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    const target = document.getElementById('page-' + pageId);
    if (target) {
        target.classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.toggle('active', link.dataset.page === pageId);
    });
    // Close mobile menu
    document.getElementById('navLinks').classList.remove('open');
}

// ── MOBILE MENU ──
function toggleMobileMenu() {
    document.getElementById('navLinks').classList.toggle('open');
}

// ── COUNTER ANIMATION ──
function animateCounters() {
    document.querySelectorAll('.counter').forEach(counter => {
        const target = +counter.getAttribute('data-target');
        let count = 0;
        const step = target / 70;
        const timer = setInterval(() => {
            count = Math.min(count + step, target);
            counter.textContent = Math.floor(count);
            if (count >= target) clearInterval(timer);
        }, 25);
    });
}

// ── INTERSECTION OBSERVER FOR STATS ──
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsBand = document.querySelector('.stats-band');
if (statsBand) statsObserver.observe(statsBand);

// ── NAVBAR SCROLL EFFECT ──
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.style.background = window.scrollY > 50
        ? 'rgba(6,7,11,0.99)'
        : 'rgba(6,7,11,0.92)';
});

// ── REVEAL ANIMATIONS (Intersection Observer) ──
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

function observeReveal() {
    document.querySelectorAll('.mission-card, .qa-card, .camp-card, .cert-card, .rank-full-card, .wing-card, .alumni-card, .fund-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease, border-color 0.4s, box-shadow 0.4s';
        revealObserver.observe(el);
    });
}

// Run on page change
const observer = new MutationObserver(() => observeReveal());
observer.observe(document.body, { childList: true, subtree: true });

// Run on first load
setTimeout(observeReveal, 100);

// ── KEYBOARD NAVIGATION ──
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') showPage('home');
});

// ── ACTIVE PAGE INDICATOR ──
// Default to home
showPage('home');

// ── PARALLAX EFFECT ON HERO ──
document.addEventListener('mousemove', (e) => {
    const heroBg = document.querySelector('.hero-bg-img');
    if (!heroBg) return;
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;
    heroBg.style.transform = `translate(${x}px, ${y}px) scale(1.05)`;
});
