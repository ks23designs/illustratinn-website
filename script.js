document.addEventListener('DOMContentLoaded', function() {
  // Set current year in footer
  document.getElementById('current-year').textContent = new Date().getFullYear();

  // Mobile menu functionality
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuCloseLinks = document.querySelectorAll('[data-menu-close]');

  // Toggle menu open/close
  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('menu-open');
      mobileMenu.style.transform = menuToggle.classList.contains('menu-open') 
        ? 'translateY(0)' 
        : 'translateY(100%)';
    });
  }

  // Close menu when clicking links
  if (menuCloseLinks.length > 0) {
    menuCloseLinks.forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('menu-open');
        mobileMenu.style.transform = 'translateY(100%)';
      });
    });
  }

  // Custom cursor functionality
  const cursorDot = document.getElementById('cursor-dot');
  const cursorOutline = document.getElementById('cursor-outline');

  // Only show custom cursor on non-touch devices
  const isTouchDevice = () => {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  };

  if (!isTouchDevice() && cursorDot && cursorOutline) {
    // Update cursor position
    document.addEventListener('mousemove', (e) => {
      cursorDot.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      cursorOutline.style.transform = `translate(${e.clientX - 15}px, ${e.clientY - 15}px)`;
      
      // Check if cursor is over a link or hover-grow element
      const targetElement = e.target;
      const isHoverElement = 
        targetElement.closest('.hover-grow') !== null || 
        targetElement.tagName.toLowerCase() === 'a' ||
        targetElement.tagName.toLowerCase() === 'button';
      
      if (isHoverElement) {
        cursorOutline.style.width = '50px';
        cursorOutline.style.height = '50px';
        cursorOutline.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
      } else {
        cursorOutline.style.width = '30px';
        cursorOutline.style.height = '30px';
        cursorOutline.style.backgroundColor = 'transparent';
      }
    });

    // Handle cursor clicks
    document.addEventListener('mousedown', () => {
      cursorOutline.style.transform = `translate(${parseInt(cursorOutline.style.transform.split('(')[1]) + 15}px, ${parseInt(cursorOutline.style.transform.split(',')[1]) + 15}px) scale(0.8)`;
    });

    document.addEventListener('mouseup', () => {
      cursorOutline.style.transform = `translate(${parseInt(cursorOutline.style.transform.split('(')[1]) + 15}px, ${parseInt(cursorOutline.style.transform.split(',')[1]) + 15}px) scale(1)`;
    });

    // Show/hide cursor when entering/leaving window
    document.addEventListener('mouseenter', () => {
      cursorDot.style.opacity = '1';
      cursorOutline.style.opacity = '1';
    });

    document.addEventListener('mouseleave', () => {
      cursorDot.style.opacity = '0';
      cursorOutline.style.opacity = '0';
    });
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (!targetId || targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (!targetElement) return;
      
      const headerOffset = 100;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      smoothScroll(offsetPosition);
    });
  });

  // Smooth scroll implementation
  function smoothScroll(targetPosition, duration = 600) {
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;
    
    function animation(currentTime) {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const run = ease(timeElapsed, startPosition, distance, duration);
      
      window.scrollTo(0, run);
      
      if (timeElapsed < duration) requestAnimationFrame(animation);
    }
    
    function ease(t, b, c, d) {
      t /= d / 2;
      if (t < 1) return c / 2 * t * t + b;
      t--;
      return -c / 2 * (t * (t - 2) - 1) + b;
    }
    
    requestAnimationFrame(animation);
  }

  // Page transition animations
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll('.page-transition').forEach((el) => {
    observer.observe(el);
  });

  // Contact form submission
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const message = document.getElementById('message').value;
      
      if (!name || !email || !message) {
        alert('Please fill out all fields');
        return;
      }
      
      // In a real project, you would send this data to a server
      // For now, we'll just display a success message
      alert('Message sent successfully!');
      
      // Reset form
      contactForm.reset();
    });
  }
});
