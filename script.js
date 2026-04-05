// Mobile menu
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle) {
  menuToggle.addEventListener("click", () => {
    document.body.classList.toggle("menu-open");
  });
}

if (navLinks) {
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      document.body.classList.remove("menu-open");
    });
  });
}

// Reveal on scroll
const revealItems = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.15
  }
);

revealItems.forEach((item) => revealObserver.observe(item));

// Parallax
const parallaxItems = document.querySelectorAll(".parallax");

function updateParallax() {
  const scrollY = window.pageYOffset;

  parallaxItems.forEach((item) => {
    const speed = parseFloat(item.dataset.speed || "0.15");
    const translateY = scrollY * speed;
    item.style.transform = `translate3d(0, ${translateY}px, 0)`;
  });
}

window.addEventListener("scroll", updateParallax, { passive: true });
updateParallax();

// Portfolio filter
const filterButtons = document.querySelectorAll(".filter-btn");
const portfolioCards = document.querySelectorAll(".portfolio-card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    portfolioCards.forEach((card) => {
      const category = card.dataset.category;

      if (filter === "all" || category === filter) {
        card.classList.remove("hidden");
      } else {
        card.classList.add("hidden");
      }
    });
  });
});

// Contact form demo handler
const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

if (contactForm) {
  contactForm.addEventListener("submit", () => {
    if (formMessage) {
      formMessage.textContent = "Sending your inquiry...";
    }
  });
}

// Current year
const yearElement = document.getElementById("year");
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

// Canvas stars background
const canvas = document.getElementById("starsCanvas");

if (canvas) {
  const ctx = canvas.getContext("2d");
  let stars = [];
  let width = 0;
  let height = 0;

  function resizeCanvas() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = document.querySelector(".hero").offsetHeight;

    stars = Array.from({ length: Math.min(120, Math.floor(width / 12)) }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 1.6 + 0.3,
      a: Math.random() * 0.6 + 0.2,
      d: Math.random() * 0.015 + 0.003
    }));
  }

  function drawStars() {
    ctx.clearRect(0, 0, width, height);

    for (const star of stars) {
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${star.a})`;
      ctx.fill();

      star.a += star.d;

      if (star.a >= 0.95 || star.a <= 0.15) {
        star.d *= -1;
      }
    }

    requestAnimationFrame(drawStars);
  }

  resizeCanvas();
  drawStars();

  window.addEventListener("resize", resizeCanvas);
}
