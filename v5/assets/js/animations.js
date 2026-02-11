/**
 * ============================================
 * BENEDI - Sistema de Animações e Interatividade
 * ============================================
 * 
 * Arquivo JavaScript para animações de scroll,
 * interatividades e efeitos visuais profissionais
 */

// ============================================
// CONFIGURAÇÕES GLOBAIS
// ============================================

const CONFIG = {
  // Intersection Observer
  observerThreshold: 0.15, // 15% do elemento visível para ativar
  observerRootMargin: '0px 0px -10% 0px',
  
  // Delays entre animações
  staggerDelay: 100, // ms entre cada card
  
  // Classes CSS
  classes: {
    visible: 'is-visible',
    animated: 'has-animated',
    scrolled: 'is-scrolled'
  }
};

// ============================================
// UTILITÁRIOS
// ============================================

/**
 * Debounce - Limita execução de funções
 */
function debounce(func, wait = 100) {
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
 * Verifica se usuário prefere movimento reduzido
 */
function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Smooth scroll para âncoras
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      
      // Ignora âncoras vazias
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        e.preventDefault();
        
        // Scroll suave nativo (respeitando prefers-reduced-motion no CSS)
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        
        // Atualiza URL sem scroll
        if (history.pushState) {
          history.pushState(null, null, targetId);
        }
      }
    });
  });
}

// ============================================
// ANIMAÇÕES DE SCROLL (INTERSECTION OBSERVER)
// ============================================

/**
 * Configura Intersection Observer para animações
 */
function initScrollAnimations() {
  // Se usuário prefere sem movimento, não anima
  if (prefersReducedMotion()) {
    document.querySelectorAll('[data-scroll-animation]').forEach(el => {
      el.classList.add(CONFIG.classes.visible);
    });
    return;
  }
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Delay escalonado para múltiplos elementos
        const delay = entry.target.dataset.scrollDelay || 0;
        
        setTimeout(() => {
          entry.target.classList.add(CONFIG.classes.visible);
          entry.target.classList.add(CONFIG.classes.animated);
        }, delay);
        
        // Para de observar depois de animar (performance)
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: CONFIG.observerThreshold,
    rootMargin: CONFIG.observerRootMargin
  });
  
  // Observa todos os elementos com data-scroll-animation
  document.querySelectorAll('[data-scroll-animation]').forEach(el => {
    observer.observe(el);
  });
}

/**
 * Adiciona delays escalonados para cards
 */
function addStaggeredDelays() {
  // Welcome cards
  document.querySelectorAll('.welcome-card').forEach((card, index) => {
    card.setAttribute('data-scroll-animation', 'fade-up');
    card.setAttribute('data-scroll-delay', index * CONFIG.staggerDelay);
  });

  // Impact line
  document.querySelectorAll('.impact-line').forEach((card, index) => {
    card.setAttribute('data-scroll-animation', 'fade-slide');
    card.setAttribute('data-scroll-delay', index * 150);
  });
  
  // Change cards
  document.querySelectorAll('.change-card').forEach((card, index) => {
    card.setAttribute('data-scroll-animation', 'fade-slide');
    card.setAttribute('data-scroll-delay', index * 150);
  });
  
  // Find cards
  document.querySelectorAll('.find-card').forEach((card, index) => {
    card.setAttribute('data-scroll-animation', 'scale-in');
    card.setAttribute('data-scroll-delay', index * 80);
  });
  
  // Depoimentos
  document.querySelectorAll('.dep-card').forEach((card, index) => {
    card.setAttribute('data-scroll-animation', 'fade-up');
    card.setAttribute('data-scroll-delay', index * 120);
  });
  
  // Certificate items
  document.querySelectorAll('.certificate-container ul li').forEach((item, index) => {
    item.setAttribute('data-scroll-animation', 'slide-right');
    item.setAttribute('data-scroll-delay', index * 60);
  });
  
  // Accordions
  document.querySelectorAll('.accordion').forEach((accordion, index) => {
    accordion.setAttribute('data-scroll-animation', 'fade-up');
    accordion.setAttribute('data-scroll-delay', index * 50);
  });
  
  // Seções inteiras
  document.querySelectorAll('.intro-text, .welcome-text, .change-text, .find-text, .not-alone-container, .active-content, .price-intro, .mockup-text, .about-intro, .dep-text, .faq-text, .benedi-container').forEach(section => {
    section.setAttribute('data-scroll-animation', 'fade-up');
  });
  
  // Mockup images
  document.querySelectorAll('.mockup-imgs > div').forEach((img, index) => {
    img.setAttribute('data-scroll-animation', 'zoom-in');
    img.setAttribute('data-scroll-delay', index * 150);
  });
    
  // not-alone h2
  document.querySelectorAll('.not-alone .not-alone-container h2').forEach((img, index) => {
    img.setAttribute('data-scroll-animation', 'zoom-in');
    img.setAttribute('data-scroll-delay', index * 150);
  });

  // not-alone icon
  document.querySelectorAll('.not-alone .not-alone-container .not-alone-icon').forEach((item, index) => {
    item.setAttribute('data-scroll-animation', 'pop-in');
    item.setAttribute('data-scroll-delay', index * 80 + 500);
  });
  
  // Active items
  document.querySelectorAll('.active-item').forEach((item, index) => {
    item.setAttribute('data-scroll-animation', 'pop-in');
    item.setAttribute('data-scroll-delay', index * 100);
  });

  // About Nat Photo
  document.querySelectorAll('.about-nat .about-cards-wrap .about-card').forEach((card, index) => {
    card.setAttribute('data-scroll-animation', 'fade-slide');
    card.setAttribute('data-scroll-delay', index * 150);
  });

  // Price Card
  document.querySelectorAll('.price .price-cards .price-card').forEach((card, index) => {
    card.setAttribute('data-scroll-animation', 'fade-slide');
    card.setAttribute('data-scroll-delay', index * 150);
  });

  // benedi final
  document.querySelectorAll('.benedi .benedi-container').forEach((item, index) => {
    item.setAttribute('data-scroll-animation', 'zoom-in');
    item.setAttribute('data-scroll-delay', index * 150);
  });
}

// ============================================
// LOADING PROGRESSIVO DE IMAGENS
// ============================================

/**
 * Lazy loading de imagens com fade-in
 */
function initLazyImages() {
  const images = document.querySelectorAll('img[data-src]');
  
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.add('lazy-loaded');
        imageObserver.unobserve(img);
      }
    });
  });
  
  images.forEach(img => imageObserver.observe(img));
}

// ============================================
// CURSOR CUSTOMIZADO (OPCIONAL)
// ============================================

/**
 * Cursor customizado que segue o mouse
 */
function initCustomCursor() {
  if (prefersReducedMotion() || window.innerWidth < 1024) return;
  
  const cursor = document.createElement('div');
  cursor.className = 'custom-cursor';
  document.body.appendChild(cursor);
  
  let mouseX = 0, mouseY = 0;
  let cursorX = 0, cursorY = 0;
  
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });
  
  function animateCursor() {
    const dx = mouseX - cursorX;
    const dy = mouseY - cursorY;
    
    cursorX += dx * 0.3;
    cursorY += dy * 0.3;
    
    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';
    
    requestAnimationFrame(animateCursor);
  }
  
  animateCursor();
  
  // Aumenta cursor em elementos clicáveis
  document.querySelectorAll('a, button, .btn').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('cursor-hover'));
  });
}

// ============================================
// PROGRESS BAR DE LEITURA
// ============================================

/**
 * Barra de progresso de scroll
 */
function initReadingProgress() {
  const progressBar = document.createElement('div');
  progressBar.className = 'reading-progress';
  document.body.appendChild(progressBar);
  
  const updateProgress = debounce(() => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight - windowHeight;
    const scrolled = window.scrollY;
    const progress = (scrolled / documentHeight) * 100;
    
    progressBar.style.width = `${progress}%`;
  }, 10);
  
  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();
}

// ============================================
// SCROLL SPY (DESTACA SEÇÃO ATIVA)
// ============================================

/**
 * Detecta seção visível e atualiza navegação
 */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('a[href^="#"]');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            // link.classList.add('active');
          }
        });
      }
    });
  }, {
    threshold: 0.3,
    rootMargin: '-20% 0px -20% 0px'
  });
  
  sections.forEach(section => observer.observe(section));
}

// ============================================
// PERFORMANCE - REDUZ ANIMAÇÕES EM MOBILE
// ============================================

/**
 * Detecta dispositivo e ajusta animações
 */
function optimizeForDevice() {
  const isMobile = window.innerWidth < 768;
  const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
  
  if (isMobile) {
    // Reduz complexidade de animações em mobile
    document.body.classList.add('is-mobile');
    CONFIG.staggerDelay = 50; // Mais rápido
  } else if (isTablet) {
    document.body.classList.add('is-tablet');
  } else {
    document.body.classList.add('is-desktop');
  }
}

// ============================================
// BACK TO TOP BUTTON
// ============================================

/**
 * Botão de voltar ao topo
 */
function initBackToTop() {
  const backToTopBtn = document.createElement('button');
  backToTopBtn.className = 'back-to-top';
  backToTopBtn.innerHTML = '↑';
  backToTopBtn.setAttribute('aria-label', 'Voltar ao topo');
  document.body.appendChild(backToTopBtn);
  
  const handleScroll = debounce(() => {
    if (window.scrollY > 500) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  }, 100);
  
  window.addEventListener('scroll', handleScroll, { passive: true });
  
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// ============================================
// EASTER EGG - KONAMI CODE
// ============================================

/**
 * Easter egg com Konami Code (↑↑ ↓↓ ←← →→)
 */
function initKonamiCode() {
  const konamiCode = [38, 38, 40, 40, 37, 37, 39, 39];
  let konamiIndex = 0;
  
  document.addEventListener('keydown', (e) => {
    if (e.keyCode === konamiCode[konamiIndex]) {
      konamiIndex++;
      
      if (konamiIndex === konamiCode.length) {
        activateEasterEgg();
        konamiIndex = 0;
      }
    } else {
      konamiIndex = 0;
    }
  });
  
  function activateEasterEgg() {
    // Confete explosão!
    document.body.style.animation = 'rainbow 2s infinite';
    setTimeout(() => {
      document.body.style.animation = '';
      alert('🎉 Parabéns! Você encontrou o easter egg da BENEDI! 🎉');
    }, 2000);
  }
}

// ============================================
// INICIALIZAÇÃO PRINCIPAL
// ============================================

/**
 * Inicializa todas as funcionalidades
 */
function init() {
  console.log('🚀 BENEDI - Inicializando animações...');
  
  // Otimiza para dispositivo
  optimizeForDevice();
  
  // Animações básicas
  initSmoothScroll();
  addStaggeredDelays();
  initScrollAnimations();
  
  // Funcionalidades extras
  initReadingProgress();
  initBackToTop();
  initScrollSpy();
  
  // Performance
  initLazyImages();
  
  // Recursos opcionais (descomente se quiser usar)
  initCustomCursor();
  initKonamiCode();
  
  console.log('✅ Animações carregadas com sucesso!');
}

// ============================================
// EXECUÇÃO
// ============================================

// Aguarda DOM estar pronto
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// Recarrega otimizações ao redimensionar
window.addEventListener('resize', debounce(() => {
  optimizeForDevice();
}, 250));
