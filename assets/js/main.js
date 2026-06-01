/**
* Template Name: DevFolio
* Template URL: https://bootstrapmade.com/devfolio-bootstrap-portfolio-html-template/
* Updated: Mar 17 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    if (!header.classList.contains('header-scrolled')) {
      offset -= 16
    }

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
      } else {
        selectHeader.classList.remove('header-scrolled')
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function(e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Intro type effect
   */
  const typed = select('.typed')
  if (typed) {
    let typed_strings = typed.getAttribute('data-typed-items')
    typed_strings = typed_strings.split(',')
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Testimonials Read More/Less
   */
  function setupTestimonialReadMore() {
    const testimonialBoxes = document.querySelectorAll('.testimonial-box');
    testimonialBoxes.forEach(box => {
      const description = box.querySelector('.description');
      if (!description) return;

      const fullText = description.textContent.trim();

      // Create and insert read more button
      let button = box.querySelector('.read-more-testimonial');
      if (!button) {
        button = document.createElement('button');
        button.className = 'read-more-testimonial';
        button.textContent = 'Read More';
        description.parentNode.insertBefore(button, description.nextSibling);
      }

      // Check if text overflows 2 lines
      const checkOverflow = () => {
        const clone = description.cloneNode(true);
        clone.style.position = 'absolute';
        clone.style.visibility = 'hidden';
        clone.style.height = 'auto';
        clone.style.webkitLineClamp = 'unset';
        description.parentNode.appendChild(clone);

        const fullHeight = clone.scrollHeight;
        const clampedHeight = description.scrollHeight;
        description.parentNode.removeChild(clone);

        if (fullHeight > clampedHeight + 2) {
          button.style.display = 'inline-block';
        } else {
          button.style.display = 'none';
        }
      };

      checkOverflow();

      button.addEventListener('click', (e) => {
        e.preventDefault();
        description.classList.toggle('expanded');
        button.textContent = description.classList.contains('expanded') ? 'Read Less' : 'Read More';
      });

      window.addEventListener('resize', checkOverflow);
    });
  }

  // Initialize on DOM ready and after swiper updates
  if (document.querySelector('.testimonial-box')) {
    setupTestimonialReadMore();

    // Re-setup when swiper slides change
    const swiper = document.querySelector('.testimonials-slider').swiper;
    if (swiper) {
      swiper.on('slideChange', () => {
        setTimeout(setupTestimonialReadMore, 100);
      });
    }
  }

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Preloader - Optimized removal
   */
  let preloader = select('#preloader');
  if (preloader) {
    const removePreloader = () => {
      preloader.style.animation = 'preloaderFadeOut 0.6s ease-out forwards';
      setTimeout(() => {
        if (preloader.parentNode) {
          preloader.remove();
        }
      }, 600);
    };

    // Remove after fixed time (2.8 seconds max)
    const preloaderTimeout = setTimeout(removePreloader, 2800);

    // Remove on page load (whichever comes first)
    window.addEventListener('load', () => {
      clearTimeout(preloaderTimeout);
      removePreloader();
    });

    // Remove on DOM ready if all images are cached
    if (document.readyState === 'complete') {
      clearTimeout(preloaderTimeout);
      removePreloader();
    }
  }

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * ALL Section - Filtering, Sorting, and Search
   */
  class PortfolioManager {
    constructor() {
      this.items = [];
      this.filteredItems = [];
      this.currentFilter = 'all';
      this.currentSort = 'newest';
      this.init();
    }

    init() {
      this.collectItems();
      this.setupEventListeners();
      this.render();
      this.observeItems();
    }

    collectItems() {
      const certificates = Array.from(document.querySelectorAll('#work .work-box')).map((el, idx) => ({
        id: `cert-${idx}`,
        type: 'certificate',
        title: el.querySelector('.w-title')?.textContent || 'Certificate',
        category: el.querySelector('.w-ctegory')?.textContent || 'General',
        date: el.querySelector('.w-date')?.textContent || '2024',
        image: el.querySelector('.work-img img')?.src || '',
        description: el.querySelector('.w-ctegory')?.textContent || 'General Certificate',
        link: el.querySelector('a[data-gallery]')?.href || '#',
        element: el
      }));

      const achievements = Array.from(document.querySelectorAll('#work2 .work-box')).map((el, idx) => ({
        id: `ach-${idx}`,
        type: 'achievement',
        title: el.querySelector('.w-title')?.textContent || 'Achievement',
        category: el.querySelector('.w-ctegory')?.textContent || 'General',
        date: el.querySelector('.w-date')?.textContent || '2024',
        image: el.querySelector('.work-img img')?.src || '',
        description: el.querySelector('.w-ctegory')?.textContent || 'General Achievement',
        link: el.querySelector('a[data-gallery]')?.href || '#',
        element: el
      }));

      const projects = Array.from(document.querySelectorAll('#blog .card-blog')).map((el, idx) => ({
        id: `proj-${idx}`,
        type: 'project',
        title: el.querySelector('.card-title')?.textContent || 'Project',
        category: el.querySelector('.category')?.textContent || 'General',
        date: el.querySelector('.post-date')?.textContent || '2024',
        image: el.querySelector('.card-img img')?.src || '',
        description: el.querySelector('.card-description')?.textContent || '',
        link: el.querySelector('a')?.href || '#',
        element: el
      }));

      this.items = [...certificates, ...achievements, ...projects];
      this.filteredItems = [...this.items];
    }

    setupEventListeners() {
      // Filter buttons
      const filterBtns = document.querySelectorAll('.filter-btn');
      filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
          filterBtns.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          this.currentFilter = btn.dataset.filter;
          this.applyFilters();
        });
      });

      // Sort select
      const sortSelect = document.querySelector('.sort-select');
      if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
          this.currentSort = e.target.value;
          this.applyFilters();
        });
      }
    }

    applyFilters() {
      this.filteredItems = this.items.filter(item => {
        if (this.currentFilter === 'all') return true;
        return item.type === this.currentFilter;
      });

      this.sortItems();
      this.render();
    }

    sortItems() {
      switch(this.currentSort) {
        case 'newest':
          this.filteredItems.sort((a, b) => {
            const yearA = parseInt(a.date.match(/\d{4}/) || 2024);
            const yearB = parseInt(b.date.match(/\d{4}/) || 2024);
            return yearB - yearA;
          });
          break;
        case 'oldest':
          this.filteredItems.sort((a, b) => {
            const yearA = parseInt(a.date.match(/\d{4}/) || 2024);
            const yearB = parseInt(b.date.match(/\d{4}/) || 2024);
            return yearA - yearB;
          });
          break;
        case 'title':
          this.filteredItems.sort((a, b) => a.title.localeCompare(b.title));
          break;
      }
    }

    render() {
      const grid = document.querySelector('.all-items-grid');
      if (!grid) return;

      if (this.filteredItems.length === 0) {
        grid.innerHTML = '<div class="no-results">No items found for the selected filter.</div>';
        return;
      }

      grid.innerHTML = this.filteredItems.map(item => `
        <div class="item-card" data-type="${item.type}">
          <div class="item-image">
            <img src="${item.image}" alt="${item.title}" loading="lazy">
            <span class="item-badge">${item.type}</span>
          </div>
          <div class="item-content">
            <h3 class="item-title">${item.title}</h3>
            <div class="item-date">
              <i class="bi bi-calendar"></i> ${item.date}
            </div>
            <p class="item-description" data-full-text="${(item.description || item.category).replace(/"/g, '&quot;')}">${item.description || item.category}</p>
            <button class="read-more-btn" style="display: none;">Read More</button>
            <div class="item-meta">
              <div class="item-category">
                <span class="item-tag">${item.category}</span>
              </div>
              <a href="${item.link}" class="btn btn-sm btn-outline-info" target="_blank">
                <i class="bi bi-arrow-right"></i>
              </a>
            </div>
          </div>
        </div>
      `).join('');

      setTimeout(() => this.setupReadMoreButtons(), 50);
    }

    setupReadMoreButtons() {
      const cards = document.querySelectorAll('.item-card');
      cards.forEach(card => {
        const description = card.querySelector('.item-description');
        const button = card.querySelector('.read-more-btn');

        if (!description || !button) return;

        const fullText = description.textContent.trim();

        // Show button if text has any meaningful content (more than 20 chars)
        if (fullText.length > 20) {
          button.style.display = 'block';
          button.textContent = 'Read More';

          button.addEventListener('click', (e) => {
            e.preventDefault();
            description.classList.toggle('expanded');
            button.textContent = description.classList.contains('expanded') ? 'Read Less' : 'Read More';
          });
        }
      });
    }

    observeItems() {
      const cards = document.querySelectorAll('.item-card');
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, idx) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.style.animation = `slideInUp 0.6s ease-out forwards`;
            }, idx * 100);
          }
        });
      }, { threshold: 0.1 });

      cards.forEach(card => observer.observe(card));
    }
  }

  /**
   * GitHub Projects Fetcher
   */
  class GitHubProjectsFetcher {
    constructor(username = 'Siva-Dev-001', maxProjects = 10) {
      this.username = username;
      this.maxProjects = maxProjects;
      this.init();
    }

    async init() {
      try {
        const repos = await this.fetchRepos();
        this.displayProjects(repos);
      } catch (error) {
        console.log('GitHub projects will display static content');
      }
    }

    async fetchRepos() {
      const response = await fetch(`https://api.github.com/users/${this.username}/repos?sort=created&per_page=${this.maxProjects}&page=1`);
      const repos = await response.json();
      const excludedRepos = [
        'Portfolio',
        'shapes-fitness',
        'Siva-Dev-001'
      ];

      const filteredRepos = repos.filter(
        repo => !repo.fork && !excludedRepos.includes(repo.name)
      );
      if (!response.ok) throw new Error('Failed to fetch');
      return filteredRepos;
    }

    displayProjects(repos) {
      const blogContainer = document.querySelector('#blog .row');
      if (!blogContainer) return;

      // Find existing project cards
      const existingCards = blogContainer.querySelectorAll('.card-blog');
      if (existingCards.length >= this.maxProjects) return; // Don't override if already populated

      // Get or create projects container
      let projectsContainer = blogContainer.querySelector('.github-projects');
      if (!projectsContainer) {
        projectsContainer = document.createElement('div');
        projectsContainer.className = 'github-projects';
        projectsContainer.className = 'row';
        projectsContainer.style.cssText = `
          display: contents;
        `;
        blogContainer.appendChild(projectsContainer);
      }

      repos.forEach((repo, idx) => {
        if (idx < this.maxProjects) {
          const card = document.createElement('div');
          card.className = 'col-md-4';
          card.innerHTML = `
            <div class="card card-blog github-project-card">
              <div class="card-img" style="background: linear-gradient(135deg, #0078ff20, #7800ff20); height: 150px; display: flex; align-items: center; justify-content: center;">
                <div style="text-align: center; color: #0078ff;">
                  <i class="bi bi-github" style="font-size: 2.5rem; display: block; margin-bottom: 0.5rem;"></i>
                  <span style="font-size: 0.9rem; font-weight: 600;">${repo.language || 'Project'}</span>
                </div>
              </div>
              <div class="card-body">
                <div class="card-category-box">
                  <div class="card-category">
                    <h6 class="category">${repo.language || 'GitHub'}</h6>
                  </div>
                </div>
                <h3 class="card-title"><a href="${repo.html_url}" target="_blank">${repo.name}</a></h3>
                <p class="card-description">
                  ${repo.description || 'No description provided'}
                </p>
              </div>
              <div class="card-footer">
                <div class="post-author">
                  <a href="${repo.owner.html_url}" target="_blank">
                    <img src="${repo.owner.avatar_url}" alt="GitHub" class="avatar rounded-circle">
                    <span class="author">${repo.owner.login}</span>
                  </a>
                </div>
                <div class="post-date">
                   <span class="bi bi-calendar"></span>
                    ${new Date(repo.pushed_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                    })}
                </div>
              </div>
            </div>
          `;
          projectsContainer.appendChild(card);
        }
      });
    }
  }

  // Initialize GitHub Projects Fetcher
  if (document.querySelector('#blog')) {
    new GitHubProjectsFetcher('Siva-Dev-001', 12);
  }
  class SkillsManager {
    constructor() {
      this.skillBars = document.querySelectorAll('.skill-bar-fill');
      this.skillTags = document.querySelectorAll('.skill-tag');
      this.init();
    }

    init() {
      this.observeSkillBars();
      this.setupSkillTagInteractions();
      this.setupSkillSearch();
    }

    observeSkillBars() {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const skillWidth = entry.target.style.getPropertyValue('--skill-width');
            if (skillWidth) {
              entry.target.style.width = skillWidth;
            }
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.3 });

      this.skillBars.forEach(bar => observer.observe(bar));
    }

    setupSkillTagInteractions() {
      this.skillTags.forEach(tag => {
        tag.addEventListener('click', (e) => {
          e.preventDefault();
          tag.style.animation = 'none';
          setTimeout(() => {
            tag.style.animation = 'skillTagClick 0.5s ease';
          }, 10);
        });

        tag.addEventListener('mouseenter', () => {
          tag.style.transform = 'scale(1.05) translateY(-3px)';
        });

        tag.addEventListener('mouseleave', () => {
          tag.style.transform = 'scale(1) translateY(0)';
        });
      });
    }

    setupSkillSearch() {
      const skillContainer = document.querySelector('.skills-container');
      if (!skillContainer) return;

      const searchBox = document.createElement('div');
      searchBox.style.cssText = `
        display: flex;
        justify-content: center;
        margin-bottom: 2rem;
        animation: fadeInDown 0.6s ease-out;
      `;

      const input = document.createElement('input');
      input.type = 'text';
      input.placeholder = 'Search skills...';
      input.style.cssText = `
        padding: 0.75rem 1.5rem;
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid rgba(0, 120, 255, 0.3);
        color: #fff;
        border-radius: 50px;
        width: 100%;
        max-width: 400px;
        font-size: 1rem;
        backdrop-filter: blur(10px);
        transition: all 0.3s ease;
      `;

      input.addEventListener('focus', () => {
        input.style.background = 'rgba(0, 120, 255, 0.15)';
        input.style.borderColor = '#0078ff';
        input.style.boxShadow = '0 0 20px rgba(0, 120, 255, 0.2)';
      });

      input.addEventListener('blur', () => {
        input.style.background = 'rgba(255, 255, 255, 0.1)';
        input.style.borderColor = 'rgba(0, 120, 255, 0.3)';
        input.style.boxShadow = 'none';
      });

      input.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        this.skillTags.forEach(tag => {
          if (tag.textContent.toLowerCase().includes(searchTerm)) {
            tag.style.display = 'inline-block';
            tag.style.opacity = '1';
          } else {
            tag.style.opacity = '0.3';
          }
        });
      });

      searchBox.appendChild(input);
      skillContainer.insertBefore(searchBox, skillContainer.firstChild);
    }
  }

  /**
   * Timeline Animation
   */
  class TimelineAnimator {
    constructor() {
      this.timelineWrappers = document.querySelectorAll('.timeline-wrapper');
      this.init();
    }

    init() {
      this.observeTimelineItems();
      this.setupHoverEffects();
    }

    observeTimelineItems() {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, idx) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.style.animation = `slideInLeft 0.6s ease-out forwards`;
              entry.target.style.opacity = '1';
            }, idx * 100);
          }
        });
      }, { threshold: 0.2 });

      this.timelineWrappers.forEach((wrapper, idx) => {
        wrapper.style.opacity = '0';
        observer.observe(wrapper);
      });
    }

    setupHoverEffects() {
      this.timelineWrappers.forEach(wrapper => {
        wrapper.addEventListener('mouseenter', () => {
          wrapper.style.transform = 'scale(1.02)';
        });

        wrapper.addEventListener('mouseleave', () => {
          wrapper.style.transform = 'scale(1)';
        });
      });
    }
  }

  // Initialize on DOM ready
  if (document.querySelector('.skill-bar-fill')) {
    new SkillsManager();
  }

  if (document.querySelector('.timeline-wrapper')) {
    new TimelineAnimator();
  }

  // Initialize Portfolio Manager for All Achievements section
  if (document.querySelector('.all-items-grid')) {
    new PortfolioManager();
  }

  /**
   * Add keyframe animation for skill tag click
   */
  if (!document.querySelector('style[data-skill-animations]')) {
    const styleSheet = document.createElement('style');
    styleSheet.setAttribute('data-skill-animations', 'true');
    styleSheet.textContent = `
      @keyframes skillTagClick {
        0% { transform: scale(1); }
        50% { transform: scale(1.15); }
        100% { transform: scale(1); }
      }

      @keyframes slideInLeft {
        from {
          opacity: 0;
          transform: translateX(-30px);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }

      .skill-tag {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      }

      .timeline-wrapper {
        transition: all 0.3s ease;
      }
    `;
    document.head.appendChild(styleSheet);
  }
})();