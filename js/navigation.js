// Système de navigation entre les pages
document.addEventListener('DOMContentLoaded', function() {
  // Bouton hamburger pour mobile
  const menuToggle = document.getElementById('menu-toggle');
  const nav = document.querySelector('nav');
  const body = document.body;

  if (menuToggle && nav) {
    menuToggle.addEventListener('click', function(e) {
      e.stopPropagation();
      nav.classList.toggle('open');
      body.classList.toggle('nav-open');
    });

    // Fermer le menu en cliquant sur l'overlay
    body.addEventListener('click', function(e) {
      if (body.classList.contains('nav-open') && !nav.contains(e.target) && !menuToggle.contains(e.target)) {
        nav.classList.remove('open');
        body.classList.remove('nav-open');
      }
    });

    // Fermer le menu en cliquant sur un lien de navigation
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        if (window.innerWidth <= 767) {
          nav.classList.remove('open');
          body.classList.remove('nav-open');
        }
      });
    });
  }

  // Navigation principale
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetPage = this.getAttribute('data-page');
      showPage(targetPage);
      
      // Mettre à jour les liens actifs dans la navigation
      navLinks.forEach(l => l.classList.remove('active'));
      this.classList.add('active');
    });
  });

  // Liens vers les pages de détails
  const detailsLinks = document.querySelectorAll('.details-link');
  detailsLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetPage = this.getAttribute('data-details');
      showPage(targetPage);
      
      // Mettre à jour la navigation active si nécessaire
      navLinks.forEach(l => l.classList.remove('active'));
    });
  });

  // Liens de retour
  const backLinks = document.querySelectorAll('.back-link');
  backLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetPage = this.getAttribute('data-back');
      showPage(targetPage);
      
      // Mettre à jour la navigation active
      navLinks.forEach(l => {
        l.classList.remove('active');
        if (l.getAttribute('data-page') === targetPage) {
          l.classList.add('active');
        }
      });
    });
  });

  // Rendre showPage accessible globalement
  window.showPage = function(pageId) {
    // Masquer toutes les sections
    const sections = document.querySelectorAll('.page-section');
    sections.forEach(section => {
      section.classList.remove('active');
    });

    // Afficher la section demandée
    const targetSection = document.getElementById(pageId);
    if (targetSection) {
      targetSection.classList.add('active');
    }
  }

  // Gestion de l'URL pour permettre la navigation directe
  const urlParams = new URLSearchParams(window.location.search);
  const page = urlParams.get('page');
  if (page) {
    showPage(page);
    navLinks.forEach(l => {
      l.classList.remove('active');
      if (l.getAttribute('data-page') === page) {
        l.classList.add('active');
      }
    });
  }
});

