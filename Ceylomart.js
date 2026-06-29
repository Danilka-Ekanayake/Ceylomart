
const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('.nav');

if (hamburger && nav) {
  hamburger.addEventListener('click', () => {
    nav.classList.toggle('nav-active');
    hamburger.classList.toggle('toggle');
  });

  document.querySelectorAll('.nav a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('nav-active');
      hamburger.classList.remove('toggle');
    });
  });
}

const navLinks = document.querySelectorAll('.nav a');
const currentUrl = window.location.pathname.split('/').pop();

navLinks.forEach((link) => {
  const linkHref = link.getAttribute('href');
  if (linkHref === currentUrl || (linkHref === '' && currentUrl === 'index.html')) {
    link.classList.add('active');
  }
});

const headerRight = document.querySelector('.header-right');
const body = document.body;

function updateThemeToggle(button) {
  if (!button) return;
  if (body.classList.contains('dark-theme')) {
    button.innerHTML = '<i class="fa-solid fa-sun"></i><span class="visually-hidden">Switch to light mode</span>';
    button.title = 'Light mode';
  } else {
    button.innerHTML = '<i class="fa-solid fa-moon"></i><span class="visually-hidden">Switch to dark mode</span>';
    button.title = 'Dark mode';
  }
}

function applyTheme(theme) {
  if (theme === 'dark') {
    body.classList.add('dark-theme');
  } else {
    body.classList.remove('dark-theme');
  }
  updateThemeToggle(document.querySelector('.theme-toggle'));
}

function getPreferredTheme() {
  const stored = localStorage.getItem('ceylomart-theme');
  if (stored === 'dark' || stored === 'light') {
    return stored;
  }
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function createThemeToggle() {
  if (!headerRight) return;
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'theme-toggle';
  button.addEventListener('click', () => {
    const nextTheme = body.classList.contains('dark-theme') ? 'light' : 'dark';
    applyTheme(nextTheme);
    localStorage.setItem('ceylomart-theme', nextTheme);
  });
  headerRight.prepend(button);
  updateThemeToggle(button);
}

createThemeToggle();
applyTheme(getPreferredTheme());