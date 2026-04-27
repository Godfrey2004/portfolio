// ===== CUSTOM CURSOR =====
const cursor = document.getElementById('cursor');
const trail = document.getElementById('cursorTrail');
let mouseX = 0, mouseY = 0, trailX = 0, trailY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX; mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top = mouseY + 'px';
});

function animateTrail() {
  trailX += (mouseX - trailX) * 0.12;
  trailY += (mouseY - trailY) * 0.12;
  trail.style.left = trailX + 'px';
  trail.style.top = trailY + 'px';
  requestAnimationFrame(animateTrail);
}
animateTrail();

document.querySelectorAll('a,button,.btn,.project-card,.cert-card').forEach(el => {
  el.addEventListener('mouseenter', () => { cursor.style.transform = 'translate(-50%,-50%) scale(2.5)'; cursor.style.background = 'transparent'; cursor.style.border = '2px solid var(--accent)'; });
  el.addEventListener('mouseleave', () => { cursor.style.transform = 'translate(-50%,-50%) scale(1)'; cursor.style.background = 'var(--accent)'; cursor.style.border = 'none'; });
});

// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
  updateActiveLink();
});

function updateActiveLink() {
  const sections = document.querySelectorAll('section[id]');
  const links = document.querySelectorAll('.nav-link');
  let current = '';
  sections.forEach(s => { if (window.scrollY >= s.offsetTop - 120) current = s.id; });
  links.forEach(l => { l.classList.toggle('active', l.getAttribute('href') === '#' + current); });
}

// ===== HAMBURGER =====
const ham = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
ham.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const spans = ham.querySelectorAll('span');
  if (navLinks.classList.contains('open')) {
    spans[0].style.transform = 'rotate(45deg) translate(5px,5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px,-5px)';
  } else {
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  }
});
document.querySelectorAll('.nav-link').forEach(l => l.addEventListener('click', () => {
  navLinks.classList.remove('open');
  ham.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
}));

// ===== TYPEWRITER =====
const roles = ['Full Stack Developer', 'AI & IoT Enthusiast', 'UI/UX Designer', 'Eye for Detail'];
let rIdx = 0, cIdx = 0, deleting = false;
const roleEl = document.getElementById('roleText');

function type() {
  const word = roles[rIdx];
  roleEl.textContent = deleting ? word.slice(0, cIdx--) : word.slice(0, cIdx++);
  let delay = deleting ? 60 : 110;
  if (!deleting && cIdx > word.length) { delay = 1800; deleting = true; }
  if (deleting && cIdx < 0) { deleting = false; rIdx = (rIdx + 1) % roles.length; cIdx = 0; delay = 400; }
  setTimeout(type, delay);
}
setTimeout(type, 1200);

// ===== SCROLL REVEAL =====
const revealEls = document.querySelectorAll('.section-header,.about-grid,.skill-category,.timeline-block,.project-card,.cert-card,.contact-wrapper,.interests-row');
revealEls.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 80);
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ===== CONTACT FORM (Google Forms – hidden iframe POST) =====
const GOOGLE_FORM_ACTION = 'https://docs.google.com/forms/d/e/1FAIpQLScUpeCk6jqi9KGQE-FA8RaFdD_mN3jYh8OWDeDX4kXBu9DvSg/formResponse';
const ENTRY_NAME    = 'entry.20287694';
const ENTRY_EMAIL   = 'entry.1990096149';
const ENTRY_MESSAGE = 'entry.1571348879';

document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const btn  = document.getElementById('sendBtn');
  const note = document.getElementById('formNote');

  const name    = document.getElementById('name').value.trim();
  const email   = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  btn.innerHTML    = '<i class="fas fa-spinner fa-spin"></i> Sending...';
  btn.disabled     = true;
  note.textContent = '';

  // Build a real HTML form POST — works from file:// unlike fetch
  const tempForm = document.createElement('form');
  tempForm.method = 'POST';
  tempForm.action = GOOGLE_FORM_ACTION;
  tempForm.target = 'hidden_google_iframe'; // response loads into hidden iframe
  tempForm.style.cssText = 'display:none;position:absolute;';

  [[ENTRY_NAME, name], [ENTRY_EMAIL, email], [ENTRY_MESSAGE, message]].forEach(([key, val]) => {
    const field = document.createElement('input');
    field.type  = 'hidden';
    field.name  = key;
    field.value = val;
    tempForm.appendChild(field);
  });

  document.body.appendChild(tempForm);
  tempForm.submit();

  // Remove temp form after submit and show success
  setTimeout(() => {
    document.body.removeChild(tempForm);
    btn.innerHTML    = '<i class="fas fa-check"></i> Message Sent!';
    note.textContent = '✓ Thanks! I\'ll get back to you soon.';
    note.style.color = '#22c55e';
    this.reset();
    setTimeout(() => {
      btn.innerHTML    = '<i class="fas fa-paper-plane"></i> Send Message';
      btn.disabled     = false;
      note.textContent = '';
    }, 4000);
  }, 2000);
});

// ===== YEAR =====
document.getElementById('year').textContent = new Date().getFullYear();

// ===== SMOOTH NAV SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  });
});

// ===== PARALLAX ORBS =====
window.addEventListener('mousemove', e => {
  const x = (e.clientX / window.innerWidth - 0.5) * 30;
  const y = (e.clientY / window.innerHeight - 0.5) * 30;
  document.querySelector('.orb-1').style.transform = `translate(${x}px,${y}px)`;
  document.querySelector('.orb-2').style.transform = `translate(${-x}px,${-y}px)`;
  document.querySelector('.orb-3').style.transform = `translate(${x * 0.5}px,${y * 0.5}px)`;
});
