/* =========================================================
   Police Simulator: Valley City — Cinematic Menu (Part 2)
   Rules:
   - Mandatory cover path: assets/images/capa_principal.png
   - No external APIs
   - Mobile-first
   - Multiplayer button shown but disabled
   ========================================================= */

(function () {
  "use strict";

  const STORAGE_KEY = "valley_city_save_v1";

  const i18n = {
    pt: {
      langLabel: "Idioma",
      splashLoading: "Carregando…",
      badge: "Simulador de Detetive • Singleplayer",
      title: "Valley City",
      desc:
        "Investigue crimes, colete evidências, entreviste testemunhas e interrogue suspeitos. Procedimentos realistas, decisões com consequências.",
      btnNew: "Novo Jogo",
      hintNew: "Iniciar carreira em Valley City",
      btnContinue: "Continuar",
      hintContinue: "Retomar último progresso",
      btnCases: "Casos",
      hintCases: "Ver casos disponíveis",
      btnMulti: "Multiplayer",
      hintMulti: "Em breve (próxima atualização)",
      btnCredits: "Créditos",
      hintCredits: "Equipe e direitos",
      metaText: "Mobile-first • Web • Vercel/GitHub",
      metaSaveOn: "Salvamento local: ativado",
      metaSaveOff: "Salvamento local: desativado",
      cardHeadline: "Boas-vindas, Detetive.",
      cardText:
        "Sua missão é aplicar métodos reais: preservar a cena, registrar evidências, validar depoimentos e sustentar conclusões com provas.",
      pillK1: "Modo",
      pillV1: "Singleplayer",
      pillK2: "Cidade",
      pillV2: "Valley City",
      pillK3: "Meta",
      pillV3: "Simulação real",
      tip: "Dica: em um simulador, “provar” é mais importante do que “acertar”.",
      footerRight: "Fechar janelas",
      modalOk: "OK",
      modalCasesTitle: "Casos",
      modalCasesBody:
        "Em breve você verá aqui a lista completa de casos (data-driven). Na próxima etapa, vamos adicionar o Caso 01 jogável e um seletor de casos.",
      modalCreditsTitle: "Créditos",
      modalCreditsBody:
        "Police Simulator: Valley City\n\nCriado por Jonatan Vale.\n\n(Os créditos completos serão organizados na etapa de finalização comercial.)",
      toastSaveFound: "Salvamento encontrado. Você pode Continuar.",
      toastNoSave: "Nenhum salvamento local encontrado.",
      toastNewGame: "Novo jogo iniciado (progresso será criado nas próximas etapas).",
      toastContinue: "Continuar (carregamento completo será adicionado nas próximas etapas).",
      toastMulti: "Multiplayer ainda não está disponível.",
    },
    en: {
      langLabel: "Language",
      splashLoading: "Loading…",
      badge: "Detective Simulator • Singleplayer",
      title: "Valley City",
      desc:
        "Investigate crimes, collect evidence, interview witnesses and interrogate suspects. Realistic procedures, decisions with consequences.",
      btnNew: "New Game",
      hintNew: "Start your career in Valley City",
      btnContinue: "Continue",
      hintContinue: "Resume last progress",
      btnCases: "Cases",
      hintCases: "View available cases",
      btnMulti: "Multiplayer",
      hintMulti: "Coming soon (next update)",
      btnCredits: "Credits",
      hintCredits: "Team & rights",
      metaText: "Mobile-first • Web • Vercel/GitHub",
      metaSaveOn: "Local save: enabled",
      metaSaveOff: "Local save: disabled",
      cardHeadline: "Welcome, Detective.",
      cardText:
        "Your mission is to apply real methods: secure the scene, document evidence, validate statements, and support conclusions with proof.",
      pillK1: "Mode",
      pillV1: "Singleplayer",
      pillK2: "City",
      pillV2: "Valley City",
      pillK3: "Goal",
      pillV3: "Real simulation",
      tip: "Tip: in a simulator, “proving” matters more than “guessing”.",
      footerRight: "Close windows",
      modalOk: "OK",
      modalCasesTitle: "Cases",
      modalCasesBody:
        "Soon you will see the full case list here (data-driven). Next step: add Case 01 playable and a case selector.",
      modalCreditsTitle: "Credits",
      modalCreditsBody:
        "Police Simulator: Valley City\n\nCreated by Jonatan Vale.\n\n(Full credits will be organized in the final commercial stage.)",
      toastSaveFound: "Save found. You can Continue.",
      toastNoSave: "No local save found.",
      toastNewGame: "New game started (full progress system comes in next steps).",
      toastContinue: "Continue (full loading will be added in next steps).",
      toastMulti: "Multiplayer is not available yet.",
    },
    es: {
      langLabel: "Idioma",
      splashLoading: "Cargando…",
      badge: "Simulador de Detective • Un jugador",
      title: "Valley City",
      desc:
        "Investiga crímenes, recoge evidencias, entrevista testigos e interroga sospechosos. Procedimientos realistas, decisiones con consecuencias.",
      btnNew: "Nuevo Juego",
      hintNew: "Inicia tu carrera en Valley City",
      btnContinue: "Continuar",
      hintContinue: "Reanudar el progreso",
      btnCases: "Casos",
      hintCases: "Ver casos disponibles",
      btnMulti: "Multijugador",
      hintMulti: "Próximamente (siguiente actualización)",
      btnCredits: "Créditos",
      hintCredits: "Equipo y derechos",
      metaText: "Mobile-first • Web • Vercel/GitHub",
      metaSaveOn: "Guardado local: activado",
      metaSaveOff: "Guardado local: desactivado",
      cardHeadline: "Bienvenido, Detective.",
      cardText:
        "Tu misión es aplicar métodos reales: asegurar la escena, documentar evidencias, validar testimonios y sostener conclusiones con pruebas.",
      pillK1: "Modo",
      pillV1: "Un jugador",
      pillK2: "Ciudad",
      pillV2: "Valley City",
      pillK3: "Meta",
      pillV3: "Simulación real",
      tip: "Consejo: en un simulador, “probar” importa más que “adivinar”.",
      footerRight: "Cerrar ventanas",
      modalOk: "OK",
      modalCasesTitle: "Casos",
      modalCasesBody:
        "Pronto verás aquí la lista completa de casos (data-driven). Próxima etapa: agregar Caso 01 jugable y selector de casos.",
      modalCreditsTitle: "Créditos",
      modalCreditsBody:
        "Police Simulator: Valley City\n\nCreado por Jonatan Vale.\n\n(Los créditos completos se organizarán en la etapa final comercial.)",
      toastSaveFound: "Guardado encontrado. Puedes Continuar.",
      toastNoSave: "No se encontró guardado local.",
      toastNewGame: "Nuevo juego iniciado (progreso completo en las próximas etapas).",
      toastContinue: "Continuar (carga completa se añadirá en las próximas etapas).",
      toastMulti: "El multijugador aún no está disponible.",
    },
  };

  // DOM helpers
  const $ = (id) => document.getElementById(id);

  // Elements
  const splash = $("splash");
  const splashHint = $("splashHint");

  const langSelect = $("langSelect");
  const langLabel = $("langLabel");

  const badgeText = $("badgeText");
  const menuTitle = $("menuTitle");
  const menuDesc = $("menuDesc");

  const btnNew = $("btnNew");
  const btnContinue = $("btnContinue");
  const btnCases = $("btnCases");
  const btnMultiplayer = $("btnMultiplayer");
  const btnCredits = $("btnCredits");

  const btnNewLabel = $("btnNewLabel");
  const btnNewHint = $("btnNewHint");
  const btnContinueLabel = $("btnContinueLabel");
  const btnContinueHint = $("btnContinueHint");
  const btnCasesLabel = $("btnCasesLabel");
  const btnCasesHint = $("btnCasesHint");
  const btnMultiLabel = $("btnMultiLabel");
  const btnMultiHint = $("btnMultiHint");
  const btnCreditsLabel = $("btnCreditsLabel");
  const btnCreditsHint = $("btnCreditsHint");

  const metaText = $("metaText");
  const metaSave = $("metaSave");

  const cardHeadline = $("cardHeadline");
  const cardText = $("cardText");
  const pillK1 = $("pillK1");
  const pillV1 = $("pillV1");
  const pillK2 = $("pillK2");
  const pillV2 = $("pillV2");
  const pillK3 = $("pillK3");
  const pillV3 = $("pillV3");
  const tipText = $("tipText");

  const footerRight = $("footerRight");
  const modalBackdrop = $("modalBackdrop");
  const modal = $("modal");
  const modalTitle = $("modalTitle");
  const modalBody = $("modalBody");
  const modalClose = $("modalClose");
  const modalOk = $("modalOk");
  const modalOkLabel = $("modalOkLabel");

  const toast = $("toast");

  const bg = $("bg");
  const bgCover = bg ? bg.querySelector(".bg__layer--cover") : null;

  // State
  let currentLang = "pt";
  let toastTimer = null;

  function setLang(lang) {
    currentLang = i18n[lang] ? lang : "pt";
    document.documentElement.lang = currentLang === "pt" ? "pt-BR" : currentLang;

    const t = i18n[currentLang];

    if (langLabel) langLabel.textContent = t.langLabel;
    if (splashHint) splashHint.textContent = t.splashLoading;

    if (badgeText) badgeText.textContent = t.badge;
    if (menuTitle) menuTitle.textContent = t.title;
    if (menuDesc) menuDesc.textContent = t.desc;

    if (btnNewLabel) btnNewLabel.textContent = t.btnNew;
    if (btnNewHint) btnNewHint.textContent = t.hintNew;

    if (btnContinueLabel) btnContinueLabel.textContent = t.btnContinue;
    if (btnContinueHint) btnContinueHint.textContent = t.hintContinue;

    if (btnCasesLabel) btnCasesLabel.textContent = t.btnCases;
    if (btnCasesHint) btnCasesHint.textContent = t.hintCases;

    if (btnMultiLabel) btnMultiLabel.textContent = t.btnMulti;
    if (btnMultiHint) btnMultiHint.textContent = t.hintMulti;

    if (btnCreditsLabel) btnCreditsLabel.textContent = t.btnCredits;
    if (btnCreditsHint) btnCreditsHint.textContent = t.hintCredits;

    if (metaText) metaText.textContent = t.metaText;

    if (cardHeadline) cardHeadline.textContent = t.cardHeadline;
    if (cardText) cardText.textContent = t.cardText;

    if (pillK1) pillK1.textContent = t.pillK1;
    if (pillV1) pillV1.textContent = t.pillV1;
    if (pillK2) pillK2.textContent = t.pillK2;
    if (pillV2) pillV2.textContent = t.pillV2;
    if (pillK3) pillK3.textContent = t.pillK3;
    if (pillV3) pillV3.textContent = t.pillV3;

    if (tipText) tipText.textContent = t.tip;

    if (footerRight) footerRight.textContent = t.footerRight;
    if (modalOkLabel) modalOkLabel.textContent = t.modalOk;

    // Save status text
    const hasSave = !!safeLoad();
    if (metaSave) metaSave.textContent = hasSave ? t.metaSaveOn : t.metaSaveOff;
  }

  function safeLoad() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch {
      return null;
    }
  }

  function safeSave(data) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      return true;
    } catch {
      return false;
    }
  }

  function showToast(message) {
    if (!toast) return;
    if (toastTimer) clearTimeout(toastTimer);
    toast.textContent = message;
    toast.classList.remove("hidden");
    toastTimer = setTimeout(() => {
      toast.classList.add("hidden");
    }, 2400);
  }

  function openModal(title, body) {
    if (!modal || !modalBackdrop) return;
    modalTitle.textContent = title;
    modalBody.textContent = body;

    modalBackdrop.classList.remove("hidden");
    modal.classList.remove("hidden");
  }

  function closeModal() {
    if (!modal || !modalBackdrop) return;
    modalBackdrop.classList.add("hidden");
    modal.classList.add("hidden");
  }

  function setContinueEnabled(enabled) {
    if (!btnContinue) return;
    btnContinue.disabled = !enabled;
  }

  function initContinueFromSave() {
    const save = safeLoad();
    const t = i18n[currentLang];
    if (save) {
      setContinueEnabled(true);
      showToast(t.toastSaveFound);
    } else {
      setContinueEnabled(false);
      showToast(t.toastNoSave);
    }
  }

  // Parallax / tilt (works with mouse + touch)
  function clamp(n, a, b) {
    return Math.max(a, Math.min(b, n));
  }

  function applyParallax(nx, ny) {
    if (!bgCover) return;

    // Subtle cinematic movement
    const maxMove = 10; // px
    const x = clamp(nx, -1, 1) * maxMove;
    const y = clamp(ny, -1, 1) * maxMove;

    // Move only the cover; other overlays remain static for cohesion
    bgCover.style.transform = `translate3d(${x}px, ${y}px, 0) scale(1.07)`;
  }

  function setupParallax() {
    // mouse
    window.addEventListener("mousemove", (e) => {
      const w = window.innerWidth || 1;
      const h = window.innerHeight || 1;
      const nx = (e.clientX / w) * 2 - 1;
      const ny = (e.clientY / h) * 2 - 1;
      applyParallax(nx * 0.55, ny * 0.55);
    }, { passive: true });

    // touch (use last touch point)
    window.addEventListener("touchmove", (e) => {
      if (!e.touches || e.touches.length === 0) return;
      const t = e.touches[0];
      const w = window.innerWidth || 1;
      const h = window.innerHeight || 1;
      const nx = (t.clientX / w) * 2 - 1;
      const ny = (t.clientY / h) * 2 - 1;
      applyParallax(nx * 0.35, ny * 0.35);
    }, { passive: true });

    // reset gently on leave/end
    window.addEventListener("mouseleave", () => applyParallax(0, 0), { passive: true });
    window.addEventListener("touchend", () => applyParallax(0, 0), { passive: true });
  }

  // Splash control (fade out when cover loaded)
  function hideSplashSoon() {
    if (!splash) return;
    splash.classList.add("splash--hide");
    setTimeout(() => {
      splash.remove();
    }, 650);
  }

  function ensureCoverLoaded() {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = "assets/images/capa_principal.png";
    });
  }

  function bindEvents() {
    if (langSelect) {
      langSelect.addEventListener("change", () => {
        setLang(langSelect.value);
        initContinueFromSave();
      });
    }

    // New Game
    if (btnNew) {
      btnNew.addEventListener("click", () => {
        const t = i18n[currentLang];

        // Create a minimal save stub (next steps will store full GameState)
        const ok = safeSave({
          version: 1,
          createdAt: Date.now(),
          lastSeenAt: Date.now(),
          profile: { rank: "Detective", city: "Valley City", score: 0 },
          current: { caseId: "case_01_tutorial", step: "start" },
        });

        setContinueEnabled(ok);
        showToast(t.toastNewGame);

        // For now, show a modal as a bridge to the next stage (Part 3/4)
        openModal(
          t.btnNew,
          currentLang === "pt"
            ? "Novo jogo criado.\n\nNa próxima etapa vamos abrir o HUB da delegacia e iniciar o Caso 01 com evidências, depoimentos e interrogatório usando seus assets (avatar/suspect/witness)."
            : currentLang === "en"
              ? "New game created.\n\nNext step: build the Police Station HUB and start Case 01 with evidence, statements and interrogation using your assets (avatar/suspect/witness)."
              : "Nuevo juego creado.\n\nSiguiente paso: crear el HUB de la comisaría e iniciar el Caso 01 con evidencias, testimonios e interrogatorio usando tus assets (avatar/suspect/witness)."
        );
      });
    }

    // Continue
    if (btnContinue) {
      btnContinue.addEventListener("click", () => {
        const t = i18n[currentLang];
        const save = safeLoad();
        if (!save) {
          setContinueEnabled(false);
          showToast(t.toastNoSave);
          return;
        }
        showToast(t.toastContinue);

        openModal(
          t.btnContinue,
          currentLang === "pt"
            ? "Salvamento detectado.\n\nNa próxima etapa vamos implementar o HUB da delegacia (computador, telefone, quadro de evidências) e carregar o estado real do jogo."
            : currentLang === "en"
              ? "Save detected.\n\nNext step: implement the Police Station HUB (computer, phone, evidence board) and load the real game state."
              : "Guardado detectado.\n\nSiguiente paso: implementar el HUB de la comisaría (computadora, teléfono, tablero de evidencias) y cargar el estado real del juego."
        );
      });
    }

    // Cases
    if (btnCases) {
      btnCases.addEventListener("click", () => {
        const t = i18n[currentLang];
        openModal(t.modalCasesTitle, t.modalCasesBody);
      });
    }

    // Multiplayer (disabled, but keep handler if enabled later)
    if (btnMultiplayer) {
      btnMultiplayer.addEventListener("click", () => {
        const t = i18n[currentLang];
        showToast(t.toastMulti);
      });
    }

    // Credits
    if (btnCredits) {
      btnCredits.addEventListener("click", () => {
        const t = i18n[currentLang];
        openModal(t.modalCreditsTitle, t.modalCreditsBody);
      });
    }

    // Modal controls
    if (modalClose) modalClose.addEventListener("click", closeModal);
    if (modalOk) modalOk.addEventListener("click", closeModal);
    if (modalBackdrop) modalBackdrop.addEventListener("click", closeModal);

    // ESC to close modal
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeModal();
    });
  }

  async function init() {
    // Default language from select
    if (langSelect) currentLang = langSelect.value || "pt";
    setLang(currentLang);

    // Check cover load before hiding splash
    await ensureCoverLoaded();

    // Keep splash on screen briefly for cinematic entry
    setTimeout(hideSplashSoon, 900);

    // Init save status and continue button
    initContinueFromSave();

    // Bind and setup
    bindEvents();
    setupParallax();
    applyParallax(0, 0);
  }

  document.addEventListener("DOMContentLoaded", init);
})();
