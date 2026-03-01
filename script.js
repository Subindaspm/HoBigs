document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Toggle
  const menuToggle = document.getElementById('mobile-menu');
  const navLinks = document.querySelector('.nav-links');

  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      menuToggle.classList.toggle('active');
    });
  }

  // Close mobile menu when clicking a link
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      if (menuToggle) menuToggle.classList.remove('active');
    });
  });

  // Sticky Header Effect
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Scroll Animations (Intersection Observer)
  const animatedElements = document.querySelectorAll('.animate-on-scroll');

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // Only animate once
      }
    });
  }, observerOptions);

  animatedElements.forEach(el => {
    observer.observe(el);
  });

  // Smooth Scroll for Anchor Links (if not natively supported by css)
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        // Offset for fixed header
        const headerHeight = document.querySelector('.site-header').offsetHeight;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerHeight - 20;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // How it works automatic slider logic
  const dots = document.querySelectorAll('.hiw-dots .dot');
  const hiwCards = document.querySelectorAll('.hiw-container');

  if (dots.length > 0 && hiwCards.length > 0) {
    let currentStep = 0;
    const totalSteps = dots.length;
    let stepInterval;

    function goToStep(index) {
      // update dots
      dots.forEach(d => d.classList.remove('active'));
      dots[index].classList.add('active');

      // update cards
      hiwCards.forEach(c => c.classList.remove('active-step'));
      hiwCards[index].classList.add('active-step');

      // update arrows
      const arrows = document.querySelectorAll('.hiw-arrow');
      arrows.forEach((a, i) => {
        a.classList.remove('active-arrow');
        if (i === index || i === index - 1) {
          a.classList.add('active-arrow');
        }
      });

      currentStep = index;
    }

    function startStepInterval() {
      stopStepInterval();
      stepInterval = setInterval(() => {
        let nextStep = (currentStep + 1) % totalSteps;
        goToStep(nextStep);
      }, 3000); // Change step every 3 seconds
    }

    function stopStepInterval() {
      if (stepInterval) clearInterval(stepInterval);
    }

    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        goToStep(index);
        startStepInterval(); // restart interval on manual click

        // On mobile view, scroll to the corresponding card
        if (window.innerWidth <= 900 && hiwCards[index]) {
          hiwCards[index].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        }
      });
    });

    // Initialize first step
    goToStep(0);
    startStepInterval();
  }
});
