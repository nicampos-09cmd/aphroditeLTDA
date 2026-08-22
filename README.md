# Aphrodite — protótipo de site

Protótipo de plataforma website que conecta empresas geradoras de resíduos (varejos,
mercados, indústrias alimentícias) a processos de coleta, tratamento e transformação
em produtos de valor agregado. Desenvolvido como atividade prática do curso Técnico em
Administração — ETEC Santa Isabel.

Site estático em **HTML, CSS e JavaScript puros** — sem framework, sem build, sem
dependências. Basta abrir os arquivos `.html` num navegador ou publicar como está.

## Estrutura de pastas

```
├── index.html            → Página inicial
├── como-funciona.html    → Processo + tipos de resíduo aceitos
├── catalogo.html         → Catálogo de produtos de valor agregado
├── calculadora.html      → Calculadora de taxas (funcional, em JS)
├── cadastro.html         → Formulário de cadastro de empresas parceiras
├── sobre.html            → Missão do projeto e equipe
├── css/
│   └── style.css         → Toda a identidade visual do site
└── js/
    └── main.js           → Menu mobile, calculadora e formulário de cadastro
```

Cada página HTML repete o mesmo cabeçalho e rodapé — não há um sistema de templates,
então uma alteração no menu ou no rodapé precisa ser copiada em cada arquivo `.html`
(veja "Como editar" abaixo).

## Como editar o conteúdo

Tudo é texto simples dentro dos arquivos `.html`. Não é necessário saber programar para
mudar frases, preços ou nomes — só encontrar o trecho e editar diretamente no GitHub
(veja o passo a passo mais abaixo).

Pontos mais prováveis de edição:

| O que mudar | Onde |
|---|---|
| Textos, títulos, preços | Dentro do `<body>` de cada página `.html` |
| Parâmetros da calculadora (taxa/ton, % de conversão) | `js/main.js`, no topo da função da calculadora (`TAXA_POR_TONELADA`, `CONVERSAO_PRODUTO`, `CUSTO_DESCARTE_TRADICIONAL`) |
| Cores, fontes, espaçamentos | `css/style.css`, seção `:root` no topo (variáveis de cor `--marigold`, `--loam`, `--moss` etc.) |
| Campos do formulário de cadastro | `cadastro.html` |
| Nomes da equipe | `sobre.html` |
| Menu de navegação | Repetido em todas as páginas, dentro de `<nav class="main-nav">` |

O formulário de cadastro (`cadastro.html`) hoje só salva os dados no navegador da
pessoa (`localStorage`), pois é um protótipo sem servidor. Para receber cadastros de
verdade, é preciso conectar o formulário a um backend (ex.: um formulário do Google
Forms, um serviço como Formspree, ou uma API própria) — o ponto de partida está no
arquivo `js/main.js`, na função que trata o envio do formulário.

## Publicar no GitHub

### 1. Criar o repositório

1. Crie uma conta em [github.com](https://github.com), se ainda não tiver.
2. Clique em **New repository** (Novo repositório).
3. Dê um nome, por exemplo `aphrodite-site`, e deixe como **Public**.
4. Clique em **Create repository**.

### 2. Subir os arquivos

Na página do repositório recém-criado:

1. Clique em **uploading an existing file** (ou **Add file → Upload files**).
2. Arraste todos os arquivos e pastas deste projeto (`index.html`, `css/`, `js/` etc.)
   mantendo a mesma estrutura de pastas.
3. Role até o final da página e clique em **Commit changes**.

### 3. Publicar com GitHub Pages (para ver o site no ar)

1. No repositório, vá em **Settings → Pages** (no menu lateral esquerdo).
2. Em **Source**, selecione a branch `main` e a pasta `/ (root)`.
3. Clique em **Save**.
4. Após cerca de 1 minuto, o GitHub mostra o link do site publicado, algo como:
   `https://seu-usuario.github.io/aphrodite-site/`

Qualquer alteração enviada depois (novo commit na branch `main`) atualiza o site
publicado automaticamente em alguns minutos.

### 4. Editar diretamente pelo site do GitHub

Não é necessário instalar nada no computador:

1. Abra o arquivo que quer editar dentro do repositório no GitHub.
2. Clique no ícone de lápis (**Edit this file**) no canto superior direito.
3. Faça a alteração no editor de texto que abre no navegador.
4. Role até o final e clique em **Commit changes**.
5. O GitHub Pages atualiza o site publicado automaticamente.

## Rodar localmente (opcional)

Como é um site estático, basta abrir `index.html` diretamente no navegador. Alguns
recursos (como carregar `css/style.css` via `file://`) funcionam melhor com um
servidor local simples — se tiver Python instalado:

```bash
python3 -m http.server 8000
```

E depois acesse `http://localhost:8000` no navegador.

## Fontes e créditos

As fontes usadas (Fraunces, Work Sans, IBM Plex Mono) são carregadas via Google Fonts
no topo de `css/style.css` — é necessário acesso à internet para elas carregarem;
sem internet, o navegador usa uma fonte padrão do sistema como alternativa.

Os valores usados na calculadora e no catálogo (taxas, preços de produtos) seguem o
relatório de viabilidade financeira do projeto Aphrodite (pesquisa de mercado de
agosto de 2026) e podem ser ajustados em `js/main.js` e nas páginas HTML conforme o
grupo atualizar os números.
