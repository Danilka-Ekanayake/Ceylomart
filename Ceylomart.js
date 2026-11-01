
const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('.nav');

if (hamburger && nav) {
  hamburger.setAttribute('aria-expanded', 'false');

  hamburger.addEventListener('click', () => {
    nav.classList.toggle('nav-active');
    hamburger.classList.toggle('toggle');
    const isExpanded = nav.classList.contains('nav-active');
    hamburger.setAttribute('aria-expanded', String(isExpanded));
    hamburger.setAttribute('aria-label', isExpanded ? 'Close navigation menu' : 'Open navigation menu');
  });

  document.querySelectorAll('.nav a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('nav-active');
      hamburger.classList.remove('toggle');
      hamburger.setAttribute('aria-expanded', 'false');
      hamburger.setAttribute('aria-label', 'Open navigation menu');
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
  const productGrid = document.querySelector('#product-grid');
  const collectionSearch = document.querySelector('#collection-search');
  const collectionSort = document.querySelector('#sort-products');
  const collectionCount = document.querySelector('#collection-count');
  const noResults = document.querySelector('#collection-empty, .no-results');
  const originalOrder = new Map([...productCards].map((card, index) => [card, index]));

  function updateFilterActive(button) {
    filterButtons.forEach((btn) => btn.classList.remove('active'));
    filterButtons.forEach((btn) => btn.setAttribute('aria-pressed', 'false'));
    button.classList.add('active');
    button.setAttribute('aria-pressed', 'true');
  }

  function filterProducts(filter) {
    let visibleCount = 0;
    const searchTerm = collectionSearch ? collectionSearch.value.trim().toLowerCase() : '';

    productCards.forEach((card) => {
      const status = card.dataset.status;
      const category = card.dataset.category;
      const matchesCategory =
        filter === 'all' ||
        status === filter ||
        category === filter ||
        card.textContent.toLowerCase().includes(filter);
      const matchesSearch = !searchTerm || card.textContent.toLowerCase().includes(searchTerm);
      const isMatch = matchesCategory && matchesSearch;

      card.hidden = !isMatch;
      if (isMatch) visibleCount += 1;
    });

    if (noResults) {
      noResults.hidden = visibleCount > 0;
    }
    if (collectionCount) {
      collectionCount.textContent = `${visibleCount} ${visibleCount === 1 ? 'product' : 'products'}`;
    }
  }

  function sortProducts() {
    if (!productGrid || !collectionSort) return;

    const sortBy = collectionSort.value;
    const sortedCards = [...productCards].sort((first, second) => {
      if (sortBy === 'price-low' || sortBy === 'price-high') {
        const firstPrice = Number.parseFloat(first.querySelector('.price')?.textContent.replace(/[^\d.]/g, '') || '0');
        const secondPrice = Number.parseFloat(second.querySelector('.price')?.textContent.replace(/[^\d.]/g, '') || '0');
        return sortBy === 'price-low' ? firstPrice - secondPrice : secondPrice - firstPrice;
      }
      if (sortBy === 'name') {
        return first.querySelector('h3').textContent.localeCompare(second.querySelector('h3').textContent);
      }
      return originalOrder.get(first) - originalOrder.get(second);
    });

    sortedCards.forEach((card) => productGrid.append(card));
  }

  filterButtons.forEach((button) => {
    button.setAttribute('aria-pressed', button.classList.contains('active') ? 'true' : 'false');
    button.addEventListener('click', () => {
      const filterValue = button.dataset.filter;
      updateFilterActive(button);
      filterProducts(filterValue);
    });
  });

  if (collectionSearch) {
    collectionSearch.addEventListener('input', () => {
      const activeFilter = document.querySelector('button[data-filter].active');
      filterProducts(activeFilter ? activeFilter.dataset.filter : 'all');
    });
  }

  if (collectionSort) {
    collectionSort.addEventListener('change', () => {
      sortProducts();
    });
  }

  if (filterButtons.length && productCards.length) {
    filterProducts('all');
  }
});
