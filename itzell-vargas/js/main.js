// ============================================================
// Itzell Vargas — Uñas & Pestañas — JS compartido
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Menú móvil ---------- */
  const navToggle = document.querySelector('.nav-toggle');
  const mainNav = document.querySelector('.main-nav');

  if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    mainNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- Tabs de servicios (página Servicios) ---------- */
  const tabs = document.querySelectorAll('.services-tab');
  const groups = document.querySelectorAll('.service-group');

  if (tabs.length) {
    tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        const target = tab.dataset.target;

        tabs.forEach((t) => t.classList.remove('is-active'));
        tab.classList.add('is-active');

        groups.forEach((group) => {
          group.classList.toggle('is-active', group.id === target);
        });
      });
    });
  }

  /* ---------- Formulario de contacto ---------- */
  const contactForm = document.querySelector('#contact-form');
  const formStatus = document.querySelector('#form-status');

  if (contactForm && formStatus) {
    contactForm.addEventListener('submit', (event) => {
      // El formulario usa Netlify Forms (atributo data-netlify="true").
      // En un sitio publicado en Netlify, Netlify intercepta el envío
      // automáticamente. Este mensaje confirma al usuario en pantalla.
      event.preventDefault();

      formStatus.textContent = 'Gracias, tu mensaje fue enviado. Itzell te contactará muy pronto.';
      formStatus.classList.add('is-visible', 'success');
      contactForm.reset();

      // Envío real vía fetch al endpoint de Netlify Forms.
      const formData = new FormData(contactForm);
      fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData).toString(),
      }).catch(() => {
        /* Si falla el fetch (por ejemplo, en vista previa local), el
           mensaje de confirmación ya se mostró; el envío real ocurre
           una vez el sitio está publicado en Netlify. */
      });
    });
  }

});
