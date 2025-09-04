document.querySelectorAll(".product button").forEach(btn => {
  btn.addEventListener("click", () => {
    alert("Added to cart!");
  });
});

const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('.nav');

hamburger.addEventListener('click', () => {
  nav.classList.toggle('nav-active');
  hamburger.classList.toggle('toggle');
});
  const navLinks = document.querySelectorAll('.nav a');
  const currentUrl = window.location.pathname.split('/').pop();

  navLinks.forEach(link => {
    const linkHref = link.getAttribute('href');
    if (linkHref === currentUrl || linkHref === '') {
      link.classList.add('active');
    }
  });