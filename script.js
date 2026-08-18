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
      title: 'Exploratory Data Analysis Portal',
      category: 'Python • Pandas • SQL Analytics',
      metric: 'Data Insights & Cleaning Engine',
      summary: 'Engineered a Python exploratory data analysis script using Pandas & NumPy to process multi-feature datasets, clean missing records, and plot trend correlations.',
      problem: 'Raw student performance and survey data required extensive cleaning and summary stats prior to analysis.',
      approach: [
        'Cleaned null values and outlier records in Python using Pandas dataframes.',
        'Wrote SQL aggregations to calculate statistical averages across student cohorts.',
        'Generated visual summary plots to highlight key academic performance indicators.'
      ],
      codeSnippet: `# Python Pandas Data Cleaning & Summary Script
import pandas as pd
import numpy as np

def analyze_student_data(file_path):
    df = pd.read_csv(file_path)
    df.dropna(subset=['score', 'attendance'], inplace=True)
    
    summary = df.groupby('department').agg(
        avg_score=('score', 'mean'),
        avg_attendance=('attendance', 'mean'),
        total_students=('student_id', 'count')
    ).reset_index()
    return summary`
    },
    '2': {
      title: 'Megatronix Tech Fest Event Portal',
      category: 'Front-End • HTML5 • CSS3 • JavaScript',
      metric: '45% Increase in Student Registrations',
      summary: 'Designed and developed a responsive event website for Megatronix, the official technical club of college, providing technical fest schedules and automated registration forms.',
      problem: 'College students needed a centralized web hub to view hackathon schedules, workshop details, and submit event registrations.',
      approach: [
        'Structured semantic HTML5 pages for event guidelines and workshop rules.',
        'Styled custom CSS3 layouts with CSS Grid and Flexbox for mobile responsiveness.',
        'Implemented JavaScript form validation for instant student registration feedback.'
      ],
      codeSnippet: `// JavaScript Client-side Registration Form Validation
const form = document.getElementById('reg-form');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('student-name').value;
  const email = document.getElementById('student-email').value;
  
  if (name && email.includes('@')) {
    alert(\`Success! Welcome to Megatronix Tech Fest, \${name}!\`);
  } else {
    alert('Please enter a valid student email address.');
  }
});`
    },
    '3': {
      title: 'Student Performance Dashboard App',
      category: 'React.js Basics • JavaScript • Web App',
      metric: 'Interactive React Component UI',
      summary: 'Built a modular React.js dashboard component to display student academic performance records with interactive search and metric filtering.',
      problem: 'Demonstrating clean React state management for filtering student cards dynamically.',
      approach: [
        'Created reusable functional React components for StudentCard and MetricsSummary.',
        'Used React useState hook to handle live keyword search filtering.',
        'Styled responsive cards with CSS Modules.'
      ],
      codeSnippet: `// React.js Student Filter Component
import React, { useState } from 'react';

export default function StudentFilter({ students }) {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filtered = students.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div>
      <input 
        type="text" 
        placeholder="Search student..." 
        onChange={e => setSearchTerm(e.target.value)} 
      />
      {filtered.map(student => (
        <div key={student.id}>{student.name} - Score: {student.score}</div>
      ))}
    </div>
  );
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
        <div style="font-family: var(--font-mono); color: var(--accent-yellow); font-weight: 700; margin-bottom: 24px;">IMPACT: ${data.metric}</div>
        
        <p style="color: var(--text-muted); line-height: 1.7; margin-bottom: 24px;">${data.summary}</p>
        
        <h4 style="font-size: 1.1rem; color: var(--text-main); margin-bottom: 8px;">Business Problem</h4>
        <p style="color: var(--text-muted); line-height: 1.6; margin-bottom: 24px;">${data.problem}</p>
        
        <h4 style="font-size: 1.1rem; color: var(--text-main); margin-bottom: 8px;">Key Analytical Approach</h4>
        <ul style="color: var(--text-muted); padding-left: 20px; line-height: 1.7; margin-bottom: 24px;">
          ${data.approach.map(item => `<li>${item}</li>`).join('')}
        </ul>

        <h4 style="font-size: 1.1rem; color: var(--text-main); margin-bottom: 8px;">Analytical Code Snippet</h4>
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
        toast.classList.add('show');
        setTimeout(() => {
          toast.classList.remove('show');
        }, 3000);
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
});

