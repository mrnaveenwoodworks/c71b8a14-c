/**
 * BuildRight Construction - Landing Page JavaScript
 * Manages interactive elements like navigation, sliders, animations, and form validation
 */

document.addEventListener("DOMContentLoaded", function() {
    // Initialize all interactive components
    initializeMobileNav();
    initializeTestimonialSlider();
    initializeProjectFilters();
    initializeContactForm();
    initializeScrollAnimations();
    initializeCounterAnimation();
});

/**
 * Mobile Navigation Toggle
 */
function initializeMobileNav() {
    // This is handled by Alpine.js in the HTML
    // The code here is for additional functionality or fallback
    const mobileMenuButton = document.querySelector("[data-mobile-menu-button]");
    const mobileMenu = document.querySelector("[data-mobile-menu]");
    
    // Fallback for non-Alpine.js environments
    if (mobileMenuButton && mobileMenu && !window.Alpine) {
        let isOpen = false;
        
        mobileMenuButton.addEventListener("click", function() {
            isOpen = !isOpen;
            mobileMenu.style.display = isOpen ? "block" : "none";
            
            // Add animation class
            if (isOpen) {
                mobileMenu.classList.add("mobile-menu");
            }
        });
        
        // Close mobile menu when clicking on a nav link
        const mobileNavLinks = mobileMenu.querySelectorAll("a");
        mobileNavLinks.forEach(link => {
            link.addEventListener("click", function() {
                isOpen = false;
                mobileMenu.style.display = "none";
            });
        });
    }
    
    // Handle smooth scrolling for all navigation links
    const allNavLinks = document.querySelectorAll("a[href^='#']");
    allNavLinks.forEach(link => {
        link.addEventListener("click", function(e) {
            const targetId = this.getAttribute("href");
            if (targetId === "#") return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed header
                window.scrollTo({
                    top: offsetTop,
                    behavior: "smooth"
                });
            }
        });
    });
}

/**
 * Testimonial Slider
 */
function initializeTestimonialSlider() {
    // This is primarily handled by Alpine.js in the HTML
    // Additional functionality can be added here
    
    // Fallback for non-Alpine.js environments
    if (!window.Alpine) {
        const testimonialSlides = document.querySelectorAll(".testimonial-slide");
        const prevButton = document.querySelector("[data-testimonial-prev]");
        const nextButton = document.querySelector("[data-testimonial-next]");
        const indicators = document.querySelectorAll("[data-testimonial-indicator]");
        
        if (testimonialSlides.length === 0) return;
        
        let currentSlide = 0;
        const totalSlides = testimonialSlides.length;
        
        // Show the first slide
        testimonialSlides.forEach((slide, index) => {
            if (index === 0) {
                slide.style.display = "block";
            } else {
                slide.style.display = "none";
            }
        });
        
        // Update active indicator
        function updateIndicators() {
            indicators.forEach((indicator, index) => {
                if (index === currentSlide) {
                    indicator.classList.add("bg-yellow-600");
                    indicator.classList.remove("bg-gray-600");
                } else {
                    indicator.classList.add("bg-gray-600");
                    indicator.classList.remove("bg-yellow-600");
                }
            });
        }
        
        // Go to specified slide
        function goToSlide(index) {
            testimonialSlides.forEach((slide, i) => {
                if (i === index) {
                    slide.style.display = "block";
                    
                    // Add entrance animation
                    slide.classList.add("fade-in");
                    setTimeout(() => {
                        slide.classList.add("visible");
                    }, 10);
                    setTimeout(() => {
                        slide.classList.remove("fade-in", "visible");
                    }, 500);
                } else {
                    slide.style.display = "none";
                }
            });
            
            currentSlide = index;
            updateIndicators();
        }
        
        // Next slide
        if (nextButton) {
            nextButton.addEventListener("click", function() {
                const nextIndex = (currentSlide + 1) % totalSlides;
                goToSlide(nextIndex);
            });
        }
        
        // Previous slide
        if (prevButton) {
            prevButton.addEventListener("click", function() {
                const prevIndex = (currentSlide - 1 + totalSlides) % totalSlides;
                goToSlide(prevIndex);
            });
        }
        
        // Click on indicators
        indicators.forEach((indicator, index) => {
            indicator.addEventListener("click", function() {
                goToSlide(index);
            });
        });
        
        // Auto-slide every 5 seconds
        let slideInterval = setInterval(() => {
            const nextIndex = (currentSlide + 1) % totalSlides;
            goToSlide(nextIndex);
        }, 5000);
        
        // Pause auto-slide when hovering over the slider
        const sliderContainer = document.querySelector(".testimonial-slider");
        if (sliderContainer) {
            sliderContainer.addEventListener("mouseenter", () => {
                clearInterval(slideInterval);
            });
            
            sliderContainer.addEventListener("mouseleave", () => {
                slideInterval = setInterval(() => {
                    const nextIndex = (currentSlide + 1) % totalSlides;
                    goToSlide(nextIndex);
                }, 5000);
            });
        }
    }
}

/**
 * Project Gallery and Filters
 */
function initializeProjectFilters() {
    // This is primarily handled by Alpine.js in the HTML
    // Additional functionality can be added here
    
    // Fallback for non-Alpine.js environments
    if (!window.Alpine) {
        const filterButtons = document.querySelectorAll("[data-filter]");
        const projectItems = document.querySelectorAll("[data-project]");
        
        if (filterButtons.length === 0 || projectItems.length === 0) return;
        
        filterButtons.forEach(button => {
            button.addEventListener("click", function() {
                const filter = this.getAttribute("data-filter");
                
                // Update active button
                filterButtons.forEach(btn => {
                    btn.classList.remove("bg-yellow-600", "text-white");
                    btn.classList.add("bg-gray-200", "text-gray-800");
                });
                
                this.classList.add("bg-yellow-600", "text-white");
                this.classList.remove("bg-gray-200", "text-gray-800");
                
                // Filter projects
                projectItems.forEach(item => {
                    const category = item.getAttribute("data-project");
                    
                    if (filter === "all" || category === filter) {
                        item.style.display = "block";
                        
                        // Add entrance animation
                        item.classList.add("fade-in");
                        setTimeout(() => {
                            item.classList.add("visible");
                        }, 10);
                        setTimeout(() => {
                            item.classList.remove("fade-in", "visible");
                        }, 500);
                    } else {
                        item.style.display = "none";
                    }
                });
            });
        });
        
        // Initialize lightbox for project images
        const projectImages = document.querySelectorAll("[data-project-image]");
        
        projectImages.forEach(img => {
            img.addEventListener("click", function(e) {
                e.preventDefault();
                
                const imgSrc = this.getAttribute("src");
                const title = this.closest("[data-project]").querySelector("h3").textContent;
                const category = this.closest("[data-project]").getAttribute("data-project");
                
                // Create lightbox
                const lightbox = document.createElement("div");
                lightbox.classList.add("fixed", "inset-0", "z-50", "flex", "items-center", "justify-center", "bg-black", "bg-opacity-90");
                
                lightbox.innerHTML = `
                    <div class="relative max-w-4xl mx-auto p-4">
                        <button class="absolute top-0 right-0 -mt-12 -mr-12 bg-yellow-600 text-white w-10 h-10 rounded-full flex items-center justify-center">×</button>
                        <img src="${imgSrc}" alt="${title}" class="max-h-[80vh] max-w-full">
                        <div class="text-white mt-4">
                            <h3 class="text-xl font-bold">${title}</h3>
                            <p class="text-gray-300">${category}</p>
                        </div>
                    </div>
                `;
                
                document.body.appendChild(lightbox);
                document.body.classList.add("overflow-hidden");
                
                // Close lightbox
                const closeButton = lightbox.querySelector("button");
                closeButton.addEventListener("click", function() {
                    lightbox.classList.add("opacity-0");
                    setTimeout(() => {
                        document.body.removeChild(lightbox);
                        document.body.classList.remove("overflow-hidden");
                    }, 300);
                });
                
                // Close on click outside
                lightbox.addEventListener("click", function(e) {
                    if (e.target === lightbox) {
                        lightbox.classList.add("opacity-0");
                        setTimeout(() => {
                            document.body.removeChild(lightbox);
                            document.body.classList.remove("overflow-hidden");
                        }, 300);
                    }
                });
            });
        });
    }
}

/**
 * Contact Form Validation
 */
function initializeContactForm() {
    const contactForm = document.getElementById("contactForm");
    
    if (!contactForm) return;
    
    contactForm.addEventListener("submit", function(e) {
        e.preventDefault();
        
        // Reset previous error states
        const errorElements = contactForm.querySelectorAll(".error-message");
        errorElements.forEach(element => {
            element.remove();
        });
        
        const inputs = contactForm.querySelectorAll(".form-input");
        inputs.forEach(input => {
            input.classList.remove("error");
        });
        
        // Validate inputs
        let isValid = true;
        
        // Name validation
        const nameInput = contactForm.querySelector("[name='name']");
        if (nameInput && nameInput.value.trim() === "") {
            showError(nameInput, "Please enter your name");
            isValid = false;
        }
        
        // Email validation
        const emailInput = contactForm.querySelector("[name='email']");
        if (emailInput) {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (emailInput.value.trim() === "") {
                showError(emailInput, "Please enter your email");
                isValid = false;
            } else if (!emailPattern.test(emailInput.value.trim())) {
                showError(emailInput, "Please enter a valid email address");
                isValid = false;
            }
        }
        
        // Phone validation
        const phoneInput = contactForm.querySelector("[name='phone']");
        if (phoneInput && phoneInput.value.trim() !== "") {
            const phonePattern = /^[\d\s\+\-\(\)]{10,15}$/;
            if (!phonePattern.test(phoneInput.value.trim())) {
                showError(phoneInput, "Please enter a valid phone number");
                isValid = false;
            }
        }
        
        // Message validation
        const messageInput = contactForm.querySelector("[name='message']");
        if (messageInput && messageInput.value.trim() === "") {
            showError(messageInput, "Please enter your message");
            isValid = false;
        }
        
        // If form is valid, submit or show success message
        if (isValid) {
            // For demonstration, show success message instead of actual form submission
            contactForm.innerHTML = `
                <div class="bg-green-100 border border-green-200 text-green-700 p-4 rounded-md">
                    <h3 class="font-bold text-xl mb-2">Thank you for reaching out!</h3>
                    <p>Your message has been received. Our team will contact you shortly.</p>
                </div>
            `;
            
            // In a real implementation, you would submit the form data to a server
            // const formData = new FormData(contactForm);
            // fetch('/submit-form', {
            //     method: 'POST',
            //     body: formData
            // })
            // .then(response => response.json())
            // .then(data => {
            //     // Handle success
            // })
            // .catch(error => {
            //     // Handle error
            // });
        }
    });
    
    // Helper function to show error messages
    function showError(input, message) {
        input.classList.add("error");
        
        const errorMessage = document.createElement("div");
        errorMessage.classList.add("error-message");
        errorMessage.textContent = message;
        
        input.parentNode.appendChild(errorMessage);
    }
}

/**
 * Scroll Animations
 */
function initializeScrollAnimations() {
    const fadeElements = document.querySelectorAll(".fade-in");
    
    if (fadeElements.length === 0) return;
    
    const options = {
        root: null,
        rootMargin: "0px",
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, options);
    
    fadeElements.forEach(element => {
        observer.observe(element);
    });
}

/**
 * Counter Animation
 */
function initializeCounterAnimation() {
    const counterElements = document.querySelectorAll("[data-counter]");
    
    if (counterElements.length === 0) return;
    
    const options = {
        root: null,
        rootMargin: "0px",
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const targetValue = parseInt(element.getAttribute("data-counter"));
                const duration = parseInt(element.getAttribute("data-duration") || "2000");
                
                animateCounter(element, targetValue, duration);
                observer.unobserve(element); // Stop observing once animated
            }
        });
    }, options);
    
    counterElements.forEach(element => {
        observer.observe(element);
    });
    
    // Counter animation function
    function animateCounter(element, targetValue, duration) {
        const startTime = performance.now();
        const startValue = 0;
        
        function updateCounter(currentTime) {
            const elapsedTime = currentTime - startTime;
            
            if (elapsedTime < duration) {
                const value = Math.round(easeOutQuad(elapsedTime, startValue, targetValue, duration));
                element.textContent = value;
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = targetValue;
            }
        }
        
        requestAnimationFrame(updateCounter);
    }
    
    // Easing function
    function easeOutQuad(t, b, c, d) {
        t /= d;
        return -c * t * (t - 2) + b;
    }
}

/**
 * Theme Switcher (if applicable)
 */
function initializeThemeSwitcher() {
    const themeSwitcher = document.querySelector("[data-theme-switch]");
    
    if (!themeSwitcher) return;
    
    const savedTheme = localStorage.getItem("theme") || "light";
    document.documentElement.classList.toggle("dark", savedTheme === "dark");
    
    themeSwitcher.addEventListener("click", function() {
        const isDark = document.documentElement.classList.toggle("dark");
        localStorage.setItem("theme", isDark ? "dark" : "light");
    });
}

/**
 * Sticky Header
 */
function initializeStickyHeader() {
    const header = document.querySelector("header");
    
    if (!header) return;
    
    const headerHeight = header.offsetHeight;
    let lastScrollTop = 0;
    
    window.addEventListener("scroll", function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > headerHeight) {
            header.classList.add("shadow-md", "bg-white", "bg-opacity-95");
        } else {
            header.classList.remove("shadow-md", "bg-white", "bg-opacity-95");
        }
        
        // Hide header on scroll down, show on scroll up (optional)
        if (scrollTop > lastScrollTop && scrollTop > headerHeight * 2) {
            header.style.transform = `translateY(-${headerHeight}px)`;
        } else {
            header.style.transform = "translateY(0)";
        }
        
        lastScrollTop = scrollTop;
    });
}

/**
 * Initialize any additional UI enhancements
 */
function initializeUIEnhancements() {
    // Add any additional UI enhancements here
    
    // Preloader (if applicable)
    const preloader = document.getElementById("preloader");
    if (preloader) {
        window.addEventListener("load", function() {
            setTimeout(() => {
                preloader.classList.add("opacity-0");
                setTimeout(() => {
                    preloader.style.display = "none";
                }, 500);
            }, 500);
        });
    }
}

// Helper utility functions

/**
 * Debounce function to limit the rate at which a function can fire
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

/**
 * Throttle function to limit the rate at which a function can fire
 */
function throttle(func, limit) {
    let inThrottle;
    return function executedFunction(...args) {
        if (!inThrottle) {
            func(...args);
            inThrottle = true;
            setTimeout(() => {
                inThrottle = false;
            }, limit);
        }
    };
}

// Call additional initializations if needed
initializeStickyHeader();
initializeUIEnhancements();