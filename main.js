/* ============================================
   LUMINA STUDIO — JavaScript Principal
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    // === Elementos ===
    const navMenu = document.getElementById('navMenu');
    const navItems = document.querySelectorAll('.nav-item');
    const navIndicator = document.getElementById('navIndicator');
    const sections = document.querySelectorAll('.section');
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenuWrapper = document.querySelector('.nav-menu-wrapper');
    const mainNav = document.getElementById('mainNav');
    const contactForm = document.getElementById('contactForm');
    const toast = document.getElementById('toast');
    const revealElements = document.querySelectorAll('[data-reveal]');
    const statNumbers = document.querySelectorAll('.stat-number');
    const particlesContainer = document.getElementById('particles');

    // === Estado ===
    let currentSection = 'home';
    let isAnimating = false;

    // ============================================
    // BARRA DE NAVEGAÇÃO INTERATIVA ANIMADA
    // ============================================

    function updateIndicator(element) {
        if (!element || window.innerWidth <= 768) return;

        const rect = element.getBoundingClientRect();
        const menuRect = navMenu.getBoundingClientRect();

        const left = rect.left - menuRect.left;
        const width = rect.width;

        navIndicator.style.transform = `translateX(${left}px)`;
        navIndicator.style.width = `${width}px`;
    }

    function setActiveNav(target) {
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.dataset.target === target) {
                item.classList.add('active');
                updateIndicator(item);
            }
        });
    }

    function showSection(targetId) {
        if (isAnimating || currentSection === targetId) return;
        isAnimating = true;

        const currentEl = document.getElementById(currentSection);
        const nextEl = document.getElementById(targetId);

        if (!nextEl) {
            isAnimating = false;
            return;
        }

        // Fade out atual
        currentEl.style.opacity = '0';
        currentEl.style.transform = 'translateY(-20px)';

        setTimeout(() => {
            currentEl.classList.remove('active');
            currentEl.style.display = 'none';

            // Preparar próxima
            nextEl.style.display = 'block';
            nextEl.style.opacity = '0';
            nextEl.style.transform = 'translateY(30px)';

            // Forçar reflow
            nextEl.offsetHeight;

            nextEl.classList.add('active');

            // Fade in
            requestAnimationFrame(() => {
                nextEl.style.opacity = '1';
                nextEl.style.transform = 'translateY(0)';
            });

            currentSection = targetId;
            setActiveNav(targetId);

            // Scroll para topo
            window.scrollTo({ top: 0, behavior: 'smooth' });

            // Re-trigger reveal animations
            setTimeout(() => {
                checkReveal();
                isAnimating = false;
            }, 400);
        }, 400);
    }

    // Click nos itens de navegação
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const target = item.dataset.target;
            showSection(target);

            // Fechar menu mobile
            if (window.innerWidth <= 768) {
                navMenuWrapper.classList.remove('open');
                mobileToggle.classList.remove('active');
            }
        });
    });

    // Click nos botões internos
    document.querySelectorAll('[data-nav]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const target = btn.dataset.nav;
            showSection(target);
        });
    });

    // Inicializar indicador
    const activeItem = document.querySelector('.nav-item.active');
    if (activeItem) {
        setTimeout(() => updateIndicator(activeItem), 100);
    }

    // Atualizar indicador no resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            const active = document.querySelector('.nav-item.active');
            if (active) updateIndicator(active);
        }, 100);
    });

    // Hover nos itens (preview do indicador)
    navItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            if (window.innerWidth > 768) {
                updateIndicator(item);
            }
        });
    });

    navMenu.addEventListener('mouseleave', () => {
        if (window.innerWidth > 768) {
            const active = document.querySelector('.nav-item.active');
            if (active) updateIndicator(active);
        }
    });

    // ============================================
    // MENU MOBILE
    // ============================================
    mobileToggle.addEventListener('click', () => {
        mobileToggle.classList.toggle('active');
        navMenuWrapper.classList.toggle('open');
        document.body.style.overflow = navMenuWrapper.classList.contains('open') ? 'hidden' : '';
    });

    // ============================================
    // SCROLL NA NAVBAR
    // ============================================
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 50) {
            mainNav.classList.add('scrolled');
        } else {
            mainNav.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });

    // ============================================
    // ANIMAÇÃO DE REVEAL AO SCROLL
    // ============================================
    function checkReveal() {
        revealElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            if (rect.top < windowHeight * 0.88) {
                el.classList.add('revealed');
            }
        });
    }

    // Observer para reveal
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    revealElements.forEach(el => revealObserver.observe(el));

    // ============================================
    // CONTADOR ANIMADO
    // ============================================
    function animateCounter(el) {
        const target = parseInt(el.dataset.count);
        const duration = 2000;
        const start = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - start;
            const progress = Math.min(elapsed / duration, 1);

            // Easing ease-out-expo
            const easeOut = 1 - Math.pow(2, -10 * progress);
            const current = Math.floor(easeOut * target);

            el.textContent = current.toLocaleString('pt-BR');

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                el.textContent = target.toLocaleString('pt-BR');
            }
        }

        requestAnimationFrame(update);
    }

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(el => counterObserver.observe(el));

    // ============================================
    // PARTÍCULAS DE FUNDO
    // ============================================
    function createParticles() {
        const colors = ['#ffc2d1', '#ff8fab', '#d4af37', '#f4e4bc'];
        const particleCount = window.innerWidth < 768 ? 15 : 25;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';

            const size = Math.random() * 8 + 3;
            const color = colors[Math.floor(Math.random() * colors.length)];
            const left = Math.random() * 100;
            const duration = Math.random() * 20 + 15;
            const delay = Math.random() * 20;

            particle.style.cssText = `
                width: ${size}px;
                height: ${size}px;
                background: ${color};
                left: ${left}%;
                animation-duration: ${duration}s;
                animation-delay: ${delay}s;
            `;

            particlesContainer.appendChild(particle);
        }
    }

    createParticles();

    // ============================================
    // FORMULÁRIO DE CONTATO
    // ============================================
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Simular envio
        const btn = contactForm.querySelector('button[type="submit"]');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<span>Enviando...</span>';
        btn.disabled = true;

        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.disabled = false;
            contactForm.reset();

            // Mostrar toast
            toast.classList.add('show');
            setTimeout(() => {
                toast.classList.remove('show');
            }, 4000);
        }, 1500);
    });

    // ============================================
    // PARALLAX SUAVE NO SCROLL
    // ============================================
    let ticking = false;

    function updateParallax() {
        const scrolled = window.pageYOffset;
        const orbits = document.querySelectorAll('.orbit');

        orbits.forEach((orbit, i) => {
            const speed = (i + 1) * 0.02;
            orbit.style.transform = `translate(-50%, -50%) rotate(${scrolled * speed}deg)`;
        });

        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    });

    // ============================================
    // CURSOR PERSONALIZADO (desktop only)
    // ============================================
    if (window.matchMedia('(pointer: fine)').matches) {
        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        cursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            border: 2px solid var(--rose-300);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transition: transform 0.15s ease-out, opacity 0.15s;
            mix-blend-mode: difference;
            opacity: 0;
        `;
        document.body.appendChild(cursor);

        const cursorDot = document.createElement('div');
        cursorDot.className = 'cursor-dot';
        cursorDot.style.cssText = `
            position: fixed;
            width: 6px;
            height: 6px;
            background: var(--gold-300);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            opacity: 0;
        `;
        document.body.appendChild(cursorDot);

        let mouseX = 0, mouseY = 0;
        let cursorX = 0, cursorY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursor.style.opacity = '1';
            cursorDot.style.opacity = '1';
        });

        document.addEventListener('mouseleave', () => {
            cursor.style.opacity = '0';
            cursorDot.style.opacity = '0';
        });

        function animateCursor() {
            cursorX += (mouseX - cursorX) * 0.15;
            cursorY += (mouseY - cursorY) * 0.15;

            cursor.style.left = cursorX - 10 + 'px';
            cursor.style.top = cursorY - 10 + 'px';
            cursorDot.style.left = mouseX - 3 + 'px';
            cursorDot.style.top = mouseY - 3 + 'px';

            requestAnimationFrame(animateCursor);
        }
        animateCursor();

        // Hover effects no cursor
        document.querySelectorAll('a, button, .portfolio-card, .service-item').forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.transform = 'scale(2)';
                cursor.style.borderColor = 'var(--gold-300)';
            });
            el.addEventListener('mouseleave', () => {
                cursor.style.transform = 'scale(1)';
                cursor.style.borderColor = 'var(--rose-300)';
            });
        });
    }

    // ============================================
    // GLITCH EFFECT NO TÍTULO (opcional, sutil)
    // ============================================
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const highlightText = heroTitle.querySelector('.highlight');
        if (highlightText) {
            const originalText = highlightText.textContent;
            const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

            highlightText.addEventListener('mouseenter', () => {
                let iterations = 0;
                const interval = setInterval(() => {
                    highlightText.textContent = originalText
                        .split('')
                        .map((char, i) => {
                            if (i < iterations) return originalText[i];
                            return chars[Math.floor(Math.random() * chars.length)];
                        })
                        .join('');

                    iterations += 1/3;
                    if (iterations >= originalText.length) {
                        clearInterval(interval);
                        highlightText.textContent = originalText;
                    }
                }, 30);
            });
        }
    }

    // ============================================
    // INICIALIZAÇÃO
    // ============================================
    checkReveal();

    console.log('%c✦ Lumina Studio', 'color: #ff6b9d; font-size: 20px; font-weight: bold;');
    console.log('%cSite carregado com sucesso!', 'color: #d4af37;');
});
