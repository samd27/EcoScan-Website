---
name: EcoScan Design System
description: Sistema visual inspirado en Android Material You y Backdrop Liquid Glass para la clasificación de residuos con Edge AI
colors:
  forest-950: "#0a1f14"
  forest-900: "#102a1c"
  forest-800: "#16422d"
  emerald-500: "#2e7d32"
  emerald-400: "#388e3c"
  emerald-300: "#4caf50"
  emerald-200: "#81c784"
  emerald-100: "#c8e6c9"
  emerald-50: "#e8f5e9"
  emerald-subtle: "#d4ebd9"
  mint-light: "#f4fbf6"
  mint-surface: "#edf7f0"
  cat-organico: "#2e7d32"
  cat-plastico: "#1565c0"
  cat-papel: "#e65100"
  cat-vidrio: "#00897b"
  cat-metal: "#0288d1"
  cat-inorganico: "#546e7a"
  text-primary: "#10291b"
  text-secondary: "#355342"
  text-muted: "#577864"
  norm-red: "#d32f2f"
  norm-blue: "#1976d2"
  norm-yellow: "#fbc02d"
  norm-brown: "#795548"
  norm-black: "#212121"
  norm-gray: "#757575"
  norm-white: "#ffffff"
  norm-slate: "#78909c"
  norm-orange: "#f57c00"
  norm-beige: "#d7ccc8"
  norm-darkbrown: "#5d4037"
  norm-border: "#cfd8dc"
  norm-border-light: "#b0bec5"
  norm-purple: "#6a1b9a"
  norm-lightgray: "#eceff1"
  norm-gray2: "#90a4ae"
  norm-brown2: "#6d4c41"
  norm-darkslate: "#263238"
typography:
  display:
    fontFamily: "Plus Jakarta Sans, Inter, sans-serif"
    fontSize: "clamp(1.85rem, 5.2vw, 3.5rem)"
    fontWeight: 800
    lineHeight: 1.12
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Plus Jakarta Sans, Inter, sans-serif"
    fontSize: "clamp(1.5rem, 3.8vw, 2.5rem)"
    fontWeight: 800
    lineHeight: 1.2
    letterSpacing: "-0.03em"
  title:
    fontFamily: "Plus Jakarta Sans, Inter, sans-serif"
    fontSize: "1.35rem"
    fontWeight: 800
    lineHeight: 1.25
    letterSpacing: "-0.02em"
  title-md:
    fontFamily: "Plus Jakarta Sans, Inter, sans-serif"
    fontSize: "1.25rem"
  title-sub:
    fontFamily: "Plus Jakarta Sans, Inter, sans-serif"
    fontSize: "1.2rem"
  title-sm:
    fontFamily: "Plus Jakarta Sans, Inter, sans-serif"
    fontSize: "1.125rem"
  body-xl:
    fontFamily: "Plus Jakarta Sans, Inter, sans-serif"
    fontSize: "1.1875rem"
  body-lg:
    fontFamily: "Plus Jakarta Sans, Inter, sans-serif"
    fontSize: "1.05rem"
  body:
    fontFamily: "Plus Jakarta Sans, Inter, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  body-md:
    fontFamily: "Plus Jakarta Sans, Inter, sans-serif"
    fontSize: "0.9375rem"
  body-sm:
    fontFamily: "Plus Jakarta Sans, Inter, sans-serif"
    fontSize: "0.875rem"
  label-md:
    fontFamily: "Plus Jakarta Sans, Inter, sans-serif"
    fontSize: "0.8125rem"
  label-sm:
    fontFamily: "Plus Jakarta Sans, Inter, sans-serif"
    fontSize: "0.75rem"
  label-xs:
    fontFamily: "Plus Jakarta Sans, Inter, sans-serif"
    fontSize: "0.71875rem"
  mono:
    fontFamily: "JetBrains Mono, Fira Code, monospace"
    fontSize: "0.75rem"
    fontWeight: 500
rounded:
  sm: "6px"
  md: "12px"
  lg: "18px"
  xl: "26px"
  phone-screen: "32px"
  phone-frame: "40px"
  full: "9999px"
spacing:
  xs: "0.35rem"
  sm: "0.75rem"
  md: "1.25rem"
  lg: "2rem"
  xl: "3.5rem"
components:
  button-primary:
    backgroundColor: "{colors.forest-800}"
    textColor: "#ffffff"
    rounded: "{rounded.lg}"
    padding: "0.9rem 1.6rem"
  button-secondary:
    backgroundColor: "rgba(255, 255, 255, 0.78)"
    textColor: "{colors.forest-800}"
    rounded: "{rounded.lg}"
    padding: "0.85rem 1.4rem"
---

# EcoScan Design System

## Overview

EcoScan Rebirth es un ecosistema visual que une el rigor científico del procesamiento local de imágenes (Edge AI con YOLOv8) con la sofisticación estética de las interfaces Android modernas (Material You + Backdrop Liquid Glass). Su identidad visual se caracteriza por superficies translúcidas con desenfoque de fondo (`backdrop-filter: blur(...)`), paletas cromáticas basadas en códigos oficiales de clasificación de residuos (SEMARNAT y 7 normas de América Latina), y una tipografía humanista con ritmo móvil.

## Colors

- **Verde Bosque Profundo (`#102a1c`, `#16422d`)**: Aporta solidez institucional, seriedad científica y alto contraste para textos y elementos de acción principal.
- **Menta Luminosa (`#f4fbf6`, `#edf7f0`)**: Fondo ambiental que transmite frescura, limpieza y sostenibilidad sin recurrir a blancos crudos deslumbrantes.
- **Acentos Normativos**:
  - *Orgánico*: Verde Esmeralda (`#2e7d32`)
  - *Plásticos*: Azul Cobalto (`#1565c0`)
  - *Papel y Cartón*: Ámbar Cálido (`#e65100`)
  - *Vidrio*: Verde Azulado / Teal (`#00897b`)
  - *Metales*: Azul Cielo (`#0288d1`)
  - *Inorgánico General*: Gris Pizarra (`#546e7a`)

## Typography

- **Familia tipográfica principal**: *Plus Jakarta Sans* con fallback a *Inter* y sans-serif de sistema.
- **Familia monoespaciada**: *JetBrains Mono* para códigos hash criptográficos SHA-256 y especificaciones técnicas.
- **Escala de Jerarquía**:
  - H1 Display: `clamp(2.4rem, 4.4vw, 3.75rem)` / 800 weight / tracking `-0.04em`.
  - H2 Headline: `clamp(2rem, 3.5vw, 2.75rem)` / 800 weight / tracking `-0.03em`.
  - H3 Title: `1.35rem` / 800 weight / tracking `-0.02em`.
  - Body: `1rem` - `1.05rem` / 400 weight / line-height `1.6`.
  - Microcopy / Badges: `0.75rem` (12px) - mínimo para legibilidad móvil y cumplimiento WCAG.

## Layout

- Enfoque **Mobile-First**: Pensado para el dispositivo en mano frente al contenedor.
- Contenedor máximo: `1200px` con paddings laterales fluidos.
- Rejilla adaptativa:
  - Pantallas móviles (< 768px): Columna única, botones de ancho completo, tabs táctiles cómodos.
  - Tablets (768px - 992px): 2 columnas en features y trust grid.
  - Escritorio (> 992px): Hero en proporción áurea (1.15fr a 0.85fr) con mockup interactivo flotante.

## Elevation & Depth

- **Cristal Líquido (Liquid Glass)**: Capa translúcida blanca `rgba(255, 255, 255, 0.78)` combinada con desenfoque gaussiano de 16px a 32px y borde sutil de 1px `rgba(255, 255, 255, 0.65)`.
- **Sombras**: Elevaciones suaves con desplazamiento vertical (Y-offset) y difusión neutra `rgba(0, 0, 0, 0.04)` a `rgba(0, 0, 0, 0.14)`. Se prohíben halos cromáticos sin desplazamiento.

## Shapes

- Esquinas suavemente redondeadas inspiradas en squircles de Material 3 (`var(--radius-lg): 18px`, `var(--radius-xl): 26px`, `var(--radius-full): 9999px` para píldoras).
- El smartphone virtual utiliza una silueta ergonómica con esquinas redondeadas de 44px y cámara frontal centrada.

## Components

- **Navbar Flotante**: Píldora translúcida fijada en el tope superior con logotipo, enlaces y botón de descarga directa.
- **Mockup Interactivo**: Marco de teléfono con selector de 3 estados (Escáner en vivo, Centro de Información, Ajustes) y selector dinámico de residuos con bounding box en tiempo real.
- **Selector Multinorma**: Botones en píldora con bandera que recalculan en tiempo real los contenedores y leyes ambientales de 7 países latinoamericanos.
- **Acordeón con Resortes**: Expansión suave de los pasos de instalación sideloading fuera de Google Play.
- **Ficha Criptográfica**: Bloque de verificación de integridad con botón de copiado de hash SHA-256.

## Do's and Don'ts

### Do's
- Utilizar iconos SVG en flujo integrados en los encabezados.
- Preservar los contrastes mínimos de accesibilidad (texto principal sobre fondos menta >= 4.5:1).
- Mantener las microinteracciones suaves mediante curvas de desaceleración exponencial (`cubic-bezier(0.16, 1, 0.3, 1)`).
- Documentar fielmente datos del proyecto académico (BUAP, FEPRO 2026, Semarnat).

### Don'ts
- No utilizar texto con gradiente.
- No utilizar cajas o baldosas de iconos cuadradas repetitivas sobre títulos.
- No usar tamaños de texto funcionales inferiores a 11px.
- No utilizar sombras con halos de colores estridentes sobre fondos oscuros.
