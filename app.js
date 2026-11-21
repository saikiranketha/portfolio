/**
 * SAI KIRAN KETHA - 3D INTERACTIVE DEVELOPER PORTFOLIO
 * Core JavaScript: WebGL Three.js Scene, 3D Perspective Tilt,
 * Custom Cursor, Dynamic Case Studies, Interactive Resume & UI Controllers
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Preloader
    initPreloader();

    // 2. Initialize Three.js 3D WebGL Background
    initThreeJS();

    // 3. Initialize Custom Smooth Cursor
    initCustomCursor();

    // 4. Initialize Theme Switcher (Dark/Light)
    initThemeManager();

    // 5. Initialize Typewriter Engine
    initTypewriter();

    // 6. Initialize Bento Stats Counter
    initStatsCounter();

    // 7. Initialize 3D Card Tilt Effects
    init3DTilt();

    // 8. Initialize Skills & Project Filters
    initFilters();

    // 9. Initialize Case Study & Resume Modals
    initModals();

    // 10. Initialize Interactive Resume Tabs
    initResumeTabs();

    // 11. Initialize Contact Form & Clipboard Copy
    initContactModule();

    // 12. Initialize Navigation Scroll Spy & Back To Top
    initScrollControllers();
});

/* ==========================================================================
   1. PRELOADER ENGINE
   ========================================================================== */
function initPreloader() {
    const preloader = document.getElementById('preloader');
    const loadBar = document.getElementById('load-bar');
    const loadPercent = document.getElementById('load-percent');
    const loadText = document.getElementById('load-text');

    if (!preloader) return;

    const stages = [
        { pct: 25, text: "Compiling 3D Shaders..." },
        { pct: 55, text: "Loading Mesh Geometries..." },
        { pct: 85, text: "Initializing Systems..." },
        { pct: 100, text: "Welcome to Sai Kiran's Portfolio" }
    ];

    let progress = 0;
    let stageIndex = 0;

    const interval = setInterval(() => {
        progress += Math.floor(Math.random() * 8) + 4;
        if (progress > 100) progress = 100;

        if (loadBar) loadBar.style.width = `${progress}%`;
        if (loadPercent) loadPercent.textContent = `${progress}%`;

        if (stageIndex < stages.length && progress >= stages[stageIndex].pct) {
            if (loadText) loadText.textContent = stages[stageIndex].text;
            stageIndex++;
        }

        if (progress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                preloader.classList.add('loaded');
                triggerEntryAnimations();
            }, 350);
        }
    }, 45);
}

function triggerEntryAnimations() {
    // Scroll reveal observer
    const revealElements = document.querySelectorAll('[data-reveal]');
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const delay = el.getAttribute('data-delay') || 0;
                setTimeout(() => {
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                }, delay);
                obs.unobserve(el);
            }
        });
    }, { threshold: 0.15 });

    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(25px)';
        el.style.transition = 'opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)';
        observer.observe(el);
    });
}

/* ==========================================================================
   2. THREE.JS 3D WEBGL ENGINE
   ========================================================================== */
let threeScene, threeCamera, threeRenderer, icosahedronMesh, torusMesh, starPoints;
let mouseX = 0, mouseY = 0;
let targetX = 0, targetY = 0;

function initThreeJS() {
    const canvas = document.getElementById('webgl-canvas');
    if (!canvas || typeof THREE === 'undefined') return;

    // Scene & Camera
    threeScene = new THREE.Scene();
    threeCamera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    threeCamera.position.z = 30;

    // Renderer
    threeRenderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    threeRenderer.setSize(window.innerWidth, window.innerHeight);
    threeRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // 1. Starfield Particles
    const starGeometry = new THREE.BufferGeometry();
    const starCount = 650;
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount * 3; i += 3) {
        starPositions[i] = (Math.random() - 0.5) * 120;
        starPositions[i + 1] = (Math.random() - 0.5) * 120;
        starPositions[i + 2] = (Math.random() - 0.5) * 80;

        // Gradient tint (Cyan to Indigo)
        const mixedColor = Math.random() > 0.5;
        starColors[i] = mixedColor ? 0.38 : 0.22; // R
        starColors[i + 1] = mixedColor ? 0.74 : 0.54; // G
        starColors[i + 2] = mixedColor ? 0.97 : 0.95; // B
    }

    starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starGeometry.setAttribute('color', new THREE.BufferAttribute(starColors, 3));

    const starMaterial = new THREE.PointsMaterial({
        size: 1.2,
        vertexColors: true,
        transparent: true,
        opacity: 0.75
    });

    starPoints = new THREE.Points(starGeometry, starMaterial);
    threeScene.add(starPoints);

    // 2. Floating 3D Geometric Objects (Wireframe Icosahedron & Torus Knot)
    const icoGeometry = new THREE.IcosahedronGeometry(7, 1);
    const icoMaterial = new THREE.MeshBasicMaterial({
        color: 0x6366f1,
        wireframe: true,
        transparent: true,
        opacity: 0.22
    });
    icosahedronMesh = new THREE.Mesh(icoGeometry, icoMaterial);
    icosahedronMesh.position.set(16, 5, -5);
    threeScene.add(icosahedronMesh);

    const torusGeometry = new THREE.TorusKnotGeometry(5, 1.2, 80, 12);
    const torusMaterial = new THREE.MeshBasicMaterial({
        color: 0x06b6d4,
        wireframe: true,
        transparent: true,
        opacity: 0.15
    });
    torusMesh = new THREE.Mesh(torusGeometry, torusMaterial);
    torusMesh.position.set(-18, -8, -10);
    threeScene.add(torusMesh);

    // Mouse Parallax Trackers
    window.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX - window.innerWidth / 2) * 0.0008;
        mouseY = (e.clientY - window.innerHeight / 2) * 0.0008;
    });

    // Resize Handler
    window.addEventListener('resize', onThreeResize);

    // Render Loop (60 FPS)
    animateThree();
}

function onThreeResize() {
    if (!threeCamera || !threeRenderer) return;
    threeCamera.aspect = window.innerWidth / window.innerHeight;
    threeCamera.updateProjectionMatrix();
    threeRenderer.setSize(window.innerWidth, window.innerHeight);
}

function animateThree() {
    requestAnimationFrame(animateThree);

    // Smooth Lerp Camera Parallax
    targetX += (mouseX - targetX) * 0.05;
    targetY += (mouseY - targetY) * 0.05;

    threeCamera.position.x = targetX * 12;
    threeCamera.position.y = -targetY * 12;
    threeCamera.lookAt(threeScene.position);

    // Rotate Meshes
    if (icosahedronMesh) {
        icosahedronMesh.rotation.x += 0.004;
        icosahedronMesh.rotation.y += 0.006;
    }

    if (torusMesh) {
        torusMesh.rotation.x += 0.005;
        torusMesh.rotation.z += 0.003;
    }

    if (starPoints) {
        starPoints.rotation.y += 0.0006;
    }

    threeRenderer.render(threeScene, threeCamera);
}

/* ==========================================================================
   3. CUSTOM CURSOR
   ========================================================================== */
function initCustomCursor() {
    const dot = document.getElementById('cursor-dot');
    const glow = document.getElementById('cursor-glow');
    if (!dot || !glow) return;

    let posX = window.innerWidth / 2, posY = window.innerHeight / 2;
    let mouseXPos = posX, mouseYPos = posY;

    window.addEventListener('mousemove', (e) => {
        mouseXPos = e.clientX;
        mouseYPos = e.clientY;
        dot.style.left = `${mouseXPos}px`;
        dot.style.top = `${mouseYPos}px`;
    });

    function renderCursor() {
        posX += (mouseXPos - posX) * 0.15;
        posY += (mouseYPos - posY) * 0.15;
        glow.style.left = `${posX}px`;
        glow.style.top = `${posY}px`;
        requestAnimationFrame(renderCursor);
    }
    renderCursor();

    // Hover scale triggers
    const interactiveElements = document.querySelectorAll('a, button, .tilt-element, input, textarea, .filter-tab');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => document.body.classList.add('cursor-grow'));
        el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-grow'));
    });
}

/* ==========================================================================
   4. THEME SWITCHER
   ========================================================================== */
function initThemeManager() {
    const themeBtn = document.getElementById('theme-toggle');
    const savedTheme = localStorage.getItem('sai_portfolio_theme') || 'dark';

    document.documentElement.setAttribute('data-theme', savedTheme);

    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('sai_portfolio_theme', newTheme);

            // Update Three.js wireframe opacity for light mode
            if (icosahedronMesh && torusMesh) {
                const opacity = newTheme === 'light' ? 0.35 : 0.22;
                icosahedronMesh.material.opacity = opacity;
                torusMesh.material.opacity = opacity;
            }

            showToast(`Switched to ${newTheme.toUpperCase()} theme`, 'info');
        });
    }
}

/* ==========================================================================
   5. TYPEWRITER ENGINE
   ========================================================================== */
function initTypewriter() {
    const element = document.getElementById('typewriter');
    if (!element) return;

    const phrases = [
        "Full Stack Developer",
        "CSE Undergrad @ Swarnandhra",
        "NxtWave CCBP 4.0 Fellow",
        "AI & VisionX Hackathon Builder",
        "Passionate Problem Solver"
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let speed = 80;

    function type() {
        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            element.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            speed = 40;
        } else {
            element.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            speed = 90;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            speed = 1800; // Pause at end of phrase
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            speed = 400; // Pause before typing new phrase
        }

        setTimeout(type, speed);
    }

    type();
}

/* ==========================================================================
   6. BENTO STATS COUNTER
   ========================================================================== */
function initStatsCounter() {
    const counters = document.querySelectorAll('.counter');
    let hasAnimated = false;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                hasAnimated = true;
                counters.forEach(counter => {
                    const target = +counter.getAttribute('data-target');
                    const duration = 1600; // ms
                    const stepTime = 20;
                    const steps = duration / stepTime;
                    const increment = target / steps;
                    let current = 0;

                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= target) {
                            counter.textContent = target;
                            clearInterval(timer);
                        } else {
                            counter.textContent = Math.floor(current);
                        }
                    }, stepTime);
                });
            }
        });
    }, { threshold: 0.3 });

    const statsSection = document.getElementById('stats');
    if (statsSection) observer.observe(statsSection);
}

/* ==========================================================================
   7. 3D PERSPECTIVE CARD TILT
   ========================================================================== */
function init3DTilt() {
    const tiltElements = document.querySelectorAll('.tilt-element');

    tiltElements.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -8;
            const rotateY = ((x - centerX) / centerX) * 8;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)`;
        });
    });
}

/* ==========================================================================
   8. SKILLS & PROJECTS FILTERING
   ========================================================================== */
function initFilters() {
    // 1. Skills Filter
    const skillTabs = document.querySelectorAll('.skill-filter-btn, .filter-tab, .skl-tab');
    const skillCards = document.querySelectorAll('.skill-card-item, .skill-item, .skl-card');

    if (skillTabs.length && skillCards.length) {
        skillTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                skillTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');

                const filter = tab.getAttribute('data-filter') || tab.getAttribute('data-skl') || 'all';

                skillCards.forEach(card => {
                    const category = card.getAttribute('data-category') || card.getAttribute('data-skl-cat');
                    if (filter === 'all' || category === filter) {
                        card.classList.remove('hidden');
                        card.classList.remove('skl-hidden');
                    } else {
                        card.classList.add('hidden');
                        card.classList.add('skl-hidden');
                    }
                });
            });
        });
    }

    // 2. Project Filter
    const projectTabs = document.querySelectorAll('.project-filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    if (projectTabs.length && projectCards.length) {
        projectTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                projectTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');

                const filter = tab.getAttribute('data-pfilter');

                projectCards.forEach(card => {
                    const category = card.getAttribute('data-category');
                    if (filter === 'all' || category === filter) {
                        card.classList.remove('hidden');
                    } else {
                        card.classList.add('hidden');
                    }
                });
            });
        });
    }
}

/* ==========================================================================
   9. CASE STUDY & RESUME MODALS
   ========================================================================== */
const projectData = {
    'smart-attendance': {
        title: "Smart Attendance Management System",
        image: "assets/smart_attendance.jpg",
        tags: ["Python", "React.js", "SQL Database", "Facial Biometrics", "REST APIs"],
        overview: "An enterprise-grade smart attendance system engineered to replace manual student registers with seamless biometric/face recognition authentication, automated status analytics, and role-based permissions.",
        features: [
            "Real-time student face scan identification with sub-second response time.",
            "Visual analytics dashboard displaying daily/monthly attendance percentage metrics.",
            "Role-based authorization for administrators, faculty members, and students.",
            "Instant notifications and attendance exception reporting."
        ],
        techStack: "Frontend built with React.js and CSS Grid. Backend REST services written in Python with SQLite/PostgreSQL schema modeling and JWT token protection.",
        githubUrl: "https://github.com/saikiranketha"
    },
    'visionx-ai': {
        title: "VisionX AI Computer Vision Solution",
        image: "assets/visionx_ai.jpg",
        tags: ["AI / ML", "Python", "OpenCV", "Deep Learning", "Real-Time Telemetry"],
        overview: "Developed during the national VisionX innovation hackathon, this AI-powered surveillance analysis system performs automated object recognition, telemetry tracking, and security anomaly detection across multiple live video camera streams.",
        features: [
            "Multi-stream video processing with bounding box detections at 30+ FPS.",
            "Neural network loss and accuracy telemetry graphed dynamically in the dashboard.",
            "Custom alert triggers for unusual motion or perimeter breaches.",
            "Optimized lightweight pipeline for edge devices and low-latency environments."
        ],
        techStack: "Engineered using Python, OpenCV, and neural network inference pipelines with a dark cyber telemetry dashboard.",
        githubUrl: "https://github.com/saikiranketha"
    },
    'ccbp-suite': {
        title: "CCBP 4.0 Full-Stack Web Application Suite",
        image: "assets/ccbp_fullstack.jpg",
        tags: ["Node.js", "Express.js", "SQLite", "React.js", "REST APIs"],
        overview: "A series of robust full-stack web applications created during NxtWave CCBP 4.0 intensive fellowship, focusing on end-to-end CRUD operations, authentication middleware, and modular UI architectures.",
        features: [
            "E-commerce, streaming, and productivity web apps with persistent database integration.",
            "REST API routing with input sanitization, error handlers, and token auth.",
            "Responsive, mobile-first design adhering to modern UI/UX design patterns.",
            "Over 700+ days of continuous coding test coverage."
        ],
        techStack: "React.js, Node.js, Express.js, SQLite, RESTful API architecture, Git version control.",
        githubUrl: "https://github.com/saikiranketha"
    },
    'portfolio-3d': {
        title: "Next-Gen 3D Cyber Developer Portfolio",
        image: "assets/portfolio_3d.jpg",
        tags: ["Three.js", "WebGL", "Vanilla JS", "Glassmorphism", "60 FPS"],
        overview: "A showcase portfolio crafted with pure performance in mind, combining hardware-accelerated WebGL 3D wireframe geometries, dynamic perspective tilts, dark/light theme switcher, and an interactive curriculum vitae viewer.",
        features: [
            "Three.js particle field with mouse-reactive camera parallax lerp.",
            "Smooth 3D perspective tilt cards with specular reflections.",
            "Full printable resume and case study overlays with zero external heavy frameworks.",
            "Optimized for 60fps rendering across desktop and mobile devices."
        ],
        techStack: "Three.js WebGL, Vanilla JavaScript (ES6+), CSS Custom Properties, Semantic HTML5.",
        githubUrl: "https://github.com/saikiranketha"
    }
};

function initModals() {
    const projectModal = document.getElementById('project-modal');
    const modalBody = document.getElementById('modal-body');
    const modalClose = document.getElementById('modal-close');

    const resumeModal = document.getElementById('resume-modal');
    const resumeModalBtn = document.getElementById('view-resume-modal-btn');
    const resumeModalClose = document.getElementById('resume-modal-close');

    // Open Case Study Modal
    document.querySelectorAll('.open-case-study').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const projectId = btn.getAttribute('data-project');
            const data = projectData[projectId];

            if (data && modalBody && projectModal) {
                modalBody.innerHTML = `
                    <img src="${data.image}" alt="${data.title}" class="modal-project-img">
                    <h3 class="modal-title">${data.title}</h3>
                    <div class="modal-tags">
                        ${data.tags.map(tag => `<span>${tag}</span>`).join('')}
                    </div>
                    <div class="modal-section">
                        <h4>Project Overview</h4>
                        <p>${data.overview}</p>
                    </div>
                    <div class="modal-section">
                        <h4>Key Innovations &amp; Features</h4>
                        <ul>
                            ${data.features.map(feat => `<li>${feat}</li>`).join('')}
                        </ul>
                    </div>
                    <div class="modal-section">
                        <h4>Architecture &amp; Tech Stack</h4>
                        <p>${data.techStack}</p>
                    </div>
                    <div class="modal-actions">
                        <a href="${data.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
                            <i class="ri-github-fill"></i> View GitHub Repository
                        </a>
                        <button class="btn btn-secondary close-current-modal">
                            Close Preview
                        </button>
                    </div>
                `;

                projectModal.classList.add('active');
                document.body.style.overflow = 'hidden';

                // Bind inner close button
                modalBody.querySelector('.close-current-modal').addEventListener('click', () => {
                    projectModal.classList.remove('active');
                    document.body.style.overflow = '';
                });
            }
        });
    });

    if (modalClose && projectModal) {
        modalClose.addEventListener('click', () => {
            projectModal.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    // Open Resume Modal
    if (resumeModalBtn && resumeModal) {
        resumeModalBtn.addEventListener('click', () => {
            resumeModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }

    if (resumeModalClose && resumeModal) {
        resumeModalClose.addEventListener('click', () => {
            resumeModal.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    // Dismiss with ESC key or backdrop click
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (projectModal) projectModal.classList.remove('active');
            if (resumeModal) resumeModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    [projectModal, resumeModal].forEach(modal => {
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        }
    });
}

/* ==========================================================================
   10. INTERACTIVE RESUME TABS
   ========================================================================== */
function initResumeTabs() {
    const tabBtns = document.querySelectorAll('.resume-tab-btn');
    const tabPanels = document.querySelectorAll('.resume-tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanels.forEach(p => p.classList.remove('active'));

            btn.classList.add('active');
            const targetTab = btn.getAttribute('data-tab');
            const targetPanel = document.getElementById(`tab-${targetTab}`);
            if (targetPanel) {
                targetPanel.classList.add('active');
            }
        });
    });

    // Download CV trigger
    const downloadTrigger = document.getElementById('download-cv-trigger');
    if (downloadTrigger) {
        downloadTrigger.addEventListener('click', (e) => {
            e.preventDefault();
            // Open resume modal and trigger print
            const resumeModal = document.getElementById('resume-modal');
            if (resumeModal) {
                resumeModal.classList.add('active');
                setTimeout(() => window.print(), 300);
            }
        });
    }
}

/* ==========================================================================
   11. CONTACT MODULE & CLIPBOARD COPY
   ========================================================================== */
function initContactModule() {
    // 1. Copy Email Button
    const copyEmailBtn = document.getElementById('copy-email-btn');
    const emailTooltip = document.getElementById('email-tooltip');

    if (copyEmailBtn) {
        copyEmailBtn.addEventListener('click', () => {
            const email = "kethasaikiran123@gmail.com";
            navigator.clipboard.writeText(email).then(() => {
                if (emailTooltip) {
                    emailTooltip.classList.add('show');
                    setTimeout(() => emailTooltip.classList.remove('show'), 2200);
                }
                showToast("Email address copied to clipboard!", "success");
            }).catch(() => {
                showToast("Email: kethasaikiran123@gmail.com", "info");
            });
        });
    }

    // 2. Preset Subject Pills
    const presetPills = document.querySelectorAll('.preset-pill');
    const subjectInput = document.getElementById('contact-subject');

    presetPills.forEach(pill => {
        pill.addEventListener('click', () => {
            presetPills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
            if (subjectInput) {
                subjectInput.value = pill.getAttribute('data-subject');
            }
        });
    });

    // 3. Contact Form Submission with Validation & Confetti
    const contactForm = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            let isValid = true;
            const nameInput = document.getElementById('contact-name');
            const emailInput = document.getElementById('contact-email');
            const subjectField = document.getElementById('contact-subject');
            const messageInput = document.getElementById('contact-message');

            // Validate Name
            if (!nameInput.value.trim()) {
                nameInput.closest('.form-group').classList.add('has-error');
                isValid = false;
            } else {
                nameInput.closest('.form-group').classList.remove('has-error');
            }

            // Validate Email
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(emailInput.value.trim())) {
                emailInput.closest('.form-group').classList.add('has-error');
                isValid = false;
            } else {
                emailInput.closest('.form-group').classList.remove('has-error');
            }

            // Validate Subject
            if (!subjectField.value.trim()) {
                subjectField.closest('.form-group').classList.add('has-error');
                isValid = false;
            } else {
                subjectField.closest('.form-group').classList.remove('has-error');
            }

            // Validate Message
            if (!messageInput.value.trim()) {
                messageInput.closest('.form-group').classList.add('has-error');
                isValid = false;
            } else {
                messageInput.closest('.form-group').classList.remove('has-error');
            }

            if (!isValid) {
                showToast("Please fill in all required fields accurately.", "error");
                return;
            }

            // Simulate sending message
            if (submitBtn) submitBtn.classList.add('loading');

            setTimeout(() => {
                if (submitBtn) submitBtn.classList.remove('loading');
                contactForm.reset();

                // Trigger confetti
                if (typeof confetti === 'function') {
                    confetti({
                        particleCount: 80,
                        spread: 70,
                        origin: { y: 0.6 }
                    });
                }

                showToast("Thank you, your message has been sent successfully! Sai Kiran will respond shortly.", "success");
            }, 1200);
        });
    }
}

/* Toast Notification Utility */
function showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type === 'error' ? 'toast-error' : ''}`;
    toast.innerHTML = `
        <i class="${type === 'error' ? 'ri-error-warning-fill' : 'ri-checkbox-circle-fill'}"></i>
        <span>${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(50px)';
        toast.style.transition = 'all 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 3800);
}

/* ==========================================================================
   12. NAVIGATION SCROLL SPY & BACK TO TOP
   ========================================================================== */
function initScrollControllers() {
    const navbar = document.getElementById('navbar');
    const backToTop = document.getElementById('back-to-top');
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const hamburger = document.getElementById('hamburger-btn');
    const navMenu = document.getElementById('nav-menu');

    // Mobile Hamburger Toggle
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('open');
        });

        // Close menu on link click
        navLinks.forEach(link => {
            link.addEventListener('click', () => navMenu.classList.remove('open'));
        });
    }

    // Scroll Listener (Throttled via requestAnimationFrame)
    let isScrolling = false;

    window.addEventListener('scroll', () => {
        if (!isScrolling) {
            window.requestAnimationFrame(() => {
                const scrollY = window.pageYOffset;

                // Navbar sticky glass
                if (scrollY > 50) {
                    if (navbar) navbar.classList.add('scrolled');
                    if (backToTop) backToTop.classList.add('show');
                } else {
                    if (navbar) navbar.classList.remove('scrolled');
                    if (backToTop) backToTop.classList.remove('show');
                }

                // Active Link Scroll Spy
                sections.forEach(section => {
                    const sectionTop = section.offsetTop - 120;
                    const sectionHeight = section.offsetHeight;
                    const sectionId = section.getAttribute('id');

                    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                        navLinks.forEach(link => {
                            link.classList.remove('active');
                            if (link.getAttribute('href') === `#${sectionId}`) {
                                link.classList.add('active');
                            }
                        });
                    }
                });

                isScrolling = false;
            });
            isScrolling = true;
        }
    });

    // Back to top action
    if (backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Dynamic Year in footer
    const yearElem = document.getElementById('current-year');
    if (yearElem) yearElem.textContent = new Date().getFullYear();
}
