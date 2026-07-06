// ===== SMOOTH SCROLL & NAVIGATION =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        }
    });
});

// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.querySelector('.navbar');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

window.addEventListener('scroll', () => {
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
});

// ===== HAMBURGER MENU =====
if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// ===== THEME TOGGLE =====
const themeToggle = document.querySelector('.theme-toggle');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const savedTheme = localStorage.getItem('theme') || (prefersDark ? 'dark' : 'light');

document.documentElement.setAttribute('data-theme', savedTheme);

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
}

// ===== FORM HANDLING =====
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

// Initialize EmailJS with public key
// Get public key from: https://dashboard.emailjs.com/admin/account
const EMAILJS_PUBLIC_KEY = '_r6kMjdcTQJDBGamg';
const EMAILJS_SERVICE_ID = 'service_7ukeyx1'; 
const EMAILJS_TEMPLATE_ID = 'template_wfwocuw';

if (typeof emailjs !== 'undefined') {
    emailjs.init(EMAILJS_PUBLIC_KEY);
}

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            message: document.getElementById('message').value
        };

        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            showFormStatus('Please enter a valid email address.', 'error');
            return;
        }

        // Disable submit button during submission
        const submitBtn = contactForm.querySelector('.btn-submit');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';

        try {
            // Send email using EmailJS
            const response = await emailjs.send(
                EMAILJS_SERVICE_ID,
                EMAILJS_TEMPLATE_ID,
                {
                    to_email: 'braebulimo@gmail.com',
                    from_name: formData.name,
                    from_email: formData.email,
                    message: formData.message,
                    reply_to: formData.email
                }
            );

            if (response.status === 200) {
                showFormStatus('✓ Message sent successfully! I\'ll get back to you soon.', 'success');
                contactForm.reset();
            }
        } catch (error) {
            console.error('EmailJS error:', error);
            showFormStatus('✗ Error sending message. Please try again or contact me directly.', 'error');
        } finally {
            // Re-enable submit button
            submitBtn.disabled = false;
            submitBtn.textContent = 'Send Message';
        }
    });
}

function showFormStatus(message, type) {
    formStatus.textContent = message;
    formStatus.className = `form-status ${type}`;
    
    if (type === 'success') {
        setTimeout(() => {
            formStatus.className = 'form-status';
        }, 5000);
    }
}

// ===== SCROLL ANIMATIONS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'all 0.6s ease-out';
    observer.observe(section);
});

// ===== PARALLAX EFFECT =====
const animatedBg = document.querySelector('.animated-bg');

window.addEventListener('scroll', () => {
    if (animatedBg) {
        const scrolled = window.scrollY * 0.5;
        animatedBg.style.transform = `translateY(${scrolled}px)`;
    }
});

// ===== ACTIVE NAV LINK INDICATOR =====
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section[id]');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ===== CONSOLE BRAND MESSAGE =====
console.log(
    '%c🚀 Thanks for visiting my portfolio!',
    'font-size: 20px; font-weight: bold; color: #00d9ff;'
);
console.log(
    '%cBuilt with React, Node.js, and a lot of coffee ☕',
    'font-size: 14px; color: #8338ec;'
);

// ===== LAZY LOAD IMAGES =====
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===== PAGE LOAD ANIMATION =====
document.addEventListener('DOMContentLoaded', () => {
    // Animate hero content
    document.querySelectorAll('.hero-label, .hero-title, .hero-desc, .hero-actions').forEach((el, index) => {
        el.style.opacity = '0';
        el.style.animation = `fadeInUp 0.6s ease-out ${0.1 * (index + 1)}s forwards`;
    });

    // Add fade-in-up animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
});

// ===== PERFORMANCE MONITORING =====
window.addEventListener('load', () => {
    if (window.performance && window.performance.timing) {
        const timing = window.performance.timing;
        const loadTime = timing.loadEventEnd - timing.navigationStart;
        console.log(`%c⚡ Page loaded in ${loadTime}ms`, 'color: #00d9ff;');
    }
});

// ===== PREVENT LAYOUT SHIFT =====
document.addEventListener('scroll', () => {
    // Optimize scroll performance
    requestAnimationFrame(() => {
        // Smooth animations and transitions
    });
}, { passive: true });

// ===== ACCESSIBILITY ENHANCEMENTS =====
// Keyboard navigation
document.addEventListener('keydown', (e) => {
    // ESC to close mobile menu
    if (e.key === 'Escape' && hamburger.classList.contains('active')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Announce route changes to screen readers
function announceNavigation(target) {
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', 'polite');
    announcement.className = 'sr-only';
    announcement.textContent = `Navigating to ${target}`;
    document.body.appendChild(announcement);
    setTimeout(() => announcement.remove(), 1000);
}

// ===== FETCH MEDIUM ARTICLES =====
const MEDIUM_USERNAME = 'braebulimo';
const RSS_FEED_URL = `https://medium.com/feed/@${MEDIUM_USERNAME}`;
const API_URL = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(RSS_FEED_URL)}`;

// Fallback articles to show if the RSS parser fails or is offline
const FALLBACK_ARTICLES = [
    {
        title: "Building Scalable Data Pipelines with Apache Spark and PostgreSQL",
        pubDate: "2026-05-15 10:00:00",
        link: "https://medium.com/@braebulimo",
        guid: "fallback-1",
        description: "A comprehensive guide on deploying scalable python ETL pipelines, optimizing postgresql database queries for large-scale analytics, handling data ingestion, and managing concurrent connections.",
        categories: ["Spark", "PostgreSQL", "ETL", "Data Engineering"],
        thumbnail: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=60"
    },
    {
        title: "Machine Learning Pipelines: Best Practices and Feature Ingestion",
        pubDate: "2026-03-22 14:30:00",
        link: "https://medium.com/@braebulimo",
        guid: "fallback-2",
        description: "Explore the structural implementation of ML workflow principles. Master the separation of raw data ingestion, feature engineering, and model inference layers along with experiment tracking via MLflow.",
        categories: ["Machine Learning", "MLflow", "Data Science", "Python"],
        thumbnail: "https://images.unsplash.com/photo-1527474305487-b87b222841cc?w=600&auto=format&fit=crop&q=60"
    },
    {
        title: "Implementing Automated Data Workflows with Airflow and Docker",
        pubDate: "2026-01-10 09:15:00",
        link: "https://medium.com/@braebulimo",
        guid: "fallback-3",
        description: "Learn how to build, test, containerize, and schedule data workflows automatically using Apache Airflow workflow DAG configurations and multi-stage Docker containers.",
        categories: ["Airflow", "Docker", "DevOps", "Data Engineering"],
        thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop&q=60"
    }
];

async function loadMediumArticles() {
    const container = document.getElementById('medium-articles-container');
    if (!container) return;

    try {
        const response = await fetch(API_URL);
        const data = await response.json();

        if (data.status === 'ok' && data.items && data.items.length > 0) {
            // Render articles from RSS
            renderArticles(data.items.slice(0, 3), container);
        } else {
            console.warn('Medium RSS API returned non-ok status, loading fallback articles.');
            renderArticles(FALLBACK_ARTICLES, container, true);
        }
    } catch (error) {
        console.error('Error fetching Medium articles:', error);
        renderArticles(FALLBACK_ARTICLES, container, true);
    }
}

function renderArticles(articles, container, isFallback = false) {
    container.innerHTML = ''; // Clear loader

    articles.forEach(article => {
        // Parse date
        let formattedDate = 'Recent';
        if (article.pubDate) {
            const dateObj = new Date(article.pubDate.replace(/-/g, "/")); // Fix Safari date parsing
            if (!isNaN(dateObj.getTime())) {
                formattedDate = dateObj.toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                });
            }
        }

        // Clean description/excerpt (strip HTML tags)
        let excerpt = '';
        if (article.description) {
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = article.description;
            // Remove figure captions if any
            const captions = tempDiv.querySelectorAll('figcaption');
            captions.forEach(c => c.remove());
            excerpt = tempDiv.textContent || tempDiv.innerText || '';
            excerpt = excerpt.trim().substring(0, 140) + '...';
        } else {
            excerpt = 'Read the full article on Medium to learn more about this technology...';
        }

        // Get standard tags
        const tags = article.categories && article.categories.length > 0 
            ? article.categories.slice(0, 3) 
            : ['Tech', 'Coding', 'Blogging'];

        // Get thumbnail from article or parse first img from description
        let thumbnail = article.thumbnail;
        if (!thumbnail && article.description) {
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = article.description;
            const imgs = tempDiv.querySelectorAll('img');
            for (let img of imgs) {
                const src = img.getAttribute('src');
                // Skip Medium's tracking pixel (1x1 stat pixel)
                if (src && !src.includes('stat?event') && !src.includes('medium.com/_/stat')) {
                    thumbnail = src;
                    break;
                }
            }
        }

        // Get thumbnail or placeholder
        const imgHtml = thumbnail 
            ? `<img src="${thumbnail}" alt="${article.title}" class="article-img" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">`
            : '';
        const fallbackImgHtml = `<div class="article-img-fallback" ${thumbnail ? 'style="display:none;"' : ''}>⌨</div>`;

        const card = document.createElement('article');
        card.className = 'article-card';
        card.innerHTML = `
            <div class="article-img-wrapper">
                ${imgHtml}
                ${fallbackImgHtml}
            </div>
            <div class="article-body">
                <div class="article-meta">
                    <span>${formattedDate}</span>
                    <span>•</span>
                    <span>Medium</span>
                    ${isFallback ? '<span style="color:var(--accent); font-size: 0.7rem;">[Pinned]</span>' : ''}
                </div>
                <h3 class="article-title">
                    <a href="${article.link}" target="_blank" rel="noopener">${article.title}</a>
                </h3>
                <p class="article-excerpt">${excerpt}</p>
                <div class="article-tags">
                    ${tags.map(tag => `<span>#${tag.toLowerCase()}</span>`).join('')}
                </div>
                <div class="article-footer">
                    <a href="${article.link}" target="_blank" rel="noopener" class="article-read-more">Read Article</a>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

// Call on load
document.addEventListener('DOMContentLoaded', loadMediumArticles);

