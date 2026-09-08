# ✦ Lumina Studio

Um site de portfólio criativo elegante e moderno, construído com **HTML5**, **CSS3** e **JavaScript vanilla**.

## 🎨 Paleta de Cores

| Cor | Hex | Uso |
|-----|-----|-----|
| **Rosa** | `#ff6b9d` → `#ffc2d1` | Destaques, gradientes, CTAs |
| **Dourado** | `#d4af37` → `#f4e4bc` | Detalhes, ícones, acentos |
| **Branco** | `#ffffff` → `#fafafa` | Fundos, cards, contraste |

## ✨ Funcionalidades

- **🔮 Barra de Navegação Interativa Animada** — Indicador deslizante que acompanha o item ativo, com efeitos hover elegantes
- **🌸 Partículas Flutuantes** — Animação sutil de partículas em tons de rosa e dourado
- **🎯 Transições Suaves entre Seções** — Navegação fluida sem recarregar a página
- **📊 Contadores Animados** — Números que crescem ao entrar na viewport
- **🖱️ Cursor Personalizado** — Cursor customizado com efeito de escala em elementos interativos (desktop)
- **📱 Totalmente Responsivo** — Layout adaptável para mobile, tablet e desktop
- **🎭 Efeito Glitch no Título** — Efeito de decodificação de texto no hover
- **🌙 Glassmorphism** — Efeitos de vidro fosco na navegação e cards

## 📁 Estrutura de Arquivos

```
website/
├── index.html          # Página principal
├── css/
│   └── style.css       # Estilos completos
├── js/
│   └── main.js         # Interatividade e animações
└── README.md           # Este arquivo
```

## 🚀 Como Usar

### 1. Clone ou baixe o projeto
```bash
git clone https://github.com/seu-usuario/lumina-studio.git
cd lumina-studio
```

### 2. Abra no navegador
Basta abrir o arquivo `index.html` em qualquer navegador moderno:
```bash
# macOS
open index.html

# Windows
start index.html

# Linux
xdg-open index.html
```

Ou use um servidor local:
```bash
# Python 3
python -m http.server 8000

# Node.js (npx)
npx serve .

# PHP
php -S localhost:8000
```

### 3. Personalize

Edite os arquivos conforme sua necessidade:

- **`index.html`** — Conteúdo, textos, estrutura
- **`css/style.css`** — Cores, tipografia, espaçamentos, animações
- **`js/main.js`** — Comportamentos, interações, lógica

## 🛠️ Personalização Rápida

### Mudar as Cores
No arquivo `css/style.css`, edite as variáveis CSS no `:root`:

```css
:root {
    --rose-300: #ff6b9d;    /* Rosa principal */
    --gold-300: #d4af37;    /* Dourado principal */
    --white: #ffffff;       /* Branco */
    /* ... */
}
```

### Adicionar Nova Seção
1. Adicione o HTML em `index.html`:
```html
<section class="section" id="nova-secao">
    <div class="section-content">
        <!-- seu conteúdo -->
    </div>
</section>
```

2. Adicione o item de navegação:
```html
<button class="nav-item" data-target="nova-secao" data-index="5">
    <svg class="nav-icon">...</svg>
    <span class="nav-label">Nova Seção</span>
</button>
```

### Mudar os Projetos do Portfólio
Edite os cards em `index.html` dentro da seção `#portfolio`:
```html
<div class="portfolio-card">
    <div class="portfolio-image" style="background: linear-gradient(...);">
        <div class="portfolio-overlay">
            <span class="portfolio-category">Categoria</span>
            <h3>Nome do Projeto</h3>
            <p>Descrição</p>
        </div>
    </div>
</div>
```

## 📱 Responsividade

O site é totalmente responsivo e se adapta a:
- **Desktop** — Layout completo com grid e sidebar
- **Tablet** — Layout ajustado, navegação compacta
- **Mobile** — Menu hambúrguer, layout em coluna única

## 🌐 Navegadores Suportados

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 📄 Licença

Este projeto está sob a licença MIT. Sinta-se livre para usar, modificar e distribuir.

---

Feito com 💖 por Lumina Studio
