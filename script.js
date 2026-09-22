/* ==========================================================================
   Debangshi - Data Analyst Portfolio - Interactive JavaScript Engine
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ------------------------------------------------------------------------
  // 1. Theme Switcher (Dark / Light Mode)
  // ------------------------------------------------------------------------
  const themeToggleBtn = document.getElementById('theme-toggle');
  const body = document.body;

  themeToggleBtn.addEventListener('click', () => {
    body.classList.toggle('light-mode');
    body.classList.toggle('dark-mode');
    const icon = themeToggleBtn.querySelector('i');
    
    if (body.classList.contains('light-mode')) {
      icon.className = 'fa-solid fa-sun';
    } else {
      icon.className = 'fa-solid fa-moon';
    }
  });

  // ------------------------------------------------------------------------
  // 2. Case Studies Category Filter
  // ------------------------------------------------------------------------
  const filterBtns = document.querySelectorAll('.work-section .filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const cardCategories = card.getAttribute('data-category');
        if (filterValue === 'all' || cardCategories.includes(filterValue)) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // ------------------------------------------------------------------------
  // 2b. Tech Stack Category Filter
  // ------------------------------------------------------------------------
  const techFilterBtns = document.querySelectorAll('.tech-filter-btn');
  const techCards = document.querySelectorAll('.tech-card-individual');

  techFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      techFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-tech-filter');

      techCards.forEach(card => {
        const cardCat = card.getAttribute('data-tech-cat');
        if (filterValue === 'all' || cardCat === filterValue) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // ------------------------------------------------------------------------
  // 3. Case Studies Modal Drawer Data & Logic
  // ------------------------------------------------------------------------
  const projectModal = document.getElementById('project-modal');
  const modalBody = document.getElementById('modal-body');
  const modalCloseBtn = document.getElementById('modal-close-btn');

  const projectData = {
    '1': {
      title: 'Weather Hub Application',
      category: 'HTML5 • CSS3 • JavaScript • Weather API',
      metric: 'Live - Vercel Deployment',
      liveUrl: 'https://weather-app-lemon-nine-30.vercel.app/',
      summary: 'Developed a responsive weather application using HTML, CSS, and JavaScript, with real-time weather data fetched through an external weather API.',
      problem: 'Users need instant, location-based climate forecasts, sunrise/sunset times, humidity tracking, and 3-day weather predictions with instant city search.',
      approach: [
        'Fetched real-time weather data asynchronously using an external Weather REST API.',
        'Structured clean, responsive UI layouts with HTML5, CSS3, and glassmorphism styling for all devices.',
        'Implemented interactive search with autocomplete suggestions, temperature metrics display, and error handling for invalid city inputs.'
      ],
      codeSnippet: `// Asynchronous Real-Time Weather Data Fetching Function
async function fetchWeatherData(city) {
  const apiKey = 'YOUR_WEATHER_API_KEY';
  const url = \`https://api.openweathermap.org/data/2.5/weather?q=\${city}&units=metric&appid=\${apiKey}\`;
  
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('City not found');
    const data = await response.json();
    updateWeatherUI(data);
  } catch (error) {
    showError('Please check city spelling and try again.');
  }
}`
    },
    '2': {
      title: 'Stopwatch Application',
      category: 'HTML5 • CSS3 • JavaScript',
      metric: 'Live - Vercel Deployment',
      summary: 'Developed an interactive stopwatch application with start, pause, reset, and lap-time tracking functionality using JavaScript-based real-time controls.',
      problem: 'Users needed a precise, responsive digital timer interface with real-time lap recording and instant control response.',
      approach: [
        'Implemented high-accuracy JavaScript timers for millisecond-level precision tracking.',
        'Designed intuitive controls for Start, Pause, Reset, and dynamic Lap recording.',
        'Rendered interactive lap tables showing split times and time differences with responsive layout styling.'
      ],
      codeSnippet: `// Stopwatch Timer Engine with Millisecond Precision
let startTime = 0;
let elapsedTime = 0;
let timerInterval = null;
let lapTimes = [];

function startStopwatch() {
  startTime = Date.now() - elapsedTime;
  timerInterval = setInterval(() => {
    elapsedTime = Date.now() - startTime;
    displayFormattedTime(elapsedTime);
  }, 10);
}

function recordLap() {
  lapTimes.push(elapsedTime);
  renderLapTableUI(lapTimes);
}`
    },
    '3': {
      title: 'Guess the Number Game',
      category: 'HTML5 • CSS3 • JavaScript',
      metric: 'Live - GitHub Deployment',
      summary: 'Built an interactive number-guessing game where users receive dynamic hints and feedback while attempting to identify the randomly generated number.',
      problem: 'Creating an engaging, educational web game with real-time feedback, score tracking, input validation, and dynamic animations.',
      approach: [
        'Generated random secret target numbers within configurable difficulty ranges.',
        'Calculated distance metrics to provide dynamic hints (higher/lower) after each attempt.',
        'Added score tracking, high score persistence, input validation, and celebration UI triggers.'
      ],
      codeSnippet: `// Guess the Number Game Logic & Dynamic Hints
let targetNumber = Math.floor(Math.random() * 100) + 1;
let attemptsLeft = 10;

function handleGuess(userGuess) {
  if (userGuess === targetNumber) {
    showVictoryScreen(attemptsLeft);
  } else {
    attemptsLeft--;
    const hint = userGuess < targetNumber ? "Too Low! 📈" : "Too High! 📉";
    updateHintBanner(hint, attemptsLeft);
  }
}`
    }
  };

  document.querySelectorAll('.open-modal-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const projId = btn.getAttribute('data-project');
      const data = projectData[projId];
      if (!data) return;

      modalBody.innerHTML = `
        <div class="badge-pill yellow-fill" style="margin-bottom: 12px;">${data.category}</div>
        <h2 style="font-size: 2rem; margin-bottom: 12px; color: var(--text-main);">${data.title}</h2>
        <div style="font-family: var(--font-mono); color: var(--accent-yellow); font-weight: 700; margin-bottom: 16px;">IMPACT: ${data.metric}</div>
        ${data.liveUrl ? `<div style="margin-bottom: 24px;"><a href="${data.liveUrl}" target="_blank" class="btn btn-yellow btn-sm"><i class="fa-solid fa-arrow-up-right-from-square"></i> VISIT LIVE APPLICATION</a></div>` : ''}
        
        <p style="color: var(--text-muted); line-height: 1.7; margin-bottom: 24px;">${data.summary}</p>
        
        <h4 style="font-size: 1.1rem; color: var(--text-main); margin-bottom: 8px;">Business Problem / Objective</h4>
        <p style="color: var(--text-muted); line-height: 1.6; margin-bottom: 24px;">${data.problem}</p>
        
        <h4 style="font-size: 1.1rem; color: var(--text-main); margin-bottom: 8px;">Key Technical Approach</h4>
        <ul style="color: var(--text-muted); padding-left: 20px; line-height: 1.7; margin-bottom: 24px;">
          ${data.approach.map(item => `<li>${item}</li>`).join('')}
        </ul>

        <h4 style="font-size: 1.1rem; color: var(--text-main); margin-bottom: 8px;">Implementation Code Snippet</h4>
        <pre class="code-block"><code>${escapeHtml(data.codeSnippet)}</code></pre>
      `;

      projectModal.classList.add('active');
    });
  });

  modalCloseBtn.addEventListener('click', () => {
    projectModal.classList.remove('active');
  });

  projectModal.addEventListener('click', (e) => {
    if (e.target === projectModal) {
      projectModal.classList.remove('active');
    }
  });

  function escapeHtml(text) {
    return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }



  // ------------------------------------------------------------------------
  // 5. Copy Email to Clipboard with Toast Notification
  // ------------------------------------------------------------------------
  const copyEmailBtn = document.getElementById('copy-email-btn');
  const toast = document.getElementById('toast');

  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      const email = 'roydebangshi5@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        if (toast) {
          toast.innerText = 'Copied email to clipboard!';
          toast.classList.add('show');
          setTimeout(() => {
            toast.classList.remove('show');
          }, 3000);
        }
      });
    });
  }

  // ------------------------------------------------------------------------
  // 5a. Contact Form Submission Handler (Linked to roydebangshi5@gmail.com)
  // ------------------------------------------------------------------------
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nameInput = document.getElementById('contact-name');
      const phoneInput = document.getElementById('contact-phone');
      const emailInput = document.getElementById('contact-email');
      const subjectInput = document.getElementById('contact-subject');
      const messageInput = document.getElementById('contact-message');
      const submitBtn = document.getElementById('contact-submit-btn');
      const originalBtnText = submitBtn ? submitBtn.innerHTML : '';

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> SENDING...`;
      }

      const formData = {
        name: nameInput ? nameInput.value.trim() : '',
        phone: phoneInput ? phoneInput.value.trim() : '',
        email: emailInput ? emailInput.value.trim() : '',
        subject: subjectInput && subjectInput.value.trim() ? subjectInput.value.trim() : 'Portfolio Contact Message',
        message: messageInput ? messageInput.value.trim() : '',
        _captcha: "false",
        _template: "table"
      };

      fetch('https://formsubmit.co/ajax/roydebangshi5@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      .then(response => response.json())
      .then(data => {
        const senderName = formData.name ? formData.name : 'there';
        if (toast) {
          toast.innerText = `Thank you, ${senderName}! Your message has been sent directly to roydebangshi5@gmail.com`;
          toast.classList.add('show');
          setTimeout(() => {
            toast.classList.remove('show');
          }, 4000);
        }

        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnText;
        }
        contactForm.reset();
      })
      .catch(error => {
        // Fallback to standard form submission if AJAX request encounters an issue
        contactForm.submit();
      });
    });
  }

  // ------------------------------------------------------------------------
  // 5b. Resume Modal Drawer Toggle
  // ------------------------------------------------------------------------
  const openResumeBtn = document.getElementById('open-resume-btn');
  const resumeModal = document.getElementById('resume-modal');
  const resumeModalCloseBtn = document.getElementById('resume-modal-close-btn');

  if (openResumeBtn && resumeModal) {
    openResumeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      resumeModal.classList.add('active');
    });
  }

  if (resumeModalCloseBtn && resumeModal) {
    resumeModalCloseBtn.addEventListener('click', () => {
      resumeModal.classList.remove('active');
    });

    resumeModal.addEventListener('click', (e) => {
      if (e.target === resumeModal) {
        resumeModal.classList.remove('active');
      }
    });
  }



  // ------------------------------------------------------------------------
  // 6. Number Counter Animation on Scroll for Impact Section
  // ------------------------------------------------------------------------
  const statNumbers = document.querySelectorAll('.stat-number[data-target]');
  let animated = false;

  function checkScroll() {
    const impactSection = document.getElementById('impact');
    if (!impactSection) return;

    const sectionPos = impactSection.getBoundingClientRect().top;
    const screenPos = window.innerHeight / 1.3;

    if (sectionPos < screenPos && !animated) {
      animated = true;
      statNumbers.forEach(stat => {
        const target = parseFloat(stat.getAttribute('data-target'));
        const isDecimal = target % 1 !== 0;
        let count = 0;
        const speed = target / 30;

        const updateCount = () => {
          count += speed;
          if (count < target) {
            stat.innerText = isDecimal ? count.toFixed(1) + 'x' : '+' + Math.ceil(count) + '%';
            setTimeout(updateCount, 40);
          } else {
            stat.innerText = isDecimal ? target.toFixed(1) + 'x' : '+' + target + '%';
          }
        };
        updateCount();
      });
    }
  }

  window.addEventListener('scroll', checkScroll);

  // ------------------------------------------------------------------------
  // 7. Active Navigation Scroll Spy
  // ------------------------------------------------------------------------
  const sections = document.querySelectorAll('section[id], footer[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function updateActiveNav() {
    let currentSectionId = '';
    const scrollPosition = window.scrollY + 200;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav);
  updateActiveNav();

  // ------------------------------------------------------------------------
  // 8. Contact Section Interactive Floating Tech Particles Canvas Animation
  // ------------------------------------------------------------------------
  const contactCanvas = document.getElementById('contact-canvas');
  if (contactCanvas) {
    const ctx = contactCanvas.getContext('2d');
    let width = (contactCanvas.width = contactCanvas.parentElement.offsetWidth);
    let height = (contactCanvas.height = contactCanvas.parentElement.offsetHeight);

    window.addEventListener('resize', () => {
      if (contactCanvas.parentElement) {
        width = contactCanvas.width = contactCanvas.parentElement.offsetWidth;
        height = contactCanvas.height = contactCanvas.parentElement.offsetHeight;
      }
    });

    const particles = [];
    const particleCount = 30;
    const symbols = ['+', '< />', '{ }', '[ ]', '✦', '01', 'sql', 'py', 'js'];

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 3 + 2;
        this.symbol = symbols[Math.floor(Math.random() * symbols.length)];
        this.isSymbol = Math.random() > 0.55;
        this.alpha = Math.random() * 0.45 + 0.25;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
      }

      draw() {
        const isDark = document.body.classList.contains('dark-mode');
        ctx.fillStyle = isDark ? `rgba(255, 221, 0, ${this.alpha})` : `rgba(139, 92, 246, ${this.alpha})`;
        
        if (this.isSymbol) {
          ctx.font = '11px JetBrains Mono, monospace';
          ctx.fillText(this.symbol, this.x, this.y);
        } else {
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    function animateContactBg() {
      ctx.clearRect(0, 0, width, height);
      const isDark = document.body.classList.contains('dark-mode');

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            ctx.beginPath();
            ctx.strokeStyle = isDark
              ? `rgba(255, 221, 0, ${0.12 * (1 - dist / 120)})`
              : `rgba(139, 92, 246, ${0.1 * (1 - dist / 120)})`;
            ctx.lineWidth = 1;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      particles.forEach(p => {
        p.update();
        p.draw();
      });

      requestAnimationFrame(animateContactBg);
    }

    animateContactBg();
  }

  // ------------------------------------------------------------------------
  // 9. Portfolio-Wide Interactive Floating Tech Particles Canvas Engine
  // ------------------------------------------------------------------------
  const globalCanvas = document.getElementById('global-particle-canvas');
  if (globalCanvas) {
    const ctx = globalCanvas.getContext('2d');
    let width = (globalCanvas.width = window.innerWidth);
    let height = (globalCanvas.height = window.innerHeight);

    let mouse = { x: null, y: null, radius: 150 };

    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });

    window.addEventListener('mouseleave', () => {
      mouse.x = null;
      mouse.y = null;
    });

    window.addEventListener('resize', () => {
      width = globalCanvas.width = window.innerWidth;
      height = globalCanvas.height = window.innerHeight;
    });

    const particles = [];
    const particleCount = 45;
    const symbols = ['+', '< />', '{ }', '[ ]', '✦', '01', 'sql', 'py', 'js', 'react', 'html', 'data', 'csv'];

    class GlobalParticle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.size = Math.random() * 3 + 2;
        this.symbol = symbols[Math.floor(Math.random() * symbols.length)];
        this.isSymbol = Math.random() > 0.5;
        this.baseAlpha = Math.random() * 0.35 + 0.15;
        this.alpha = this.baseAlpha;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;

        // Mouse interaction: gentle repulsion effect
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < mouse.radius) {
            const angle = Math.atan2(dy, dx);
            const force = (mouse.radius - distance) / mouse.radius;
            this.x -= Math.cos(angle) * force * 2;
            this.y -= Math.sin(angle) * force * 2;
            this.alpha = Math.min(1, this.baseAlpha + 0.4);
          } else {
            this.alpha = this.baseAlpha;
          }
        }
      }

      draw() {
        const isDark = document.body.classList.contains('dark-mode');
        ctx.fillStyle = isDark
          ? `rgba(255, 221, 0, ${this.alpha})`
          : `rgba(139, 92, 246, ${this.alpha})`;

        if (this.isSymbol) {
          ctx.font = '11px JetBrains Mono, monospace';
          ctx.fillText(this.symbol, this.x, this.y);
        } else {
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new GlobalParticle());
    }

    function animateGlobalBg() {
      ctx.clearRect(0, 0, width, height);
      const isDark = document.body.classList.contains('dark-mode');

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            ctx.beginPath();
            ctx.strokeStyle = isDark
              ? `rgba(255, 221, 0, ${0.1 * (1 - dist / 130)})`
              : `rgba(139, 92, 246, ${0.08 * (1 - dist / 130)})`;
            ctx.lineWidth = 1;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      particles.forEach(p => {
        p.update();
        p.draw();
      });

      requestAnimationFrame(animateGlobalBg);
    }

    animateGlobalBg();
  }

  // ------------------------------------------------------------------------
  // 10. Code & Data Catcher Arcade Mini Game Engine
  // ------------------------------------------------------------------------
  const arcadeCanvas = document.getElementById('arcade-canvas');
  if (arcadeCanvas) {
    const actx = arcadeCanvas.getContext('2d');
    const startBtn = document.getElementById('start-game-btn');
    const arcadeOverlay = document.getElementById('arcade-overlay');
    const overlayTitle = document.getElementById('overlay-title');
    const overlayDesc = document.getElementById('overlay-desc');

    const scoreEl = document.getElementById('game-score');
    const highScoreEl = document.getElementById('game-highscore');
    const livesEl = document.getElementById('game-lives');

    const ctrlLeft = document.getElementById('ctrl-left');
    const ctrlRight = document.getElementById('ctrl-right');

    const cWidth = arcadeCanvas.width;
    const cHeight = arcadeCanvas.height;

    let score = 0;
    let highScore = parseInt(localStorage.getItem('debangshi_arcade_highscore') || '0', 10);
    let lives = 3;
    let isPlaying = false;
    let gameLoopId = null;
    let frameCount = 0;

    if (highScoreEl) highScoreEl.innerText = highScore;

    const paddle = {
      x: cWidth / 2 - 60,
      y: cHeight - 32,
      width: 120,
      height: 18,
      speed: 11
    };

    const fallingItems = [];
    const catchEffects = [];
    const keys = { left: false, right: false };

    const itemTypes = [
      { text: 'HTML5', pts: 10, color: '#ff6b4a', isBug: false },
      { text: 'JS DOM', pts: 15, color: '#facc15', isBug: false },
      { text: 'PYTHON', pts: 20, color: '#60a5fa', isBug: false },
      { text: 'SQL', pts: 20, color: '#c084fc', isBug: false },
      { text: 'TABLEAU', pts: 25, color: '#38bdf8', isBug: false },
      { text: '🐞 BUG', pts: -1, color: '#ef4444', isBug: true }
    ];

    window.addEventListener('keydown', (e) => {
      if (!isPlaying) return;
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') keys.left = true;
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') keys.right = true;
    });

    window.addEventListener('keyup', (e) => {
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') keys.left = false;
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') keys.right = false;
    });

    // Mouse & Touch Drag Controls
    arcadeCanvas.addEventListener('mousemove', (e) => {
      if (!isPlaying) return;
      const rect = arcadeCanvas.getBoundingClientRect();
      const mouseX = ((e.clientX - rect.left) / rect.width) * cWidth;
      paddle.x = mouseX - paddle.width / 2;
    });

    if (ctrlLeft && ctrlRight) {
      ctrlLeft.addEventListener('mousedown', () => (keys.left = true));
      ctrlLeft.addEventListener('mouseup', () => (keys.left = false));
      ctrlLeft.addEventListener('mouseleave', () => (keys.left = false));
      ctrlLeft.addEventListener('touchstart', (e) => { e.preventDefault(); keys.left = true; });
      ctrlLeft.addEventListener('touchend', () => (keys.left = false));

      ctrlRight.addEventListener('mousedown', () => (keys.right = true));
      ctrlRight.addEventListener('mouseup', () => (keys.right = false));
      ctrlRight.addEventListener('mouseleave', () => (keys.right = false));
      ctrlRight.addEventListener('touchstart', (e) => { e.preventDefault(); keys.right = true; });
      ctrlRight.addEventListener('touchend', () => (keys.right = false));
    }

    function spawnItem() {
      const typeIndex = Math.random() < 0.26 ? 5 : Math.floor(Math.random() * 5);
      const type = itemTypes[typeIndex];
      const itemWidth = type.isBug ? 50 : 64;
      const x = Math.random() * (cWidth - itemWidth);
      const baseSpeed = 2.4 + Math.random() * 1.6 + Math.floor(score / 60) * 0.4;

      fallingItems.push({
        x: x,
        y: -30,
        width: itemWidth,
        height: 24,
        speed: baseSpeed,
        type: type
      });
    }

    function updateLivesUI() {
      if (!livesEl) return;
      let hearts = '';
      for (let i = 0; i < lives; i++) hearts += '❤️';
      for (let i = lives; i < 3; i++) hearts += '🖤';
      livesEl.innerText = hearts;
    }

    function startGame() {
      score = 0;
      lives = 3;
      fallingItems.length = 0;
      catchEffects.length = 0;
      paddle.x = cWidth / 2 - paddle.width / 2;
      frameCount = 0;

      if (scoreEl) scoreEl.innerText = '0';
      updateLivesUI();

      if (arcadeOverlay) arcadeOverlay.classList.add('hidden');
      isPlaying = true;
      if (gameLoopId) cancelAnimationFrame(gameLoopId);
      gameLoop();
    }

    function gameOver() {
      isPlaying = false;
      if (gameLoopId) cancelAnimationFrame(gameLoopId);

      if (score > highScore) {
        highScore = score;
        localStorage.setItem('debangshi_arcade_highscore', highScore.toString());
        if (highScoreEl) highScoreEl.innerText = highScore;
        if (overlayTitle) overlayTitle.innerText = '🏆 NEW HIGH SCORE!';
        if (overlayDesc) overlayDesc.innerHTML = `Awesome job! You scored <strong>${score} points</strong> and set a new personal record!`;
      } else {
        if (overlayTitle) overlayTitle.innerText = 'GAME OVER!';
        if (overlayDesc) overlayDesc.innerHTML = `You caught <strong>${score} points</strong> worth of code & data! Try again to beat the high score!`;
      }

      if (startBtn) startBtn.innerHTML = `<i class="fa-solid fa-rotate-right"></i> PLAY AGAIN`;
      if (arcadeOverlay) arcadeOverlay.classList.remove('hidden');
    }

    function gameLoop() {
      if (!isPlaying) return;
      frameCount++;

      const spawnRate = Math.max(25, 45 - Math.floor(score / 40));
      if (frameCount % spawnRate === 0) {
        spawnItem();
      }

      if (keys.left) paddle.x -= paddle.speed;
      if (keys.right) paddle.x += paddle.speed;

      if (paddle.x < 0) paddle.x = 0;
      if (paddle.x + paddle.width > cWidth) paddle.x = cWidth - paddle.width;

      actx.clearRect(0, 0, cWidth, cHeight);

      // Draw Retro Neon Grid Lines Background
      actx.strokeStyle = 'rgba(56, 189, 248, 0.07)';
      actx.lineWidth = 1;
      for (let x = 0; x < cWidth; x += 36) {
        actx.beginPath();
        actx.moveTo(x, 0);
        actx.lineTo(x, cHeight);
        actx.stroke();
      }
      for (let y = 0; y < cHeight; y += 36) {
        actx.beginPath();
        actx.moveTo(0, y);
        actx.lineTo(cWidth, y);
        actx.stroke();
      }

      // Update & Draw Falling Skill Pills
      for (let i = fallingItems.length - 1; i >= 0; i--) {
        const item = fallingItems[i];
        item.y += item.speed;

        // Neon Glow for Special Items
        actx.save();
        if (item.type.isBug) {
          actx.shadowColor = '#ef4444';
          actx.shadowBlur = 8;
        } else if (item.type.pts >= 20) {
          actx.shadowColor = item.type.color;
          actx.shadowBlur = 10;
        }

        // Draw Skill Block
        actx.fillStyle = item.type.color;
        actx.fillRect(item.x, item.y, item.width, item.height);
        actx.strokeStyle = '#ffffff';
        actx.lineWidth = 2;
        actx.strokeRect(item.x, item.y, item.width, item.height);
        actx.restore();

        // Label Text
        actx.fillStyle = item.type.isBug ? '#ffffff' : '#0f1015';
        actx.font = '800 11px JetBrains Mono, monospace';
        actx.textAlign = 'center';
        actx.textBaseline = 'middle';
        actx.fillText(item.type.text, item.x + item.width / 2, item.y + item.height / 2);

        // Collision Check with Paddle
        if (
          item.y + item.height >= paddle.y &&
          item.y <= paddle.y + paddle.height &&
          item.x + item.width >= paddle.x &&
          item.x <= paddle.x + paddle.width
        ) {
          if (item.type.isBug) {
            lives--;
            updateLivesUI();
            catchEffects.push({ x: item.x, y: item.y, text: '🐞 BUG! -1 LIFE', color: '#ef4444', alpha: 1, scale: 1.2 });
            if (lives <= 0) {
              gameOver();
              return;
            }
          } else {
            score += item.type.pts;
            if (scoreEl) scoreEl.innerText = score;
            catchEffects.push({ x: item.x, y: item.y, text: `+${item.type.pts}`, color: item.type.color, alpha: 1, scale: 1 });
          }

          fallingItems.splice(i, 1);
          continue;
        }

        if (item.y > cHeight) {
          fallingItems.splice(i, 1);
        }
      }

      // Draw Floating Point Particles / Catch Effects
      for (let i = catchEffects.length - 1; i >= 0; i--) {
        const fx = catchEffects[i];
        fx.y -= 1.4;
        fx.alpha -= 0.025;
        actx.save();
        actx.fillStyle = fx.color;
        actx.shadowColor = fx.color;
        actx.shadowBlur = 8;
        actx.font = '800 14px JetBrains Mono, monospace';
        actx.globalAlpha = Math.max(0, fx.alpha);
        actx.fillText(fx.text, fx.x + 30, fx.y);
        actx.restore();

        if (fx.alpha <= 0) {
          catchEffects.splice(i, 1);
        }
      }

      // Draw Player Paddle with Neon Glow
      actx.save();
      actx.shadowColor = '#ffdd00';
      actx.shadowBlur = 12;
      actx.fillStyle = '#ffdd00';
      actx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
      actx.strokeStyle = '#ffffff';
      actx.lineWidth = 2.5;
      actx.strokeRect(paddle.x, paddle.y, paddle.width, paddle.height);
      actx.restore();

      // Paddle Label
      actx.fillStyle = '#0f1015';
      actx.font = '800 11px JetBrains Mono, monospace';
      actx.textAlign = 'center';
      actx.textBaseline = 'middle';
      actx.fillText('[ 💻 DEBANGSHI ]', paddle.x + paddle.width / 2, paddle.y + paddle.height / 2);

      gameLoopId = requestAnimationFrame(gameLoop);
    }

    if (startBtn) {
      startBtn.addEventListener('click', startGame);
    }
  }
});

