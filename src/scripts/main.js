/**
 * EcoScan Official Landing Page Logic
 * Interactive mobile mockup, regional norms switcher, and install guide.
 */

document.addEventListener("DOMContentLoaded", () => {
  initPhoneMockup();
  initPillarsSlider();
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
  const screens = {
    scan: document.getElementById("screen-scan"),
    info: document.getElementById("screen-info"),
    settings: document.getElementById("screen-settings")
  };

  phoneTabs.forEach(tab => {
    tab.addEventListener("click", () => {
      phoneTabs.forEach(t => {
        t.classList.remove("active");
        t.setAttribute("aria-selected", "false");
      });
      tab.classList.add("active");
      tab.setAttribute("aria-selected", "true");

      const target = tab.dataset.screen;
      Object.entries(screens).forEach(([key, screenEl]) => {
        if (screenEl) {
          if (key === target) {
            screenEl.classList.add("active");
          } else {
            screenEl.classList.remove("active");
          }
        }
      });
    });
  });
}

/* ==========================================================================
   1.1. Interactive Pillars Slider / Keynote Presentation
   ========================================================================== */

function initPillarsSlider() {
  const tabs = document.querySelectorAll(".slide-tab-btn");
  const dots = document.querySelectorAll(".slide-dot");
  const slides = document.querySelectorAll(".pillar-slide");
  const prevBtn = document.getElementById("btn-slide-prev");
  const nextBtn = document.getElementById("btn-slide-next");
  const counterText = document.getElementById("slide-counter-text");

  let currentSlide = 0;
  const totalSlides = slides.length;
  if (totalSlides === 0) return;

  function showSlide(index) {
    if (index < 0) index = totalSlides - 1;
    if (index >= totalSlides) index = 0;
    currentSlide = index;

    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === currentSlide);
    });

    tabs.forEach((tab, i) => {
      const isActive = i === currentSlide;
      tab.classList.toggle("active", isActive);
      tab.setAttribute("aria-selected", isActive ? "true" : "false");
    });

    dots.forEach((dot, i) => {
      const isActive = i === currentSlide;
      dot.classList.toggle("active", isActive);
      dot.setAttribute("aria-selected", isActive ? "true" : "false");
    });

    if (counterText) {
      counterText.textContent = `${currentSlide + 1} / ${totalSlides}`;
    }
  }

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      const idx = parseInt(tab.dataset.slide, 10);
      showSlide(idx);
    });
  });

  dots.forEach(dot => {
    dot.addEventListener("click", () => {
      const idx = parseInt(dot.dataset.slide, 10);
      showSlide(idx);
    });
  });

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      showSlide(currentSlide - 1);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      showSlide(currentSlide + 1);
    });
  }
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
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 4h-3.5l-1-1h-5l-1 1H5v2h14M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6v12z"/>
              </svg>
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
      const originalText = copyBtn.textContent;
      copyBtn.textContent = "¡Copiado!";
      copyBtn.style.background = "#81c784";
      setTimeout(() => {
        copyBtn.textContent = originalText;
        copyBtn.style.background = "";
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
