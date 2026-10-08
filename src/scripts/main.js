/**
 * EcoScan Official Landing Page Logic
 * Interactive mobile mockup, regional norms switcher, and install guide.
 */

document.addEventListener("DOMContentLoaded", () => {
  initDynamicReleaseInfo();
  initPhoneMockup();
  initRegionalNorms();
  initAccordion();
  initCopyHash();
  initDownloadFeedback();
  initMobileNav();
  initSmoothScroll();
});

/* ==========================================================================
   1. Interactive Smartphone Mockup & Scanner Simulation
   ========================================================================== */

const scannerData = {
  plastic: {
    name: "Plásticos",
    fraction: "Inorgánico",
    boxText: "Plástico 92%",
    color: "#1565c0",
    instruction: "Desechar en el contenedor para plásticos. Vacía el líquido y aplasta el envase.",
    confidence: "92.0%",
    image: "/assets/scanner/plastic-bottle.jpg",
    boxStyle: { top: "34%", left: "16%", width: "68%", height: "36%" },
    iconSvg: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 2h-4c-.55 0-1 .45-1 1v2H7c-1.1 0-2 .9-2 2v13c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2h-2V3c0-.55-.45-1-1-1zm-3 2h2v1h-2V4zm6 16H7V7h10v13z"/></svg>`
  },
  organic: {
    name: "Orgánicos",
    fraction: "Orgánico",
    boxText: "Comida 95%",
    color: "#2e7d32",
    instruction: "Deposítalo en la fracción orgánica para compostaje o tratamiento biológico.",
    confidence: "94.8%",
    image: "/assets/scanner/organic-banana.jpg",
    boxStyle: { top: "36%", left: "12%", width: "76%", height: "38%" },
    iconSvg: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 0 0 8 20C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z"/></svg>`
  },
  metal: {
    name: "Metales",
    fraction: "Inorgánico",
    boxText: "Metal 89%",
    color: "#0288d1",
    instruction: "Desechar en el contenedor de metales. Limpia residuos y compacta si es posible.",
    confidence: "88.7%",
    image: "/assets/scanner/metal-can.jpg",
    boxStyle: { top: "24%", left: "22%", width: "56%", height: "50%" },
    iconSvg: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/></svg>`
  }
};

function initPhoneMockup() {
  const phoneTabs = document.querySelectorAll(".phone-tab-btn");
  const glider = document.getElementById("phone-tabs-glider");
  const phoneScreenContainer = document.querySelector(".phone-screen-container");
  const screenKeys = ["scan", "info", "settings"];
  const screens = {
    scan: document.getElementById("screen-scan"),
    info: document.getElementById("screen-info"),
    settings: document.getElementById("screen-settings")
  };

  let currentIndex = 0;

  function updateGlider(activeTab) {
    if (!glider || !activeTab) return;
    const parentLeft = activeTab.parentElement.getBoundingClientRect().left;
    const tabRect = activeTab.getBoundingClientRect();
    const leftOffset = tabRect.left - parentLeft;
    glider.style.width = `${tabRect.width}px`;
    glider.style.transform = `translateX(${leftOffset}px)`;
  }

  function switchScreen(targetIndex) {
    if (targetIndex < 0 || targetIndex >= screenKeys.length) return;
    if (targetIndex === currentIndex && screens[screenKeys[currentIndex]]?.classList.contains("active")) {
      updateGlider(phoneTabs[targetIndex]);
      return;
    }

    const isForward = targetIndex > currentIndex;
    const oldKey = screenKeys[currentIndex];
    const newKey = screenKeys[targetIndex];
    currentIndex = targetIndex;

    // Update tabs and position glider capsule
    phoneTabs.forEach((t, idx) => {
      const isActive = idx === currentIndex;
      t.classList.toggle("active", isActive);
      t.setAttribute("aria-selected", isActive ? "true" : "false");
      if (isActive) updateGlider(t);
    });

    // Animate screens horizontally
    Object.entries(screens).forEach(([key, screenEl]) => {
      if (!screenEl) return;
      if (key === newKey) {
        screenEl.classList.remove("exit-left", "exit-right");
        screenEl.style.transition = "none";
        screenEl.style.transform = isForward ? "translateX(100%)" : "translateX(-100%)";
        screenEl.style.opacity = "0";

        void screenEl.offsetWidth; // Force reflow

        screenEl.style.transition = "";
        screenEl.classList.add("active");
        screenEl.style.transform = "";
        screenEl.style.opacity = "";
      } else if (key === oldKey) {
        screenEl.classList.remove("active");
        screenEl.classList.remove(isForward ? "exit-right" : "exit-left");
        screenEl.classList.add(isForward ? "exit-left" : "exit-right");
      } else {
        screenEl.classList.remove("active", "exit-left", "exit-right");
        screenEl.style.transform = isForward ? "translateX(-100%)" : "translateX(100%)";
      }
    });
  }

  phoneTabs.forEach((tab, index) => {
    tab.addEventListener("click", () => {
      switchScreen(index);
    });
  });

  // Swipe gesture support on phone mockup
  if (phoneScreenContainer) {
    let touchStartX = 0;
    let touchStartY = 0;

    phoneScreenContainer.addEventListener("touchstart", (e) => {
      touchStartX = e.changedTouches[0].screenX;
      touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });

    phoneScreenContainer.addEventListener("touchend", (e) => {
      const touchEndX = e.changedTouches[0].screenX;
      const touchEndY = e.changedTouches[0].screenY;
      const diffX = touchEndX - touchStartX;
      const diffY = touchEndY - touchStartY;

      if (Math.abs(diffX) > 40 && Math.abs(diffX) > Math.abs(diffY)) {
        if (diffX < 0) {
          if (currentIndex < screenKeys.length - 1) {
            switchScreen(currentIndex + 1);
          }
        } else {
          if (currentIndex > 0) {
            switchScreen(currentIndex - 1);
          }
        }
      }
    }, { passive: true });
  }

  // Initial glider positioning
  const initialActive = document.querySelector(".phone-tab-btn.active");
  if (initialActive) {
    setTimeout(() => updateGlider(initialActive), 60);
  }

  window.addEventListener("resize", () => {
    const curActive = document.querySelector(".phone-tab-btn.active");
    if (curActive) updateGlider(curActive);
  });
}



/* ==========================================================================
   2. Regional Norms Latin America Showcase
   ========================================================================== */

const normsData = {
  mexico: {
    country: "México",
    code: "MX",
    law: "Guía de Identificación Gráfica de Semarnat / UNAM",
    status: "Guía Oficial de Referencia",
    insight: "En México se define una clasificación primaria (Orgánico / Inorgánico) desagregada en 7 contenedores oficiales con iconografía y colores normalizados.",
    bins: [
      { name: "Orgánicos", color: "#2e7d32", example: "Comida, restos de jardín" },
      { name: "Plásticos", color: "#1565c0", example: "PET, envases HDPE" },
      { name: "Papel y Cartón", color: "#e65100", example: "Hojas, cajas desarmadas" },
      { name: "Vidrio", color: "#00897b", example: "Botellas, frascos limpios" },
      { name: "Metales", color: "#0288d1", example: "Latas de aluminio, conservas" },
      { name: "Textiles", color: "#6a1b9a", example: "Ropa usada, telas limpias" },
      { name: "Madera", color: "#795548", example: "Cajas de huacal, tablas" }
    ]
  },
  colombia: {
    country: "Colombia",
    code: "CO",
    law: "Resolución 2184/2019 de MinAmbiente",
    status: "Obligatoria a Nivel Nacional",
    insight: "¡La norma que unifica el reciclaje! Colombia clasifica en 3 bolsas: el plástico, papel, cartón, vidrio y metal van juntos a la Bolsa Blanca de aprovechables.",
    bins: [
      { name: "Bolsa Blanca", color: "#ffffff", border: "#b0bec5", textColor: "#10291b", example: "Aprovechables: Plástico, cartón, vidrio, metales" },
      { name: "Bolsa Verde", color: "#2e7d32", example: "Orgánicos aprovechables: Restos de comida y poda" },
      { name: "Bolsa Negra", color: "#212121", example: "No aprovechables: Papel higiénico, servilletas usadas" }
    ]
  },
  argentina: {
    country: "Argentina",
    code: "AR",
    law: "Decreto 779/2022 (Anexo II) - Ley 25.916",
    status: "Recomendatoria Nacional",
    insight: "En Argentina, el color verde representa los reciclables secos y el amarillo los plásticos. EcoScan traduce el material detectado al código cromático argentino sin reentrenar.",
    bins: [
      { name: "Secos Reciclables", color: "#2e7d32", example: "Materiales mezclados limpios" },
      { name: "Plásticos", color: "#fbc02d", textColor: "#10291b", example: "Envases, botellas plásticas" },
      { name: "Papel y Cartón", color: "#1976d2", example: "Papel de oficina, cartón seco" },
      { name: "Vidrio", color: "#eceff1", border: "#90a4ae", textColor: "#10291b", example: "Frascos y botellas" },
      { name: "Metales", color: "#78909c", example: "Latas y perfiles" },
      { name: "Orgánicos", color: "#6d4c41", example: "Residuos compostables" },
      { name: "Basura común", color: "#263238", example: "Fracción no reciclable" }
    ]
  },
  brasil: {
    country: "Brasil",
    code: "BR",
    law: "Resolução CONAMA 275/2001",
    status: "Obligatoria en Ámbito Público",
    insight: "Brasil implementa un sistema de 10 colores. Es el único país de la región que designa un contenedor oficial específico de color negro para la madera.",
    bins: [
      { name: "Plásticos", color: "#d32f2f", example: "Vermelho (Rojo)" },
      { name: "Papel / Papelão", color: "#1976d2", example: "Azul (Papel y cartón)" },
      { name: "Vidro", color: "#388e3c", example: "Verde (Vidrio)" },
      { name: "Metais", color: "#fbc02d", textColor: "#10291b", example: "Amarelo (Metales)" },
      { name: "Orgânicos", color: "#795548", example: "Marrom (Compostables)" },
      { name: "Madeira", color: "#212121", example: "Preto (Madera)" },
      { name: "Não recicláveis", color: "#757575", example: "Cinza (Basura general)" }
    ]
  },
  chile: {
    country: "Chile",
    code: "CL",
    law: "Norma Chilena NCh 3322:2013",
    status: "Norma Técnica Voluntaria",
    insight: "En Chile el plástico es amarillo, el vidrio verde y el papel azul. EcoScan adapta el contenedor en milisegundos cuando cambias de país en Ajustes.",
    bins: [
      { name: "Plásticos", color: "#fbc02d", textColor: "#10291b", example: "Botellas y empaques PET" },
      { name: "Papel y Cartón", color: "#1976d2", example: "Papeles y revistas" },
      { name: "Vidrio", color: "#2e7d32", example: "Botellas y frascos" },
      { name: "Metales", color: "#90a4ae", textColor: "#10291b", example: "Latas de conserva y bebida" },
      { name: "Cartón para bebidas", color: "#d7ccc8", textColor: "#10291b", example: "Tetra Pak / multicapa" },
      { name: "Orgánicos", color: "#5d4037", example: "Restos vegetales y frutas" }
    ]
  },
  peru: {
    country: "Perú",
    code: "PE",
    law: "Norma Técnica Peruana NTP 900.058:2019",
    status: "Norma Técnica de Referencia",
    insight: "En Perú el contenedor blanco corresponde a los plásticos y el amarillo a metales. Una misma botella detectada muestra el contenedor blanco en Perú y azul en México.",
    bins: [
      { name: "Plásticos", color: "#ffffff", border: "#cfd8dc", textColor: "#10291b", example: "Contenedor Blanco" },
      { name: "Papel y Cartón", color: "#1976d2", example: "Contenedor Azul" },
      { name: "Metales", color: "#fbc02d", textColor: "#10291b", example: "Contenedor Amarillo" },
      { name: "Vidrio", color: "#2e7d32", example: "Contenedor Verde" },
      { name: "Orgánicos", color: "#6d4c41", example: "Contenedor Marrón" },
      { name: "No aprovechables", color: "#212121", example: "Contenedor Negro" }
    ]
  },
  uruguay: {
    country: "Uruguay",
    code: "UY",
    law: "Norma UNIT 1239:2017",
    status: "Norma Técnica Voluntaria",
    insight: "Uruguay es el único de los siete países que publica valores cromáticos normalizados y considera explícitamente el contenedor naranja para residuos textiles.",
    bins: [
      { name: "Reciclables", color: "#2e7d32", example: "Mezcla de aprovechables" },
      { name: "Plásticos", color: "#fbc02d", textColor: "#10291b", example: "Envases plásticos" },
      { name: "Papel", color: "#1976d2", example: "Papeles y cartones" },
      { name: "Vidrio", color: "#ffffff", border: "#b0bec5", textColor: "#10291b", example: "Envases de vidrio" },
      { name: "Metales", color: "#212121", example: "Residuos metálicos" },
      { name: "Textiles", color: "#f57c00", example: "Telas y prendas usadas" }
    ]
  }
};

function initRegionalNorms() {
  const countryButtons = document.querySelectorAll(".country-btn");
  const countryTitle = document.getElementById("norms-country-title");
  const lawRef = document.getElementById("norms-law-reference");
  const statusBadge = document.getElementById("norms-status-badge");
  const insightText = document.getElementById("norms-insight-text");
  const binsGrid = document.getElementById("bins-visual-grid");

  function getWasteCategoryIcon(bin) {
    const text = (bin.name + " " + (bin.example || "")).toLowerCase();
    
    // Plásticos: botella / envase de plástico
    if (text.includes("plástic") || text.includes("pet") || text.includes("hdpe") || text.includes("vermelho")) {
      return `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M14 2h-4c-.55 0-1 .45-1 1v2H7c-1.1 0-2 .9-2 2v13c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2h-2V3c0-.55-.45-1-1-1zm-3 2h2v1h-2V4zm6 16H7V7h10v13z"/></svg>`;
    }
    
    // Papel y Cartón: hoja de papel / pliegos
    if (text.includes("papel") || text.includes("cartón") || text.includes("papelão") || text.includes("azul")) {
      return `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>`;
    }
    
    // Vidrio: botella / frasco de vidrio
    if (text.includes("vidr") || text.includes("frasco")) {
      return `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2c-.55 0-1 .45-1 1v1.18C8.61 4.7 7 6.64 7 9v11c0 1.1.9 2 2 2h6c1.1 0 2-.9 2-2V9c0-2.36-1.61-4.3-4-4.82V3c0-.55-.45-1-1-1zm3 8v10H9V10c0-1.66 1.34-3 3-3s3 1.34 3 3z"/></svg>`;
    }
    
    // Metales: lata de aluminio / conserva
    if (text.includes("metal") || text.includes("lata") || text.includes("aluminio") || (text.includes("amarelo") && !text.includes("plástic"))) {
      return `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17 3H7c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 3c0 .55-.45 1-1 1H8c-.55 0-1-.45-1-1s.45-1 1-1h8c.55 0 1 .45 1 1zm0 13H7V8h10v11zm-5-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>`;
    }
    
    // Orgánicos: hoja botánica / restos orgánicos
    if (text.includes("orgánic") || text.includes("comida") || text.includes("compost") || text.includes("marrom") || text.includes("poda") || text.includes("vegetal") || text.includes("bolsa verde")) {
      return `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 0 0 8 20C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z"/></svg>`;
    }
    
    // Textiles: ropa / tela
    if (text.includes("textil") || text.includes("ropa") || text.includes("tela") || text.includes("prenda")) {
      return `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M21.6 5.4l-4.8-2.7c-.4-.2-.8-.2-1.2 0L12 4.6 8.4 2.7c-.4-.2-.8-.2-1.2 0L2.4 5.4c-.5.3-.6.9-.3 1.4l2.4 4.1c.3.5.9.6 1.4.3L7 10.5V20c0 .6.4 1 1 1h8c.6 0 1-.4 1-1v-9.5l1.1.7c.5.3 1.1.2 1.4-.3l2.4-4.1c.3-.5.2-1.1-.3-1.4z"/></svg>`;
    }
    
    // Madera: huacal / tablas de madera
    if (text.includes("mader") || text.includes("huacal") || text.includes("preto") || text.includes("tabla")) {
      return `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 4h-5V5h5v2zm-7-2v2H5V5h6zm-6 4h14v2H5V9zm0 4h6v2H5v-2zm8 0h6v2h-6v-2zm-8 4h14v2H5v-2z"/></svg>`;
    }
    
    // Cartón para bebidas / Tetra Pak
    if (text.includes("tetra") || text.includes("bebida") || text.includes("multicapa")) {
      return `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6 3h12l2 4v14c0 1.1-.9 2-2 2H6c-1.1 0-2-.9-2-2V7l2-4zm1 4h10l-1-2H8L7 7zm1 14h8V9H8v12z"/></svg>`;
    }
    
    // Secos Reciclables / Bolsa Blanca
    if (text.includes("seco") || text.includes("aprovechable") || text.includes("reciclable") || text.includes("blanca")) {
      return `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>`;
    }
    
    // Basura común / no aprovechable / contenedor general
    return `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M19 4h-3.5l-1-1h-5l-1 1H5v2h14M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6v12z"/></svg>`;
  }

  function renderCountry(countryKey) {
    const data = normsData[countryKey];
    if (!data) return;

    if (countryTitle) {
      countryTitle.innerHTML = `<span class="country-code-badge title-badge">${data.code}</span> ${data.country}`;
    }
    if (lawRef) lawRef.textContent = data.law;
    if (statusBadge) statusBadge.textContent = data.status;
    if (insightText) insightText.textContent = data.insight;

    if (binsGrid) {
      binsGrid.innerHTML = data.bins.map(bin => {
        const borderStyle = bin.border ? `border: 2px solid ${bin.border};` : "";
        const textColor = bin.textColor ? `color: ${bin.textColor};` : "";
        return `
          <div class="bin-item-card">
            <div class="bin-icon-circle" style="background-color: ${bin.color}; ${borderStyle} ${textColor}">
              ${getWasteCategoryIcon(bin)}
            </div>
            <span class="bin-name">${bin.name}</span>
            <span class="bin-waste-example">${bin.example}</span>
          </div>
        `;
      }).join("");
    }
  }

  const tabpanel = document.getElementById("norms-tabpanel");

  countryButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      countryButtons.forEach(b => {
        b.classList.remove("active");
        b.setAttribute("aria-selected", "false");
      });
      btn.classList.add("active");
      btn.setAttribute("aria-selected", "true");
      if (tabpanel) {
        tabpanel.setAttribute("aria-labelledby", btn.id);
      }
      renderCountry(btn.dataset.country);
    });
  });

  // Render initial country (Argentina - alphabetical)
  renderCountry("argentina");
}

/* ==========================================================================
   3. Installation Sideloading Accordion (Spring Physics)
   ========================================================================== */

function initAccordion() {
  const items = document.querySelectorAll(".accordion-item");

  items.forEach(item => {
    const header = item.querySelector(".accordion-header");
    if (!header) return;

    header.addEventListener("click", () => {
      const isActive = item.classList.contains("active");

      // Optional: close other items for clean single expansion
      items.forEach(i => i.classList.remove("active"));

      if (!isActive) {
        item.classList.add("active");
      }
    });
  });
}

/* ==========================================================================
   4. Copy Hash to Clipboard
   ========================================================================== */

function initCopyHash() {
  const copyBtn = document.getElementById("btn-copy-hash");
  const hashCode = document.getElementById("hash-code-text");

  if (!copyBtn || !hashCode) return;

  copyBtn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(hashCode.textContent.trim());
      const label = copyBtn.querySelector(".btn-copy-text");
      const originalText = label ? label.textContent : copyBtn.textContent;
      if (label) {
        label.textContent = "¡Copiado!";
      } else {
        copyBtn.textContent = "¡Copiado!";
      }
      copyBtn.classList.add("copied");
      setTimeout(() => {
        if (label) {
          label.textContent = originalText;
        } else {
          copyBtn.textContent = originalText;
        }
        copyBtn.classList.remove("copied");
      }, 2000);
    } catch (err) {
      console.warn("Clipboard access failed:", err);
    }
  });
}

/* ==========================================================================
   5. Download Trigger & Feedback Toast
   ========================================================================== */

function initDownloadFeedback() {
  const downloadBtns = document.querySelectorAll(".trigger-download");
  const toast = document.getElementById("download-toast");

  downloadBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
      // Show feedback toast
      if (toast) {
        toast.classList.add("show");
        setTimeout(() => {
          toast.classList.remove("show");
        }, 5000);
      }
    });
  });
}

/* ==========================================================================
   6. Mobile Navigation Drawer
   ========================================================================== */

function initMobileNav() {
  const toggleBtn = document.getElementById("nav-toggle-btn");
  const mobileMenu = document.getElementById("nav-menu");

  if (!toggleBtn || !mobileMenu) return;

  toggleBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("mobile-open");
    toggleBtn.setAttribute("aria-expanded", mobileMenu.classList.contains("mobile-open"));
  });

  const links = mobileMenu.querySelectorAll(".nav-link");
  links.forEach(link => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("mobile-open");
    });
  });
}

/* ==========================================================================
   7. Smooth Anchor Scroll
   ========================================================================== */

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || !targetId) return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const headerOffset = 90;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

/* ==========================================================================
   8. Dynamic Latest Release Auto-Sync (GitHub Releases)
   ========================================================================== */

async function initDynamicReleaseInfo() {
  try {
    let releaseData = null;

    // 1. Try our edge-cached API route first
    try {
      const res = await fetch("/api/release");
      if (res.ok) {
        releaseData = await res.json();
      }
    } catch (e) {
      // ignore, proceed to fallback
    }

    // 2. Direct GitHub API fallback if edge route is unavailable
    if (!releaseData || !releaseData.version) {
      try {
        const ghRes = await fetch("https://api.github.com/repos/samd27/EcoScan-Releases/releases/latest", {
          headers: { "Accept": "application/vnd.github.v3+json" }
        });
        if (ghRes.ok) {
          const ghJson = await ghRes.json();
          const tag = ghJson.tag_name || "v18.11.1";
          const apkAsset = Array.isArray(ghJson.assets)
            ? ghJson.assets.find(a => a.name && a.name.endsWith(".apk")) || ghJson.assets[0]
            : null;

          releaseData = {
            version: tag.startsWith("v") ? tag : `v${tag}`,
            versionNumber: tag.replace(/^v/, ""),
            filename: apkAsset ? apkAsset.name : `EcoScan_${tag}.apk`,
            downloadUrl: apkAsset ? apkAsset.browser_download_url : `/downloads/EcoScan_${tag}.apk`,
            size: apkAsset && apkAsset.size ? (apkAsset.size / (1024 * 1024)).toFixed(1) + " MB" : "91.4 MB",
            digest: apkAsset && apkAsset.digest ? apkAsset.digest.replace(/^sha256:/i, "") : null
          };
        }
      } catch (err) {
        // network error
      }
    }

    if (!releaseData) return;

    // 3. Update all elements displaying version tag (e.g. 'v18.9.0')
    document.querySelectorAll("[data-release-version]").forEach(el => {
      el.textContent = releaseData.version;
    });

    // 4. Update elements displaying version number without 'v' (e.g. '18.9.0')
    document.querySelectorAll("[data-release-version-number]").forEach(el => {
      el.textContent = releaseData.versionNumber;
    });

    // 5. Update elements displaying size (e.g. '91.4 MB')
    if (releaseData.size) {
      document.querySelectorAll("[data-release-size]").forEach(el => {
        el.textContent = releaseData.size;
      });
    }

    // 5.1 Update hash code if dynamically discovered
    if (releaseData.digest) {
      const hashEl = document.getElementById("hash-code-text");
      if (hashEl) {
        hashEl.textContent = releaseData.digest;
      }
    }

    // 6. Update download buttons with clean filename attribute and direct handler
    const downloadBtns = document.querySelectorAll(".trigger-download");
    downloadBtns.forEach(btn => {
      if (releaseData.filename) {
        btn.setAttribute("download", releaseData.filename);
      }
      btn.setAttribute("href", "/api/download");
    });
  } catch (err) {
    console.warn("Could not sync latest release info:", err);
  }
}

