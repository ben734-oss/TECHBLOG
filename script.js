// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navList = document.querySelector('.nav-list');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            navList.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-list a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navList.classList.remove('active');
        });
    });
    
    // Back to Top Button
    const backToTopButton = document.getElementById('backToTop');
    
    if (backToTopButton) {
        // Show/hide button based on scroll position
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('show');
            } else {
                backToTopButton.classList.remove('show');
            }
        });
        
        // Scroll to top when button is clicked
        backToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Add loading animation to post cards
    const postCards = document.querySelectorAll('.post-card');
    postCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
    });
    
    // Animate cards on page load
    setTimeout(() => {
        postCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }, 300);
    
    // Add active class to current page in navigation
    const currentPage = window.location.pathname.split('/').pop();
    const navLinksAll = document.querySelectorAll('.nav-list a');
    
    navLinksAll.forEach(link => {
        const linkHref = link.getAttribute('href');
        
        if (currentPage === linkHref) {
            link.classList.add('active');
        } else if (currentPage === '' && linkHref === 'index.html') {
            link.classList.add('active');
        }
    });

});

// WhatsApp Contact Functionality
document.addEventListener('DOMContentLoaded', function() {
    // ... existing code ...

    // WhatsApp Button Functionality
    const whatsappButtons = document.querySelectorAll('.whatsapp-btn');
    const customMessageBtn = document.querySelector('.whatsapp-btn.custom-message');
    const modal = document.getElementById('customMessageModal');
    const closeModal = document.querySelector('.close-modal');
    const customWhatsAppForm = document.getElementById('customWhatsAppForm');

    // Pre-defined WhatsApp messages
    whatsappButtons.forEach(button => {
        if (!button.classList.contains('custom-message')) {
            button.addEventListener('click', function() {
                const phoneNumber = this.getAttribute('data-number');
                const message = this.getAttribute('data-message');
                sendWhatsAppMessage(phoneNumber, message);
            });
        }
    });

    // Custom Message Modal
    if (customMessageBtn) {
        customMessageBtn.addEventListener('click', function() {
            if (modal) {
                modal.style.display = 'block';
            }
        });
    }

    // Close Modal
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            if (modal) {
                modal.style.display = 'none';
            }
        });
    }

    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Custom WhatsApp Form
    if (customWhatsAppForm) {
        customWhatsAppForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('customName').value.trim();
            const message = document.getElementById('customMessage').value.trim();
            const phoneNumber = '+233241360585'; // Your WhatsApp number
            
            if (!message) {
                alert('Please enter your message.');
                return;
            }

            const fullMessage = name ? `Hello! My name is ${name}. ${message}` : `Hello! ${message}`;
            sendWhatsAppMessage(phoneNumber, fullMessage);
            
            // Close modal and reset form
            modal.style.display = 'none';
            this.reset();
        });
    }

    // Function to send WhatsApp message
    function sendWhatsAppMessage(phoneNumber, message) {
        // Clean phone number (remove any non-digit characters except +)
        const cleanNumber = phoneNumber.replace(/[^\d+]/g, '');
        
        // Encode message for URL
        const encodedMessage = encodeURIComponent(message);
        
        // Create WhatsApp URL
        const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodedMessage}`;
        
        // Open in new tab
        window.open(whatsappUrl, '_blank');
    }

    // Detect if user is on mobile device for better WhatsApp experience
    function isMobileDevice() {
        return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
    }

    // Add mobile-specific enhancements
    if (isMobileDevice()) {
        document.body.classList.add('mobile-device');
        
        // Make WhatsApp links open in same tab on mobile (better user experience)
        const whatsappLinks = document.querySelectorAll('.whatsapp-direct-link, .whatsapp-float');
        whatsappLinks.forEach(link => {
            link.setAttribute('target', '_self');
        });
    }

    // WhatsApp click tracking (optional - for analytics)
    const whatsappElements = document.querySelectorAll('[class*="whatsapp"]');
    whatsappElements.forEach(element => {
        element.addEventListener('click', function() {
            // You can add analytics tracking here
            console.log('WhatsApp button clicked:', this.textContent);
            
            // Example: Send to Google Analytics
            // gtag('event', 'whatsapp_click', {
            //     'event_category': 'Contact',
            //     'event_label': this.textContent
            // });
        });
    });
});
