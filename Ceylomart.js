
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