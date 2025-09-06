/**
 * Hubris Minerals - Interactive JavaScript
 * Professional Gold Mining Company Website
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initMobileMenu();
    initCarousels();
    initFAQs();
    initSmoothScrolling();
    initScrollAnimations();
    initContactForm();
    updateActiveNavigation();
});

/**
 * Mobile Menu Toggle
 */
function initMobileMenu() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('nav ul');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Update toggle icon
            const icon = this.querySelector('i') || this;
            if (navMenu.classList.contains('active')) {
                icon.innerHTML = '&times;';
            } else {
                icon.innerHTML = '☰';
            }
        });
        
        // Close menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                const icon = menuToggle.querySelector('i') || menuToggle;
                icon.innerHTML = '☰';
            });
        });
    }
}

/**
 * Carousel Functionality
 */
function initCarousels() {
    const carousels = document.querySelectorAll('.minerals-carousel, .products-carousel');
    
    carousels.forEach(carousel => {
        const container = carousel.querySelector('.carousel-container');
        const slides = carousel.querySelectorAll('.carousel-slide');
        const prevBtn = carousel.querySelector('.carousel-nav.prev');
        const nextBtn = carousel.querySelector('.carousel-nav.next');
        
        if (!container || slides.length === 0) return;
        
        let currentSlide = 0;
        const totalSlides = slides.length;
        
        function updateCarousel() {
            const translateX = -currentSlide * 100;
            container.style.transform = `translateX(${translateX}%)`;
        }
        
        function nextSlide() {
            currentSlide = (currentSlide + 1) % totalSlides;
            updateCarousel();
        }
        
        function prevSlide() {
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            updateCarousel();
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', nextSlide);
        }
        
        if (prevBtn) {
            prevBtn.addEventListener('click', prevSlide);
        }
        
        // Auto-play carousel (optional)
        if (carousel.dataset.autoplay !== 'false') {
            setInterval(nextSlide, 5000);
        }
        
        // Touch/swipe support
        let startX = 0;
        let currentX = 0;
        let isDragging = false;
        
        carousel.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            isDragging = true;
        });
        
        carousel.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            currentX = e.touches[0].clientX;
        });
        
        carousel.addEventListener('touchend', () => {
            if (!isDragging) return;
            
            const deltaX = startX - currentX;
            if (Math.abs(deltaX) > 50) {
                if (deltaX > 0) {
                    nextSlide();
                } else {
                    prevSlide();
                }
            }
            
            isDragging = false;
        });
    });
}

/**
 * FAQ Toggle Functionality
 */
function initFAQs() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            const answer = faqItem.querySelector('.faq-answer');
            const toggle = this.querySelector('.faq-toggle');
            
            // Close other FAQs
            faqQuestions.forEach(otherQuestion => {
                if (otherQuestion !== question) {
                    const otherItem = otherQuestion.parentElement;
                    const otherAnswer = otherItem.querySelector('.faq-answer');
                    const otherToggle = otherQuestion.querySelector('.faq-toggle');
                    
                    otherAnswer.classList.remove('active');
                    otherToggle.classList.remove('active');
                }
            });
            
            // Toggle current FAQ
            answer.classList.toggle('active');
            toggle.classList.toggle('active');
        });
    });
}

/**
 * Smooth Scrolling for Anchor Links
 */
function initSmoothScrolling() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#') {
                e.preventDefault();
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                return;
            }
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Scroll Animations
 */
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.card, .stat-card, .service-item, .mineral-item');
    animateElements.forEach(el => observer.observe(el));
}

/**
 * Contact Form Handling
 */
function initContactForm() {
    const contactForm = document.querySelector('#contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = {};
            formData.forEach((value, key) => {
                data[key] = value;
            });
            
            // Basic validation
            if (!data.name || !data.email || !data.message) {
                showMessage('Please fill in all required fields.', 'error');
                return;
            }
            
            if (!isValidEmail(data.email)) {
                showMessage('Please enter a valid email address.', 'error');
                return;
            }
            
            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission (replace with actual endpoint)
            setTimeout(() => {
                showMessage('Thank you for your message! We will get back to you soon.', 'success');
                this.reset();
                
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }
}

/**
 * Email Validation
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Show Message (Success/Error)
 */
function showMessage(message, type = 'info') {
    // Remove existing messages
    const existingMessages = document.querySelectorAll('.form-message');
    existingMessages.forEach(msg => msg.remove());
    
    // Create new message
    const messageElement = document.createElement('div');
    messageElement.className = `form-message form-message-${type}`;
    messageElement.textContent = message;
    
    // Add styles
    Object.assign(messageElement.style, {
        padding: '1rem',
        borderRadius: '0.5rem',
        marginBottom: '1rem',
        fontWeight: '500',
        backgroundColor: type === 'success' ? 'rgba(34, 197, 94, 0.1)' : 
                        type === 'error' ? 'rgba(239, 68, 68, 0.1)' : 
                        'rgba(59, 130, 246, 0.1)',
        color: type === 'success' ? '#22C55E' : 
               type === 'error' ? '#EF4444' : 
               '#3B82F6',
        border: `1px solid ${type === 'success' ? '#22C55E' : 
                              type === 'error' ? '#EF4444' : 
                              '#3B82F6'}`
    });
    
    // Insert message
    const form = document.querySelector('#contact-form');
    if (form) {
        form.insertBefore(messageElement, form.firstChild);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            messageElement.remove();
        }, 5000);
    }
}

/**
 * Update Active Navigation
 */
function updateActiveNavigation() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || 
            (currentPage === '' && href === 'index.html') ||
            (currentPage === 'index.html' && href === '/')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

/**
 * Number Counter Animation
 */
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number[data-count]');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.floor(current).toLocaleString();
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target.toLocaleString();
            }
        };
        
        // Start animation when element comes into view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(counter);
    });
}

/**
 * Initialize page-specific functionality
 */
function initPageSpecific() {
    // Products page quantity calculator
    const quantityInputs = document.querySelectorAll('.quantity-input');
    quantityInputs.forEach(input => {
        input.addEventListener('input', function() {
            const price = parseFloat(this.dataset.price) || 0;
            const quantity = parseFloat(this.value) || 0;
            const total = price * quantity;
            
            const totalElement = this.parentElement.querySelector('.total-price');
            if (totalElement) {
                totalElement.textContent = `$${total.toLocaleString()}`;
            }
        });
    });
    
    // Animate counters if they exist
    if (document.querySelectorAll('.stat-number[data-count]').length > 0) {
        animateCounters();
    }
}

// Initialize page-specific functionality
document.addEventListener('DOMContentLoaded', initPageSpecific);

/**
 * Utility Functions
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Handle window resize
window.addEventListener('resize', debounce(() => {
    // Update carousel dimensions if needed
    const carousels = document.querySelectorAll('.carousel-container');
    carousels.forEach(carousel => {
        carousel.style.transform = 'translateX(0%)';
    });
}, 250));