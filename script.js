// Simple homepage script
document.addEventListener('DOMContentLoaded', function() {
  // Smooth scroll for any anchor links
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href !== '#' && document.querySelector(href)) {
        e.preventDefault();
        document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Preload critical resources
  const links = document.querySelectorAll('a[href*="/"]');
  links.forEach(link => {
    link.addEventListener('mouseenter', function() {
      const href = this.href;
      if (!href.includes('#')) {
        const a = document.createElement('link');
        a.rel = 'prefetch';
        a.href = href;
        document.head.appendChild(a);
      }
    });
  });
});
