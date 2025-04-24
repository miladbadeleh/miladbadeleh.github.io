
// animations.js
function initAnimations() {
    // Animate hero elements
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle-wrapper');
    const heroText = document.querySelector('.hero-text');
    const heroButtons = document.querySelector('.hero-buttons');
    
    setTimeout(() => {
        if (heroTitle) {
            heroTitle.style.opacity = '1';
            heroTitle.style.transform = 'translateY(0)';
        }
    }, 300);
    
    setTimeout(() => {
        if (heroSubtitle) {
            heroSubtitle.style.opacity = '1';
            heroSubtitle.style.transform = 'translateY(0)';
        }
    }, 600);
    
    setTimeout(() => {
        if (heroText) {
            heroText.style.opacity = '1';
            heroText.style.transform = 'translateY(0)';
        }
    }, 900);
    
    setTimeout(() => {
        if (heroButtons) {
            heroButtons.style.opacity = '1';
            heroButtons.style.transform = 'translateY(0)';
        }
    }, 1200);

    // Animate elements when they come into view
    const animateElements = document.querySelectorAll('[data-aos], .research-item, .publication-item, .timeline-item, .teaching-item, .info-item, .contact-form');
    
    const animateOnScroll = function() {
        animateElements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            const offset = 100;
            
            if (elementPosition < windowHeight - offset) {
                element.style.opacity = '1';
                element.style.transform = 'translate(0)';
                
                // Special case for timeline items
                if (element.classList.contains('timeline-item')) {
                    if (element.classList.contains('aos-animate')) return;
                    
                    const delay = element.getAttribute('data-aos-delay') || 0;
                    setTimeout(() => {
                        element.style.opacity = '1';
                        element.style.transform = 'translateX(0)';
                        element.classList.add('aos-animate');
                    }, delay);
                }
            }
        });
    };
    
    // Initial check
    animateOnScroll();
    
    // Check on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Animate contact info items with staggered delay
    const infoItems = document.querySelectorAll('.info-item');
    infoItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }, index * 150);
    });
    
    // Animate contact form
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        setTimeout(() => {
            contactForm.style.opacity = '1';
            contactForm.style.transform = 'translateX(0)';
        }, 600);
    }
}