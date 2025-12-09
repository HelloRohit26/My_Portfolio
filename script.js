// Main Script - Portfolio Interactivity

/* global loadPortfolioData, savePortfolioData, initAdminPanel, particlesJS, AOS, VanillaTilt, emailjs */

document.addEventListener('DOMContentLoaded', () => {
    initLoader();
    initParticles();
    initAOS();
    initCursor();
    initNavigation();
    initTypedEffect();
    initCounters();
    initTheme();
    renderSkills();
    renderProjects();
    initGitHub();
    initContactForm();
    initAdminPanel();
    renderDynamicContent();
    initProfile3D();
    document.getElementById('currentYear').textContent = new Date().getFullYear();
});

// Loader
function initLoader() {
    setTimeout(() => {
        const loader = document.getElementById('loader');
        loader.classList.add('fade-out');
        setTimeout(() => loader.style.display = 'none', 500);
    }, 1500);
}

// Particles Background
function initParticles() {
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: { value: 80, density: { enable: true, value_area: 800 } },
                color: { value: '#6366f1' },
                shape: { type: 'circle' },
                opacity: { value: 0.5, random: true },
                size: { value: 3, random: true },
                line_linked: { enable: true, distance: 150, color: '#6366f1', opacity: 0.2, width: 1 },
                move: { enable: true, speed: 2, direction: 'none', random: false, straight: false, out_mode: 'out' }
            },
            interactivity: {
                detect_on: 'canvas',
                events: { onhover: { enable: true, mode: 'grab' }, onclick: { enable: true, mode: 'push' } },
                modes: { grab: { distance: 140, line_linked: { opacity: 0.5 } }, push: { particles_nb: 4 } }
            }
        });
    }
}

// AOS Animations
function initAOS() {
    if (typeof AOS !== 'undefined') {
        AOS.init({ duration: 800, easing: 'ease-out-cubic', once: true, offset: 100 });
    }
}

// Custom Cursor
function initCursor() {
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');
    let mouseX = 0, mouseY = 0, posX = 0, posY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
    });

    function animate() {
        posX += (mouseX - posX) * 0.1;
        posY += (mouseY - posY) * 0.1;
        follower.style.left = posX + 'px';
        follower.style.top = posY + 'px';
        requestAnimationFrame(animate);
    }
    animate();

    document.querySelectorAll('a, button, .project-card').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
            follower.classList.add('hover');
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
            follower.classList.remove('hover');
        });
    });
}

// Navigation
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const mobileToggle = document.getElementById('mobileToggle');
    const navLinks = document.querySelector('.nav-links');

    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    });

    mobileToggle.addEventListener('click', () => {
        mobileToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            target.scrollIntoView({ behavior: 'smooth' });
            navLinks.classList.remove('active');
            mobileToggle.classList.remove('active');
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });

    // Update active link on scroll
    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (scrollY >= sectionTop) current = section.getAttribute('id');
        });
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) link.classList.add('active');
        });
    });
}

// Typed Effect
function initTypedEffect() {
    const data = loadPortfolioData();
    const nameEl = document.getElementById('typedName');
    const roleEl = document.getElementById('roleText');
    const cursorEl = document.querySelector('.cursor-blink');

    // Name typing animation
    let nameText = data.profile.name;
    let i = 0;
    function typeName() {
        if (i < nameText.length) {
            nameEl.textContent += nameText.charAt(i);
            i++;
            setTimeout(typeName, 100);
        } else {
            // Hide the cursor after name is fully typed
            if (cursorEl) {
                cursorEl.style.animation = 'none';
                cursorEl.style.opacity = '0';
                cursorEl.style.transition = 'opacity 0.5s ease';
            }
            // Add a subtle glow effect to the completed name
            nameEl.style.animation = 'nameGlow 2s ease-in-out';
        }
    }
    setTimeout(typeName, 500);

    // Role rotation
    let roleIndex = 0;
    function typeRole() {
        let role = data.profile.roles[roleIndex];
        let j = 0;
        roleEl.textContent = '';
        function typeChar() {
            if (j < role.length) {
                roleEl.textContent += role.charAt(j);
                j++;
                setTimeout(typeChar, 50);
            } else {
                setTimeout(deleteRole, 2000);
            }
        }
        typeChar();
    }
    function deleteRole() {
        let text = roleEl.textContent;
        if (text.length > 0) {
            roleEl.textContent = text.slice(0, -1);
            setTimeout(deleteRole, 30);
        } else {
            roleIndex = (roleIndex + 1) % data.profile.roles.length;
            setTimeout(typeRole, 300);
        }
    }
    setTimeout(typeRole, 1500);
}

// Counter Animation
function initCounters() {
    const counters = document.querySelectorAll('.stats-number');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-count'));
                let count = 0;
                const increment = target / 50;
                function updateCount() {
                    if (count < target) {
                        count += increment;
                        counter.textContent = Math.ceil(count);
                        requestAnimationFrame(updateCount);
                    } else {
                        counter.textContent = target;
                    }
                }
                updateCount();
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    counters.forEach(counter => observer.observe(counter));
}

// Theme Toggle
function initTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.body.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    themeToggle.addEventListener('click', () => {
        const current = document.body.getAttribute('data-theme');
        const newTheme = current === 'dark' ? 'light' : 'dark';
        document.body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
}

function updateThemeIcon(theme) {
    const icon = document.querySelector('#themeToggle i');
    icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

// Render Skills
function renderSkills() {
    const data = loadPortfolioData();
    const grid = document.getElementById('skillsGrid');
    const categories = document.getElementById('skillCategories');

    // Render category buttons
    categories.innerHTML = `
        <button class="skill-category-btn active" data-category="all">All</button>
        <button class="skill-category-btn" data-category="programming">Programming</button>
        <button class="skill-category-btn" data-category="ai">AI/ML</button>
        <button class="skill-category-btn" data-category="nlp">NLP</button>
        <button class="skill-category-btn" data-category="llm">LLMs</button>
        <button class="skill-category-btn" data-category="database">Databases</button>
        <button class="skill-category-btn" data-category="cloud">Cloud & DevOps</button>
        <button class="skill-category-btn" data-category="backend">Backend & APIs</button>
        <button class="skill-category-btn" data-category="iot">IoT</button>
        <button class="skill-category-btn" data-category="visualization">Visualization</button>
        <button class="skill-category-btn" data-category="soft">Soft Skills</button>
    `;

    // Render skills
    function renderSkillCards(filter = 'all') {
        const filtered = filter === 'all' ? data.skills : data.skills.filter(s => s.category === filter);
        grid.innerHTML = filtered.map((skill, index) => `
            <div class="skill-card" data-aos="zoom-in" data-aos-delay="${index * 50}" style="--skill-color: ${skill.color}">
                <div class="skill-icon"><i class="${skill.icon}"></i></div>
                <h3 class="skill-name">${skill.name}</h3>
                <div class="skill-bar"><div class="skill-progress" style="width: ${skill.level}%"></div></div>
                <span class="skill-level">${skill.level}%</span>
            </div>
        `).join('');
        initTilt();
    }

    renderSkillCards();

    categories.querySelectorAll('.skill-category-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            categories.querySelectorAll('.skill-category-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderSkillCards(btn.dataset.category);
        });
    });
}

// Render Projects
function renderProjects() {
    const data = loadPortfolioData();
    const grid = document.getElementById('projectsGrid');
    const filter = document.getElementById('projectsFilter');

    filter.innerHTML = `
        <button class="filter-btn active" data-filter="all">All Projects</button>
        <button class="filter-btn" data-filter="web">Web Apps</button>
        <button class="filter-btn" data-filter="mobile">Mobile</button>
        <button class="filter-btn" data-filter="ai">AI/ML</button>
    `;

    function renderProjectCards(filterVal = 'all') {
        const filtered = filterVal === 'all' ? data.projects : data.projects.filter(p => p.category === filterVal);
        grid.innerHTML = filtered.map((project, index) => `
            <div class="project-card" data-aos="fade-up" data-aos-delay="${index * 100}" data-id="${project.id}">
                <div class="project-image">
                    <img src="${project.image}" alt="${project.title}">
                    <div class="project-overlay">
                        <div class="project-icon"><i class="${project.icon}"></i></div>
                        <div class="project-actions">
                            <a href="${project.github}" target="_blank" class="project-btn" title="GitHub"><i class="fab fa-github"></i></a>
                            <a href="${project.live}" target="_blank" class="project-btn" title="Live Demo"><i class="fas fa-external-link-alt"></i></a>
                            <button class="project-btn view-project" data-id="${project.id}" title="Details"><i class="fas fa-expand"></i></button>
                        </div>
                    </div>
                </div>
                <div class="project-info">
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <div class="project-tech">${project.technologies.map(t => `<span>${t}</span>`).join('')}</div>
                </div>
            </div>
        `).join('');
        initProjectModals();
        initTilt();
    }

    renderProjectCards();

    filter.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            filter.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderProjectCards(btn.dataset.filter);
        });
    });
}

// Project Modal
function initProjectModals() {
    const modal = document.getElementById('projectModal');
    const content = document.getElementById('projectModalContent');
    const data = loadPortfolioData();

    document.querySelectorAll('.view-project').forEach(btn => {
        btn.addEventListener('click', () => {
            const project = data.projects.find(p => p.id == btn.dataset.id);
            if (project) {
                content.innerHTML = `
                    <button class="close-modal">&times;</button>
                    <div class="project-modal-body">
                        <div class="project-modal-image"><img src="${project.image}" alt="${project.title}"></div>
                        <div class="project-modal-info">
                            <h2>${project.title}</h2>
                            <p>${project.description}</p>
                            <div class="modal-tech">${project.technologies.map(t => `<span>${t}</span>`).join('')}</div>
                            <div class="modal-actions">
                                <a href="${project.github}" target="_blank" class="btn btn-outline"><i class="fab fa-github"></i> View Code</a>
                                <a href="${project.live}" target="_blank" class="btn btn-primary"><i class="fas fa-external-link-alt"></i> Live Demo</a>
                            </div>
                        </div>
                    </div>
                `;
                modal.classList.add('active');
                content.querySelector('.close-modal').addEventListener('click', () => modal.classList.remove('active'));
            }
        });
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.remove('active');
    });
}

// Tilt Effect
function initTilt() {
    if (typeof VanillaTilt !== 'undefined') {
        // Cards tilt effect
        VanillaTilt.init(document.querySelectorAll('.skill-card, .project-card'), {
            max: 10, speed: 400, glare: true, 'max-glare': 0.2
        });
    }
}

// Initialize profile 3D effect (no glare to avoid square effect)
function initProfile3D() {
    if (typeof VanillaTilt !== 'undefined') {
        const profileFrame = document.querySelector('.profile-frame');
        if (profileFrame) {
            VanillaTilt.init(profileFrame, {
                max: 15,
                speed: 400,
                glare: false,
                perspective: 1000,
                scale: 1.02,
                gyroscope: true
            });
        }
    }
}

// GitHub Integration
async function initGitHub() {
    const data = loadPortfolioData();
    const username = data.profile.github;

    try {
        const userRes = await fetch(`https://api.github.com/users/${username}`);
        const user = await userRes.json();

        document.getElementById('githubAvatar').src = user.avatar_url || 'assets/profile.jpg';
        document.getElementById('githubName').textContent = user.name || username;
        document.getElementById('githubBio').textContent = user.bio || 'Developer';
        document.getElementById('githubRepos').textContent = user.public_repos || 0;
        document.getElementById('githubFollowers').textContent = user.followers || 0;
        document.getElementById('githubLink').href = user.html_url || `https://github.com/${username}`;

        const reposRes = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`);
        const repos = await reposRes.json();

        const reposGrid = document.getElementById('reposGrid');
        reposGrid.innerHTML = repos.slice(0, 6).map(repo => `
            <a href="${repo.html_url}" target="_blank" class="repo-card">
                <div class="repo-header">
                    <i class="fas fa-book"></i>
                    <h4>${repo.name}</h4>
                </div>
                <p>${repo.description || 'No description'}</p>
                <div class="repo-stats">
                    <span><i class="fas fa-star"></i> ${repo.stargazers_count}</span>
                    <span><i class="fas fa-code-branch"></i> ${repo.forks_count}</span>
                    <span class="repo-lang">${repo.language || 'N/A'}</span>
                </div>
            </a>
        `).join('');

        document.getElementById('contributionGraph').src = `https://ghchart.rshah.org/6366f1/${username}`;
    } catch (error) {
        console.log('GitHub API error:', error);
    }
}

// Contact Form with EmailJS
function initContactForm() {
    // Initialize EmailJS with your public key
    emailjs.init("x71UOb6kyRD0NfDQt");

    const form = document.getElementById('contactForm');
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Show loading state
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;

        // Prepare template parameters
        const templateParams = {
            from_name: document.getElementById('formName').value,
            from_email: document.getElementById('formEmail').value,
            subject: document.getElementById('formSubject').value,
            message: document.getElementById('formMessage').value,
            to_name: "Rohit Maurya"
        };

        // Send email using EmailJS
        emailjs.send("service_7goysun", "template_tgsfaye", templateParams)
            .then(function (response) {
                console.log('SUCCESS!', response.status, response.text);
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
                submitBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
                form.reset();

                // Reset button after 3 seconds
                setTimeout(() => {
                    submitBtn.innerHTML = originalBtnText;
                    submitBtn.style.background = '';
                    submitBtn.disabled = false;
                }, 3000);
            })
            .catch(function (error) {
                console.log('FAILED...', error);
                submitBtn.innerHTML = '<i class="fas fa-times"></i> Failed to Send';
                submitBtn.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';

                // Reset button after 3 seconds
                setTimeout(() => {
                    submitBtn.innerHTML = originalBtnText;
                    submitBtn.style.background = '';
                    submitBtn.disabled = false;
                }, 3000);
            });
    });
}

// Render Dynamic Content
function renderDynamicContent() {
    const data = loadPortfolioData();

    // Profile Image/Video - Update both hero and about section
    const profileMedia = data.profile.profileImage || 'assets/profile.mp4';
    const heroProfileVideo = document.getElementById('profileVideo');
    const heroProfileImg = document.getElementById('profileImage');
    const aboutProfileImg = document.querySelector('.about-img');

    // Check if it's a video file
    const isVideo = profileMedia.match(/\.(mp4|webm|ogg)$/i);

    if (isVideo && heroProfileVideo) {
        // Update video source
        const source = heroProfileVideo.querySelector('source[type="video/mp4"]');
        if (source) source.src = profileMedia;
        heroProfileVideo.load();
    } else if (heroProfileImg) {
        heroProfileImg.src = profileMedia;
    }

    // About section always uses image (fallback)
    if (aboutProfileImg) aboutProfileImg.src = profileMedia.replace(/\.(mp4|webm|ogg)$/i, '.jpg');

    // Profile Summary
    document.getElementById('profileSummary').textContent = data.profile.summary;
    document.getElementById('aboutDescription').textContent = data.profile.aboutDescription;

    // Hero Social
    document.getElementById('heroSocial').innerHTML = `
        <a href="https://github.com/${data.profile.github}" target="_blank" class="social-link"><i class="fab fa-github"></i></a>
        <a href="https://linkedin.com/in/${data.profile.linkedin}" target="_blank" class="social-link"><i class="fab fa-linkedin-in"></i></a>
        <a href="https://twitter.com/${data.profile.twitter}" target="_blank" class="social-link"><i class="fab fa-twitter"></i></a>
        <a href="mailto:${data.profile.email}" class="social-link"><i class="fas fa-envelope"></i></a>
    `;

    // Floating Icons
    document.getElementById('floatingIcons').innerHTML = `
        <div class="float-icon icon-1"><i class="fab fa-react"></i></div>
        <div class="float-icon icon-2"><i class="fab fa-node-js"></i></div>
        <div class="float-icon icon-3"><i class="fab fa-python"></i></div>
        <div class="float-icon icon-4"><i class="fab fa-js"></i></div>
        <div class="float-icon icon-5"><i class="fas fa-database"></i></div>
    `;

    // About Cards
    document.getElementById('aboutCards').innerHTML = `
        <div class="about-card"><div class="about-icon"><i class="fas fa-award"></i></div><h3>Experience</h3><p>${data.stats.years}+ Years</p></div>
        <div class="about-card"><div class="about-icon"><i class="fas fa-users"></i></div><h3>Clients</h3><p>${data.stats.clients}+ Worldwide</p></div>
        <div class="about-card"><div class="about-icon"><i class="fas fa-folder-open"></i></div><h3>Projects</h3><p>${data.stats.projects}+ Completed</p></div>
    `;

    // About Details
    document.getElementById('aboutDetails').innerHTML = `
        <div class="detail-item"><span class="detail-icon"><i class="fas fa-user"></i></span><span class="detail-label">Name:</span><span class="detail-value">${data.profile.name}</span></div>
        <div class="detail-item"><span class="detail-icon"><i class="fas fa-envelope"></i></span><span class="detail-label">Email:</span><span class="detail-value">${data.profile.email}</span></div>
        <div class="detail-item"><span class="detail-icon"><i class="fas fa-map-marker-alt"></i></span><span class="detail-label">Location:</span><span class="detail-value">${data.profile.location}</span></div>
    `;

    // Contact Cards
    document.getElementById('contactCards').innerHTML = `
        <div class="contact-card"><div class="contact-icon"><i class="fas fa-envelope"></i></div><div class="contact-details"><h4>Email</h4><p>${data.profile.email}</p></div></div>
        <div class="contact-card"><div class="contact-icon"><i class="fas fa-map-marker-alt"></i></div><div class="contact-details"><h4>Location</h4><p>${data.profile.location}</p></div></div>
        <div class="contact-card"><div class="contact-icon"><i class="fas fa-phone"></i></div><div class="contact-details"><h4>Phone</h4><p>${data.profile.phone}</p></div></div>
    `;

    // Contact Social
    document.getElementById('contactSocial').innerHTML = `
        <a href="https://github.com/${data.profile.github}" target="_blank" class="social-link"><i class="fab fa-github"></i></a>
        <a href="https://linkedin.com/in/${data.profile.linkedin}" target="_blank" class="social-link"><i class="fab fa-linkedin-in"></i></a>
        <a href="https://twitter.com/${data.profile.twitter}" target="_blank" class="social-link"><i class="fab fa-twitter"></i></a>
        <a href="https://instagram.com/${data.profile.instagram}" target="_blank" class="social-link"><i class="fab fa-instagram"></i></a>
    `;

    // Footer Social
    document.getElementById('footerSocial').innerHTML = `
        <a href="https://github.com/${data.profile.github}" target="_blank"><i class="fab fa-github"></i></a>
        <a href="https://linkedin.com/in/${data.profile.linkedin}" target="_blank"><i class="fab fa-linkedin-in"></i></a>
        <a href="https://twitter.com/${data.profile.twitter}" target="_blank"><i class="fab fa-twitter"></i></a>
    `;
}
