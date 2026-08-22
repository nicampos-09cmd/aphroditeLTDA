/* =========================================================
   APHRODITE — main.js
   Menu mobile, formulário de cadastro (protótipo, sem backend)
   e calculadora de taxas de coleta/tratamento.
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {
  /* ---------- Menu mobile ---------- */
  var toggle = document.querySelector(".menu-toggle");
  var nav = document.querySelector(".main-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      nav.classList.toggle("open");
      var expanded = nav.classList.contains("open");
      toggle.setAttribute("aria-expanded", expanded ? "true" : "false");
    });
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () { nav.classList.remove("open"); });
    });
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
    var CONVERSAO_PRODUTO = 0.30;     // % do resíduo que vira produto de valor agregado
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
      economiaEl.style.color = economia >= 0 ? "#BFE3B0" : "#F0B7A4";
    }

    calcForm.addEventListener("input", calcular);
    calcular();
  }
});
