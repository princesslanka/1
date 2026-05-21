/* ==========================================================================
   PRINCESS LANKA TRADING & HOSPITALITY SERVICE - SCRIPT
   Location: Qatar
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
    
    /* --------------------------------------------------------------------------
       1. PRELOADER & PERCENTAGE LOADER
       -------------------------------------------------------------------------- */
    const preloader = document.getElementById("preloader");
    const loaderProgress = document.getElementById("loader-progress");
    const loaderPercentage = document.getElementById("loader-percentage");
    
    let progress = 0;
    const progressDuration = 1500; // Total load duration in ms
    const progressInterval = 15;   // Tick speed
    const increment = (progressInterval / progressDuration) * 100;
    
    const loadingTimer = setInterval(() => {
        progress += increment;
        if (progress >= 100) {
            progress = 100;
            clearInterval(loadingTimer);
            
            // Set final fill
            loaderProgress.style.width = "100%";
            loaderPercentage.innerText = "100%";
            
            // Fade out preloader
            setTimeout(() => {
                preloader.style.opacity = "0";
                setTimeout(() => {
                    preloader.style.display = "none";
                    // Initialize typing effect after page loads
                    startTypewriter();
                }, 600);
            }, 300);
        } else {
            loaderProgress.style.width = `${Math.floor(progress)}%`;
            loaderPercentage.innerText = `${Math.floor(progress)}%`;
        }
    }, progressInterval);

    /* --------------------------------------------------------------------------
       2. GOLD RISING PARTICLES BG ANIMATION
       -------------------------------------------------------------------------- */
    const canvas = document.getElementById("particle-canvas");
    const ctx = canvas.getContext("2d");
    let particlesArray = [];
    
    // Set Canvas Dimensions to fit Document Scroll bounds
    function setCanvasSize() {
        canvas.width = window.innerWidth;
        canvas.height = Math.max(
            document.body.scrollHeight, 
            document.body.offsetHeight, 
            document.documentElement.clientHeight, 
            document.documentElement.scrollHeight, 
            document.documentElement.offsetHeight
        );
    }
    
    setCanvasSize();
    window.addEventListener("resize", () => {
        setCanvasSize();
        initParticles();
    });

    // Particle Object Blueprint
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2.5 + 0.5; // Small premium dust particles
            this.speedY = -(Math.random() * 0.4 + 0.1); // Slowly drift up
            this.speedX = (Math.random() * 0.3 - 0.15); // Subtle sway left/right
            this.opacity = Math.random() * 0.5 + 0.1;
            this.maxOpacity = this.opacity;
            this.fadeSpeed = Math.random() * 0.002 + 0.001;
        }
        
        update() {
            this.y += this.speedY;
            this.x += this.speedX;
            
            // Re-appear at the bottom if particle goes off screen top
            if (this.y < 0) {
                this.y = canvas.height;
                this.x = Math.random() * canvas.width;
            }
            // Boundary bounce for sway
            if (this.x < 0 || this.x > canvas.width) {
                this.speedX = -this.speedX;
            }
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            // Luxury gold color (#c9a84c -> rgb(201, 168, 76))
            ctx.fillStyle = `rgba(201, 168, 76, ${this.opacity})`;
            ctx.fill();
        }
    }
    
    function initParticles() {
        particlesArray = [];
        // Particle density based on screen dimensions
        const numberOfParticles = Math.floor((canvas.width * canvas.height) / 18000);
        const cappedParticles = Math.min(numberOfParticles, 120); // Cap performance cost
        
        for (let i = 0; i < cappedParticles; i++) {
            particlesArray.push(new Particle());
        }
    }
    
    function animateParticles() {
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
            particlesArray[i].draw();
        }
        requestAnimationFrame(animateParticles);
    }
    
    initParticles();
    animateParticles();

    /* --------------------------------------------------------------------------
       3. STICKY NAV BACKGROUND SHIFT
       -------------------------------------------------------------------------- */
    const navbar = document.getElementById("navbar");
    
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });

    /* --------------------------------------------------------------------------
       4. MOBILE HAMBURGER MENU DRAWER
       -------------------------------------------------------------------------- */
    const hamburgerBtn = document.getElementById("hamburger-btn");
    const navMenu = document.getElementById("nav-menu");
    const navLinks = document.querySelectorAll(".nav-link");
    
    hamburgerBtn.addEventListener("click", () => {
        hamburgerBtn.classList.toggle("active");
        navMenu.classList.toggle("active");
    });
    
    // Close mobile drawer when clicking anchor links
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            hamburgerBtn.classList.remove("active");
            navMenu.classList.remove("active");
        });
    });

    /* --------------------------------------------------------------------------
       5. HERO SLIDESHOW ROTATOR
       -------------------------------------------------------------------------- */
    const slides = document.querySelectorAll(".hero-slideshow .slide");
    const dots = document.querySelectorAll(".slideshow-dots .dot");
    let currentSlide = 0;
    const slideDuration = 5000; // Auto-rotate every 5 seconds
    let slideInterval;
    
    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove("active"));
        dots.forEach(dot => dot.classList.remove("active"));
        
        slides[index].classList.add("active");
        dots[index].classList.add("active");
        currentSlide = index;
    }
    
    function nextSlide() {
        let index = currentSlide + 1;
        if (index >= slides.length) index = 0;
        showSlide(index);
    }
    
    function startSlideShow() {
        slideInterval = setInterval(nextSlide, slideDuration);
    }
    
    function resetSlideShow() {
        clearInterval(slideInterval);
        startSlideShow();
    }
    
    // Setup dots click listeners
    dots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
            showSlide(index);
            resetSlideShow();
        });
    });
    
    startSlideShow();

    /* --------------------------------------------------------------------------
       6. HERO TYPEWRITER TEXT EFFECT
       -------------------------------------------------------------------------- */
    const typeStrings = [
        "Premium Hospitality Staffing Solutions",
        "Global Trading & Import-Export Services",
        "Expert Cleaning & Facility Maintenance",
        "Highly-Skilled Manpower Supply",
        "Elite Property & Support Management"
    ];
    
    const typewriterText = document.getElementById("typewriter-text");
    let stringIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function startTypewriter() {
        typeEffect();
    }
    
    function typeEffect() {
        const currentString = typeStrings[stringIndex];
        
        if (isDeleting) {
            // Deleting state
            typewriterText.innerText = currentString.substring(0, charIndex - 1);
            charIndex--;
        } else {
            // Typing state
            typewriterText.innerText = currentString.substring(0, charIndex + 1);
            charIndex++;
        }
        
        // Speed configuration
        let typingSpeed = isDeleting ? 30 : 60;
        
        // Check if finished typing string
        if (!isDeleting && charIndex === currentString.length) {
            typingSpeed = 2200; // Pause at end of text
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            stringIndex = (stringIndex + 1) % typeStrings.length; // Loop around array
            typingSpeed = 400; // Brief pause before starting next text
        }
        
        setTimeout(typeEffect, typingSpeed);
    }

    /* --------------------------------------------------------------------------
       7. INTERSECTION OBSERVER - SCROLL REVEAL (STAGGERED)
       -------------------------------------------------------------------------- */
    const revealElements = document.querySelectorAll(".scroll-reveal");
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("reveal-active");
                // Once it is revealed, stop observing it
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    });
    
    revealElements.forEach((el, index) => {
        revealObserver.observe(el);
        
        // Dynamically add staggered animation delay to siblings inside columns/grids
        const parent = el.parentElement;
        if (parent && (parent.classList.contains("services-grid") || parent.classList.contains("counters-grid") || parent.classList.contains("contact-info-grid"))) {
            // Find index inside parent
            const siblings = Array.from(parent.children);
            const siblingIndex = siblings.indexOf(el);
            if (siblingIndex > 0) {
                el.style.transitionDelay = `${siblingIndex * 0.1}s`;
            }
        }
    });

    /* --------------------------------------------------------------------------
       8. ANIMATED NUMBER COUNTERS WITH EASING
       -------------------------------------------------------------------------- */
    const countersSection = document.getElementById("counters-section");
    const counters = document.querySelectorAll(".counter-number");
    let countersStarted = false;
    
    // Easing mathematical helper: EaseOutQuad
    function easeOutQuad(x) {
        return 1 - (1 - x) * (1 - x);
    }
    
    function animateCounters() {
        const duration = 2200; // Total count animation in ms
        const startTime = performance.now();
        
        function updateCount(currentTime) {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);
            const easedProgress = easeOutQuad(progress);
            
            counters.forEach(counter => {
                const target = parseInt(counter.getAttribute("data-target"), 10);
                const currentValue = Math.floor(easedProgress * target);
                
                // Add "+" sign for metrics
                if (target === 10) {
                    counter.innerText = `${currentValue}+`;
                } else {
                    counter.innerText = `${currentValue}+`;
                }
            });
            
            if (progress < 1) {
                requestAnimationFrame(updateCount);
            } else {
                // Ensure targets are exact at the end
                counters.forEach(counter => {
                    const target = counter.getAttribute("data-target");
                    counter.innerText = `${target}+`;
                });
            }
        }
        
        requestAnimationFrame(updateCount);
    }
    
    const countersObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !countersStarted) {
                countersStarted = true;
                animateCounters();
                countersObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2
    });
    
    if (countersSection) {
        countersObserver.observe(countersSection);
    }

    /* --------------------------------------------------------------------------
       9. 3D CARD TILT MECHANICS (DESKTOP ONLY)
       -------------------------------------------------------------------------- */
    const serviceCards = document.querySelectorAll(".service-card");
    
    serviceCards.forEach(card => {
        card.addEventListener("mousemove", (e) => {
            // Check if device is desktop
            if (window.innerWidth <= 768) {
                card.style.transform = "none";
                return;
            }
            
            const cardRect = card.getBoundingClientRect();
            const cardWidth = cardRect.width;
            const cardHeight = cardRect.height;
            
            // X and Y coords relative to card container center
            const mouseX = e.clientX - cardRect.left - cardWidth / 2;
            const mouseY = e.clientY - cardRect.top - cardHeight / 2;
            
            // Calculate tilt limits
            const rotateX = -(mouseY / cardHeight) * 16; // Tilt degrees vertical
            const rotateY = (mouseX / cardWidth) * 16;  // Tilt degrees horizontal
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`;
            
            // Set custom properties for local CSS gradient tracking glow
            card.style.setProperty("--x", `${e.clientX - cardRect.left}px`);
            card.style.setProperty("--y", `${e.clientY - cardRect.top}px`);
        });
        
        card.addEventListener("mouseleave", () => {
            card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
        });
    });

    /* --------------------------------------------------------------------------
       10. GALLERY LIGHTBOX MODAL WITH KEYBOARD NAV
       -------------------------------------------------------------------------- */
    const galleryItems = document.querySelectorAll(".gallery-item");
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const lightboxCaption = document.getElementById("lightbox-caption");
    const lightboxClose = document.getElementById("lightbox-close");
    const lightboxPrev = document.getElementById("lightbox-prev");
    const lightboxNext = document.getElementById("lightbox-next");
    
    let activeGalleryIndex = 0;
    
    function openLightbox(index) {
        activeGalleryIndex = index;
        const item = galleryItems[index];
        const src = item.getAttribute("data-src");
        const altText = item.querySelector("img").getAttribute("alt");
        const captionTitle = item.querySelector(".gallery-title").innerText;
        
        lightboxImg.setAttribute("src", src);
        lightboxImg.setAttribute("alt", altText);
        lightboxCaption.innerText = captionTitle;
        
        lightbox.classList.add("active");
        document.body.style.overflow = "hidden"; // Disable background scrolling
    }
    
    function closeLightbox() {
        lightbox.classList.remove("active");
        document.body.style.overflow = "auto"; // Re-enable background scrolling
        setTimeout(() => {
            lightboxImg.setAttribute("src", "");
        }, 300);
    }
    
    function showNextImage() {
        let index = activeGalleryIndex + 1;
        if (index >= galleryItems.length) index = 0;
        openLightbox(index);
    }
    
    function showPrevImage() {
        let index = activeGalleryIndex - 1;
        if (index < 0) index = galleryItems.length - 1;
        openLightbox(index);
    }
    
    // Click listeners
    galleryItems.forEach((item, index) => {
        item.addEventListener("click", () => {
            openLightbox(index);
        });
    });
    
    lightboxClose.addEventListener("click", closeLightbox);
    lightboxNext.addEventListener("click", showNextImage);
    lightboxPrev.addEventListener("click", showPrevImage);
    
    // Close when clicking modal backdrop
    lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Keyboard navigation keys
    document.addEventListener("keydown", (e) => {
        if (!lightbox.classList.contains("active")) return;
        
        if (e.key === "Escape") {
            closeLightbox();
        } else if (e.key === "ArrowRight") {
            showNextImage();
        } else if (e.key === "ArrowLeft") {
            showPrevImage();
        }
    });

    /* --------------------------------------------------------------------------
       11. ACTIVE NAV LINK HIGHLIGHT SCROLL SPY
       -------------------------------------------------------------------------- */
    const sections = document.querySelectorAll("section");
    
    window.addEventListener("scroll", () => {
        let currentSectionId = "";
        const scrollPosition = window.scrollY + 120; // Scroll spy offset
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute("id");
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${currentSectionId}`) {
                link.classList.add("active");
            }
        });
    });

    /* --------------------------------------------------------------------------
       12. CONTACT FORM SUBMISSION SUCCESS FEEDBACK
       -------------------------------------------------------------------------- */
    const contactForm = document.getElementById("contact-form");
    const successOverlay = document.getElementById("form-success-message");
    const closeSuccessBtn = document.getElementById("close-success-btn");
    
    contactForm.addEventListener("submit", (e) => {
        e.preventDefault();
        
        // Get Form Info
        const nameVal = document.getElementById("form-name").value;
        const emailVal = document.getElementById("form-email").value;
        const phoneVal = document.getElementById("form-phone").value;
        const serviceVal = document.getElementById("form-service").value;
        const messageVal = document.getElementById("form-message").value;
        
        // Show simulated loading/wait feedback on button
        const submitBtn = contactForm.querySelector("button[type='submit']");
        const originalBtnHTML = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = `Sending inquiry... <i class="fa-solid fa-spinner fa-spin"></i>`;
        
        // Simulate premium server-side connection delay
        setTimeout(() => {
            // Restore button
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnHTML;
            
            // Activate success overlay
            successOverlay.classList.add("active");
            
            // Clear inputs
            contactForm.reset();
            
            // Reset dropdown float tags manually since elements reset
            const selectField = document.getElementById("form-service");
            selectField.classList.remove("valued");
        }, 1500);
    });
    
    closeSuccessBtn.addEventListener("click", () => {
        successOverlay.classList.remove("active");
    });
});
