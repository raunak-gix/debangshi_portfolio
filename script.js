/* Debangshi Roy Portfolio Interactive Script (Sharath SP Luxury Style) */

// Top-level Global Resume Modal Functions
function openResumeModal() {
  const resumeModal = document.getElementById('resume-modal');
  if (resumeModal) {
    resumeModal.classList.add('open');
    resumeModal.style.display = 'flex';
    resumeModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
}

function closeResumeModal() {
  const resumeModal = document.getElementById('resume-modal');
  if (resumeModal) {
    resumeModal.classList.remove('open');
    resumeModal.style.display = 'none';
    resumeModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
}

function scrollToSection(id) {
  const target = document.getElementById(id);
  if (target) {
    const navHeight = 70;
    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  }
}

function closeMobileNav() {
  const mobileNav = document.getElementById('mobileNav');
  if (mobileNav) {
    mobileNav.classList.remove('open');
  }
}

window.openResumeModal = openResumeModal;
window.closeResumeModal = closeResumeModal;
window.scrollToSection = scrollToSection;
window.closeMobileNav = closeMobileNav;

document.addEventListener('DOMContentLoaded', () => {
  // Dual Custom Cursor Tracking
  const cursor = document.getElementById('cursor');
  const cursorRing = document.getElementById('cursorRing');

  if (cursor && cursorRing) {
    window.addEventListener('mousemove', (e) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      cursor.style.left = `${mouseX}px`;
      cursor.style.top = `${mouseY}px`;

      cursorRing.style.left = `${mouseX}px`;
      cursorRing.style.top = `${mouseY}px`;
    });

    // Expand cursor ring on interactive elements
    const hoverables = document.querySelectorAll('a, button, .project-card, .tool-item, .filter-btn, .experience-item');
    hoverables.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursorRing.style.width = '54px';
        cursorRing.style.height = '54px';
        cursorRing.style.borderColor = '#c9a96e';
        cursorRing.style.backgroundColor = 'rgba(201, 169, 110, 0.08)';
      });
      el.addEventListener('mouseleave', () => {
        cursorRing.style.width = '36px';
        cursorRing.style.height = '36px';
        cursorRing.style.borderColor = 'rgba(201, 169, 110, 0.4)';
        cursorRing.style.backgroundColor = 'transparent';
      });
    });
  }

  // Mobile Menu Toggle
  const menuToggle = document.getElementById('menuToggle');
  const mobileNav = document.getElementById('mobileNav');

  if (menuToggle && mobileNav) {
    menuToggle.addEventListener('click', () => {
      mobileNav.classList.toggle('open');
    });
  }

  // Modal Listeners
  const modalOverlay = document.getElementById('modal-overlay');
  const closeCvModal = document.getElementById('closeCvModal');

  if (modalOverlay) modalOverlay.addEventListener('click', closeResumeModal);
  if (closeCvModal) closeCvModal.addEventListener('click', closeResumeModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeResumeModal();
    }
  });

  // Tech Stack Category Filtering
  const filterBtns = document.querySelectorAll('.filter-btn');
  const toolItems = document.querySelectorAll('.tool-item');

  if (filterBtns.length > 0 && toolItems.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        toolItems.forEach(item => {
          const category = item.getAttribute('data-category');
          if (filter === 'all' || category === filter) {
            item.classList.remove('hidden');
          } else {
            item.classList.add('hidden');
          }
        });
      });
    });
  }
});
