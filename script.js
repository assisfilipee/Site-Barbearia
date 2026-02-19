/* ==================================================
  PÁGINA: LANDING - BARBEARIA (Filipe Assis Barber)
  ARQUIVO: js/script.js
  VERSÃO: 1.0 (JS base - sem responsividade)
  OBJETIVO:
   - Header: topo transparente / no scroll aplica .is-scrolled
   - Ano automático no footer
   - Formulário: monta mensagem e redireciona pro WhatsApp (conversão)
================================================== */

"use strict";

(() => {
  /* ==============================
     CONFIG (ajuste fácil)
  ============================== */
  const WHATS_NUMBER = "48988263159"; // <-- troque pelo número real (com DDI + DDD)
  const HEADER_SCROLL_THRESHOLD = 10;   // px

  /* ==============================
     HELPERS
  ============================== */
  const qs = (sel, ctx = document) => ctx.querySelector(sel);

  const encode = (text) => encodeURIComponent(String(text || "").trim());

  const buildWhatsUrl = (phoneE164, message) => {
    const phone = String(phoneE164 || "").replace(/\D/g, "");
    const msg = encode(message);
    return `https://wa.me/${phone}?text=${msg}`;
  };

  /* ==============================
     HEADER: transparência no topo
  ============================== */
  try {
    const header = qs("[data-header]");
    if (header) {
      const onScroll = () => {
        const y = window.scrollY || document.documentElement.scrollTop || 0;
        header.classList.toggle("is-scrolled", y > HEADER_SCROLL_THRESHOLD);
      };

      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
    }
  } catch (err) {
    // silêncio: não quebra a página por JS
  }

  /* ==============================
     FOOTER YEAR
  ============================== */
  try {
    const yearEl = qs("#year");
    if (yearEl) yearEl.textContent = String(new Date().getFullYear());
  } catch (err) {}

  /* ==============================
     FORM -> WhatsApp (conversão)
  ============================== */
  try {
    const form = qs("#form-contato");
    if (!form) return;

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const nome = qs("#nome", form)?.value || "";
      const telefone = qs("#telefone", form)?.value || "";
      const mensagem = qs("#mensagem", form)?.value || "";

      // Mensagem bem “pronta pra converter”
      const texto =
        `Olá! Quero agendar um horário na Filipe Assis Barber.\n\n` +
        `Nome: ${nome}\n` +
        `Telefone: ${telefone}\n\n` +
        `Mensagem: ${mensagem}\n\n` +
        `Pode me passar os horários disponíveis?`;

      const url = buildWhatsUrl(WHATS_NUMBER, texto);
      window.open(url, "_blank", "noopener,noreferrer");
    });
  } catch (err) {}
})();
