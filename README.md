# 🚀 Portfolio Pessoal — Dev.Portfolio

Portfolio profissional moderno desenvolvido com **HTML5, CSS3 e TypeScript**.

---

## 📁 Estrutura do Projeto

```
portfolio/
├── index.html                  # Página principal
├── assets/
│   ├── css/
│   │   ├── variables.css       # Design tokens (cores, fontes, espaçamentos)
│   │   ├── reset.css           # Reset CSS
│   │   ├── style.css           # Estilos principais
│   │   └── responsive.css      # Media queries (mobile-first)
│   ├── ts/
│   │   └── main.ts             # ⭐ Código TypeScript (SOURCE)
│   └── js/
│       └── main.js             # JS compilado (não edite direto)
└── README.md
```

---

## ✨ Funcionalidades

- **Dark/Light Mode** — com persistência no `localStorage`
- **Cursor personalizado** — com follower suave (CSS + TS)
- **Animações de entrada** — via `IntersectionObserver`
- **Filtro de projetos** — por categoria, sem bibliotecas externas
- **Barras de skill animadas** — com contagem progressiva
- **Contador de stats** — animação de número no hero
- **Formulário de contato** — com validação TypeScript
- **Menu mobile** — hamburger responsivo
- **Nav com glassmorphism** — aparece ao rolar

---

## 🛠 Como Compilar o TypeScript

### 1. Instalar dependências (apenas uma vez)
```bash
npm install -D typescript
```

### 2. Compilar
```bash
npx tsc assets/ts/main.ts --outFile assets/js/main.js --target ES2017 --strict --ignoreDeprecations 6.0
```

### 3. (Opcional) Modo watch — recompila automaticamente ao salvar
```bash
npx tsc assets/ts/main.ts --outFile assets/js/main.js --target ES2017 --watch
```

---

## 📝 Como Personalizar

### ① Seus dados pessoais
Edite `index.html`:
- Seção Hero: troque "Sua Nome" pelo seu nome
- Seção Sobre: atualize o texto biográfico
- Links do GitHub e LinkedIn

### ② Seus projetos
Edite `assets/ts/main.ts`, array `PROJECTS_DATA`:
```typescript
{
  id: 1,
  title: "Nome do Projeto",
  description: "Descrição curta e objetiva.",
  emoji: "🎯",
  category: "PHP",           // Usado no filtro
  techs: ["PHP", "MySQL"],
  githubUrl: "https://github.com/...",
  liveUrl: "https://meusite.com",
}
```

### ③ Suas habilidades
Edite `SKILLS_DATA` no mesmo arquivo — ajuste os `level` (0-100) de cada skill.

### ④ Sua foto
Substitua o placeholder `.about__photo-placeholder` em `index.html`:
```html
<img src="assets/img/foto.jpg" alt="Seu nome" class="about__photo">
```
E adicione o CSS:
```css
.about__photo { width: 220px; height: 220px; object-fit: cover; border-radius: var(--radius-lg); }
```

### ⑤ Formulário de contato real
Crie conta em **[Formspree.io](https://formspree.io)** e substitua no `main.ts`:
```typescript
const res = await fetch("https://formspree.io/f/SEU_ID", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(data),
});
```

---

## 🌐 Hospedagem

| Plataforma     | Suporte | Grátis | Indicado para          |
|----------------|---------|--------|------------------------|
| **GitHub Pages** | HTML/CSS/JS | ✅ | Portfólio estático     |
| **Netlify**    | HTML/CSS/JS | ✅ | Deploy automático (Git)|
| **Vercel**     | HTML/CSS/JS | ✅ | Deploy rápido          |
| InfinityFree   | PHP também  | ✅ | Se quiser usar PHP     |

> **Recomendado:** GitHub Pages ou Netlify — simples, gratuito e profissional.

### Deploy no GitHub Pages (3 passos):
1. Crie repositório no GitHub (ex: `seuusuario.github.io`)
2. Faça push dos arquivos
3. Em Settings > Pages, selecione branch `main`

---

## 📈 Próximos Passos

- [ ] Adicionar sua foto real
- [ ] Conectar formulário ao Formspree
- [ ] Adicionar mais projetos reais
- [ ] Integrar API do GitHub (`api.github.com/users/{user}/repos`)
- [ ] Adicionar seção de certificados
- [ ] SEO: meta tags Open Graph para LinkedIn

---

## 🔧 Tecnologias

- **HTML5** — Semântico e acessível
- **CSS3** — Custom Properties, Grid, Flexbox, Animations
- **TypeScript** — Tipagem estrita, interfaces, classes
- **IntersectionObserver API** — Animações de scroll sem libs
- **localStorage** — Persistência do tema

---

*Feito com ♥ e muito `console.log()` 🚀*
