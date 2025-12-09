// Alterna entre tema claro (apenas style.css) e tema escuro (black.css ativo)
function setTheme(isDark) {
  const darkLink = document.getElementById('dark-theme');
  const toggleBtn = document.getElementById('themeToggle');

  if (!darkLink) return;

  // Ativa ou desativa o CSS escuro
  darkLink.media = isDark ? 'all' : 'none';
  document.body.classList.toggle('dark-theme', isDark);

  // Atualiza ícone e rótulo
  if (toggleBtn) {
    toggleBtn.innerHTML = isDark
      ? '<i class="fas fa-moon"></i>'
      : '<i class="fas fa-sun"></i>';
    toggleBtn.setAttribute(
      'aria-label',
      isDark ? 'Ativar tema claro' : 'Ativar tema escuro'
    );
  }

  localStorage.setItem('darkTheme', isDark ? 'true' : 'false');
}

function initTheme() {
  const darkLink = document.getElementById('dark-theme');
  const toggleBtn = document.getElementById('themeToggle');

  if (!darkLink || !toggleBtn) return;

  // Preferência salva do usuário
  const saved = localStorage.getItem('darkTheme');
  let isDark = false;

  if (saved === 'true') {
    isDark = true;
  } else if (saved === null) {
    // Se não houver preferência, usa preferência do sistema
    isDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  setTheme(isDark);

  // Clique no botão troca o tema
  toggleBtn.addEventListener('click', () => {
    const current = document.body.classList.contains('dark-theme');
    setTheme(!current);
  });
}

document.addEventListener('DOMContentLoaded', initTheme);
