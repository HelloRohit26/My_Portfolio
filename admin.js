// Admin Panel Functions
// ⚠️ IMPORTANT: Change this password to your own secure password!
const ADMIN_PASSWORD = 'Rohit@2024'; // Change this!

// Session management
const AdminAuth = {
    maxAttempts: 5,
    lockoutDuration: 15 * 60 * 1000, // 15 minutes
    sessionDuration: 30 * 60 * 1000, // 30 minutes session

    getAttempts() {
        return parseInt(sessionStorage.getItem('adminAttempts') || '0');
    },

    setAttempts(count) {
        sessionStorage.setItem('adminAttempts', count.toString());
    },

    getLockoutTime() {
        return parseInt(sessionStorage.getItem('adminLockout') || '0');
    },

    setLockout() {
        sessionStorage.setItem('adminLockout', Date.now().toString());
    },

    isLockedOut() {
        const lockoutTime = this.getLockoutTime();
        if (lockoutTime && Date.now() - lockoutTime < this.lockoutDuration) {
            return true;
        }
        if (lockoutTime) {
            // Reset after lockout period
            sessionStorage.removeItem('adminLockout');
            this.setAttempts(0);
        }
        return false;
    },

    getRemainingLockoutTime() {
        const lockoutTime = this.getLockoutTime();
        const remaining = this.lockoutDuration - (Date.now() - lockoutTime);
        return Math.ceil(remaining / 60000); // minutes
    },

    isAuthenticated() {
        const authTime = sessionStorage.getItem('adminAuth');
        if (authTime && Date.now() - parseInt(authTime) < this.sessionDuration) {
            return true;
        }
        sessionStorage.removeItem('adminAuth');
        return false;
    },

    authenticate() {
        sessionStorage.setItem('adminAuth', Date.now().toString());
        this.setAttempts(0);
    },

    logout() {
        sessionStorage.removeItem('adminAuth');
    },

    recordFailedAttempt() {
        const attempts = this.getAttempts() + 1;
        this.setAttempts(attempts);
        if (attempts >= this.maxAttempts) {
            this.setLockout();
        }
        return attempts;
    }
};

function showLoginModal(onSuccess) {
    // Check if locked out
    if (AdminAuth.isLockedOut()) {
        alert(`🔒 Too many failed attempts. Please try again in ${AdminAuth.getRemainingLockoutTime()} minutes.`);
        return;
    }

    // Create login modal
    const loginModal = document.createElement('div');
    loginModal.id = 'adminLoginModal';
    loginModal.innerHTML = `
        <div class="login-overlay"></div>
        <div class="login-container">
            <div class="login-header">
                <i class="fas fa-shield-alt"></i>
                <h2>Admin Authentication</h2>
            </div>
            <form id="adminLoginForm">
                <div class="login-input-group">
                    <label for="adminPassword"><i class="fas fa-key"></i> Password</label>
                    <input type="password" id="adminPassword" placeholder="Enter admin password" autocomplete="off" required>
                </div>
                <p class="login-attempts">Attempts remaining: ${AdminAuth.maxAttempts - AdminAuth.getAttempts()}</p>
                <div class="login-buttons">
                    <button type="submit" class="login-btn primary"><i class="fas fa-unlock"></i> Login</button>
                    <button type="button" class="login-btn secondary" id="cancelLogin"><i class="fas fa-times"></i> Cancel</button>
                </div>
            </form>
        </div>
    `;

    document.body.appendChild(loginModal);

    // Add styles dynamically
    if (!document.getElementById('loginModalStyles')) {
        const styles = document.createElement('style');
        styles.id = 'loginModalStyles';
        styles.textContent = `
            #adminLoginModal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 10000;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .login-overlay {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                backdrop-filter: blur(10px);
            }
            .login-container {
                position: relative;
                background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
                border: 1px solid rgba(99, 102, 241, 0.3);
                border-radius: 20px;
                padding: 40px;
                width: 90%;
                max-width: 400px;
                box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5), 0 0 100px rgba(99, 102, 241, 0.1);
                animation: loginSlideIn 0.3s ease-out;
            }
            @keyframes loginSlideIn {
                from { transform: translateY(-30px); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
            .login-header {
                text-align: center;
                margin-bottom: 30px;
            }
            .login-header i {
                font-size: 3rem;
                color: #6366f1;
                margin-bottom: 15px;
                display: block;
            }
            .login-header h2 {
                color: #fff;
                font-size: 1.5rem;
                margin: 0;
            }
            .login-input-group {
                margin-bottom: 20px;
            }
            .login-input-group label {
                display: block;
                color: #a0a0a0;
                margin-bottom: 8px;
                font-size: 0.9rem;
            }
            .login-input-group input {
                width: 100%;
                padding: 15px;
                background: rgba(255, 255, 255, 0.05);
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 10px;
                color: #fff;
                font-size: 1rem;
                transition: all 0.3s ease;
                box-sizing: border-box;
            }
            .login-input-group input:focus {
                outline: none;
                border-color: #6366f1;
                box-shadow: 0 0 20px rgba(99, 102, 241, 0.2);
            }
            .login-attempts {
                color: #f59e0b;
                font-size: 0.85rem;
                text-align: center;
                margin-bottom: 20px;
            }
            .login-buttons {
                display: flex;
                gap: 15px;
            }
            .login-btn {
                flex: 1;
                padding: 15px;
                border: none;
                border-radius: 10px;
                font-size: 1rem;
                cursor: pointer;
                transition: all 0.3s ease;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 8px;
            }
            .login-btn.primary {
                background: linear-gradient(135deg, #6366f1, #8b5cf6);
                color: #fff;
            }
            .login-btn.primary:hover {
                transform: translateY(-2px);
                box-shadow: 0 10px 30px rgba(99, 102, 241, 0.4);
            }
            .login-btn.secondary {
                background: rgba(255, 255, 255, 0.1);
                color: #fff;
            }
            .login-btn.secondary:hover {
                background: rgba(255, 255, 255, 0.2);
            }
            .login-error {
                background: rgba(239, 68, 68, 0.2);
                border: 1px solid rgba(239, 68, 68, 0.5);
                color: #ef4444;
                padding: 10px;
                border-radius: 8px;
                margin-bottom: 15px;
                text-align: center;
                animation: shake 0.5s ease-in-out;
            }
            @keyframes shake {
                0%, 100% { transform: translateX(0); }
                25% { transform: translateX(-10px); }
                75% { transform: translateX(10px); }
            }
        `;
        document.head.appendChild(styles);
    }

    // Focus password input
    setTimeout(() => document.getElementById('adminPassword').focus(), 100);

    // Handle form submission
    document.getElementById('adminLoginForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const password = document.getElementById('adminPassword').value;

        if (password === ADMIN_PASSWORD) {
            AdminAuth.authenticate();
            loginModal.remove();
            onSuccess();
        } else {
            const attempts = AdminAuth.recordFailedAttempt();

            if (AdminAuth.isLockedOut()) {
                alert(`🔒 Too many failed attempts. You are locked out for ${AdminAuth.getRemainingLockoutTime()} minutes.`);
                loginModal.remove();
                return;
            }

            // Show error
            const existingError = document.querySelector('.login-error');
            if (existingError) existingError.remove();

            const errorDiv = document.createElement('div');
            errorDiv.className = 'login-error';
            errorDiv.innerHTML = `<i class="fas fa-exclamation-triangle"></i> Incorrect password`;
            document.getElementById('adminLoginForm').insertBefore(errorDiv, document.querySelector('.login-input-group'));

            // Update attempts remaining
            document.querySelector('.login-attempts').textContent = `Attempts remaining: ${AdminAuth.maxAttempts - attempts}`;

            // Clear password field
            document.getElementById('adminPassword').value = '';
            document.getElementById('adminPassword').focus();
        }
    });

    // Handle cancel
    document.getElementById('cancelLogin').addEventListener('click', () => {
        loginModal.remove();
    });

    // Close on overlay click
    loginModal.querySelector('.login-overlay').addEventListener('click', () => {
        loginModal.remove();
    });
}

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

    adminBtn.addEventListener('click', () => {
        // Check if already authenticated
        if (AdminAuth.isAuthenticated()) {
            adminModal.classList.add('active');
        } else {
            // Show login modal
            showLoginModal(() => {
                adminModal.classList.add('active');
            });
        }
    });

    document.getElementById('closeAdmin').addEventListener('click', () => {
        adminModal.classList.remove('active');
        // Optionally logout when closing (uncomment next line if desired)
        // AdminAuth.logout();
    });

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
