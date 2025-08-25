//console.log("Script loaded");
window.addEventListener("DOMContentLoaded", () => {
  // Hero background slideshow
  const images = [
    'yellowknife_night.png',
    'Nebula.png',
    'Earth_night.png',
    'mars-closeup.png'
  ];

  let current = 0;
  const hero = document.getElementById('hero');

  // Preload images
  images.forEach(src => {
    const img = new Image();
    img.src = `images/${src}`; // Adjust path if needed
  });

  // Set initial background
  hero.style.backgroundImage = `url('images/${images[current]}')`;

  // Rotate images every 5 seconds
  setInterval(() => {
    current = (current + 1) % images.length;
    hero.style.backgroundImage = `url('images/${images[current]}')`;
  }, 5000);

  // Fade-in animation for service cards
  const cards = document.querySelectorAll('.service-card');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  cards.forEach(card => observer.observe(card));

  // Contact form handler
  document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const name = document.getElementById('firstName').value + ' ' + document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const country = document.getElementById('country').value;
    const department = document.getElementById('department').value;
    const message = document.getElementById('comment').value;

    const mailtoLink = `mailto:info@nxspaceng.com?subject=Contact Form Submission from ${name}&body=Name: ${name}%0AEmail: ${email}%0ACountry: ${country}%0ADepartment: ${department}%0AMessage: ${message}`;
    window.location.href = mailtoLink;
  });

  // Hamburger menu toggle
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("nav-menu");

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      navMenu.classList.toggle("show");
      hamburger.classList.toggle("active");
    });
  }
});
// Smooth scroll for nav links
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
    // Close mobile menu after click
    const navMenu = document.getElementById("nav-menu");
    const hamburger = document.getElementById("hamburger");
    if (navMenu && hamburger) {
      navMenu.classList.remove("show");
      hamburger.classList.remove("active");
    }
  });
});
