// main.js
document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    const preloader = document.querySelector('.preloader');
    const preloaderDuration = 1000; // 1 second
    
    // Hide preloader after page loads
    window.addEventListener('load', function() {
        setTimeout(function() {
            preloader.style.opacity = '0';
            setTimeout(function() {
                preloader.style.display = 'none';
            }, 500);
        }, preloaderDuration);
    });

    // Custom Cursor
    const cursorOuter = document.querySelector('.cursor-outer');
    const cursorInner = document.querySelector('.cursor-inner');
    let mouseX = 0, mouseY = 0;
    let cursorOuterX = 0, cursorOuterY = 0;
    let cursorInnerX = 0, cursorInnerY = 0;
    let isLinkHovered = false;

    // Update cursor position
    function updateCursor() {
        cursorOuterX += (mouseX - cursorOuterX) / 8;
        cursorOuterY += (mouseY - cursorOuterY) / 8;
        cursorInnerX = mouseX;
        cursorInnerY = mouseY;
        
        cursorOuter.style.transform = `translate3d(${cursorOuterX}px, ${cursorOuterY}px, 0)`;
        cursorInner.style.transform = `translate3d(${cursorInnerX}px, ${cursorInnerY}px, 0)`;
        
        requestAnimationFrame(updateCursor);
    }

    // Track mouse movement
    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Initialize cursor
    updateCursor();

    // Handle link hover states
    const hoverableElements = document.querySelectorAll('a, button, .btn, .nav-link, .research-link, .publication-link, .teaching-link');
    
    hoverableElements.forEach(el => {
        el.addEventListener('mouseenter', function() {
            isLinkHovered = true;
            cursorInner.style.width = '20px';
            cursorInner.style.height = '20px';
            cursorInner.style.backgroundColor = 'transparent';
            cursorInner.style.border = '2px solid var(--secondary-color)';
            cursorOuter.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) scale(1.5)`;
        });
        
        el.addEventListener('mouseleave', function() {
            isLinkHovered = false;
            cursorInner.style.width = '8px';
            cursorInner.style.height = '8px';
            cursorInner.style.backgroundColor = 'var(--secondary-color)';
            cursorInner.style.border = 'none';
            cursorOuter.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) scale(1)`;
        });
    });

    // Navigation
    const navbar = document.querySelector('.navbar');
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Add scroll event to navbar
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Toggle mobile menu
    navbarToggler.addEventListener('click', function() {
        this.classList.toggle('active');
        navbarCollapse.classList.toggle('active');
        
        // Toggle body overflow when menu is open
        if (navbarCollapse.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });

    // Close mobile menu when clicking a link
    navLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            navbarToggler.classList.remove('active');
            navbarCollapse.classList.remove('active');
            document.body.style.overflow = '';
            
            // Set active link
            navLinks.forEach(function(navLink) {
                navLink.classList.remove('active');
            });
            this.classList.add('active');
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

// Select the button
const backToTop = document.querySelector('.back-to-top');

// Scroll event listener
window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
        backToTop.classList.add('active');
    } else {
        backToTop.classList.remove('active');
    }
});

// Click event for smooth scrolling
backToTop.addEventListener('click', function(e) {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

    // Enhanced JS
window.addEventListener('scroll', function() {
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;
    const scrollable = scrollHeight - clientHeight;
    const scrolled = window.scrollY;
    
    // Show/hide logic
    if (scrolled > 300) {
        backToTop.classList.add('active');
        
        // Progress animation (optional)
        const progress = (scrolled / scrollable) * 100;
        backToTop.style.setProperty('--progress', `${progress}%`);
        
    } else {
        backToTop.classList.remove('active');
    }
});











    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Simple validation
            if (!name || !email || !subject || !message) {
                showAlert('Please fill in all fields', 'error');
                return;
            }
            
            if (!validateEmail(email)) {
                showAlert('Please enter a valid email address', 'error');
                return;
            }
            
            // Here you would typically send the form data to a server
            // For demonstration, we'll simulate a successful submission
            simulateFormSubmission(name);
        });
    }

    // Form helper functions
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function showAlert(message, type) {
        const alertDiv = document.createElement('div');
        alertDiv.className = `form-alert form-alert-${type}`;
        alertDiv.textContent = message;
        
        contactForm.prepend(alertDiv);
        
        setTimeout(() => {
            alertDiv.style.opacity = '0';
            setTimeout(() => {
                alertDiv.remove();
            }, 500);
        }, 3000);
    }

    function simulateFormSubmission(name) {
        // Show loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        // Simulate network request
        setTimeout(() => {
            // Show success message
            showAlert(`Thank you, ${name}! Your message has been sent successfully.`, 'success');
            
            // Reset form
            contactForm.reset();
            
            // Reset button
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
        }, 1500);
    }

    // Publication filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const publicationItems = document.querySelectorAll('.publication-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            // Filter publications
            publicationItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'flex';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Initialize animations
    initAnimations();
    
    // Initialize particles.js if available
    if (typeof particlesJS !== 'undefined') {
        particlesJS.load('particles-js', 'assets/particles.json', function() {
            console.log('Particles.js loaded successfully');
        });
    }

    // Initialize AOS (Animate On Scroll)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            offset: 100
        });
    }
});

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

// particles.json - Particle.js configuration
const particlesConfig = {
    "particles": {
        "number": {
            "value": 80,
            "density": {
                "enable": true,
                "value_area": 800
            }
        },
        "color": {
            "value": "#4b8ab9"
        },
        "shape": {
            "type": "circle",
            "stroke": {
                "width": 0,
                "color": "#000000"
            },
            "polygon": {
                "nb_sides": 5
            }
        },
        "opacity": {
            "value": 0.5,
            "random": false,
            "anim": {
                "enable": false,
                "speed": 1,
                "opacity_min": 0.1,
                "sync": false
            }
        },
        "size": {
            "value": 3,
            "random": true,
            "anim": {
                "enable": false,
                "speed": 40,
                "size_min": 0.1,
                "sync": false
            }
        },
        "line_linked": {
            "enable": true,
            "distance": 150,
            "color": "#4b8ab9",
            "opacity": 0.4,
            "width": 1
        },
        "move": {
            "enable": true,
            "speed": 2,
            "direction": "none",
            "random": false,
            "straight": false,
            "out_mode": "out",
            "bounce": false,
            "attract": {
                "enable": false,
                "rotateX": 600,
                "rotateY": 1200
            }
        }
    },
    "interactivity": {
        "detect_on": "canvas",
        "events": {
            "onhover": {
                "enable": true,
                "mode": "grab"
            },
            "onclick": {
                "enable": true,
                "mode": "push"
            },
            "resize": true
        },
        "modes": {
            "grab": {
                "distance": 140,
                "line_linked": {
                    "opacity": 1
                }
            },
            "bubble": {
                "distance": 400,
                "size": 40,
                "duration": 2,
                "opacity": 8,
                "speed": 3
            },
            "repulse": {
                "distance": 200,
                "duration": 0.4
            },
            "push": {
                "particles_nb": 4
            },
            "remove": {
                "particles_nb": 2
            }
        }
    },
    "retina_detect": true
};

// Save particlesConfig to a file named particles.json in your assets folder