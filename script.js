/* Debangshi Roy — Wall of Portfolios Interactive Script */

// Main Tab Switcher (Profile vs Portfolio)
function switchMainTab(tabName) {
  document.querySelectorAll('.main-view').forEach(view => view.classList.remove('active'));
  document.querySelectorAll('.wop-tab-btn').forEach(btn => btn.classList.remove('active'));

  const targetView = document.getElementById('main-view-' + tabName);
  const targetBtn = document.getElementById('tab-btn-' + tabName);

  if (targetView) targetView.classList.add('active');
  if (targetBtn) targetBtn.classList.add('active');

  document.body.setAttribute('data-main-tab', tabName);
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Bookmark Toggle & Toast Notification
let isBookmarked = false;
function toggleBookmark() {
  const bookmarkIcon = document.getElementById('bookmarkIcon');
  isBookmarked = !isBookmarked;

  if (isBookmarked) {
    bookmarkIcon.className = 'fas fa-bookmark';
    showToast('Saved to Bookmarks!');
  } else {
    bookmarkIcon.className = 'far fa-bookmark';
    showToast('Removed from Bookmarks');
  }
}

// Toast Notification Banner
function showToast(message) {
  const toast = document.getElementById('wopToast');
  const toastMsg = document.getElementById('toastMessage');

  if (toast && toastMsg) {
    toastMsg.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }
}

// Interactive Message Drawer Modal
function openMessageModal() {
  const modal = document.getElementById('message-modal');
  if (modal) modal.classList.add('open');
}

function closeMessageModal() {
  const modal = document.getElementById('message-modal');
  if (modal) modal.classList.remove('open');
}

// Portfolio SPA Page Navigation
function goTo(pageId) {
  document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));

  const targetPage = document.getElementById('page-' + pageId);
  if (targetPage) {
    targetPage.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

// Resume Modal
function openResumeModal() {
  const resumeModal = document.getElementById('resume-modal');
  if (resumeModal) {
    resumeModal.classList.add('open');
    resumeModal.style.display = 'flex';
  }
}

function closeResumeModal() {
  const resumeModal = document.getElementById('resume-modal');
  if (resumeModal) {
    resumeModal.classList.remove('open');
    resumeModal.style.display = 'none';
  }
}

function scrollToSection(id) {
  const target = document.getElementById(id);
  if (target) {
    const navHeight = 70;
    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
    window.scrollTo({ top: targetPosition, behavior: 'smooth' });
  }
}

window.switchMainTab = switchMainTab;
window.toggleBookmark = toggleBookmark;
window.openMessageModal = openMessageModal;
window.closeMessageModal = closeMessageModal;
window.goTo = goTo;
window.openResumeModal = openResumeModal;
window.closeResumeModal = closeResumeModal;
window.scrollToSection = scrollToSection;

document.addEventListener('DOMContentLoaded', () => {
  // Dual Custom Cursor
  const cursor = document.getElementById('cursor');
  const cursorRing = document.getElementById('cursorRing');

  if (cursor && cursorRing) {
    window.addEventListener('mousemove', (e) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
      cursorRing.style.left = `${e.clientX}px`;
      cursorRing.style.top = `${e.clientY}px`;
    });
  }

  // Contact Form Submission Simulation
  const messageForm = document.getElementById('wopMessageForm');
  if (messageForm) {
    messageForm.addEventListener('submit', (e) => {
      e.preventDefault();
      closeMessageModal();
      showToast('Message sent successfully to Debangshi!');
      messageForm.reset();
    });
  }

  // Category Filter Pills
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
