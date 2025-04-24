// animations.js
function initAnimations() {
    // Initialize AOS (Animate On Scroll) if available
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            offset: 100,
            disable: window.innerWidth < 768 // Disable on mobile
        });
    }

    // Hero section animations
    animateHeroElements();

    // Scroll-triggered animations
    setupScrollAnimations();

    // Contact section staggered animations
    animateContactElements();

    // Special timeline animations
    animateTimelineElements();
}

function animateHeroElements() {
    const heroElements = [
        { element: document.querySelector('.hero-title'), delay: 300 },
        { element: document.querySelector('.hero-subtitle-wrapper'), delay: 600 },
        { element: document.querySelector('.hero-text'), delay: 900 },
        { element: document.querySelector('.hero-buttons'), delay: 1200 }
    ];

    heroElements.forEach(item => {
        if (item.element) {
            setTimeout(() => {
                item.element.style.opacity = '1';
                item.element.style.transform = 'translateY(0)';
            }, item.delay);
        }
    });
}

function setupScrollAnimations() {
    const animatedElements = document.querySelectorAll(
        '[data-aos], .research-item, .publication-item, .teaching-item, .info-item'
    );

    const animateElement = (element) => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        const offset = 100;

        if (elementTop < windowHeight - offset) {
            // Skip if already animated
            if (element.classList.contains('animated')) return;

            // Get delay from data attribute or use index-based delay
            const delay = element.dataset.aosDelay || 
                         Array.from(animatedElements).indexOf(element) * 100;

            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translate(0)';
                element.classList.add('animated');
            }, delay);
        }
    };

    // Initial check
    animatedElements.forEach(animateElement);

    // Scroll event listener with debounce
    let isScrolling;
    window.addEventListener('scroll', () => {
        clearTimeout(isScrolling);
        isScrolling = setTimeout(() => {
            animatedElements.forEach(animateElement);
        }, 50);
    }, { passive: true });
}

function animateContactElements() {
    const infoItems = document.querySelectorAll('.info-item');
    const contactForm = document.querySelector('.contact-form');

    // Animate info items with staggered delay
    infoItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }, index * 150);
    });

    // Animate contact form
    if (contactForm) {
        setTimeout(() => {
            contactForm.style.opacity = '1';
            contactForm.style.transform = 'translateX(0)';
        }, 600);
    }
}

function animateTimelineElements() {
    const timelineItems = document.querySelectorAll('.timeline-item');

    timelineItems.forEach((item, index) => {
        // Set initial state
        item.style.opacity = '0';
        
        // Alternate animation directions
        if (index % 2 === 0) {
            item.style.transform = 'translateX(-50px)';
        } else {
            item.style.transform = 'translateX(50px)';
        }

        // Create intersection observer for each item
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateX(0)';
                    }, index * 200);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        observer.observe(item);
    });
}

// Parallax effect for hero section (optional)
function setupParallax() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    window.addEventListener('scroll', () => {
        const scrollPosition = window.pageYOffset;
        hero.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
    });
}

// Initialize all animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initAnimations();
    setupParallax();
});

// Re-init animations when window is resized (for responsive adjustments)
window.addEventListener('resize', () => {
    if (typeof AOS !== 'undefined') {
        AOS.refresh();
    }
});