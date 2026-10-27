/**
 * Portfolio Client Script
 * Theme: Art Director Portfolio (Bright)
 * Author: Anshu Kumari
 */

document.addEventListener('DOMContentLoaded', () => {
    // -------------------------------------------------------------
    // 1. Reading Progress Bar & Header Shadow
    // -------------------------------------------------------------
    const header = document.querySelector('.site-header');
    const scrollProgressBar = document.getElementById('scroll-progress');
    const backToTopBtn = document.getElementById('back-to-top');

    const handleScroll = () => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

        if (scrollProgressBar) {
            scrollProgressBar.style.width = `${scrolled}%`;
        }

        if (header) {
            if (scrollTop > 20) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }

        if (backToTopBtn) {
            if (scrollTop > 350) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // -------------------------------------------------------------
    // 2. Mobile Menu Toggle
    // -------------------------------------------------------------
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navMenu = document.getElementById('nav-menu');

    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            const isOpen = navMenu.classList.toggle('open');
            mobileMenuBtn.classList.toggle('open');
            mobileMenuBtn.setAttribute('aria-expanded', isOpen);
            document.body.style.overflow = isOpen ? 'hidden' : '';
        });

        // Close menu on click of nav items
        const navLinks = navMenu.querySelectorAll('.nav-item, .btn');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('open');
                mobileMenuBtn.classList.remove('open');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            });
        });
    }

    // -------------------------------------------------------------
    // 3. Scroll Spy (Active Navigation Highlight)
    // -------------------------------------------------------------
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-item');

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    navItems.forEach(item => {
                        const href = item.getAttribute('href');
                        if (href === `#${id}`) {
                            item.classList.add('active');
                        } else {
                            item.classList.remove('active');
                        }
                    });
                }
            });
        },
        {
            rootMargin: '-20% 0px -65% 0px',
            threshold: 0
        }
    );

    sections.forEach(sec => observer.observe(sec));

    // -------------------------------------------------------------
    // 4. Project Filter Tabs
    // -------------------------------------------------------------
    const filterTabs = document.querySelectorAll('.filter-tab');
    const projectCards = document.querySelectorAll('.project-card');

    if (filterTabs.length && projectCards.length) {
        filterTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                filterTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');

                const filterKey = tab.getAttribute('data-filter');

                projectCards.forEach(card => {
                    const category = card.getAttribute('data-category') || '';
                    if (filterKey === 'all' || category.includes(filterKey)) {
                        card.style.display = 'flex';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    // -------------------------------------------------------------
    // 5. One-Click Copy Email to Clipboard
    // -------------------------------------------------------------
    const copyEmailBtn = document.getElementById('copy-email-btn');
    const emailToCopy = 'anshu923437@gmail.com';

    if (copyEmailBtn) {
        copyEmailBtn.addEventListener('click', async () => {
            try {
                if (navigator.clipboard && navigator.clipboard.writeText) {
                    await navigator.clipboard.writeText(emailToCopy);
                } else {
                    const temp = document.createElement('textarea');
                    temp.value = emailToCopy;
                    document.body.appendChild(temp);
                    temp.select();
                    document.execCommand('copy');
                    document.body.removeChild(temp);
                }

                copyEmailBtn.classList.add('copied');
                const label = copyEmailBtn.querySelector('.copy-label');
                const prevText = label ? label.textContent : 'Copy';
                if (label) label.textContent = 'Copied!';

                setTimeout(() => {
                    copyEmailBtn.classList.remove('copied');
                    if (label) label.textContent = prevText;
                }, 2200);
            } catch (err) {
                console.error('Failed to copy email', err);
            }
        });
    }

    // -------------------------------------------------------------
    // 6. Interactive Contact Form Submission
    // -------------------------------------------------------------
    const contactForm = document.getElementById('contact-form');
    const formFeedback = document.getElementById('form-feedback');
    const submitBtn = document.getElementById('submit-form-btn');

    if (contactForm && formFeedback) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('sender-name')?.value.trim();
            const email = document.getElementById('sender-email')?.value.trim();
            const subject = document.getElementById('sender-subject')?.value.trim();
            const message = document.getElementById('sender-message')?.value.trim();

            if (!name || !email || !message) {
                formFeedback.textContent = 'Please fill out all required fields.';
                formFeedback.className = 'form-feedback-alert error';
                return;
            }

            const originalBtnHTML = submitBtn ? submitBtn.innerHTML : 'Send Message';
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<span>Opening mail client...</span>';
            }

            setTimeout(() => {
                formFeedback.innerHTML = `✨ Thank you, <strong>${name}</strong>! Preparing your message in your email client...`;
                formFeedback.className = 'form-feedback-alert success';

                const mailto = `mailto:anshu923437@gmail.com?subject=${encodeURIComponent(subject || 'Portfolio Inquiry')}&body=${encodeURIComponent(`Hi Anshu Kumari,\n\n${message}\n\nFrom: ${name} (${email})`)}`;
                window.location.href = mailto;

                contactForm.reset();

                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalBtnHTML;
                }

                setTimeout(() => {
                    formFeedback.style.display = 'none';
                    formFeedback.className = 'form-feedback-alert';
                }, 7000);
            }, 600);
        });
    }
});
