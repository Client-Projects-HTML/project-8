/**
 * Commercial Roofing Contractor Template - Main JavaScript
 * Version: 1.0.0
 * 
 * This file handles all interactive functionality for the template
 * including dark mode, RTL support, navigation, forms, and UI components.
 */

(function () {
    'use strict';

    // ============================================================
    // Configuration
    // ============================================================
    const CONFIG = {
        darkModeKey: 'theme-preference',
        rtlKey: 'rtl-preference',
        defaultTheme: 'light',
        defaultRTL: false,
        animationDuration: 300
    };

    // ============================================================
    // Theme Management (Dark/Light Mode)
    // ============================================================
    const ThemeManager = {
        /**
         * Initialize theme based on user preference or system setting
         */
        init: function () {
            const savedTheme = localStorage.getItem(CONFIG.darkModeKey);
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

            if (savedTheme) {
                this.setTheme(savedTheme);
            } else if (prefersDark) {
                this.setTheme('dark');
            } else {
                this.setTheme('light');
            }

            // Listen for system theme changes
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
                if (!localStorage.getItem(CONFIG.darkModeKey)) {
                    this.setTheme(e.matches ? 'dark' : 'light');
                }
            });

            // Toggle theme on click
            const toggleBtn = document.getElementById('theme-toggle');
            if (toggleBtn) {
                toggleBtn.addEventListener('click', () => this.toggle());
            }
        },

        /**
         * Toggle between light and dark themes
         */
        toggle: function () {
            const currentTheme = document.documentElement.getAttribute('data-bs-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            this.setTheme(newTheme);
        },

        /**
         * Set specific theme
         * @param {string} theme - 'dark' or 'light'
         */
        setTheme: function (theme) {
            document.documentElement.setAttribute('data-bs-theme', theme);
            localStorage.setItem(CONFIG.darkModeKey, theme);

            // Update toggle button icon
            this.updateToggleButton(theme);
        },

        /**
         * Update toggle button visual state
         * @param {string} theme - Current theme
         */
        updateToggleButton: function (theme) {
            const toggleBtn = document.getElementById('theme-toggle');
            if (toggleBtn) {
                const icon = toggleBtn.querySelector('i') || toggleBtn.querySelector('svg');
                if (theme === 'dark') {
                    toggleBtn.setAttribute('aria-label', 'Switch to light mode');
                    if (icon) {
                        icon.classList.remove('bi-moon-fill');
                        icon.classList.add('bi-sun-fill');
                    }
                } else {
                    toggleBtn.setAttribute('aria-label', 'Switch to dark mode');
                    if (icon) {
                        icon.classList.remove('bi-sun-fill');
                        icon.classList.add('bi-moon-fill');
                    }
                }
            }
        }
    };

    // ============================================================
    // RTL Management
    // ============================================================
    const RTLManager = {
        /**
         * Initialize RTL mode based on saved preference
         */
        init: function () {
            const savedRTL = localStorage.getItem(CONFIG.rtlKey);

            if (savedRTL === 'true') {
                this.enableRTL();
            } else {
                this.disableRTL();
            }

            // Toggle RTL on click
            const toggleBtn = document.getElementById('rtl-toggle');
            if (toggleBtn) {
                toggleBtn.addEventListener('click', () => this.toggle());
            }
        },

        /**
         * Enable RTL mode
         */
        enableRTL: function () {
            document.documentElement.setAttribute('dir', 'rtl');
            document.documentElement.setAttribute('lang', 'ar');
            localStorage.setItem(CONFIG.rtlKey, 'true');

            // Update RTL toggle button
            this.updateToggleButton(true);
        },

        /**
         * Disable RTL mode
         */
        disableRTL: function () {
            document.documentElement.removeAttribute('dir');
            document.documentElement.setAttribute('lang', 'en');
            localStorage.setItem(CONFIG.rtlKey, 'false');

            // Update RTL toggle button
            this.updateToggleButton(false);
        },

        /**
         * Toggle RTL mode
         */
        toggle: function () {
            const isRTL = document.documentElement.getAttribute('dir') === 'rtl';
            if (isRTL) {
                this.disableRTL();
            } else {
                this.enableRTL();
            }
        },

        /**
         * Update RTL toggle button visual state
         * @param {boolean} isRTL - Whether RTL is enabled
         */
        updateToggleButton: function (isRTL) {
            const toggleBtn = document.getElementById('rtl-toggle');
            if (toggleBtn) {
                if (isRTL) {
                    toggleBtn.classList.add('active');
                } else {
                    toggleBtn.classList.remove('active');
                }
            }
        }
    };

    // ============================================================
    // Mobile Navigation
    // ============================================================
    const MobileNav = {
        /**
         * Initialize mobile navigation
         */
        init: function () {
            this.navbarToggler = document.querySelector('.navbar-toggler');
            this.navbarCollapse = document.querySelector('.navbar-collapse');

            if (this.navbarToggler && this.navbarCollapse) {
                // Listen for Bootstrap collapse events to update the toggler state
                this.navbarCollapse.addEventListener('show.bs.collapse', () => {
                    this.navbarToggler.classList.add('active');
                });

                this.navbarCollapse.addEventListener('hide.bs.collapse', () => {
                    this.navbarToggler.classList.remove('active');
                });
                
                // Close menu when clicking on a link (except dropdown toggles)
                const navLinks = this.navbarCollapse.querySelectorAll('.nav-link:not(.dropdown-toggle)');
                navLinks.forEach(link => {
                    link.addEventListener('click', () => {
                         const bsCollapse = bootstrap.Collapse.getInstance(this.navbarCollapse);
                         if (bsCollapse) {
                             bsCollapse.hide();
                         }
                    });
                });

                // Close menu when clicking outside
                document.addEventListener('click', (e) => {
                    if (this.navbarCollapse.classList.contains('show') && 
                        !this.navbarCollapse.contains(e.target) && 
                        !this.navbarToggler.contains(e.target)) {
                        
                        const bsCollapse = bootstrap.Collapse.getInstance(this.navbarCollapse);
                        if (bsCollapse) {
                            bsCollapse.hide();
                        }
                    }
                });
            }
        }
    };

    // ============================================================
    // Smooth Scroll
    // ============================================================
    const SmoothScroll = {
        /**
         * Initialize smooth scrolling for anchor links
         */
        init: function () {
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    const targetId = this.getAttribute('href');

                    if (targetId === '#') return;

                    const targetElement = document.querySelector(targetId);

                    if (targetElement) {
                        e.preventDefault();
                        targetElement.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                });
            });
        }
    };

    // ============================================================
    // Form Validation
    // ============================================================
    const FormValidator = {
        /**
         * Initialize form validation
         */
        init: function () {
            const forms = document.querySelectorAll('.needs-validation');

            forms.forEach(form => {
                form.addEventListener('submit', (e) => {
                    if (!form.checkValidity()) {
                        e.preventDefault();
                        e.stopPropagation();
                    }
                    form.classList.add('was-validated');
                });
            });

            // Add input validation styling
            const inputs = document.querySelectorAll('.form-control, .form-select');
            inputs.forEach(input => {
                input.addEventListener('blur', () => {
                    this.validateField(input);
                });

                input.addEventListener('input', () => {
                    if (input.classList.contains('is-invalid')) {
                        this.validateField(input);
                    }
                });
            });
        },

        /**
         * Validate individual field
         * @param {HTMLElement} field - Form field to validate
         */
        validateField: function (field) {
            const validity = field.checkValidity();

            if (validity) {
                field.classList.remove('is-invalid');
                field.classList.add('is-valid');
            } else {
                field.classList.add('is-invalid');
                field.classList.remove('is-valid');
            }
        }
    };

    // ============================================================
    // Loading States & Skeleton Loaders
    // ============================================================
    const LoadingStates = {
        /**
         * Show skeleton loader
         * @param {string} selector - CSS selector for container
         */
        showSkeleton: function (selector) {
            const container = document.querySelector(selector);
            if (container) {
                container.classList.add('loading');
                container.innerHTML = this.generateSkeletonHTML();
            }
        },

        /**
         * Hide skeleton loader
         * @param {string} selector - CSS selector for container
         */
        hideSkeleton: function (selector) {
            const container = document.querySelector(selector);
            if (container) {
                container.classList.remove('loading');
            }
        },

        /**
         * Generate skeleton HTML
         * @returns {string} Skeleton HTML
         */
        generateSkeletonHTML: function () {
            return `
                <div class="skeleton skeleton-text"></div>
                <div class="skeleton skeleton-text"></div>
                <div class="skeleton skeleton-title"></div>
                <div class="skeleton skeleton-image"></div>
            `;
        },

        /**
         * Show loading spinner
         * @param {string} selector - CSS selector for container
         */
        showSpinner: function (selector) {
            const container = document.querySelector(selector);
            if (container) {
                container.innerHTML = '<div class="loading-spinner"></div>';
            }
        }
    };

    // ============================================================
    // Tooltips & Popovers
    // ============================================================
    const Tooltips = {
        /**
         * Initialize Bootstrap tooltips
         */
        init: function () {
            const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));

            tooltipTriggerList.map(tooltipTriggerEl => {
                return new bootstrap.Tooltip(tooltipTriggerEl, {
                    trigger: 'hover focus',
                    delay: { show: 200, hide: 100 }
                });
            });

            // Initialize popovers
            const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));

            popoverTriggerList.map(popoverTriggerEl => {
                return new bootstrap.Popover(popoverTriggerEl);
            });
        }
    };

    // ============================================================
    // Scroll Effects
    // ============================================================
    const ScrollEffects = {
        /**
         * Initialize scroll effects
         */
        init: function () {
            // Navbar scroll effect
            const navbar = document.querySelector('.navbar');

            if (navbar) {
                window.addEventListener('scroll', () => {
                    if (window.scrollY > 50) {
                        navbar.classList.add('navbar-scrolled');
                    } else {
                        navbar.classList.remove('navbar-scrolled');
                    }
                });
            }

            // Back to top button
            const backToTopBtn = document.getElementById('back-to-top');

            if (backToTopBtn) {
                window.addEventListener('scroll', () => {
                    if (window.scrollY > 300) {
                        backToTopBtn.classList.add('show');
                    } else {
                        backToTopBtn.classList.remove('show');
                    }
                });

                backToTopBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                });
            }
        }
    };

    // ============================================================
    // Counter Animation
    // ============================================================
    const CounterAnimation = {
        /**
         * Initialize counter animations
         */
        init: function () {
            const counters = document.querySelectorAll('.counter');

            if (counters.length === 0) return;

            const observerOptions = {
                threshold: 0.5
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.animateCounter(entry.target);
                        observer.unobserve(entry.target);
                    }
                });
            }, observerOptions);

            counters.forEach(counter => {
                observer.observe(counter);
            });
        },

        /**
         * Animate individual counter
         * @param {HTMLElement} counter - Counter element
         */
        animateCounter: function (counter) {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;

            const timer = setInterval(() => {
                current += step;

                if (current >= target) {
                    counter.textContent = target.toLocaleString();
                    clearInterval(timer);
                } else {
                    counter.textContent = Math.floor(current).toLocaleString();
                }
            }, 16);
        }
    };

    // ============================================================
    // Image Lazy Loading
    // ============================================================
    const LazyLoad = {
        /**
         * Initialize lazy loading for images
         */
        init: function () {
            const images = document.querySelectorAll('img[data-src]');

            if ('IntersectionObserver' in window) {
                const imageObserver = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            this.loadImage(entry.target);
                            imageObserver.unobserve(entry.target);
                        }
                    });
                });

                images.forEach(image => {
                    imageObserver.observe(image);
                });
            } else {
                // Fallback for browsers without IntersectionObserver
                images.forEach(image => {
                    this.loadImage(image);
                });
            }
        },

        /**
         * Load image from data-src
         * @param {HTMLImageElement} image - Image element
         */
        loadImage: function (image) {
            image.src = image.getAttribute('data-src');
            image.removeAttribute('data-src');
            image.classList.add('loaded');
        }
    };

    // ============================================================
    // Search Functionality
    // ============================================================
    const SearchHandler = {
        /**
         * Initialize search functionality
         */
        init: function () {
            const searchForms = document.querySelectorAll('.search-form');

            searchForms.forEach(form => {
                form.addEventListener('submit', (e) => {
                    e.preventDefault();
                    const query = form.querySelector('input[name="q"]').value;

                    if (query.trim()) {
                        // Redirect to search results page
                        window.location.href = `/search.html?q=${encodeURIComponent(query)}`;
                    }
                });
            });
        }
    };

    // ============================================================
    // Newsletter Form
    // ============================================================
    const NewsletterForm = {
        /**
         * Initialize newsletter forms
         */
        init: function () {
            const forms = document.querySelectorAll('.newsletter-form');

            forms.forEach(form => {
                form.addEventListener('submit', (e) => {
                    e.preventDefault();

                    const email = form.querySelector('input[type="email"]').value;
                    const submitBtn = form.querySelector('button[type="submit"]');
                    const originalText = submitBtn.innerHTML;

                    // Show loading state
                    submitBtn.disabled = true;
                    submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm"></span> Subscribing...';

                    // Simulate API call (replace with actual API integration)
                    setTimeout(() => {
                        // Success message
                        submitBtn.innerHTML = '<i class="bi bi-check-circle"></i> Subscribed!';
                        submitBtn.classList.add('btn-success');
                        form.reset();

                        // Reset button after 3 seconds
                        setTimeout(() => {
                            submitBtn.disabled = false;
                            submitBtn.innerHTML = originalText;
                            submitBtn.classList.remove('btn-success');
                        }, 3000);
                    }, 1500);
                });
            });
        }
    };

    // ============================================================
    // Contact Form Handler
    // ============================================================
    const ContactForm = {
        /**
         * Initialize contact forms
         */
        init: function () {
            const forms = document.querySelectorAll('.contact-form');

            forms.forEach(form => {
                form.addEventListener('submit', async (e) => {
                    e.preventDefault();

                    const submitBtn = form.querySelector('button[type="submit"]');
                    const originalText = submitBtn.innerHTML;

                    // Show loading state
                    submitBtn.disabled = true;
                    submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm"></span> Sending...';

                    // Get form data
                    const formData = new FormData(form);
                    const data = Object.fromEntries(formData.entries());

                    try {
                        // Simulate API call (replace with actual Formspree/Netlify integration)
                        await new Promise(resolve => setTimeout(resolve, 1500));

                        // Show success message
                        this.showSuccessMessage(form, 'Thank you! Your message has been sent successfully.');

                        form.reset();
                    } catch (error) {
                        // Show error message
                        this.showErrorMessage(form, 'Sorry, there was an error sending your message. Please try again.');
                    } finally {
                        submitBtn.disabled = false;
                        submitBtn.innerHTML = originalText;
                    }
                });
            });
        },

        /**
         * Show success message
         * @param {HTMLElement} form - Form element
         * @param {string} message - Success message
         */
        showSuccessMessage: function (form, message) {
            const alert = document.createElement('div');
            alert.className = 'alert alert-success alert-dismissible fade show mt-3';
            alert.innerHTML = `
                ${message}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            `;
            form.appendChild(alert);

            setTimeout(() => {
                alert.classList.remove('show');
                setTimeout(() => alert.remove(), 300);
            }, 5000);
        },

        /**
         * Show error message
         * @param {HTMLElement} form - Form element
         * @param {string} message - Error message
         */
        showErrorMessage: function (form, message) {
            const alert = document.createElement('div');
            alert.className = 'alert alert-danger alert-dismissible fade show mt-3';
            alert.innerHTML = `
                ${message}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            `;
            form.appendChild(alert);
        }
    };

    // ============================================================
    // Initialize All Modules
    // ============================================================
    const App = {
        /**
         * Initialize the application
         */
        init: function () {
            // Wait for DOM to be ready
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', () => this.onDOMReady());
            } else {
                this.onDOMReady();
            }
        },

        /**
         * Called when DOM is ready
         */
        onDOMReady: function () {
            ThemeManager.init();
            RTLManager.init();
            MobileNav.init();
            SmoothScroll.init();
            FormValidator.init();
            Tooltips.init();
            ScrollEffects.init();
            CounterAnimation.init();
            LazyLoad.init();
            SearchHandler.init();
            NewsletterForm.init();
            ContactForm.init();

            console.log('Commercial Roofing Contractor Template initialized successfully');
        }
    };

    // Start the application
    App.init();

    // Export to global scope for external use
    window.TemplateApp = {
        Theme: ThemeManager,
        RTL: RTLManager,
        Loading: LoadingStates
    };

})();
