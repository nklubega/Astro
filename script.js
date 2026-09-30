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
/**const filterButtons = document.querySelectorAll(".filter-btn");
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
**/

// ========================================
// PORTFOLIO FILTER
// ========================================

const filterButtons = document.querySelectorAll(".filter-btn");
const portfolioCards = document.querySelectorAll(".portfolio-card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {

    const filter = button.dataset.filter;

    // Update active button
    filterButtons.forEach((btn) => {
      btn.classList.remove("active");
    });

    button.classList.add("active");

    // Filter projects
    portfolioCards.forEach((card) => {

      const category = card.dataset.category;

      if (filter === "all" || category === filter) {
        card.classList.remove("hidden");

        // Small animation when appearing
        card.style.animation = "portfolioFadeIn 0.4s ease";

      } else {
        card.classList.add("hidden");
      }

    });

  });
});


// ========================================
// PORTFOLIO MODAL
// ========================================

const portfolioModal = document.querySelector(".portfolio-modal");
const modalImage = document.querySelector(".portfolio-modal-image img");
const modalTitle = document.getElementById("portfolioModalTitle");
const modalDescription = document.getElementById("portfolioModalDescription");
const modalCategory = document.getElementById("portfolioModalCategory");
const modalClose = document.querySelector(".portfolio-modal-close");
const modalBackdrop = document.querySelector(".portfolio-modal-backdrop");


// Open project
portfolioCards.forEach((card) => {

  card.addEventListener("click", () => {

    const image = card.dataset.image;
    const title = card.dataset.title;
    const description = card.dataset.description;

    const categoryElement = card.querySelector(
      ".portfolio-info span"
    );

    const category = categoryElement
      ? categoryElement.textContent
      : "";

    modalImage.src = image;
    modalImage.alt = title;

    modalTitle.textContent = title;
    modalDescription.textContent = description;
    modalCategory.textContent = category;

    portfolioModal.classList.add("active");
    portfolioModal.setAttribute("aria-hidden", "false");

    document.body.style.overflow = "hidden";

  });

});


// Close modal
function closePortfolioModal() {

  portfolioModal.classList.remove("active");
  portfolioModal.setAttribute("aria-hidden", "true");

  document.body.style.overflow = "";

}


// Close button
modalClose.addEventListener(
  "click",
  closePortfolioModal
);


// Click outside modal
modalBackdrop.addEventListener(
  "click",
  closePortfolioModal
);


// ESC key
document.addEventListener("keydown", (event) => {

  if (
    event.key === "Escape" &&
    portfolioModal.classList.contains("active")
  ) {
    closePortfolioModal();
  }

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
