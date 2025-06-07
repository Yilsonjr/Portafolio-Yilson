document.addEventListener('DOMContentLoaded', () => {
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Simplified Intersection Observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements
    document.querySelectorAll('.animate-on-scroll').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
        observer.observe(element);
    });

    // Initial check
    window.requestAnimationFrame(() => {
        document.querySelectorAll('.animate-on-scroll').forEach(element => {
            const rect = element.getBoundingClientRect();
            if (rect.top <= window.innerHeight && rect.bottom >= 0) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    });

    // Throttled scroll handler
    let lastScroll = 0;
    const throttle = (callback, limit) => {
        let inThrottle;
        return function() {
            const now = Date.now();
            if (lastScroll && now < lastScroll + limit) {
                clearTimeout(inThrottle);
                inThrottle = setTimeout(() => {
                    lastScroll = now;
                    callback.apply(this, arguments);
                }, limit - (now - lastScroll));
            } else {
                lastScroll = now;
                callback.apply(this, arguments);
            }
        };
    };

    // Handle scroll with throttling
    const handleScroll = throttle(() => {
        document.querySelectorAll('.animate-on-scroll').forEach(element => {
            const rect = element.getBoundingClientRect();
            if (rect.top <= window.innerHeight && rect.bottom >= 0) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }, 100);

    window.addEventListener('scroll', handleScroll);

    // Portfolio items hover effect
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    portfolioItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'scale(1.02)';
        });
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'scale(1)';
        });
    });

    // Skills hover effect
    const skills = document.querySelectorAll('.skill-item');
    skills.forEach(skill => {
        skill.addEventListener('mouseenter', () => {
            skill.style.transform = 'translateY(-3px)';
        });
        skill.addEventListener('mouseleave', () => {
            skill.style.transform = 'translateY(0)';
        });
    });
});