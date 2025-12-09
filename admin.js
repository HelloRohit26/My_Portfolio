// Admin Panel Functions
function initAdminPanel() {
    const adminBtn = document.getElementById('adminBtn');
    const adminModal = document.getElementById('adminModal');
    const adminPanel = document.getElementById('adminPanel');

    // Render Admin Panel
    adminPanel.innerHTML = `
        <div class="admin-header">
            <h2><i class="fas fa-shield-alt"></i> Admin Panel</h2>
            <button class="close-admin" id="closeAdmin">&times;</button>
        </div>
        <div class="admin-content">
            <div class="admin-tabs">
                <button class="admin-tab active" data-tab="profile">Profile</button>
                <button class="admin-tab" data-tab="skills">Skills</button>
                <button class="admin-tab" data-tab="projects">Projects</button>
                <button class="admin-tab" data-tab="settings">Settings</button>
            </div>
            <div class="admin-tab-content active" id="profileTab"></div>
            <div class="admin-tab-content" id="skillsTab"></div>
            <div class="admin-tab-content" id="projectsTab"></div>
            <div class="admin-tab-content" id="settingsTab"></div>
        </div>
    `;

    initAdminTabs();
    renderProfileForm();
    renderSkillsForm();
    renderProjectsForm();
    renderSettingsForm();

    adminBtn.addEventListener('click', () => adminModal.classList.add('active'));
    document.getElementById('closeAdmin').addEventListener('click', () => adminModal.classList.remove('active'));
    adminModal.addEventListener('click', (e) => {
        if (e.target === adminModal) adminModal.classList.remove('active');
    });
}

function initAdminTabs() {
    document.querySelectorAll('.admin-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.admin-tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.admin-tab-content').forEach(c => c.classList.remove('active'));
            tab.classList.add('active');
            document.getElementById(tab.dataset.tab + 'Tab').classList.add('active');
        });
    });
}

function renderProfileForm() {
    const data = loadPortfolioData();
    const container = document.getElementById('profileTab');
    const currentImage = data.profile.profileImage || 'assets/profile.jpg';

    container.innerHTML = `
        <h3>Edit Profile</h3>
        <form id="profileForm" class="admin-form">
            <div class="profile-image-upload">
                <div class="image-preview-container">
                    <img src="${currentImage}" alt="Profile Preview" id="profilePreview" class="profile-preview-img">
                    <div class="image-overlay">
                        <label for="profileImageInput" class="upload-label">
                            <i class="fas fa-camera"></i>
                            <span>Change Photo</span>
                        </label>
                    </div>
                </div>
                <input type="file" id="profileImageInput" accept="image/*" hidden>
                <p class="upload-hint"><i class="fas fa-info-circle"></i> Click to upload a new profile image (Max 2MB)</p>
            </div>
            <div class="form-row">
                <div class="admin-form-group"><label>Full Name</label><input type="text" id="adminName" value="${data.profile.name}" required></div>
                <div class="admin-form-group"><label>Email</label><input type="email" id="adminEmail" value="${data.profile.email}" required></div>
            </div>
            <div class="form-row">
                <div class="admin-form-group"><label>Phone</label><input type="text" id="adminPhone" value="${data.profile.phone}"></div>
                <div class="admin-form-group"><label>Location</label><input type="text" id="adminLocation" value="${data.profile.location}"></div>
            </div>
            <div class="admin-form-group"><label>Profile Summary</label><textarea id="adminSummary" rows="3">${data.profile.summary}</textarea></div>
            <div class="admin-form-group"><label>About Description</label><textarea id="adminAbout" rows="3">${data.profile.aboutDescription}</textarea></div>
            <div class="admin-form-group"><label>GitHub Username</label><input type="text" id="adminGithub" value="${data.profile.github}"></div>
            <div class="form-row">
                <div class="admin-form-group"><label>LinkedIn</label><input type="text" id="adminLinkedin" value="${data.profile.linkedin}"></div>
                <div class="admin-form-group"><label>Twitter</label><input type="text" id="adminTwitter" value="${data.profile.twitter}"></div>
            </div>
            <div class="admin-form-group"><label>Roles (comma-separated)</label><input type="text" id="adminRoles" value="${data.profile.roles.join(', ')}"></div>
            <div class="form-row">
                <div class="admin-form-group"><label>Projects Count</label><input type="number" id="adminProjects" value="${data.stats.projects}"></div>
                <div class="admin-form-group"><label>Years Experience</label><input type="number" id="adminYears" value="${data.stats.years}"></div>
                <div class="admin-form-group"><label>Clients</label><input type="number" id="adminClients" value="${data.stats.clients}"></div>
            </div>
            <button type="submit" class="admin-save-btn"><i class="fas fa-save"></i> Save Profile</button>
        </form>
    `;

    // Profile image upload handler
    const profileImageInput = document.getElementById('profileImageInput');
    const profilePreview = document.getElementById('profilePreview');

    profileImageInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            // Validate file size (max 2MB)
            if (file.size > 2 * 1024 * 1024) {
                alert('Image size must be less than 2MB');
                return;
            }

            // Validate file type
            if (!file.type.startsWith('image/')) {
                alert('Please select a valid image file');
                return;
            }

            const reader = new FileReader();
            reader.onload = (event) => {
                const base64Image = event.target.result;
                profilePreview.src = base64Image;

                // Store temporarily until form is saved
                profileImageInput.dataset.base64 = base64Image;

                // Add visual feedback
                profilePreview.parentElement.classList.add('image-updated');
            };
            reader.readAsDataURL(file);
        }
    });

    document.getElementById('profileForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const data = loadPortfolioData();

        // Save profile image if updated
        const newImage = profileImageInput.dataset.base64;
        if (newImage) {
            data.profile.profileImage = newImage;
        }

        data.profile.name = document.getElementById('adminName').value;
        data.profile.email = document.getElementById('adminEmail').value;
        data.profile.phone = document.getElementById('adminPhone').value;
        data.profile.location = document.getElementById('adminLocation').value;
        data.profile.summary = document.getElementById('adminSummary').value;
        data.profile.aboutDescription = document.getElementById('adminAbout').value;
        data.profile.github = document.getElementById('adminGithub').value;
        data.profile.linkedin = document.getElementById('adminLinkedin').value;
        data.profile.twitter = document.getElementById('adminTwitter').value;
        data.profile.roles = document.getElementById('adminRoles').value.split(',').map(r => r.trim());
        data.stats.projects = parseInt(document.getElementById('adminProjects').value);
        data.stats.years = parseInt(document.getElementById('adminYears').value);
        data.stats.clients = parseInt(document.getElementById('adminClients').value);
        savePortfolioData(data);
        alert('Profile saved! Refreshing...');
        location.reload();
    });
}

function renderSkillsForm() {
    const data = loadPortfolioData();
    const container = document.getElementById('skillsTab');

    container.innerHTML = `
        <h3>Add New Skill</h3>
        <form id="skillForm" class="admin-form">
            <div class="form-row">
                <div class="admin-form-group"><label>Skill Name</label><input type="text" id="skillName" required></div>
                <div class="admin-form-group"><label>Proficiency (%)</label><input type="number" id="skillLevel" min="0" max="100" value="80" required></div>
            </div>
            <div class="form-row">
                <div class="admin-form-group"><label>Category</label>
                    <select id="skillCategory" required>
                        <option value="frontend">Frontend</option>
                        <option value="backend">Backend</option>
                        <option value="tools">Tools</option>
                    </select>
                </div>
                <div class="admin-form-group"><label>Icon (Font Awesome)</label><input type="text" id="skillIcon" placeholder="fab fa-react"></div>
            </div>
            <div class="admin-form-group"><label>Color</label><input type="color" id="skillColor" value="#6366f1"></div>
            <button type="submit" class="admin-save-btn"><i class="fas fa-plus"></i> Add Skill</button>
        </form>
        <h3>Current Skills</h3>
        <div class="admin-list" id="skillsList">${data.skills.map((s, i) => `
            <div class="admin-list-item">
                <span><i class="${s.icon}" style="color:${s.color}"></i> ${s.name} (${s.level}%)</span>
                <button class="delete-btn" data-index="${i}" data-type="skill"><i class="fas fa-trash"></i></button>
            </div>
        `).join('')}</div>
    `;

    document.getElementById('skillForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const data = loadPortfolioData();
        data.skills.push({
            name: document.getElementById('skillName').value,
            level: parseInt(document.getElementById('skillLevel').value),
            category: document.getElementById('skillCategory').value,
            icon: document.getElementById('skillIcon').value || 'fas fa-code',
            color: document.getElementById('skillColor').value
        });
        savePortfolioData(data);
        renderSkillsForm();
        renderSkills();
    });

    document.querySelectorAll('.delete-btn[data-type="skill"]').forEach(btn => {
        btn.addEventListener('click', () => {
            if (confirm('Delete this skill?')) {
                const data = loadPortfolioData();
                data.skills.splice(parseInt(btn.dataset.index), 1);
                savePortfolioData(data);
                renderSkillsForm();
                renderSkills();
            }
        });
    });
}

function renderProjectsForm() {
    const data = loadPortfolioData();
    const container = document.getElementById('projectsTab');

    container.innerHTML = `
        <h3>Add New Project</h3>
        <form id="projectForm" class="admin-form">
            <div class="form-row">
                <div class="admin-form-group"><label>Title</label><input type="text" id="projectTitle" required></div>
                <div class="admin-form-group"><label>Category</label>
                    <select id="projectCategory" required>
                        <option value="web">Web App</option>
                        <option value="mobile">Mobile</option>
                        <option value="ai">AI/ML</option>
                    </select>
                </div>
            </div>
            <div class="admin-form-group"><label>Description</label><textarea id="projectDescription" rows="2" required></textarea></div>
            <div class="form-row">
                <div class="admin-form-group"><label>Image URL</label><input type="text" id="projectImage"></div>
                <div class="admin-form-group"><label>Icon</label><input type="text" id="projectIcon" placeholder="fas fa-globe"></div>
            </div>
            <div class="form-row">
                <div class="admin-form-group"><label>GitHub URL</label><input type="url" id="projectGithub"></div>
                <div class="admin-form-group"><label>Live URL</label><input type="url" id="projectLive"></div>
            </div>
            <div class="admin-form-group"><label>Technologies (comma-separated)</label><input type="text" id="projectTech" placeholder="React, Node.js"></div>
            <button type="submit" class="admin-save-btn"><i class="fas fa-plus"></i> Add Project</button>
        </form>
        <h3>Current Projects</h3>
        <div class="admin-list" id="projectsList">${data.projects.map((p, i) => `
            <div class="admin-list-item">
                <span><i class="${p.icon}"></i> ${p.title}</span>
                <button class="delete-btn" data-index="${i}" data-type="project"><i class="fas fa-trash"></i></button>
            </div>
        `).join('')}</div>
    `;

    document.getElementById('projectForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const data = loadPortfolioData();
        data.projects.push({
            id: Date.now(),
            title: document.getElementById('projectTitle').value,
            description: document.getElementById('projectDescription').value,
            image: document.getElementById('projectImage').value || 'https://via.placeholder.com/600x400',
            category: document.getElementById('projectCategory').value,
            technologies: document.getElementById('projectTech').value.split(',').map(t => t.trim()),
            github: document.getElementById('projectGithub').value || '#',
            live: document.getElementById('projectLive').value || '#',
            icon: document.getElementById('projectIcon').value || 'fas fa-globe',
            featured: false
        });
        savePortfolioData(data);
        renderProjectsForm();
        renderProjects();
    });

    document.querySelectorAll('.delete-btn[data-type="project"]').forEach(btn => {
        btn.addEventListener('click', () => {
            if (confirm('Delete this project?')) {
                const data = loadPortfolioData();
                data.projects.splice(parseInt(btn.dataset.index), 1);
                savePortfolioData(data);
                renderProjectsForm();
                renderProjects();
            }
        });
    });
}

function renderSettingsForm() {
    const container = document.getElementById('settingsTab');

    container.innerHTML = `
        <h3>Data Management</h3>
        <div class="settings-section">
            <p>Export your portfolio data as JSON for backup or import previously saved data.</p>
            <div class="settings-actions">
                <button class="settings-btn" id="exportData"><i class="fas fa-download"></i> Export Data</button>
                <button class="settings-btn" id="importDataBtn"><i class="fas fa-upload"></i> Import Data</button>
                <input type="file" id="importFile" accept=".json" hidden>
                <button class="settings-btn danger" id="resetData"><i class="fas fa-trash"></i> Reset All</button>
            </div>
        </div>
    `;

    document.getElementById('exportData').addEventListener('click', () => {
        const data = loadPortfolioData();
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'portfolio-data.json';
        a.click();
        URL.revokeObjectURL(url);
    });

    document.getElementById('importDataBtn').addEventListener('click', () => {
        document.getElementById('importFile').click();
    });

    document.getElementById('importFile').addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                try {
                    const data = JSON.parse(event.target.result);
                    savePortfolioData(data);
                    alert('Data imported! Refreshing...');
                    location.reload();
                } catch (err) {
                    alert('Invalid JSON file');
                }
            };
            reader.readAsText(file);
        }
    });

    document.getElementById('resetData').addEventListener('click', () => {
        if (confirm('Reset all data to defaults? This cannot be undone!')) {
            localStorage.removeItem('portfolioData');
            alert('Data reset! Refreshing...');
            location.reload();
        }
    });
}
