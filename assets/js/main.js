document.addEventListener('DOMContentLoaded', () => {
  const root = document.documentElement;
  let savedTheme = 'light';
  try { savedTheme = localStorage.getItem('theme') || 'light'; } catch (_) {}
  if (!['light', 'dark'].includes(savedTheme)) savedTheme = 'light';
  root.setAttribute('data-theme', savedTheme);
  const themeBtn = document.getElementById('themeToggle');
  function updateThemeIcon(theme) {
    if (!themeBtn) return;
    themeBtn.innerHTML = theme === 'dark' ? '<i class="bi bi-sun-fill"></i>' : '<i class="bi bi-moon-stars-fill"></i>';
    themeBtn.setAttribute('aria-label', theme === 'dark' ? 'Açık temaya geç / Switch to light theme' : 'Koyu temaya geç / Switch to dark theme');
  }
  updateThemeIcon(savedTheme);
  themeBtn?.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch (_) {}
    updateThemeIcon(next);
  });
  const mobileToggle = document.getElementById('mobileMenuBtn');
  const navLinks = document.getElementById('navLinks');
  if (mobileToggle && navLinks) {
    mobileToggle.setAttribute('aria-controls', 'navLinks');
    mobileToggle.setAttribute('aria-expanded', 'false');
    mobileToggle.addEventListener('click', () => {
      const open = navLinks.classList.toggle('show');
      mobileToggle.setAttribute('aria-expanded', String(open));
    });
    navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      navLinks.classList.remove('show');
      mobileToggle.setAttribute('aria-expanded', 'false');
    }));
  }
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      const values = new FormData(form);
      const english = root.lang === 'en';
      const subject = encodeURIComponent(values.get('subject') || 'Portfolio contact');
      const body = encodeURIComponent(`${values.get('message') || ''}\n\n${english ? 'Name' : 'Ad Soyad'}: ${values.get('name') || ''}\nEmail: ${values.get('email') || ''}`);
      const feedback = document.getElementById('formFeedback');
      if (feedback) {
        feedback.className = 'alert alert-info mt-3';
        feedback.textContent = english ? 'Your email application will open with a prepared message. Please press Send there to actually deliver it.' : 'E-posta uygulamanız hazır mesajla açılacak. Mesajı gerçekten göndermek için e-posta uygulamasında Gönder düğmesine basın.';
      }
      window.location.href = `mailto:sasmakaya.7@icloud.com?subject=${subject}&body=${body}`;
    });
  }
});

// Allow keyboard users to open project artwork previews.
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.portfolio-art-frame[role="button"]').forEach(frame => {
    frame.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); frame.click(); }
    });
  });
});
