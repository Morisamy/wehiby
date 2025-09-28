// Contact Page Specific JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initContactForm();
    initFAQ();
    initFormValidation();
    initFormAnimations();
});

// Contact Form Functionality
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate form
            if (validateForm()) {
                submitForm();
            }
        });
        
        // Real-time validation
        const inputs = contactForm.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => validateField(input));
            input.addEventListener('input', () => clearFieldError(input));
        });
    }
}

// Form Validation
function validateForm() {
    const form = document.getElementById('contact-form');
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
        }
    });
    
    // Validate email format
    const emailField = form.querySelector('#email');
    if (emailField.value && !isValidEmail(emailField.value)) {
        showFieldError(emailField, 'Please enter a valid email address');
        isValid = false;
    }
    
    // Validate phone format if provided
    const phoneField = form.querySelector('#phone');
    if (phoneField.value && !isValidPhone(phoneField.value)) {
        showFieldError(phoneField, 'Please enter a valid phone number');
        isValid = false;
    }
    
    return isValid;
}

function validateField(field) {
    const value = field.value.trim();
    
    // Clear previous errors
    clearFieldError(field);
    
    // Check if required field is empty
    if (field.hasAttribute('required') && !value) {
        showFieldError(field, 'This field is required');
        return false;
    }
    
    // Email validation
    if (field.type === 'email' && value && !isValidEmail(value)) {
        showFieldError(field, 'Please enter a valid email address');
        return false;
    }
    
    // Phone validation
    if (field.type === 'tel' && value && !isValidPhone(value)) {
        showFieldError(field, 'Please enter a valid phone number');
        return false;
    }
    
    // Show success state for valid fields
    if (value) {
        showFieldSuccess(field);
    }
    
    return true;
}

function showFieldError(field, message) {
    const formGroup = field.closest('.form-group');
    formGroup.classList.add('error');
    formGroup.classList.remove('success');
    
    // Remove existing error message
    const existingError = formGroup.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Add new error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    formGroup.appendChild(errorDiv);
}

function showFieldSuccess(field) {
    const formGroup = field.closest('.form-group');
    formGroup.classList.add('success');
    formGroup.classList.remove('error');
    
    // Remove existing messages
    const existingError = formGroup.querySelector('.error-message');
    const existingSuccess = formGroup.querySelector('.success-message');
    if (existingError) existingError.remove();
    if (existingSuccess) existingSuccess.remove();
}

function clearFieldError(field) {
    const formGroup = field.closest('.form-group');
    formGroup.classList.remove('error', 'success');
    
    const existingError = formGroup.querySelector('.error-message');
    const existingSuccess = formGroup.querySelector('.success-message');
    if (existingError) existingError.remove();
    if (existingSuccess) existingSuccess.remove();
}

// Utility Functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
}

// Form Submission
function submitForm() {
    const form = document.getElementById('contact-form');
    const submitBtn = form.querySelector('.submit-btn');
    const formData = new FormData(form);
    
    // Show loading state
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
    
    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        // Get form data
        const data = Object.fromEntries(formData);
        
        // Log form data (remove in production)
        console.log('Form submitted:', data);
        
        // Show success message
        showNotification('Thank you for your message! We will get back to you within 24 hours.', 'success');
        
        // Reset form
        form.reset();
        
        // Clear all field states
        const formGroups = form.querySelectorAll('.form-group');
        formGroups.forEach(group => {
            group.classList.remove('error', 'success');
            const errorMsg = group.querySelector('.error-message');
            const successMsg = group.querySelector('.success-message');
            if (errorMsg) errorMsg.remove();
            if (successMsg) successMsg.remove();
        });
        
        // Reset button
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
        
        // Scroll to top of form
        form.scrollIntoView({ behavior: 'smooth', block: 'start' });
        
    }, 2000); // Simulate 2-second delay
}

// FAQ Functionality
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            if (isActive) {
                item.classList.remove('active');
            } else {
                item.classList.add('active');
            }
        });
    });
}

// Form Animations
function initFormAnimations() {
    // Animate form elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe form and contact info
    const animateElements = document.querySelectorAll('.contact-form-container, .contact-info-container, .faq-item');
    animateElements.forEach(el => {
        observer.observe(el);
    });
    
    // Add animation styles
    const animationStyle = document.createElement('style');
    animationStyle.textContent = `
        .contact-form-container, .contact-info-container, .faq-item {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.8s ease;
        }
        
        .contact-form-container.animate-in, 
        .contact-info-container.animate-in, 
        .faq-item.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .faq-item {
            transition-delay: 0.1s;
        }
        
        .faq-item:nth-child(2) { transition-delay: 0.2s; }
        .faq-item:nth-child(3) { transition-delay: 0.3s; }
        .faq-item:nth-child(4) { transition-delay: 0.4s; }
        .faq-item:nth-child(5) { transition-delay: 0.5s; }
        .faq-item:nth-child(6) { transition-delay: 0.6s; }
    `;
    document.head.appendChild(animationStyle);
}

// Enhanced Input Focus Effects
function initInputFocusEffects() {
    const inputs = document.querySelectorAll('input, select, textarea');
    
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });
    });
}

// Initialize input focus effects
initInputFocusEffects();

// Character Counter for Textarea
function initCharacterCounter() {
    const textarea = document.querySelector('#message');
    
    if (textarea) {
        const maxLength = 1000;
        const counter = document.createElement('div');
        counter.className = 'character-counter';
        counter.style.cssText = `
            text-align: right;
            font-size: 0.8rem;
            color: var(--text-muted);
            margin-top: 0.25rem;
        `;
        
        textarea.parentElement.appendChild(counter);
        
        function updateCounter() {
            const remaining = maxLength - textarea.value.length;
            counter.textContent = `${textarea.value.length}/${maxLength} characters`;
            
            if (remaining < 100) {
                counter.style.color = 'var(--secondary-color)';
            } else {
                counter.style.color = 'var(--text-muted)';
            }
        }
        
        textarea.addEventListener('input', updateCounter);
        updateCounter(); // Initial count
    }
}

// Initialize character counter
initCharacterCounter();

// Form Auto-save (Optional)
function initAutoSave() {
    const form = document.getElementById('contact-form');
    const inputs = form.querySelectorAll('input, select, textarea');
    
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            // Save to localStorage
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            localStorage.setItem('contactFormDraft', JSON.stringify(data));
        });
    });
    
    // Restore saved data on page load
    const savedData = localStorage.getItem('contactFormDraft');
    if (savedData) {
        try {
            const data = JSON.parse(savedData);
            Object.keys(data).forEach(key => {
                const field = form.querySelector(`[name="${key}"]`);
                if (field && data[key]) {
                    field.value = data[key];
                }
            });
        } catch (e) {
            console.log('Could not restore form data');
        }
    }
    
    // Clear saved data on successful submission
    form.addEventListener('submit', function() {
        localStorage.removeItem('contactFormDraft');
    });
}

// Initialize auto-save
initAutoSave();

// Enhanced Notification System
function showNotification(message, type = 'info', duration = 5000) {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    // Set notification content
    const icon = type === 'success' ? '✓' : type === 'error' ? '✗' : 'ℹ';
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${icon}</span>
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#00ff88' : type === 'error' ? '#ff6b35' : '#7c3aed'};
        color: white;
        border-radius: 10px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 400px;
        font-weight: 500;
    `;
    
    // Style notification content
    const style = document.createElement('style');
    style.textContent = `
        .notification-content {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            padding: 15px 20px;
        }
        
        .notification-icon {
            font-size: 1.2rem;
            font-weight: bold;
        }
        
        .notification-message {
            flex: 1;
        }
        
        .notification-close {
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0;
            width: 24px;
            height: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            transition: background 0.3s ease;
        }
        
        .notification-close:hover {
            background: rgba(255, 255, 255, 0.2);
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 300);
    });
    
    // Auto remove
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                if (notification.parentElement) {
                    notification.remove();
                }
            }, 300);
        }
    }, duration);
}
