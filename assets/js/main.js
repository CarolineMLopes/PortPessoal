"use strict";
// ===================================================
// PORTFOLIO MAIN.TS — TypeScript Source
// ===================================================
// 💡 Para compilar: npx tsc assets/ts/main.ts --outFile assets/js/main.js --target ES2017
// ===================================================
// ── Data ─────────────────────────────────────────────
const SKILLS_DATA = [
    {
        title: "Front-End",
        icon: "💻",
        skills: [
            { name: "HTML5 & CSS3", level: 78, label: "Avançado" },
            { name: "JavaScript", level: 55, label: "Intermediário" },
            { name: "TypeScript", level: 55, label: "Intermediário" },
            { name: "Design Responsivo", level: 55, label: "Intermediário" },
        ],
    },
    {
        title: "Back-End & Desktop",
        icon: "⚙️",
        skills: [
            { name: "C# / .NET", level: 55, label: "Intermediário" },
            { name: "Java", level: 30, label: "Básico" },
            { name: "PHP", level: 30, label: "Básico" },
            { name: "SQL / MySQL", level: 30, label: "Básico" },
        ],
    },
    {
        title: "Mobile",
        icon: "📱",
        skills: [
            { name: "Ionic", level: 55, label: "Intermediário" },
            { name: "Angular", level: 50, label: "Intermediário" },
            { name: "SQLite", level: 30, label: "Básico" },
            { name: "Ionic Storage", level: 15, label: "Em evolução" },
        ],
    },
    {
        title: "Ferramentas",
        icon: "🛠",
        skills: [
            { name: "VS Code / Visual Studio", level: 78, label: "Avançado" },
            { name: "Git & GitHub", level: 55, label: "Intermediário" },
            { name: "Microsoft Office", level: 55, label: "Intermediário" },
            { name: "Lógica & Algoritmos", level: 55, label: "Intermediário" },
        ],
    },
];
const PROJECTS_DATA = [
    {
        id: 1,
        title: "Projeto React - Portfólio Pessoal",
        description: "Portfolio pessoal desenvolvido em React e TypeScript para apresentar projetos, habilidades e informações de contato de forma moderna e responsiva.",
        emoji: "💼",
        category: "React",
        type: "training",
        techs: ["React", "TypeScript", "HTML", "CSS"],
        githubUrl: "https://github.com/CarolineMLopes/PortPessoal",
        liveUrl: "https://portfoliocarolinemlopes.netlify.app",
        featured: true,
    },
    {
        id: 2,
        title: "App Mobile de Gerenciamento de Chamados Técnicos",
        description: "Aplicativo mobile com CRUD completo para gerenciamento e acompanhamento de chamados técnicos. Inclui histórico de alterações por chamado e formulários reativos com validação de dados.",
        emoji: "📱",
        category: "Mobile",
        type: "training",
        techs: ["Ionic", "Angular", "TypeScript"],
        githubUrl: "https://github.com/CarolineMLopes/AppChamadoTecnico",
        liveUrl: "https://appchamadotecnicoc.netlify.app",
        featured: true,
    },
    {
        id: 3,
        title: "Site Institucional com Painel Administrativo – NK Edição e Vídeo",
        description: "Website desenvolvido para fotógrafo profissional com galeria dinâmica, upload de imagens no painel administrativo e mecanismos de segurança para proteção do sistema.",
        emoji: "📸",
        category: "Web",
        type: "real",
        techs: ["HTML", "CSS", "PHP", "MySQL"],
        githubUrl: "https://github.com/CarolineMLopes/Site_Fotografia",
        liveUrl: "",
        featured: true,
    },
];
// ── Class: PortfolioApp ───────────────────────────────
class PortfolioApp {
    constructor() {
        this.currentFilter = "Todos";
        this.init();
    }
    init() {
        this.initCursor();
        this.initTheme();
        this.initNav();
        this.initScrollEffects();
        this.renderSkills();
        this.renderProjects();
        this.initForm();
        this.initCounters();
        this.setYear();
    }
    // ── Cursor personalizado ──────────────────────────
    initCursor() {
        const cursor = document.getElementById("cursor");
        const follower = document.getElementById("cursor-follower");
        if (!cursor || !follower)
            return;
        let mouseX = 0, mouseY = 0;
        let followerX = 0, followerY = 0;
        document.addEventListener("mousemove", (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursor.style.left = mouseX + "px";
            cursor.style.top = mouseY + "px";
        });
        // Smooth follower
        const animateFollower = () => {
            followerX += (mouseX - followerX) * 0.15;
            followerY += (mouseY - followerY) * 0.15;
            follower.style.left = followerX + "px";
            follower.style.top = followerY + "px";
            requestAnimationFrame(animateFollower);
        };
        animateFollower();
        // Cursor states
        const interactables = document.querySelectorAll("a, button, .project-card, .filter-btn");
        interactables.forEach(el => {
            el.addEventListener("mouseenter", () => {
                cursor.style.width = "16px";
                cursor.style.height = "16px";
                follower.style.width = "60px";
                follower.style.height = "60px";
            });
            el.addEventListener("mouseleave", () => {
                cursor.style.width = "8px";
                cursor.style.height = "8px";
                follower.style.width = "36px";
                follower.style.height = "36px";
            });
        });
    }
    // ── Dark / Light theme ──────────────────────────
    initTheme() {
        const toggle = document.getElementById("theme-toggle");
        const body = document.body;
        const saved = localStorage.getItem("theme");
        if (saved) {
            body.setAttribute("data-theme", saved);
            this.updateThemeIcon(saved);
        }
        toggle === null || toggle === void 0 ? void 0 : toggle.addEventListener("click", () => {
            const current = body.getAttribute("data-theme");
            const next = current === "dark" ? "light" : "dark";
            body.setAttribute("data-theme", next);
            localStorage.setItem("theme", next);
            this.updateThemeIcon(next);
        });
    }
    updateThemeIcon(theme) {
        const icon = document.querySelector(".theme-icon");
        if (icon)
            icon.textContent = theme === "dark" ? "◐" : "●";
    }
    // ── Navegação mobile ──────────────────────────────
    initNav() {
        const toggle = document.getElementById("nav-toggle");
        const menu = document.getElementById("nav-menu");
        const links = document.querySelectorAll(".nav__link");
        const header = document.getElementById("header");
        toggle === null || toggle === void 0 ? void 0 : toggle.addEventListener("click", () => {
            menu === null || menu === void 0 ? void 0 : menu.classList.toggle("open");
            toggle.classList.toggle("open");
        });
        // Fecha menu ao clicar em link
        links.forEach(link => {
            link.addEventListener("click", () => {
                menu === null || menu === void 0 ? void 0 : menu.classList.remove("open");
                toggle === null || toggle === void 0 ? void 0 : toggle.classList.remove("open");
            });
        });
        // Header com fundo ao rolar
        window.addEventListener("scroll", () => {
            if (window.scrollY > 50) {
                header === null || header === void 0 ? void 0 : header.classList.add("scrolled");
            }
            else {
                header === null || header === void 0 ? void 0 : header.classList.remove("scrolled");
            }
        });
    }
    // ── Scroll animations com IntersectionObserver ───
    initScrollEffects() {
        const elements = document.querySelectorAll(".fade-up");
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                }
            });
        }, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });
        elements.forEach(el => observer.observe(el));
    }
    // ── Mapeia label → classe CSS do nível ───────────
    getLevelClass(label) {
        const map = {
            "Em evolução": "evolucao",
            "Básico": "basico",
            "Intermediário": "intermediario",
            "Avançado": "avancado",
            "Profissional": "profissional",
        };
        return map[label] || "basico";
    }
    // ── Renderizar Skills ────────────────────────────
    renderSkills() {
        const container = document.getElementById("skills-container");
        if (!container)
            return;
        container.innerHTML = SKILLS_DATA.map(category => `
      <div class="skill-category fade-up">
        <h3 class="skill-category__title">
          <span class="skill-category__icon">${category.icon}</span>
          ${category.title}
        </h3>
        <div class="skill-list">
          ${category.skills.map(skill => `
            <div class="skill-item">
              <div class="skill-item__header">
                <span class="skill-item__name">${skill.name}</span>
                <span class="skill-item__level skill-item__level--${this.getLevelClass(skill.label)}">${skill.label}</span>
              </div>
              <div class="skill-bar">
                <div class="skill-bar__fill" style="--target-width: ${skill.level}%"></div>
              </div>
            </div>
          `).join("")}
        </div>
      </div>
    `).join("");
        // Anima barras quando entram na tela
        const bars = document.querySelectorAll(".skill-bar__fill");
        const skillObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const width = el.style.getPropertyValue("--target-width");
                    el.style.width = width;
                    el.classList.add("animated");
                    skillObserver.unobserve(el);
                }
            });
        }, { threshold: 0.5 });
        bars.forEach(bar => skillObserver.observe(bar));
        this.reinitScrollObserver();
    }
    // ── Renderizar Projetos ──────────────────────────
    renderProjects() {
        this.renderFilterButtons();
        this.renderProjectCards(PROJECTS_DATA);
    }
    getCategories() {
        const cats = new Set(PROJECTS_DATA.map(p => p.category));
        return Array.from(cats);
    }
    renderFilterButtons() {
        const container = document.getElementById("filter-buttons");
        if (!container)
            return;
        const techCategories = this.getCategories();
        const typeFilters = [
            { key: "Todos", label: "Todos", group: "type" },
            { key: "real", label: "✦ Freelance", group: "type" },
            { key: "training", label: "⚡ Treinamento", group: "type" },
        ];
        const techFiltersBtns = techCategories.map(cat => ({ key: cat, label: cat, group: "tech" }));
        const allFilters = [...typeFilters, ...techFiltersBtns];
        container.innerHTML = `
      <div class="filter-group filter-group--type">
        ${typeFilters.map(f => `
          <button class="filter-btn filter-btn--type ${f.key === "Todos" ? "active" : ""}" data-filter="${f.key}">
            ${f.label}
          </button>
        `).join("")}
      </div>
      <div class="filter-group__divider"></div>
      <div class="filter-group filter-group--tech">
        ${techFiltersBtns.map(f => `
          <button class="filter-btn filter-btn--tech" data-filter="${f.key}">
            ${f.label}
          </button>
        `).join("")}
      </div>
    `;
        container.querySelectorAll(".filter-btn").forEach(btn => {
            btn.addEventListener("click", () => {
                const filter = btn.dataset.filter || "Todos";
                this.filterProjects(filter);
                container.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
                btn.classList.add("active");
            });
        });
    }
    renderProjectCards(projects) {
        const grid = document.getElementById("projects-grid");
        if (!grid)
            return;
        if (projects.length === 0) {
            grid.innerHTML = `<p class="projects__empty">Nenhum projeto encontrado.</p>`;
            return;
        }
        grid.innerHTML = projects.map(p => `
      <div class="project-card fade-up ${p.type === "real" ? "project-card--real" : ""}" data-category="${p.category}" data-type="${p.type}" data-id="${p.id}">
        <div class="project-card__thumb">
          <div class="project-card__thumb-bg"></div>
          <span class="project-card__emoji">${p.emoji}</span>
          <span class="project-card__tag">${p.category}</span>
          ${p.type === "real" ? `<span class="project-card__real-badge">✦ Freelance</span>` : ""}
        </div>
        <div class="project-card__body">
          <h3 class="project-card__title">${p.title}</h3>
          <p class="project-card__desc">${p.description}</p>
          <div class="project-card__techs">
            ${p.techs.map(t => `<span class="tech-tag">${t}</span>`).join("")}
          </div>
          <div class="project-card__links">
            ${p.githubUrl ? `
              <a href="${p.githubUrl}" target="_blank" class="project-link">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
                GitHub
              </a>
            ` : ""}
            ${p.liveUrl ? `
              <a href="${p.liveUrl}" target="_blank" class="project-link">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                Ver Live
              </a>
            ` : ""}
          </div>
        </div>
      </div>
    `).join("");
        this.reinitScrollObserver();
    }
    filterProjects(filter) {
        this.currentFilter = filter;
        let filtered;
        if (filter === "Todos") {
            filtered = PROJECTS_DATA;
        }
        else if (filter === "real" || filter === "training") {
            filtered = PROJECTS_DATA.filter(p => p.type === filter);
        }
        else {
            filtered = PROJECTS_DATA.filter(p => p.category === filter);
        }
        this.renderProjectCards(filtered);
    }
    // ── Contador animado nos stats ────────────────────
    initCounters() {
        const counters = document.querySelectorAll("[data-target]");
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const target = parseInt(el.dataset.target || "0", 10);
                    this.animateCounter(el, target);
                    observer.unobserve(el);
                }
            });
        }, { threshold: 0.5 });
        counters.forEach(c => observer.observe(c));
    }
    animateCounter(el, target) {
        let current = 0;
        const increment = target / 40;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                el.textContent = target + "+";
                clearInterval(timer);
            }
            else {
                el.textContent = Math.floor(current).toString();
            }
        }, 40);
    }
    // ── Formulário de contato ──────────────────────────
    initForm() {
        const form = document.getElementById("contact-form");
        const feedback = document.getElementById("form-feedback");
        const submitBtn = document.getElementById("submit-btn");
        if (!form || !feedback || !submitBtn)
            return;
        form.addEventListener("submit", async (e) => {
            e.preventDefault();
            const data = {
                name: form.querySelector("#name").value.trim(),
                email: form.querySelector("#email").value.trim(),
                subject: form.querySelector("#subject").value,
                message: form.querySelector("#message").value.trim(),
            };
            // Validação TS
            const validation = this.validateForm(data);
            if (!validation.valid) {
                this.showFeedback(feedback, validation.message, "error");
                return;
            }
            // Simula envio (substitua pelo Formspree ou EmailJS)
            submitBtn.disabled = true;
            submitBtn.innerHTML = `<span>Enviando...</span>`;
            try {
                // 🔧 Para usar Formspree: substitua pela chamada real
                // const res = await fetch("https://formspree.io/f/SEU_ID", { method: "POST", body: new ContactFormData(form) });
                await this.simulateSend();
                this.showFeedback(feedback, "✅ Mensagem enviada! Retornarei em breve.", "success");
                form.reset();
            }
            catch (_a) {
                this.showFeedback(feedback, "❌ Erro ao enviar. Tente pelo LinkedIn.", "error");
            }
            finally {
                submitBtn.disabled = false;
                submitBtn.innerHTML = `<span>Enviar Mensagem</span><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
            }
        });
    }
    validateForm(data) {
        if (!data.name)
            return { valid: false, message: "Por favor, informe seu nome." };
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email))
            return { valid: false, message: "Informe um email válido." };
        if (!data.message || data.message.length < 10)
            return { valid: false, message: "A mensagem precisa ter ao menos 10 caracteres." };
        return { valid: true, message: "" };
    }
    simulateSend() {
        return new Promise(resolve => setTimeout(resolve, 1500));
    }
    showFeedback(el, message, type) {
        el.textContent = message;
        el.className = `form-feedback ${type}`;
        setTimeout(() => {
            el.textContent = "";
            el.className = "form-feedback";
        }, 5000);
    }
    // ── Helpers ──────────────────────────────────────
    reinitScrollObserver() {
        const elements = document.querySelectorAll(".fade-up:not(.visible)");
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting)
                    entry.target.classList.add("visible");
            });
        }, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });
        elements.forEach(el => observer.observe(el));
    }
    setYear() {
        const el = document.getElementById("year");
        if (el)
            el.textContent = new Date().getFullYear().toString();
    }
}
// ── Init ───────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
    new PortfolioApp();
});
