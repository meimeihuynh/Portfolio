// Burger menu toggle
const burgerToggle = document.getElementById('burgerToggle');
const burgerNav = document.getElementById('burgerNav');

if (burgerToggle) {
    burgerToggle.addEventListener('click', function() {
        burgerToggle.classList.toggle('active');
        burgerNav.classList.toggle('active');
    });
}

// Close burger menu when a link is clicked
document.querySelectorAll('.burger-menu-items a').forEach(link => {
    link.addEventListener('click', function() {
        burgerToggle.classList.remove('active');
        burgerNav.classList.remove('active');
    });
});

// Close burger menu when clicking outside
document.addEventListener('click', function(event) {
    if (!event.target.closest('.burger-toggle') && !event.target.closest('.burger-nav')) {
        if (burgerToggle && burgerNav) {
            burgerToggle.classList.remove('active');
            burgerNav.classList.remove('active');
        }
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add active class to navbar items on scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Fade in animations on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe tool cards and qualification items
document.querySelectorAll('.tool-card, .qualification-item').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(element);
});

// Add hover effect to navbar
const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach(link => {
    link.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
        this.style.transition = 'transform 0.3s ease';
    });99
    link.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Mobile menu toggle (if you add a hamburger menu later)
function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    navMenu.classList.toggle('active');
}

// Add CSS for active navigation link
const style = document.createElement('style');
style.textContent = `
    .nav-menu a.active {
        color: var(--primary-color);
        border-bottom: 2px solid var(--primary-color);
        padding-bottom: 5px;
    }
`;
document.head.appendChild(style);

// About section: 'Mer informasjon' toggle
const moreInfoBtn = document.getElementById('moreInfoBtn');
const moreInfo = document.getElementById('moreInfo');
if (moreInfoBtn && moreInfo) {
    const lessInfoBtn = document.getElementById('lessInfoBtn');

    function openMoreInfo(open) {
        moreInfo.classList.toggle('open', open);
        moreInfoBtn.setAttribute('aria-expanded', open);
        moreInfo.setAttribute('aria-hidden', !open);
        moreInfoBtn.style.display = open ? 'none' : '';
    }

    moreInfoBtn.addEventListener('click', () => {
        openMoreInfo(true);
    });

    moreInfoBtn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            moreInfoBtn.click();
        }
    });

    if (lessInfoBtn) {
        lessInfoBtn.addEventListener('click', () => {
            openMoreInfo(false);
            moreInfoBtn.focus();
        });

        lessInfoBtn.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                lessInfoBtn.click();
            }
        });
    }
}
