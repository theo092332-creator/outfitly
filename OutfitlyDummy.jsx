/**
 * OUTFITLY – OutfitlyDummy.jsx  v5
 * Kombinierte Komponente: SVG-Dummy + alle Kleidungs-Silhouetten
 *
 * Props:
 *   outfit: {
 *     kopf:        { typ, farbe } | null
 *     oberteil:    { typ, farbe } | Array<{ typ, farbe }>
 *                  (rückwärtskompatibel: einzelnes Objekt wird automatisch gewrapped)
 *     jacke:       { typ, farbe, offen?: boolean } | null
 *     hose:        { typ, farbe } | null
 *     schuhe:      { typ, farbe } | null
 *     accessoires: Array<{ typ, farbe, seite?: 'links'|'rechts' }>
 *                  (rückwärtskompatibel: einzelnes Objekt wird automatisch gewrapped)
 *                  seite: relevant für 'tasche' (default: 'rechts')
 *   }
 *   activeZone:   string | null
 *   onZoneClick:  (zoneName: string) => void
 */

export default function OutfitlyDummy({ outfit = {}, activeZone = null, onZoneClick = () => {} }) {

  // ── Hilfsfunktionen ──────────────────────────────────────────────────────
  const darken = (hex, amount = 20) => {
    if (!hex || !hex.startsWith("#")) return "#888";
    const clamp = (v) => Math.min(255, Math.max(0, v));
    const r = clamp(parseInt(hex.slice(1,3),16) - amount);
    const g = clamp(parseInt(hex.slice(3,5),16) - amount);
    const b = clamp(parseInt(hex.slice(5,7),16) - amount);
    return `#${r.toString(16).padStart(2,"0")}${g.toString(16).padStart(2,"0")}${b.toString(16).padStart(2,"0")}`;
  };

  // Accessoires: Array-Format + rückwärtskompatibel
  const accList = Array.isArray(outfit.accessoires)
    ? outfit.accessoires
    : outfit.accessoires ? [outfit.accessoires] : [];

  const hasAcc = (keyword) => accList.some(a => a.typ?.toLowerCase().includes(keyword));
  const getAcc = (keyword) => accList.find(a => a.typ?.toLowerCase().includes(keyword));

  // Oberteile: Array-Format + rückwärtskompatibel
  const oberteilList = Array.isArray(outfit.oberteil)
    ? outfit.oberteil
    : outfit.oberteil ? [outfit.oberteil] : [];

  const erstesOberteil = oberteilList[0] || null;
  const oberteilTyp    = erstesOberteil?.typ?.toLowerCase() || "";
  const isLongSleeve   = ["pullover","hoodie","sweatshirt"].some(t => oberteilTyp.includes(t));

  // Hemd-Kragen: über Jacke/Pullover sichtbar
  const hemdItem = oberteilList.find(o => o.typ?.toLowerCase().includes("hemd"));

  // Zone-Hover-Stil
  const zoneStyle = (zoneName) => ({
    fill: activeZone === zoneName
      ? "rgba(201,168,76,0.32)"
      : (zoneName === "oberteil" ? oberteilList.length > 0 : !!outfit[zoneName])
        ? "rgba(201,168,76,0.08)"
        : "transparent",
    cursor: "pointer",
    transition: "fill 0.2s",
  });

  const zoneHoverProps = (zoneName) => ({
    onClick: () => onZoneClick(zoneName),
    onMouseEnter: (e) => {
      if (activeZone !== zoneName) e.currentTarget.style.fill = "rgba(201,168,76,0.22)";
    },
    onMouseLeave: (e) => {
      const filled = zoneName === "oberteil" ? oberteilList.length > 0 : !!outfit[zoneName];
      if (activeZone !== zoneName)
        e.currentTarget.style.fill = filled ? "rgba(201,168,76,0.08)" : "transparent";
    },
    style: zoneStyle(zoneName),
  });

  const accHitStyle = () => ({
    fill: activeZone === "accessoires" ? "rgba(201,168,76,0.32)" : "transparent",
    cursor: "pointer",
    transition: "fill 0.2s",
  });

  const isJackeOffen = outfit.jacke?.offen === true;

  // Tasche: Seite lesen
  const tascheAcc   = getAcc("tasche");
  const tascheLinks = tascheAcc?.seite === "links";

  return (
    <div style={{ position: "relative", width: 160, height: 540, margin: "0 auto" }}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 540" width="160" height="540"
        style={{ position: "absolute", top: 0, left: 0 }}>

        {/* ════════════════════════════════════════════ */}
        {/* LAYER 1 – KÖRPER (statisch)                 */}
        {/* ════════════════════════════════════════════ */}
        <defs>
          <style>{`
            .body   { fill: #E2E2E2; stroke: #ABABAB; stroke-width: 1.1; stroke-linejoin: round; }
            .detail { fill: none; stroke: #C8C8C8; stroke-width: 0.75; stroke-linecap: round; }
          `}</style>
        </defs>
        <ellipse cx="80" cy="34" rx="19" ry="26" className="body"/>
        <path d="M 73 58 L 72 70 C 72 73 75 75 80 75 C 85 75 88 73 88 70 L 87 58 Z" className="body"/>
        <path d="M 73 72 C 62 72 46 75 39 82 C 34 87 33 95 33 104 L 32 145 C 31 158 32 168 34 176
                 L 37 198 C 38 208 39 216 40 222 L 42 240 C 45 248 50 253 57 255 L 72 257 L 88 258
                 L 92 258 L 108 257 L 123 255 C 130 253 135 248 118 240 L 120 222 C 121 216 122 208
                 123 198 L 126 176 C 128 168 129 158 128 145 L 127 104 C 127 95 126 87 121 82
                 C 114 75 98 72 87 72 Z" className="body"/>
        <path d="M 73 81 C 77 83 80 84 83 81" className="detail"/>
        <path d="M 73 81 C 63 81 52 85 45 93" className="detail"/>
        <path d="M 87 81 C 97 81 108 85 115 93" className="detail"/>
        <line x1="80" y1="152" x2="80" y2="248" className="detail"/>
        <circle cx="80" cy="220" r="2" fill="none" stroke="#C0C0C0" strokeWidth="0.9"/>
        <path d="M 57 255 L 103 255 L 106 268 C 107 276 104 282 98 285 L 80 287 L 62 285
                 C 56 282 53 276 54 268 Z" className="body"/>
        {/* Linker Arm */}
        <path d="M 38 88 C 30 93 25 104 24 116 L 22 152 C 21 164 21 174 23 182 L 26 206
                 C 27 214 27 220 26 228 L 23 252 C 22 260 22 267 24 274 L 27 298 C 29 308 32 316
                 36 320 C 39 323 42 322 44 318 L 46 296 C 47 286 47 278 46 270 L 44 252
                 C 43 244 44 236 46 228 L 49 208 C 51 198 52 188 52 178 L 52 152
                 C 52 138 50 124 46 112 Z" className="body"/>
        <ellipse cx="34" cy="328" rx="8" ry="11" className="body"/>
        <path d="M 21 254 C 19 261 20 268 24 273" className="detail"/>
        {/* Rechter Arm */}
        <path d="M 122 88 C 130 93 135 104 136 116 L 138 152 C 139 164 139 174 137 182 L 134 206
                 C 133 214 133 220 134 228 L 137 252 C 138 260 138 267 136 274 L 133 298
                 C 131 308 128 316 124 320 C 121 323 118 322 116 318 L 114 296
                 C 113 286 113 278 114 270 L 116 252 C 117 244 116 236 114 228 L 111 208
                 C 109 198 108 188 108 178 L 108 152 C 108 138 110 124 114 112 Z" className="body"/>
        <ellipse cx="126" cy="328" rx="8" ry="11" className="body"/>
        <path d="M 139 254 C 141 261 140 268 136 273" className="detail"/>
        {/* Linkes Bein */}
        <path d="M 54 270 C 50 278 48 288 48 300 L 48 344 C 48 358 49 370 51 380 L 53 406
                 C 54 416 54 424 53 432 L 51 462 C 50 474 50 484 52 492 L 54 506
                 C 56 512 60 516 66 517 L 74 518 C 79 518 80 514 80 509 L 80 492 L 78 460
                 C 77 448 77 438 78 428 L 80 402 C 81 390 81 378 80 366 L 78 322
                 C 77 310 76 298 76 286 L 76 270 Z" className="body"/>
        <path d="M 47 383 C 45 390 46 398 50 402" className="detail"/>
        {/* Rechtes Bein */}
        <path d="M 106 270 C 110 278 112 288 112 300 L 112 344 C 112 358 111 370 109 380 L 107 406
                 C 106 416 106 424 107 432 L 109 462 C 110 474 110 484 108 492 L 106 506
                 C 104 512 100 516 94 517 L 86 518 C 81 518 80 514 80 509 L 80 492 L 82 460
                 C 83 448 83 438 82 428 L 80 402 C 79 390 79 378 80 366 L 82 322
                 C 83 310 84 298 84 286 L 84 270 Z" className="body"/>
        <path d="M 113 383 C 115 390 114 398 110 402" className="detail"/>
        {/* Füße */}
        <path d="M 52 500 L 66 502 L 74 504 C 74 508 72 514 68 516 L 52 517
                 C 46 517 42 514 42 510 C 42 506 45 502 50 500 Z" className="body"/>
        <path d="M 108 500 L 94 502 L 86 504 C 86 508 88 514 92 516 L 108 517
                 C 114 517 118 514 118 510 C 118 506 115 502 110 500 Z" className="body"/>

        {/* ════════════════════════════════════════════ */}
        {/* LAYER 2 – HOSE                              */}
        {/* ════════════════════════════════════════════ */}
        {outfit.hose && (() => {
          const f = outfit.hose.farbe;
          const isShorts = (outfit.hose.typ||"").toLowerCase().includes("shorts");
          if (isShorts) return (
            <g opacity="0.9">
              {/* Bund */}
              <path d="M 48 255 L 112 255 L 115 268 C 116 277 112 284 105 287
                       L 80 289 L 55 287 C 48 284 44 277 45 268 Z" fill={f}/>
              {/* Linkes Bein – volle Breite bis Knie */}
              <path d="M 48 261 C 48 270 47 284 48 300
                       L 49 340 L 50 372 L 52 382
                       C 54 388 59 392 65 392 L 76 392 L 76 262 Z" fill={f}/>
              {/* Rechtes Bein – volle Breite bis Knie */}
              <path d="M 112 261 C 112 270 113 284 112 300
                       L 111 340 L 110 372 L 108 382
                       C 106 388 101 392 95 392 L 84 392 L 84 262 Z" fill={f}/>
              {/* Mittelnaht */}
              <line x1="80" y1="289" x2="80" y2="392" stroke={darken(f)} strokeWidth="1" opacity="0.35"/>
              {/* Gerader Abschluss unten */}
              <line x1="52" y1="392" x2="108" y2="392"
                stroke={darken(f)} strokeWidth="2" strokeLinecap="round" opacity="0.65"/>
              {/* Gürtelschlaufen */}
              <rect x="55" y="255" width="8"  height="5" rx="1" fill={darken(f)} opacity="0.5"/>
              <rect x="77" y="255" width="6"  height="5" rx="1" fill={darken(f)} opacity="0.5"/>
              <rect x="97" y="255" width="8"  height="5" rx="1" fill={darken(f)} opacity="0.5"/>
            </g>
          );
          return (
            <g opacity="0.9">
              <path d="M 50 255 L 110 255 L 113 268 C 114 276 111 283 105 286
                       L 80 288 L 55 286 C 49 283 46 276 47 268 Z" fill={f}/>
              <path d="M 50 258 L 80 260 L 80 510 C 76 512 70 513 65 512 C 60 511 57 508 56 504
                       L 50 460 C 49 446 48 432 48 418 L 48 360 C 48 336 49 312 50 288 Z" fill={f}/>
              <path d="M 110 258 L 80 260 L 80 510 C 84 512 90 513 95 512 C 100 511 103 508 104 504
                       L 110 460 C 111 446 112 432 112 418 L 112 360 C 112 336 111 312 110 288 Z" fill={f}/>
              <line x1="80" y1="288" x2="80" y2="510" stroke={darken(f)} strokeWidth="1" opacity="0.4"/>
              <rect x="55" y="255" width="8"  height="5" rx="1" fill={darken(f)} opacity="0.5"/>
              <rect x="77" y="255" width="6"  height="5" rx="1" fill={darken(f)} opacity="0.5"/>
              <rect x="97" y="255" width="8"  height="5" rx="1" fill={darken(f)} opacity="0.5"/>
            </g>
          );
        })()}

        {/* ════════════════════════════════════════════ */}
        {/* LAYER 3 – SCHUHE                            */}
        {/* ════════════════════════════════════════════ */}
        {outfit.schuhe && (() => {
          const f = outfit.schuhe.farbe;
          return (
            <g opacity="0.92">
              <path d="M 52 500 L 78 502 C 80 502 80 504 80 507 L 80 510
                       C 79 514 76 518 70 519 L 52 519 C 46 519 42 516 42 512 C 42 508 44 504 48 502 Z" fill={f}/>
              <path d="M 42 514 C 42 519 46 521 52 521 L 72 521 C 77 521 80 519 80 514"
                fill={darken(f)} opacity="0.7"/>
              <path d="M 108 500 L 82 502 C 80 502 80 504 80 507 L 80 510
                       C 81 514 84 518 90 519 L 108 519 C 114 519 118 516 118 512 C 118 508 116 504 112 502 Z" fill={f}/>
              <path d="M 80 514 C 80 519 84 521 90 521 L 110 521 C 115 521 118 519 118 514"
                fill={darken(f)} opacity="0.7"/>
            </g>
          );
        })()}

        {/* ════════════════════════════════════════════ */}
        {/* LAYER 3.5 – GÜRTEL                          */}
        {/* ════════════════════════════════════════════ */}
        {hasAcc("gürtel") && (() => {
          const f = getAcc("gürtel").farbe;
          return (
            <g opacity="0.95">
              <rect x="50" y="252" width="60" height="8" rx="2" fill={f}/>
              <rect x="74" y="249" width="12" height="12" rx="2"
                fill={darken(f,-10)} stroke={darken(f)} strokeWidth="1.2"/>
              <rect x="77" y="252" width="6" height="6" rx="1"
                fill="none" stroke={darken(f)} strokeWidth="1"/>
              <line x1="80" y1="252" x2="80" y2="258"
                stroke={darken(f)} strokeWidth="1.5" strokeLinecap="round"/>
            </g>
          );
        })()}

        {/* ════════════════════════════════════════════ */}
        {/* LAYER 4 – OBERTEILE (alle in der Liste)     */}
        {/* Hemd-Kragen separat in Layer 6.5            */}
        {/* ════════════════════════════════════════════ */}
        {oberteilList.map((oberteil, idx) => {
          const f = oberteil.farbe;
          const typ = oberteil.typ?.toLowerCase() || "";
          const isLS = ["pullover","hoodie","sweatshirt"].some(t => typ.includes(t));
          const isHemd = typ.includes("hemd");
          const hatJacke = !!outfit.jacke;

          // Hemd unter offener Jacke: Kragen wird separat in Layer 6.5 gerendert
          if (isHemd && hatJacke && isJackeOffen) return null;

          // Hemd (ohne Jacke oder geschlossene Jacke)
          if (isHemd) return (
            <g key={idx} opacity="0.9">
              <path d="M 80 68 C 72 68 62 70 54 74 L 34 82
                       C 33 86 33 94 33 100 L 33 252 L 127 252
                       L 127 100 C 127 94 127 86 126 82
                       L 106 74 C 98 70 88 68 80 68 Z" fill={f}/>
              {/* Spitzkragen */}
              <path d="M 68 68 L 72 78 L 80 82 L 88 78 L 92 68
                       C 88 62 83 60 80 60 C 77 60 72 62 68 68 Z"
                fill={f} stroke={darken(f)} strokeWidth="0.9"/>
              <path d="M 68 68 L 74 76 L 80 74" fill="none" stroke={darken(f)} strokeWidth="1.1" opacity="0.5"/>
              <path d="M 92 68 L 86 76 L 80 74" fill="none" stroke={darken(f)} strokeWidth="1.1" opacity="0.5"/>
              <circle cx="80" cy="80" r="1.8" fill={darken(f,10)} opacity="0.65"/>
              <line x1="80" y1="82" x2="80" y2="252" stroke={darken(f)} strokeWidth="1" opacity="0.35"/>
              <circle cx="80" cy="105" r="1.8" fill={darken(f)} opacity="0.45"/>
              <circle cx="80" cy="130" r="1.8" fill={darken(f)} opacity="0.45"/>
              <circle cx="80" cy="155" r="1.8" fill={darken(f)} opacity="0.45"/>
              <circle cx="80" cy="180" r="1.8" fill={darken(f)} opacity="0.45"/>
              <circle cx="80" cy="205" r="1.8" fill={darken(f)} opacity="0.45"/>
              {/* Kurzärmel */}
              <path d="M 34 82 C 28 86 22 95 20 107 L 18 122 C 18 131 21 137 27 139
                       L 44 139 C 50 138 53 133 53 125 L 53 108 C 53 97 50 88 44 84 Z" fill={f}/>
              <path d="M 126 82 C 132 86 138 95 140 107 L 142 122 C 142 131 139 137 133 139
                       L 116 139 C 110 138 107 133 107 125 L 107 108 C 107 97 110 88 116 84 Z" fill={f}/>
              <rect x="88" y="108" width="18" height="14" rx="2"
                fill="none" stroke={darken(f)} strokeWidth="0.9" opacity="0.4"/>
            </g>
          );

          // Standard-Oberteil unter offener Jacke: nur mittlerer Streifen
          if (hatJacke && isJackeOffen) return (
            <g key={idx} opacity="0.9">
              <rect x="78" y="70" width="4" height="190" fill={f}/>
              <path d="M 78 70 C 79 76 79 80 80 82 C 81 80 81 76 82 70"
                fill="none" stroke={darken(f)} strokeWidth="1.4" strokeLinecap="round"/>
              {!isLS && (
                <>
                  <path d="M 38 88 C 32 91 27 97 26 106 L 25 118 C 25 124 27 128 32 130
                           L 41 130 C 46 129 49 125 49 118 L 49 106 C 49 97 46 91 42 89 Z" fill={f} opacity="0.7"/>
                  <path d="M 122 88 C 128 91 133 97 134 106 L 135 118 C 135 124 133 128 128 130
                           L 119 130 C 114 129 111 125 111 118 L 111 106 C 111 97 114 91 118 89 Z" fill={f} opacity="0.7"/>
                </>
              )}
            </g>
          );

          // Vollständiges Oberteil (keine Jacke)
          return (
            <g key={idx} opacity="0.9">
              <path d="M 80 68 C 72 68 62 70 54 74 L 34 82
                       C 33 86 33 94 33 100 L 33 252 L 127 252
                       L 127 100 C 127 94 127 86 126 82
                       L 106 74 C 98 70 88 68 80 68 Z" fill={f}/>
              <path d="M 71 68 C 73 76 76 81 80 82 C 84 81 87 76 89 68"
                fill="none" stroke={darken(f)} strokeWidth="1.7" strokeLinecap="round"/>
              <line x1="33"  y1="190" x2="33"  y2="252" stroke={darken(f)} strokeWidth="0.8" opacity="0.2"/>
              <line x1="127" y1="190" x2="127" y2="252" stroke={darken(f)} strokeWidth="0.8" opacity="0.2"/>
              {isLS ? (
                <>
                  {/* Linker Langarm */}
                  <path d="M 34 82 C 28 86 22 99 19 114
                           L 17 152 C 16 166 16 178 18 189
                           L 21 215 C 22 226 22 234 21 244
                           L 18 268 C 17 278 18 288 21 297
                           L 25 316 C 27 323 31 328 36 328
                           C 41 328 44 323 45 316
                           L 47 296 C 48 284 48 272 47 260
                           L 45 238 C 44 228 45 218 47 208
                           L 51 182 C 53 166 53 150 51 134
                           L 49 110 C 47 96 42 85 34 82 Z" fill={f}/>
                  {/* Rechter Langarm */}
                  <path d="M 126 82 C 132 86 138 99 141 114
                           L 143 152 C 144 166 144 178 142 189
                           L 139 215 C 138 226 138 234 139 244
                           L 142 268 C 143 278 142 288 139 297
                           L 135 316 C 133 323 129 328 124 328
                           C 119 328 116 323 115 316
                           L 113 296 C 112 284 112 272 113 260
                           L 115 238 C 116 228 115 218 113 208
                           L 109 182 C 107 166 107 150 109 134
                           L 111 110 C 113 96 118 85 126 82 Z" fill={f}/>
                  {typ.includes("hoodie") && (
                    <path d="M 64 195 C 64 191 66 188 70 188 L 90 188
                             C 94 188 96 191 96 195 L 96 216
                             C 96 220 94 222 90 222 L 70 222
                             C 66 222 64 220 64 216 Z"
                      fill="none" stroke={darken(f)} strokeWidth="1.2" opacity="0.5"/>
                  )}
                </>
              ) : (
                <>
                  {/* Linker Kurzarm – sauber, keine Abschlusslinien */}
                  <path d="M 34 82 C 28 86 22 95 20 107
                           L 18 122 C 18 131 21 137 27 139
                           L 44 139 C 50 138 53 133 53 125
                           L 53 108 C 53 97 50 88 44 84 Z" fill={f}/>
                  {/* Rechter Kurzarm */}
                  <path d="M 126 82 C 132 86 138 95 140 107
                           L 142 122 C 142 131 139 137 133 139
                           L 116 139 C 110 138 107 133 107 125
                           L 107 108 C 107 97 110 88 116 84 Z" fill={f}/>
                </>
              )}
            </g>
          );
        })}

        {/* ════════════════════════════════════════════ */}
        {/* LAYER 5 – JACKE                             */}
        {/* ════════════════════════════════════════════ */}
        {outfit.jacke && (() => {
          const f = outfit.jacke.farbe;
          return (
            <g opacity="0.9">
              {/* Linker Ärmel bis Handgelenk */}
              <path d="M 37 86 C 28 90 22 102 20 115 L 18 155 C 17 170 17 182 19 192
                       L 22 218 C 24 230 26 252 28 270 C 29 284 30 298 30 312
                       C 30 320 32 326 36 328 C 40 329 43 325 44 317
                       L 46 295 C 47 278 47 260 46 244 L 44 216
                       C 43 200 44 184 46 168 L 50 144 C 52 126 51 104 46 90 Z" fill={f}/>
              {/* Rechter Ärmel bis Handgelenk */}
              <path d="M 123 86 C 132 90 138 102 140 115 L 142 155 C 143 170 143 182 141 192
                       L 138 218 C 136 230 134 252 132 270 C 131 284 130 298 130 312
                       C 130 320 128 326 124 328 C 120 329 117 325 116 317
                       L 114 295 C 113 278 113 260 114 244 L 116 216
                       C 117 200 116 184 114 168 L 110 144 C 108 126 109 104 114 90 Z" fill={f}/>
              {isJackeOffen ? (
                <>
                  {/* Linkes Revers */}
                  <path d="M 55 74 C 44 76 36 82 33 93 L 30 132 C 29 146 29 158 31 168
                           L 35 194 C 36 205 37 215 38 224 L 40 244 C 42 254 50 260 59 261
                           L 77 263 L 77 74 Z" fill={f}/>
                  {/* Rechtes Revers */}
                  <path d="M 105 74 C 116 76 124 82 127 93 L 130 132 C 131 146 131 158 129 168
                           L 125 194 C 124 205 123 215 122 224 L 120 244 C 118 254 110 260 101 261
                           L 83 263 L 83 74 Z" fill={f}/>
                  <path d="M 77 80 L 67 104 L 65 168"
                    fill="none" stroke={darken(f)} strokeWidth="1.2" opacity="0.6"/>
                  <path d="M 83 80 L 93 104 L 95 168"
                    fill="none" stroke={darken(f)} strokeWidth="1.2" opacity="0.6"/>
                  <path d="M 68 74 L 80 96 L 92 74"
                    fill="none" stroke={darken(f)} strokeWidth="2"
                    strokeLinecap="round" strokeLinejoin="round"/>
                </>
              ) : (
                <>
                  <path d="M 55 74 C 44 76 36 82 33 93 L 30 132 C 29 146 29 158 31 168
                           L 35 194 C 36 205 37 215 38 224 L 40 244 C 42 254 50 260 59 261
                           L 80 263 L 101 261 C 110 260 118 254 120 244 L 122 224
                           C 123 215 124 205 125 194 L 129 168 C 131 158 131 146 130 132
                           L 127 93 C 124 82 116 76 105 74
                           C 94 70 86 69 80 69 C 74 69 66 70 55 74 Z" fill={f}/>
                  <path d="M 68 74 L 80 84 L 92 74"
                    fill="none" stroke={darken(f)} strokeWidth="2.5"
                    strokeLinecap="round" strokeLinejoin="round"/>
                  <line x1="80" y1="84" x2="80" y2="261"
                    stroke={darken(f)} strokeWidth="1.5" strokeDasharray="4,3" opacity="0.6"/>
                  <circle cx="80" cy="110" r="2.5" fill={darken(f)} opacity="0.7"/>
                  <circle cx="80" cy="135" r="2.5" fill={darken(f)} opacity="0.7"/>
                  <circle cx="80" cy="160" r="2.5" fill={darken(f)} opacity="0.7"/>
                  <circle cx="80" cy="185" r="2.5" fill={darken(f)} opacity="0.7"/>
                  <rect x="47" y="210" width="18" height="10" rx="2"
                    fill="none" stroke={darken(f)} strokeWidth="1" opacity="0.5"/>
                  <rect x="95" y="210" width="18" height="10" rx="2"
                    fill="none" stroke={darken(f)} strokeWidth="1" opacity="0.5"/>
                </>
              )}
            </g>
          );
        })()}

        {/* ════════════════════════════════════════════ */}
        {/* LAYER 6 – KOPFBEDECKUNG                     */}
        {/* ════════════════════════════════════════════ */}
        {outfit.kopf && (() => {
          const f = outfit.kopf.farbe;
          return (
            <g opacity="0.92">
              <path d="M 57 26 C 48 28 44 32 46 36 C 48 39 54 38 62 36 L 62 26 Z"
                fill={darken(f)}/>
              <path d="M 57 26 C 57 14 62 8 80 6 C 98 8 103 14 103 26 Z" fill={f}/>
              <ellipse cx="80" cy="26" rx="23" ry="4" fill={f}/>
              <line x1="80" y1="6" x2="80" y2="26"
                stroke={darken(f)} strokeWidth="1" opacity="0.4"/>
              <circle cx="80" cy="7" r="2.5" fill={darken(f)} opacity="0.7"/>
            </g>
          );
        })()}

        {/* ════════════════════════════════════════════ */}
        {/* LAYER 6.5 – HEMD-KRAGEN (über alles)        */}
        {/* Sichtbar wenn: Hemd + Jacke oder Hemd+ander. Oberteil */}
        {/* ════════════════════════════════════════════ */}
        {hemdItem && (outfit.jacke || oberteilList.length > 1) && (() => {
          const f = hemdItem.farbe;
          return (
            <g opacity="0.97">
              <path d="M 68 68 L 72 78 L 80 82 L 88 78 L 92 68
                       C 88 62 83 60 80 60 C 77 60 72 62 68 68 Z"
                fill={f} stroke={darken(f)} strokeWidth="0.9"/>
              <path d="M 68 68 L 74 76 L 80 74" fill="none" stroke={darken(f)} strokeWidth="1.1" opacity="0.5"/>
              <path d="M 92 68 L 86 76 L 80 74" fill="none" stroke={darken(f)} strokeWidth="1.1" opacity="0.5"/>
              <circle cx="80" cy="80" r="1.8" fill={darken(f,10)} opacity="0.65"/>
            </g>
          );
        })()}

        {/* ════════════════════════════════════════════ */}
        {/* LAYER 7 – ACCESSOIRES AM KÖRPER             */}
        {/* ════════════════════════════════════════════ */}

        {/* Uhr – linkes Handgelenk */}
        {hasAcc("uhr") && (() => {
          const f = getAcc("uhr").farbe;
          return (
            <g opacity="0.95">
              <rect x="26" y="318" width="16" height="5" rx="2" fill={f}/>
              <rect x="25" y="322" width="18" height="14" rx="3"
                fill={f} stroke={darken(f)} strokeWidth="1.2"/>
              <rect x="27" y="324" width="14" height="10" rx="2"
                fill="#fff" opacity="0.75"/>
              <line x1="34" y1="329" x2="38" y2="326"
                stroke={darken(f)} strokeWidth="1" strokeLinecap="round"/>
              <line x1="34" y1="329" x2="34" y2="325"
                stroke={darken(f)} strokeWidth="1" strokeLinecap="round"/>
              <rect x="26" y="336" width="16" height="5" rx="2" fill={f}/>
            </g>
          );
        })()}

        {/* Kette */}
        {hasAcc("kette") && (() => {
          const f = getAcc("kette").farbe;
          return (
            <g opacity="0.95">
              <path d="M 68 76 C 67 89 71 98 80 100 C 89 98 93 89 92 76"
                fill="none" stroke={f} strokeWidth="1.8" strokeLinecap="round"/>
              <circle cx="80" cy="102" r="3.5" fill={f} stroke={darken(f)} strokeWidth="0.8"/>
            </g>
          );
        })()}

        {/* Sonnenbrille */}
        {hasAcc("sonnenbrille") && (() => {
          const f = getAcc("sonnenbrille").farbe;
          return (
            <g opacity="0.9">
              <rect x="61" y="34" width="15" height="11" rx="4" fill={f} opacity="0.88"/>
              <rect x="84" y="34" width="15" height="11" rx="4" fill={f} opacity="0.88"/>
              <line x1="76" y1="39" x2="84" y2="39" stroke={darken(f)} strokeWidth="1.5"/>
              <line x1="61" y1="39" x2="54" y2="37" stroke={f} strokeWidth="1.5" strokeLinecap="round"/>
              <line x1="99" y1="39" x2="106" y2="37" stroke={f} strokeWidth="1.5" strokeLinecap="round"/>
            </g>
          );
        })()}

        {/* Schal */}
        {hasAcc("schal") && (() => {
          const f = getAcc("schal").farbe;
          return (
            <g opacity="0.88">
              <path d="M 62 62 C 58 68 58 76 62 80 C 70 84 90 84 98 80
                       C 102 76 102 68 98 62 C 90 58 70 58 62 62 Z" fill={f}/>
              <path d="M 72 82 L 68 112 C 68 116 70 118 73 118 L 76 118
                       C 79 118 80 116 80 112 L 78 82 Z" fill={f}/>
              <line x1="64" y1="65" x2="96" y2="65" stroke={darken(f)} strokeWidth="1" opacity="0.4"/>
              <line x1="62" y1="72" x2="98" y2="72" stroke={darken(f)} strokeWidth="1" opacity="0.4"/>
            </g>
          );
        })()}

        {/* Krawatte – natürlich geformt, normale Länge */}
        {hasAcc("krawatte") && (() => {
          const f = getAcc("krawatte").farbe;
          return (
            <g opacity="0.95">
              {/* Knoten – kompakter Trapez-Knoten */}
              <path d="M 76 74 L 80 72 L 84 74 L 83 83 L 80 85 L 77 83 Z"
                fill={darken(f,8)} stroke={darken(f,15)} strokeWidth="0.7"/>
              {/* Oberer Teil – direkt unter Knoten, leicht breiter werdend */}
              <path d="M 77 83 L 75 100 L 74 115 L 80 118 L 86 115 L 85 100 L 83 83 L 80 85 Z"
                fill={f} stroke={darken(f)} strokeWidth="0.5" opacity="0.97"/>
              {/* Breites Blatt – gleichmäßige Breite, endet bei ~y=205 */}
              <path d="M 74 115 L 72 145 L 73 175 L 76 198 L 80 205 L 84 198 L 87 175 L 88 145 L 86 115 Z"
                fill={f} stroke={darken(f)} strokeWidth="0.5" opacity="0.97"/>
              {/* Mittelnaht */}
              <line x1="80" y1="85" x2="80" y2="202"
                stroke={darken(f,18)} strokeWidth="0.5" opacity="0.28"/>
            </g>
          );
        })()}

        {/* ─── Klick-Zonen ─────────────────────────── */}
        <g id="zone-kopf" {...zoneHoverProps("kopf")}>
          <ellipse cx="80" cy="34" rx="23" ry="30"/>
          <rect x="70" y="56" width="20" height="20" rx="3"/>
        </g>
        <g id="zone-oberteil" {...zoneHoverProps("oberteil")}>
          <path d="M 40 78 C 56 70 68 68 80 68 C 92 68 104 70 120 78
                   L 128 110 L 128 200 L 122 245 L 80 258 L 38 245 L 32 200 L 32 110 Z"/>
        </g>
        <g id="zone-jacke" {...zoneHoverProps("jacke")}>
          <path d="M 20 84 C 44 68 62 64 80 64 C 98 64 116 68 140 84
                   L 142 150 L 138 248 L 120 260 L 80 264 L 40 260 L 22 248 L 18 150 Z"/>
        </g>
        <g id="zone-hose" {...zoneHoverProps("hose")}>
          <path d="M 46 258 L 114 258 L 116 285 L 112 374 L 80 380 L 48 374 L 44 285 Z"/>
        </g>
        <g id="zone-schuhe" {...zoneHoverProps("schuhe")}>
          <path d="M 44 374 L 80 380 L 116 374 L 120 492 L 120 520 L 40 520 L 40 492 Z"/>
        </g>

        {/* Accessoire-Hitboxen */}
        <rect x="44" y="248" width="72" height="18" rx="4"
          style={accHitStyle()} onClick={() => onZoneClick("accessoires")}/>
        <ellipse cx="34" cy="329" rx="14" ry="16"
          style={accHitStyle()} onClick={() => onZoneClick("accessoires")}/>
        <ellipse cx="80" cy="90" rx="20" ry="16"
          style={accHitStyle()} onClick={() => onZoneClick("accessoires")}/>
        <rect x="56" y="28" width="48" height="22" rx="5"
          style={accHitStyle()} onClick={() => onZoneClick("accessoires")}/>
        <ellipse cx="80" cy="70" rx="24" ry="15"
          style={accHitStyle()} onClick={() => onZoneClick("accessoires")}/>
        {/* Tasche-Hitbox dynamisch links oder rechts */}
        <rect x={tascheLinks ? 14 : 110} y="290" width="36" height="70" rx="6"
          style={accHitStyle()} onClick={() => onZoneClick("accessoires")}/>
        {/* Krawatte-Hitbox */}
        <rect x="70" y="68" width="20" height="82" rx="4"
          style={accHitStyle()} onClick={() => onZoneClick("accessoires")}/>

        {accList.length === 0 && (
          <g id="zone-accessoires" {...zoneHoverProps("accessoires")}>
            <rect x="44" y="248" width="72" height="22" rx="4"/>
          </g>
        )}

      </svg>

      {/* ════════════════════════════════════════════ */}
      {/* TASCHE – links oder rechts                  */}
      {/* ════════════════════════════════════════════ */}
      {hasAcc("tasche") && (() => {
        const f = tascheAcc.farbe;
        // Rechte Hand: cx=126 cy=328 / Linke Hand: cx=34 cy=328
        const bx = tascheLinks ? -4  : 108;  // Taschenbox x
        const ix = tascheLinks ?  0  : 112;  // Innenrahmen x
        const lx = tascheLinks ? 10  : 122;  // Lasche x
        const kx = tascheLinks ? 22  : 132;  // Knopf x
        const vx = tascheLinks ? 14  : 118;  // Vordertasche x
        // Griff-Pfad: von Hand zu Tasche
        const griff = tascheLinks
          ? "M 38 338 C 34 348 32 360 34 372 C 35 378 39 380 43 378 C 47 376 48 366 46 358"
          : "M 122 338 C 126 348 128 360 126 372 C 125 378 121 380 117 378 C 113 376 112 366 114 358";
        return (
          <svg style={{ position: "absolute", top: 0, left: 0, pointerEvents: "none" }}
            viewBox="0 0 160 540" width="160" height="540">
            <path d={griff} fill="none" stroke={darken(f)} strokeWidth="3.5" strokeLinecap="round"/>
            <rect x={bx} y="368" width="48" height="58" rx="8"
              fill={f} stroke={darken(f)} strokeWidth="1.5"/>
            <rect x={ix} y="372" width="40" height="50" rx="6"
              fill="none" stroke={darken(f,10)} strokeWidth="1" opacity="0.45"/>
            <rect x={lx} y="364" width="20" height="9" rx="3"
              fill={darken(f,5)} stroke={darken(f)} strokeWidth="1"/>
            <circle cx={kx} cy="368" r="3.5" fill={darken(f,15)} opacity="0.75"/>
            <rect x={vx} y="398" width="28" height="18" rx="4"
              fill="none" stroke={darken(f,8)} strokeWidth="1" opacity="0.5"/>
          </svg>
        );
      })()}

    </div>
  );
}
