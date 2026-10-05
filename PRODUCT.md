# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

delegated: HTML5 semántico, Vanilla CSS de alto rendimiento con tokens y efectos de cristal esmerilado (Backdrop Glassmorphism), y JavaScript moderno nativo con Vite para desarrollo rápido y optimización.

## Users

1. **Ciudadanos y personas en el hogar**: Personas comunes en América Latina (comenzando por México y expandible a 7 países) que desean separar sus residuos correctamente y experimentan dudas en el momento exacto frente al contenedor o bote de basura.
2. **Estudiantes y docentes**: Quienes utilizan la app como herramienta didáctica de educación ambiental con objetos y residuos reales.
3. **Usuarios en zonas periurbanas o rurales**: Personas sin conexión a datos móviles continua o con saldo limitado, para quienes las soluciones en la nube fallan por completo.

## Product Purpose

EcoScan Rebirth es una aplicación móvil nativa de Android que identifica en tiempo real el material de los residuos sólidos urbanos mediante visión artificial (YOLOv8) ejecutada íntegramente en el dispositivo (Edge AI). Su propósito es erradicar la duda en la separación en origen sin depender de Internet, servidores externos ni suscripciones, protegiendo la privacidad del hogar y evitando que los lotes reciclables se contaminen.

## Positioning

"La posibilidad de mejorar el mundo al alcance de tu mano".
A diferencia de alternativas que requieren enviar fotos a un servidor externo (generando costos operativos, latencia y riesgos de privacidad), EcoScan ejecuta la inferencia localmente (0 servidores, 0 datos transmitidos), funciona 100% offline, se adapta a teléfonos Android de gama de entrada (el 86.5% del mercado en Latinoamérica) y mapea dinámicamente 9 clases de materiales a 7 normas nacionales de clasificación oficiales (México Semarnat, Colombia, Argentina, Brasil, Chile, Perú, Uruguay).

## Operating Context

- El usuario sostiene un objeto o residuo con una mano frente a los contenedores de basura en su cocina, aula, oficina o vía pública.
- Con la otra mano apunta la cámara de su teléfono Android.
- No hay garantía de señal WiFi ni datos móviles; la respuesta debe ser inmediata, clara e inequívoca (fracción general y contenedor exacto con código de color normativo).

## Capabilities and Constraints

- **Inferencia local en el dispositivo (Edge AI)**: Modelo YOLOv8n (~12.3 MB) embebido con formato LiteRT float32, evaluado con mAP@0.5 de 0.782 y mAP@0.5:0.95 de 0.589 sobre un dataset curado de 43,124 imágenes.
- **Multinorma Latinoamericana**: Soporta 7 normas oficiales (Semarnat México con 7 fracciones, Colombia Resolución 2184/2019 con 3 bolsas, Argentina Decreto 779/2022, Brasil CONAMA 275/2001, Chile NCh 3322:2013, Perú NTP 900.058:2019, Uruguay UNIT 1239:2017).
- **Compatibilidad**: Android 8.0 Oreo (API 26) en adelante, optimizado para procesadores de gama de entrada sin GPU dedicada (CPU multihilo).
- **Distribución**: Distribución autónoma vía archivo APK firmado y autoactualizaciones OTA mediante GitHub Releases.
- **Versión actual**: v18.4.1 (build 25). Paquete: `com.teamecoscan.ecoscanrebirth`.

## Brand Commitments

- **Nombre**: EcoScan / EcoScan Rebirth.
- **Lema**: "La posibilidad de mejorar el mundo al alcance de tu mano" / "Clasificación inteligente de residuos, sin Internet".
- **Identidad cromática y estética**: Inspirada en el ecosistema Android Material You y el componente nativo de cristal líquido (Backdrop Liquid Glass de Kyant0) visto en la aplicación real:
  - Verdes orgánicos profundos: `#133826`, `#1b4332`, `#2e7d32`, `#388e3c`
  - Menta luminosa y fondos esmerilados: `#e8f5e9`, `#edf7f0`, `#f4fbf6`, `rgba(255, 255, 255, 0.75)` con desenfoque de fondo (`backdrop-filter: blur(16px)`)
  - Colores de taxonomía oficial: Orgánico (Verde esmeralda `#2e7d32`), Papel/Cartón (Ámbar cálido `#f59e0b`), Metal (Azul cielo `#0288d1`), Vidrio (Verde azulado / Teal `#00897b`), Plástico (Azul cobalto `#1565c0`), Inorgánico/Otros (Gris pizarra `#546e7a`).
- **Tono**: Riguroso, científico, accesible, ecológico, empático y orientado a la acción inmediata.

## Evidence on Hand

- Artículo científico: "EcoScan: detección de residuos en tiempo real con Edge AI en dispositivos móviles y su adaptación a siete normas de clasificación de América Latina".
- Presentación de defensa FEPRO 2026 (Benemérita Universidad Autónoma de Puebla - Facultad de Ciencias de la Computación).
- Dossier técnico completo de defensa (Agosto 2026, versión 18.4.1, build 25).
- Capturas reales de la interfaz de la aplicación en ejecución: pantalla de Ajustes con modo de cristal líquido, modal de Centro de Información con los 6 contenedores principales en tarjetas de vidrio translúcido, e interfaz de la cámara en vivo ("IA Scanner") detectando residuos con cajas delimitadoras.

## Product Principles

1. **Privacidad y autonomía primero**: Ningún dato ni imagen abandona jamás el dispositivo del usuario.
2. **Cero barreras de acceso**: Funciona sin internet, sin crear cuenta, sin publicidad y en teléfonos accesibles.
3. **Certeza normativa, no conjeturas**: Respeta los códigos de color y directrices oficiales de cada país de América Latina.
4. **Claridad sobre tecnicismo**: El usuario no necesita saber qué es un tensor; necesita saber en qué bote depositar el envase en 2 segundos.
