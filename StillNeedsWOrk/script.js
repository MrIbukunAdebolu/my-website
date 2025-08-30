window.addEventListener("DOMContentLoaded", () => {
  // Hero background slideshow
  const images = [
    'Earth_night.png',
    'yellowknife_night.png',
    'Nebula.png',
    'mars-closeup.png'
  ];

  let current = 0;
  const hero = document.getElementById('hero');

  // Preload images
  images.forEach(src => {
    const img = new Image();
    img.src = `images/${src}`;
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

  // Animate metric cards on scroll
  const metricCards = document.querySelectorAll('.metric-card');
  metricCards.forEach(card => observer.observe(card));

  // Animate hero text on load
  const heroText = document.querySelector('.hero-text');
  if (heroText) {
    heroText.classList.add('fade-in');
  }

  // Auto-scroll partner logos (optional enhancement)
  const logoStrip = document.querySelector('.partner-logos');
  if (logoStrip) {
    let scrollAmount = 0;
    setInterval(() => {
      scrollAmount += 1;
      logoStrip.scrollLeft = scrollAmount;
      if (scrollAmount >= logoStrip.scrollWidth - logoStrip.clientWidth) {
        scrollAmount = 0;
      }
    }, 50);
  }

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
    const navMenu = document.getElementById("nav-menu");
    const hamburger = document.getElementById("hamburger");
    if (navMenu && hamburger) {
      navMenu.classList.remove("show");
      hamburger.classList.remove("active");
    }
  });
});