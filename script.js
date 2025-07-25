// Data for dynamic content
const portfolioData = {
    skills: [
      "Community Building",
      "Shilling & Raiding",
      "Marketing Strategy",
      "Social Media Management",
      "Content Writing",
      "Influencer Coordination",
      "Brand Ambassadorship",
      "Project Moderation"
    ],
    projects: [
      {
        name: "$TISM",
        description: "Actively supported community growth through shilling, raiding, and social engagement to drive momentum during key campaign phases.",
        link: "https://x.com/tismishere"
      },
      {
        name: "$W3W",
        description: "Community Manager for a Solana-based Web3 arcade gaming platform, leading engagement strategies, onboarding gamers, and managing social presence.",
        link: "https://x.com/w3wgamebox"
      },
      {
        name: "$TNMR",
        description: "Part of the marketing push for a high-potential memecoin, handling raids, meme content, and building awareness across CT.",
        link: "https://x.com/TMNR637532"
      },
      {
        name: "PvPBets",
        description: "Contributed to user acquisition and community growth for a Solana-based PvP prediction platform, focusing on targeted outreach and engagement.",
        link: "https://x.com/pvpbetsofficial"
      }
    ],
    taglines: [
      "FX & Degen Trader",
      "Community Manager",
      "Moderator",
      "Reply Guy",
      "Ambassador"
    ]
  };
  
  // Theme Toggle
  function toggleTheme() {
    document.body.classList.toggle('light');
    localStorage.setItem('theme', document.body.classList.contains('light') ? 'light' : 'dark');
  }
  
  // Initialize on Page Load
  document.addEventListener('DOMContentLoaded', () => {
    // Load Theme
    if (localStorage.getItem('theme') === 'light') {
      document.body.classList.add('light');
    }
  
    // Set Footer Year
    document.getElementById('year').textContent = new Date().getFullYear();
  
    // Typing Animation for Tagline
    const taglineElement = document.querySelector('.hero-tagline');
    let taglineIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
  
    function type() {
      const currentTagline = portfolioData.taglines[taglineIndex];
      if (!isDeleting) {
        taglineElement.textContent = currentTagline.substring(0, charIndex + 1);
        charIndex++;
        if (charIndex === currentTagline.length) {
          isDeleting = true;
          setTimeout(type, 1000);
        } else {
          setTimeout(type, 100);
        }
      } else {
        taglineElement.textContent = currentTagline.substring(0, charIndex - 1);
        charIndex--;
        if (charIndex === 0) {
          isDeleting = false;
          taglineIndex = (taglineIndex + 1) % portfolioData.taglines.length;
        }
        setTimeout(type, 50);
      }
    }
    type();
  
    // Populate Skills
    const skillsContainer = document.querySelector('.skills-container');
    portfolioData.skills.forEach(skill => {
      const span = document.createElement('span');
      span.className = 'tag';
      span.textContent = skill;
      skillsContainer.appendChild(span);
    });
  
    // Populate Projects
    const projectsContainer = document.querySelector('.projects-container');
    portfolioData.projects.forEach(project => {
      const div = document.createElement('div');
      div.className = 'project';
      div.innerHTML = `
        <h3>${project.name}</h3>
        <p>${project.description}</p>
      `;
      div.onclick = () => showProjectDetails(project.name);
      projectsContainer.appendChild(div);
    });
  
    // Smooth Scroll for Navigation
    document.querySelectorAll('.nav a').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = anchor.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        targetElement.scrollIntoView({ behavior: 'smooth' });
      });
    });
  
    // Scroll Animations for Sections
    const sections = document.querySelectorAll('.section');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });
  
    sections.forEach(section => {
      observer.observe(section);
    });
  });
  
  // Crypto Ticker
  const ticker = document.getElementById('ticker');
  let previousPrices = {};
  
  async function fetchPrices() {
    try {
      const res = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana,dogecoin,pepe,binancecoin,ripple,cardano,avalanche-2,chainlink&vs_currencies=usd&include_24hr_change=true');
      if (!res.ok) throw new Error('API request failed');
      const data = await res.json();
      const items = Object.entries(data).map(([coin, info]) => {
        const price = info.usd.toFixed(2);
        const change = info.usd_24h_change.toFixed(2);
        let trend = change > 0 ? 'up' : change < 0 ? 'down' : 'neutral';
        previousPrices[coin] = price;
        return `<span class="coin ${trend}">${coin.toUpperCase()}: $${price} (${change}%)</span>`;
      });
      ticker.innerHTML = items.join(' ');
    } catch (error) {
      ticker.innerHTML = '<span class="error">Error fetching prices. Retrying...</span>';
    }
  }
  
  fetchPrices();
  setInterval(fetchPrices, 5000);
  
  // Project Modal
  function showProjectDetails(projectName) {
    const project = portfolioData.projects.find(p => p.name === projectName);
    const modal = document.getElementById('project-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const modalLink = document.getElementById('modal-link');
  
    modalTitle.textContent = project.name;
    modalDescription.textContent = project.description;
    modalLink.href = project.link;
    modal.style.display = 'block';
  }
  
  document.querySelector('.close').onclick = () => {
    document.getElementById('project-modal').style.display = 'none';
  };
  
  window.onclick = (event) => {
    const modal = document.getElementById('project-modal');
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  };