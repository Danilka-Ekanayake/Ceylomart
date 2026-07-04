
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
const currentUrl = decodeURIComponent(window.location.pathname.split('/').pop() || '');

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

window.addEventListener('DOMContentLoaded', () => {
  const filterButtons = document.querySelectorAll('button[data-filter]');
  const productCards = document.querySelectorAll('.product-card');
  const noResults = document.querySelector('.no-results');

  function updateFilterActive(button) {
    filterButtons.forEach((btn) => btn.classList.remove('active'));
    filterButtons.forEach((btn) => btn.setAttribute('aria-pressed', 'false'));
    button.classList.add('active');
    button.setAttribute('aria-pressed', 'true');
  }

  function filterProducts(filter) {
    let visibleCount = 0;

    productCards.forEach((card) => {
      const status = card.dataset.status;
      const category = card.dataset.category;
      const isMatch =
        filter === 'all' ||
        status === filter ||
        category === filter ||
        card.textContent.toLowerCase().includes(filter);

      card.hidden = !isMatch;
      if (isMatch) visibleCount += 1;
    });

    if (noResults) {
      noResults.hidden = visibleCount > 0;
    }
  }

  filterButtons.forEach((button) => {
    button.setAttribute('aria-pressed', button.classList.contains('active') ? 'true' : 'false');
    button.addEventListener('click', () => {
      const filterValue = button.dataset.filter;
      updateFilterActive(button);
      filterProducts(filterValue);
    });
  });

  if (filterButtons.length && productCards.length) {
    filterProducts('all');
  }
});
