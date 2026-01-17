// Get all slides
const slides = document.querySelectorAll('.slide');
let currentSlide = 0;
let slideInterval;

// Show a specific slide
function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === index);
  });
}

// Move forward
function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

// Move backward
function prevSlide() {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(currentSlide);
}

// Auto-rotation every 6 seconds
function startAutoSlide() {
  slideInterval = setInterval(nextSlide, 6000);
}

// Stop auto-rotation when user interacts
function stopAutoSlide() {
  clearInterval(slideInterval);
}

// Manual controls
document.getElementById('nextSlide').addEventListener('click', () => {
  stopAutoSlide();
  nextSlide();
  startAutoSlide();
});

document.getElementById('prevSlide').addEventListener('click', () => {
  stopAutoSlide();
  prevSlide();
  startAutoSlide();
});

// Start everything
showSlide(currentSlide);
startAutoSlide();

// Mobile Navigation Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
  navMenu.classList.toggle('active');
});