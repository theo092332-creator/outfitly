/**
 * OUTFITLY – OutfitlyDummy.jsx  v4
 * Kombinierte Komponente: SVG-Dummy + alle Kleidungs-Silhouetten
 *
 * Props:
 *   outfit: {
 *     kopf:        { typ, farbe } | null
 *     oberteil:    { typ, farbe } | null
 *     jacke:       { typ, farbe, offen?: boolean } | null
 *     hose:        { typ, farbe } | null
 *     schuhe:      { typ, farbe } | null
 *     accessoires: Array<{ typ, farbe }>   ← Array für mehrere gleichzeitig
 *                  (rückwärtskompatibel: einzelnes Objekt wird automatisch gewrapped)
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

  // Accessoires: unterstützt altes Objekt-Format und neues Array-Format
  const accList = Array.isArray(outfit.accessoires)
    ? outfit.accessoires
    : outfit.accessoires ? [outfit.accessoires] : [];

  const hasAcc = (keyword) => accList.some(a => a.typ?.toLowerCase().includes(keyword));
  const getAcc = (keyword) => accList.find(a => a.typ?.toLowerCase().includes(keyword));

  // Zone-Hover-Stil für Kleidungszonen
  const zoneStyle = (zoneName) => ({
    fill: activeZone === zoneName
      ? "rgba(201,168,76,0.32)"
      : outfit[zoneName]
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
      if (activeZone !== zoneName)
        e.currentTarget.style.fill = outfit[zoneName] ? "rgba(201,168,76,0.08)" : "transparent";
    },
    style: zoneStyle(zoneName),
  });

  // Accessoire-Hitbox-Style: goldener Effekt nur bei Hover (CSS) und wenn activeZone === 'accessoires'
  const accHitStyle = (keyword) => ({
    fill: activeZone === "accessoires" ? "rgba(201,168,76,0.32)" : "transparent",
    cursor: "pointer",
    transition: "fill 0.2s",
  });

  const isJackeOffen = outfit.jacke?.offen === true;
  const oberteilTyp  = outfit.oberteil?.typ?.toLowerCase() || "";
  const isLongSleeve = ["pullover","hoodie","sweatshirt"].some(t => oberteilTyp.includes(t));

  return (
    <div style={{ position: "relative", width: 160, height: 540, margin: "0 auto" }}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 540" width="160" height="540"
        style={{ position: "absolute", top: 0, left: 0 }}>

        {/* ════════════════════════════════════════════ */}
        {/* LAYER 1 – KÖRPER (statisch, nie verändern)  */}
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
        {/* LAYER 3.5 – GÜRTEL (über Hose, unter Oberteil) */}
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
        {/* LAYER 4a – OBERTEIL unter offener Jacke      */}
        {/* Sichtbar wenn: Jacke offen (und Oberteil vorhanden) */}
        {/* ════════════════════════════════════════════ */}
        {outfit.oberteil && outfit.jacke && isJackeOffen && (() => {
          const f = outfit.oberteil.farbe;
          // Nur der mittlere Torso-Streifen, der zwischen den Revers sichtbar ist
          return (
            <g opacity="0.9">
              {/* Sichtbarer Oberteil-Torso (nur mittlere 8px zwischen Revers) */}
              <rect x="76" y="72" width="8" height="191" fill={f}/>
              {/* Halsausschnitt-Anschnitt */}
              <path d="M 76 72 C 77 78 79 82 80 84 C 81 82 83 78 84 72"
                fill="none" stroke={darken(f)} strokeWidth="1.5" strokeLinecap="round"/>
              {/* Ärmelloses: nur Schulteransatz sichtbar wenn T-Shirt */}
              {!isLongSleeve && (
                <>
                  <path d="M 40 88 C 34 91 29 97 28 106 L 27 118 C 27 124 29 128 34 130
                           L 42 130 C 47 129 50 125 50 118 L 50 106 C 50 97 47 91 44 89 Z" fill={f} opacity="0.7"/>
                  <path d="M 120 88 C 126 91 131 97 132 106 L 133 118 C 133 124 131 128 126 130
                           L 118 130 C 113 129 110 125 110 118 L 110 106 C 110 97 113 91 116 89 Z" fill={f} opacity="0.7"/>
                </>
              )}
            </g>
          );
        })()}

        {/* ════════════════════════════════════════════ */}
        {/* LAYER 4b – OBERTEIL ohne Jacke              */}
        {/* Vollständig sichtbar wenn keine Jacke       */}
        {/* ════════════════════════════════════════════ */}
        {outfit.oberteil && !outfit.jacke && (() => {
          const f = outfit.oberteil.farbe;
          return (
            <g opacity="0.9">
              {/* ── Torso: sitzt exakt auf dem Körper ──
                  Schultern von y=72 bis y=252 (Gürtellinie).
                  Seitenlinien folgen dem Körper (x=33 links, x=127 rechts).
              */}
              <path d="
                M 80 72
                C 75 72 70 73 65 75 L 40 84
                C 35 87 33 93 33 100
                L 33 252 L 127 252
                L 127 100 C 127 93 125 87 120 84
                L 95 75 C 90 73 85 72 80 72 Z
              " fill={f}/>
              {/* Rundhals-Ausschnitt */}
              <path d="M 71 72 C 73 80 76 84 80 85 C 84 84 87 80 89 72"
                fill="none" stroke={darken(f)} strokeWidth="1.8" strokeLinecap="round"/>
              {/* Seitennaht-Andeutung */}
              <line x1="33"  y1="190" x2="33"  y2="252" stroke={darken(f)} strokeWidth="0.8" opacity="0.25"/>
              <line x1="127" y1="190" x2="127" y2="252" stroke={darken(f)} strokeWidth="0.8" opacity="0.25"/>

              {isLongSleeve ? (
                /*
                 * ════ LANGARM: Pullover / Hoodie / Sweatshirt ════
                 * Ärmel folgen dem Arm-SVG exakt:
                 *   Linker Arm: Außen-x ≈ 22–46, Innen-x ≈ 33–52
                 *   Rechter Arm: Außen-x ≈ 114–138, Innen-x ≈ 108–127
                 * Enden am Handgelenk (Ellipse cx=34/126, cy=328, rx=8, ry=11)
                 */
                <>
                  {/* Linker Ärmel */}
                  <path d="
                    M 40 84
                    C 34 88 28 99 25 113
                    L 22 150 C 21 163 21 175 22 185
                    L 24 210 C 25 220 25 228 24 237
                    L 22 257 C 21 265 21 273 23 281
                    L 26 302 C 28 313 31 320 35 323
                    C 38 325 41 324 43 319
                    L 45 298 C 46 287 46 279 45 271
                    L 43 252 C 42 244 43 236 45 228
                    L 48 208 C 50 197 51 186 51 175
                    L 51 150 C 51 136 49 122 45 110
                    Z
                  " fill={f}/>
                  {/* Rechter Ärmel (gespiegelt) */}
                  <path d="
                    M 120 84
                    C 126 88 132 99 135 113
                    L 138 150 C 139 163 139 175 138 185
                    L 136 210 C 135 220 135 228 136 237
                    L 138 257 C 139 265 139 273 137 281
                    L 134 302 C 132 313 129 320 125 323
                    C 122 325 119 324 117 319
                    L 115 298 C 114 287 114 279 115 271
                    L 117 252 C 118 244 117 236 115 228
                    L 112 208 C 110 197 109 186 109 175
                    L 109 150 C 109 136 111 122 115 110
                    Z
                  " fill={f}/>
                  {/* Ärmelbündchen links */}
                  <path d="M 22 318 C 22 323 26 327 33 328 C 40 329 45 326 46 321"
                    fill={darken(f,8)} stroke={darken(f)} strokeWidth="0.9" opacity="0.8"/>
                  {/* Ärmelbündchen rechts */}
                  <path d="M 138 318 C 138 323 134 327 127 328 C 120 329 115 326 114 321"
                    fill={darken(f,8)} stroke={darken(f)} strokeWidth="0.9" opacity="0.8"/>
                  {/* Känguru-Tasche Hoodie */}
                  {oberteilTyp.includes("hoodie") && (
                    <path d="M 64 195 C 64 191 66 188 70 188 L 90 188
                             C 94 188 96 191 96 195 L 96 216
                             C 96 220 94 222 90 222 L 70 222
                             C 66 222 64 220 64 216 Z"
                      fill="none" stroke={darken(f)} strokeWidth="1.2" opacity="0.5"/>
                  )}
                </>
              ) : (
                /*
                 * ════ KURZARM: T-Shirt / Hemd / Polo / Tanktop ════
                 * Ärmel enden klar über dem Ellbogen (~y=136).
                 * Schulterbreite entspricht dem Torso.
                 */
                <>
                  {/* Linker Kurzarm */}
                  <path d="
                    M 40 84
                    C 34 87 28 95 26 106
                    L 24 120 C 24 128 27 134 32 136
                    L 44 136 C 49 135 52 130 52 123
                    L 52 107 C 52 97 49 89 44 85
                    Z
                  " fill={f}/>
                  {/* Rechter Kurzarm */}
                  <path d="
                    M 120 84
                    C 126 87 132 95 134 106
                    L 136 120 C 136 128 133 134 128 136
                    L 116 136 C 111 135 108 130 108 123
                    L 108 107 C 108 97 111 89 116 85
                    Z
                  " fill={f}/>
                  {/* Ärmelkante links – deutliche Abschluss-Linie */}
                  <line x1="24" y1="134" x2="52" y2="136"
                    stroke={darken(f)} strokeWidth="1.6" opacity="0.65" strokeLinecap="round"/>
                  {/* Ärmelkante rechts */}
                  <line x1="136" y1="134" x2="108" y2="136"
                    stroke={darken(f)} strokeWidth="1.6" opacity="0.65" strokeLinecap="round"/>
                </>
              )}
            </g>
          );
        })()}

        {/* ════════════════════════════════════════════ */}
        {/* LAYER 5 – JACKE (offen oder geschlossen)    */}
        {/* ════════════════════════════════════════════ */}
        {outfit.jacke && (() => {
          const f = outfit.jacke.farbe;
          return (
            <g opacity="0.9">
              {/* Ärmel immer gleich */}
              {/* Linker Ärmel */}
              <path d="M 37 86 C 28 90 22 102 20 115 L 18 155 C 17 170 17 182 19 192
                       L 22 218 C 24 228 27 236 31 240 C 34 243 38 242 41 238 L 44 216
                       C 46 206 47 196 46 186 L 44 165 C 43 154 44 143 46 133
                       L 50 112 C 52 100 51 90 46 82 Z" fill={f}/>
              {/* Rechter Ärmel */}
              <path d="M 123 86 C 132 90 138 102 140 115 L 142 155 C 143 170 143 182 141 192
                       L 138 218 C 136 228 133 236 129 240 C 126 243 122 242 119 238 L 116 216
                       C 114 206 113 196 114 186 L 116 165 C 117 154 116 143 114 133
                       L 110 112 C 108 100 109 90 114 82 Z" fill={f}/>

              {isJackeOffen ? (
                /* ── OFFEN: Revers beidseitig ── */
                <>
                  {/* Linkes Revers */}
                  <path d="M 55 74 C 44 76 36 82 33 93 L 30 132 C 29 146 29 158 31 168
                           L 35 194 C 36 205 37 215 38 224 L 40 244 C 42 254 50 260 59 261
                           L 76 263 L 76 74 Z" fill={f}/>
                  {/* Rechtes Revers */}
                  <path d="M 105 74 C 116 76 124 82 127 93 L 130 132 C 131 146 131 158 129 168
                           L 125 194 C 124 205 123 215 122 224 L 120 244 C 118 254 110 260 101 261
                           L 84 263 L 84 74 Z" fill={f}/>
                  {/* Revers-Falz links */}
                  <path d="M 76 80 L 66 104 L 64 168"
                    fill="none" stroke={darken(f)} strokeWidth="1.2" opacity="0.6"/>
                  {/* Revers-Falz rechts */}
                  <path d="M 84 80 L 94 104 L 96 168"
                    fill="none" stroke={darken(f)} strokeWidth="1.2" opacity="0.6"/>
                  {/* V-Öffnung Kragen */}
                  <path d="M 68 74 L 80 96 L 92 74"
                    fill="none" stroke={darken(f)} strokeWidth="2"
                    strokeLinecap="round" strokeLinejoin="round"/>
                </>
              ) : (
                /* ── GESCHLOSSEN ── */
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
        {/* LAYER 7 – ACCESSOIRES AM KÖRPER             */}
        {/* Jedes Accessoire an seiner korrekten Stelle */}
        {/* ════════════════════════════════════════════ */}

        {/* Uhr – linkes Handgelenk (cy≈328) */}
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

        {/* Kette – um den Hals */}
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

        {/* Sonnenbrille – im Gesicht */}
        {hasAcc("sonnenbrille") && (() => {
          const f = getAcc("sonnenbrille").farbe;
          return (
            <g opacity="0.9">
              <rect x="61" y="34" width="15" height="11" rx="4" fill={f} opacity="0.88"/>
              <rect x="84" y="34" width="15" height="11" rx="4" fill={f} opacity="0.88"/>
              <line x1="76" y1="39" x2="84" y2="39" stroke={darken(f)} strokeWidth="1.5"/>
              <line x1="61" y1="39" x2="54" y2="37"
                stroke={f} strokeWidth="1.5" strokeLinecap="round"/>
              <line x1="99" y1="39" x2="106" y2="37"
                stroke={f} strokeWidth="1.5" strokeLinecap="round"/>
            </g>
          );
        })()}

        {/* Schal – um den Hals */}
        {hasAcc("schal") && (() => {
          const f = getAcc("schal").farbe;
          return (
            <g opacity="0.88">
              <path d="M 62 62 C 58 68 58 76 62 80 C 70 84 90 84 98 80
                       C 102 76 102 68 98 62 C 90 58 70 58 62 62 Z" fill={f}/>
              <path d="M 72 82 L 68 112 C 68 116 70 118 73 118 L 76 118
                       C 79 118 80 116 80 112 L 78 82 Z" fill={f}/>
              <line x1="64" y1="65" x2="96" y2="65"
                stroke={darken(f)} strokeWidth="1" opacity="0.4"/>
              <line x1="62" y1="72" x2="98" y2="72"
                stroke={darken(f)} strokeWidth="1" opacity="0.4"/>
            </g>
          );
        })()}

        {/* ════════════════════════════════════════════ */}
        {/* KLICK-ZONEN (transparent, immer ganz oben)  */}
        {/* ════════════════════════════════════════════ */}

        {/* Kopf */}
        <g id="zone-kopf" {...zoneHoverProps("kopf")}>
          <ellipse cx="80" cy="34" rx="23" ry="30"/>
          <rect x="70" y="56" width="20" height="20" rx="3"/>
        </g>

        {/* Oberteil */}
        <g id="zone-oberteil" {...zoneHoverProps("oberteil")}>
          <path d="M 40 78 C 56 70 68 68 80 68 C 92 68 104 70 120 78
                   L 128 110 L 128 200 L 122 245 L 80 258 L 38 245 L 32 200 L 32 110 Z"/>
        </g>

        {/* Jacke */}
        <g id="zone-jacke" {...zoneHoverProps("jacke")}>
          <path d="M 20 84 C 44 68 62 64 80 64 C 98 64 116 68 140 84
                   L 142 150 L 138 248 L 120 260 L 80 264 L 40 260 L 22 248 L 18 150 Z"/>
        </g>

        {/* Hose */}
        <g id="zone-hose" {...zoneHoverProps("hose")}>
          <path d="M 46 258 L 114 258 L 116 285 L 112 374 L 80 380 L 48 374 L 44 285 Z"/>
        </g>

        {/* Schuhe */}
        <g id="zone-schuhe" {...zoneHoverProps("schuhe")}>
          <path d="M 44 374 L 80 380 L 116 374 L 120 492 L 120 520 L 40 520 L 40 492 Z"/>
        </g>

        {/* ─── Accessoire-Hitboxen: je Typ an der richtigen Körperstelle ─── */}
        {/* Mit goldenem Schimmer wenn aktiv oder vorhanden */}

        {/* Gürtel – Gürtellinie */}
        <rect x="44" y="248" width="72" height="18" rx="4"
          style={accHitStyle("gürtel")}
          onClick={() => onZoneClick("accessoires")}/>

        {/* Uhr – linkes Handgelenk */}
        <ellipse cx="34" cy="329" rx="14" ry="16"
          style={accHitStyle("uhr")}
          onClick={() => onZoneClick("accessoires")}/>

        {/* Kette – Halsbereich */}
        <ellipse cx="80" cy="90" rx="20" ry="16"
          style={accHitStyle("kette")}
          onClick={() => onZoneClick("accessoires")}/>

        {/* Sonnenbrille – Gesichtsbereich */}
        <rect x="56" y="28" width="48" height="22" rx="5"
          style={accHitStyle("sonnenbrille")}
          onClick={() => onZoneClick("accessoires")}/>

        {/* Schal – Hals-/Schulterbereich */}
        <ellipse cx="80" cy="70" rx="24" ry="15"
          style={accHitStyle("schal")}
          onClick={() => onZoneClick("accessoires")}/>

        {/* Tasche – rechte Hand / unterer Arm-Bereich */}
        <rect x="110" y="290" width="36" height="70" rx="6"
          style={accHitStyle("tasche")}
          onClick={() => onZoneClick("accessoires")}/>

        {/* Standard-Fallback-Zone wenn kein spezifisches Accessoire gesetzt */}
        {accList.length === 0 && (
          <g id="zone-accessoires" {...zoneHoverProps("accessoires")}>
            <rect x="44" y="248" width="72" height="22" rx="4"/>
          </g>
        )}

      </svg>

      {/* ════════════════════════════════════════════ */}
      {/* TASCHE – größer, hängt in der rechten Hand  */}
      {/* Rechte Hand: cx=126, cy=328                 */}
      {/* Tasche hängt darunter, ab y≈340             */}
      {/* ════════════════════════════════════════════ */}
      {hasAcc("tasche") && (() => {
        const f = getAcc("tasche").farbe;
        return (
          <svg
            style={{ position: "absolute", top: 0, left: 0, pointerEvents: "none" }}
            viewBox="0 0 160 540" width="160" height="540"
          >
            {/* Tragegriff – Bogen von der Hand zur Tasche */}
            <path d="M 122 338 C 118 346 116 358 118 370 C 120 376 124 378 128 376 C 132 374 134 366 132 358"
              fill="none" stroke={darken(f)} strokeWidth="3.5" strokeLinecap="round"/>
            {/* Taschenkorpus – deutlich größer, natürlich hängend */}
            <rect x="108" y="368" width="48" height="58" rx="8"
              fill={f} stroke={darken(f)} strokeWidth="1.5"/>
            {/* Innenrahmen / Naht */}
            <rect x="112" y="372" width="40" height="50" rx="6"
              fill="none" stroke={darken(f,10)} strokeWidth="1" opacity="0.45"/>
            {/* Verschluss-Lasche oben */}
            <rect x="122" y="364" width="20" height="9" rx="3"
              fill={darken(f,5)} stroke={darken(f)} strokeWidth="1"/>
            {/* Magnetknopf */}
            <circle cx="132" cy="368" r="3.5" fill={darken(f,15)} opacity="0.75"/>
            {/* Dekorativ: kleine Tasche vorne */}
            <rect x="118" y="398" width="28" height="18" rx="4"
              fill="none" stroke={darken(f,8)} strokeWidth="1" opacity="0.5"/>
          </svg>
        );
      })()}

    </div>
  );
}
