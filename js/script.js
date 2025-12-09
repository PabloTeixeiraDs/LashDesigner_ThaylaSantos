// Elementos do DOM
const menuBtn = document.querySelector('.menu-btn');
const menu = document.getElementById('menu');
const navLinks = document.querySelectorAll('nav ul li a');
const body = document.body;
const backToTopBtn = document.querySelector('.back-to-top');
const preloader = document.querySelector('.preloader');

// Criar overlay para o menu mobile
const menuOverlay = document.createElement('div');
menuOverlay.className = 'menu-overlay';
document.body.appendChild(menuOverlay);

// Toggle menu mobile
function toggleMenu() {
  menuBtn.classList.toggle('active');
  menu.classList.toggle('active');
  menuOverlay.classList.toggle('active');
  body.classList.toggle('menu-open');
  
  // Adicionar evento de clique no overlay para fechar o menu
  if (menuOverlay.classList.contains('active')) {
    menuOverlay.addEventListener('click', closeMenu);
  } else {
    menuOverlay.removeEventListener('click', closeMenu);
  }
}

// Fechar menu
function closeMenu() {
  menuBtn.classList.remove('active');
  menu.classList.remove('active');
  menuOverlay.classList.remove('active');
  body.classList.remove('menu-open');
  menuOverlay.removeEventListener('click', closeMenu);
}

// Event listeners
if (menuBtn) {
  menuBtn.addEventListener('click', toggleMenu);
}

// Fechar menu ao clicar em um link
navLinks.forEach(link => {
  link.addEventListener('click', closeMenu);
});

// Fechar menu ao redimensionar a tela para desktop
function handleResize() {
  if (window.innerWidth > 768) {
    closeMenu();
  }
}

window.addEventListener('resize', handleResize);

// Efeito de scroll suave para links internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  });
});

// Efeito de mudança no header ao rolar
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});

// Inicialização de animações ao rolar
const animateOnScroll = () => {
  const elements = document.querySelectorAll('.animate-on-scroll');
  elements.forEach(element => {
    const elementPosition = element.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.3;
    
    if (elementPosition < screenPosition) {
      element.classList.add('animate');
    }
  });
};

window.addEventListener('scroll', animateOnScroll);

// Mostrar/ocultar botão de voltar ao topo
const handleScroll = () => {
  // Atualizar a classe do header ao rolar
  if (window.scrollY > 50) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }

  // Mostrar/ocultar botão de voltar ao topo
  if (window.pageYOffset > 300) {
    backToTopBtn.classList.add('visible');
  } else {
    backToTopBtn.classList.remove('visible');
  }

  // Ativar animações ao rolar
  animateOnScroll();
};

// Rolar suavemente para o topo
const scrollToTop = (e) => {
  e.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};

// Inicialização
const init = () => {
  // Adiciona classe de carregamento ao body
  document.body.classList.add('loaded');
  
  // Inicializa as animações visíveis na tela
  animateOnScroll();
  
  // Remove o preloader
  if (preloader) {
    setTimeout(() => {
      preloader.style.opacity = '0';
      setTimeout(() => {
        preloader.style.display = 'none';
      }, 500);
    }, 500);
  }

  // Adiciona a classe scrolled ao header se a página for rolada no carregamento
  if (window.scrollY > 50) {
    nav.classList.add('scrolled');
  }

  // Adiciona a classe animate-on-scroll aos elementos que devem ser animados
  document.querySelectorAll('section, .plan-card, .hero-content').forEach((el, index) => {
    setTimeout(() => {
      el.classList.add('animate-on-scroll');
    }, index * 100);
  });
};

// Event Listeners
window.addEventListener('load', init);
window.addEventListener('scroll', handleScroll);
backToTopBtn.addEventListener('click', scrollToTop);