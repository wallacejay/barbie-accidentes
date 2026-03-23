/* ========================================
   LA BARBIE DE LOS ACCIDENTES
   JavaScript - Interactions
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {
    
    // ========================================
    // MOBILE MENU TOGGLE
    // ========================================
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Toggle icon between bars and times
            const icon = navToggle.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
        
        // Close menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                const icon = navToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInside = navToggle.contains(event.target) || navMenu.contains(event.target);
            if (!isClickInside && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                const icon = navToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // ========================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ========================================
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = target.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // ========================================
    // WHATSAPP FLOATING BUTTON VISIBILITY
    // ========================================
    const whatsappFloat = document.querySelector('.whatsapp-float');
    
    if (whatsappFloat) {
        // Show/hide based on scroll position
        let lastScroll = 0;
        
        window.addEventListener('scroll', function() {
            const currentScroll = window.pageYOffset;
            
            // Show button after scrolling down 500px
            if (currentScroll > 500) {
                whatsappFloat.style.opacity = '1';
                whatsappFloat.style.visibility = 'visible';
            } else {
                whatsappFloat.style.opacity = '0';
                whatsappFloat.style.visibility = 'hidden';
            }
            
            lastScroll = currentScroll;
        });
        
        // Initial state
        whatsappFloat.style.opacity = '0';
        whatsappFloat.style.visibility = 'hidden';
        whatsappFloat.style.transition = 'opacity 0.3s ease, visibility 0.3s ease';
    }
    
    // ========================================
    // ACTIVE NAV LINK ON SCROLL
    // ========================================
    const sections = document.querySelectorAll('section[id]');
    const navLinksItems = document.querySelectorAll('.nav-link');
    
    function updateActiveNav() {
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinksItems.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNav);
    
    // ========================================
    // FORM SUBMISSION TRACKING (Google Forms)
    // ========================================
    const formIframe = document.querySelector('.contacto-form iframe');
    
    if (formIframe) {
        // Listen for form submission (Google Forms sends a postMessage)
        window.addEventListener('message', function(event) {
            if (event.data === 'form-submit') {
                console.log('Form submitted successfully');
                
                // Optional: Show success message
                alert('¡Gracias! Tu mensaje ha sido enviado. Nos pondremos en contacto contigo pronto.');
            }
        });
    }
    
    // ========================================
    // BUTTON CLICK ANALYTICS (Optional)
    // ========================================
    const whatsappButtons = document.querySelectorAll('.btn-whatsapp, .whatsapp-float');
    const callButtons = document.querySelectorAll('.btn-call');
    
    whatsappButtons.forEach(button => {
        button.addEventListener('click', function() {
            console.log('WhatsApp button clicked');
            // You can add analytics tracking here (e.g., Google Analytics)
            // gtag('event', 'click', { 'event_category': 'CTA', 'event_label': 'WhatsApp' });
        });
    });
    
    callButtons.forEach(button => {
        button.addEventListener('click', function() {
            console.log('Call button clicked');
            // You can add analytics tracking here
            // gtag('event', 'click', { 'event_category': 'CTA', 'event_label': 'Call' });
        });
    });
    
    // ========================================
    // ANIMATIONS ON SCROLL (Optional Enhancement)
    // ========================================
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.servicio-card, .consulta-card, .paso-card');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 50) {
                element.classList.add('animate-in');
            }
        });
    };
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on load
    
});

// ========================================
// UTILITY: Debounce Function
// ========================================
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
