/* =========================================================
   APHRODITE — main.js
   Barra de navegação animada (dock nav), formulário de cadastro
   (protótipo, sem backend) e calculadora de taxas de coleta/tratamento.
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

  /* ---------- Dock nav — indicador deslizante ---------- */
  var nav = document.querySelector(".dock-nav");
  if (nav) {
    var indicator = nav.querySelector(".dock-indicator");
    var items = Array.prototype.slice.call(nav.querySelectorAll(".dock-item"));
    var activeItem = nav.querySelector(".dock-item.active") || items[0];

    function moveIndicatorTo(el) {
      if (!el || !indicator) return;
      var navRect = nav.getBoundingClientRect();
      var elRect = el.getBoundingClientRect();
      indicator.style.width = elRect.width + "px";
      indicator.style.height = elRect.height + "px";
      indicator.style.transform =
        "translate(" + (elRect.left - navRect.left) + "px, " + (elRect.top - navRect.top) + "px)";
    }

    function lightUp(el) {
      items.forEach(function (it) { it.classList.remove("is-lit"); });
      if (el) el.classList.add("is-lit");
    }

    // Posiciona o indicador no item ativo assim que o layout estiver pronto,
    // depois libera a transição suave para os próximos movimentos.
    requestAnimationFrame(function () {
      moveIndicatorTo(activeItem);
      lightUp(activeItem);
      requestAnimationFrame(function () { indicator.classList.add("ready"); });
    });

    // A fonte da Web (Work Sans) carrega de forma assíncrona e pode mudar a
    // largura do texto depois da primeira medição — reposiciona o indicador
    // (sem transição) assim que as fontes terminarem de carregar.
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(function () {
        var wasReady = indicator.classList.contains("ready");
        indicator.classList.remove("ready");
        moveIndicatorTo(nav.querySelector(".dock-item:hover") || activeItem);
        if (wasReady) {
          requestAnimationFrame(function () { indicator.classList.add("ready"); });
        }
      });
    }

    items.forEach(function (item) {
      item.addEventListener("mouseenter", function () {
        moveIndicatorTo(item);
        lightUp(item);
      });
      item.addEventListener("focus", function () {
        moveIndicatorTo(item);
        lightUp(item);
      });
    });

    nav.addEventListener("mouseleave", function () {
      moveIndicatorTo(activeItem);
      lightUp(activeItem);
    });

    window.addEventListener("resize", function () {
      var hovered = nav.querySelector(".dock-item:hover");
      moveIndicatorTo(hovered || activeItem);
    });

    // Rede de segurança extra para navegadores sem Font Loading API.
    setTimeout(function () {
      moveIndicatorTo(nav.querySelector(".dock-item:hover") || activeItem);
    }, 500);
  }

  /* ---------- Formulário de cadastro (protótipo) ---------- */
  var cadastroForm = document.getElementById("form-cadastro");
  if (cadastroForm) {
    cadastroForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var msg = document.getElementById("cadastro-msg");
      var nome = document.getElementById("nome-empresa").value.trim();

      // Simula um cadastro salvo localmente — troque por uma chamada de API
      // real (fetch para o seu backend) quando o protótipo virar produto.
      var registros = JSON.parse(localStorage.getItem("aphrodite_cadastros") || "[]");
      registros.push({
        nome: nome,
        cnpj: document.getElementById("cnpj").value.trim(),
        tipoNegocio: document.getElementById("tipo-negocio").value,
        tipoResiduo: document.getElementById("tipo-residuo").value,
        volume: document.getElementById("volume-medio").value,
        email: document.getElementById("email").value.trim(),
        data: new Date().toISOString(),
      });
      localStorage.setItem("aphrodite_cadastros", JSON.stringify(registros));

      msg.textContent = "Cadastro recebido! " + nome + ", nossa equipe entra em contato em até 2 dias úteis para confirmar a primeira coleta. (Protótipo: este cadastro foi salvo apenas no seu navegador.)";
      msg.className = "form-msg show success";
      cadastroForm.reset();
    });
  }

  /* ---------- Calculadora de taxas ---------- */
  var calcForm = document.getElementById("form-calculadora");
  if (calcForm) {
    // Parâmetros de referência do modelo de negócio (ver relatório de viabilidade financeira)
    var TAXA_POR_TONELADA = 300;      // R$/ton — taxa de coleta e tratamento
    var CONVERSAO_PRODUTO = 0.09;     // % do resíduo que vira matéria-prima cosmética (Linha A + Linha B)
    var CUSTO_DESCARTE_TRADICIONAL = 420; // R$/ton — referência de mercado para descarte comum (aterro/terceirizado avulso)

    function formatBRL(n) {
      return n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
    }

    function calcular() {
      var volumeKg = parseFloat(document.getElementById("calc-volume").value) || 0;
      var frequencia = document.getElementById("calc-frequencia").value;

      var multiplicador = { semanal: 4.33, quinzenal: 2, mensal: 1 }[frequencia] || 1;
      var volumeTonMes = (volumeKg * multiplicador) / 1000;

      var taxaColeta = volumeTonMes * TAXA_POR_TONELADA;
      var custoTradicional = volumeTonMes * CUSTO_DESCARTE_TRADICIONAL;
      var economia = custoTradicional - taxaColeta;
      var produtoGerado = volumeTonMes * CONVERSAO_PRODUTO;

      document.getElementById("res-volume").textContent = volumeTonMes.toLocaleString("pt-BR", { maximumFractionDigits: 2 }) + " ton/mês";
      document.getElementById("res-taxa").textContent = formatBRL(taxaColeta);
      document.getElementById("res-tradicional").textContent = formatBRL(custoTradicional);
      document.getElementById("res-produto").textContent = produtoGerado.toLocaleString("pt-BR", { maximumFractionDigits: 2 }) + " ton/mês";
      document.getElementById("res-economia").textContent = (economia >= 0 ? "" : "-") + formatBRL(Math.abs(economia));

      var economiaEl = document.getElementById("res-economia");
      economiaEl.style.color = economia >= 0 ? "#F3E6BE" : "#F8DCE6";
    }

    calcForm.addEventListener("input", calcular);
    calcular();
  }
});
