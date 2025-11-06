# IMPLEMENTATION CHECKLIST
## Photo Integration & Political Map Refinement

This checklist guides you through implementing the recommendations from the UX Audit document.

---

## PHASE 1: PHOTO INTEGRATION (3-4 hours)

### Step 1: Install Dependencies (5 minutes)

```bash
cd D:/Desarrollos/elecciones/comparador-react
npm install --save-dev sharp
```

**Verify installation:**
```bash
npm list sharp
```

Expected output: `sharp@0.32.x` (or similar)

- [ ] Sharp installed successfully
- [ ] No installation errors

---

### Step 2: Optimize Photos (15 minutes)

**Run the optimization script:**
```bash
node scripts/optimize-photos.js
```

**Expected output:**
```
✅ Optimized: artes (Eduardo_Artés_2021_-_7_de_octubre_(cropped).jpg.webp)
✅ Optimized: matthei (Evelyn_Matthei,_alcaldesa_de_Providencia.png)
✅ Optimized: hmn (Harold_Mayne-Nicholls_(cropped).jpg)
✅ Optimized: jara (Jeannette_Jara,_2022.png)
✅ Optimized: kaiser (Johannes_Kaiser_(BCN).jpg)
✅ Optimized: kast (José_Antonio_Kast_en_2025.jpg)
✅ Optimized: meo (Marco_Enriquez-Ominami_2025.jpg)
✅ Optimized: parisi (parisi.jpg)
```

**Verify output files:**
```bash
ls -lh public/fotos/candidatos/
```

Expected: 32 files (8 candidates × 2 sizes × 2 formats)

**Checklist:**
- [ ] All 8 candidates optimized without errors
- [ ] 32 files created in public/fotos/candidatos/
- [ ] File sizes reasonable (10-30 KB each)
- [ ] Both .webp and .jpg formats present
- [ ] Both regular and -small variants present

---

### Step 3: Update candidatos.json (10 minutes)

**OPTION A: Automated (Recommended)**

```bash
node scripts/add-photo-paths.js
```

This automatically adds the `foto` property to all candidates.

**Verify changes:**
```bash
grep -A 1 '"foto"' src/data/candidatos.json
```

Expected output should show foto paths for all 8 candidates.

**OPTION B: Manual**

Edit `src/data/candidatos.json` and add `"foto": "/fotos/candidatos/{id}.webp"` to each candidate:

```json
{
  "jara": {
    "nombre": "Jeannette Jara",
    "partido": "Unidad por Chile (PCCh)",
    "foto": "/fotos/candidatos/jara.webp",
    "imagen": "https://placehold.co/400x400/4F46E5/FFFFFF?text=JJ",
    ...
  }
}
```

Repeat for all 8 candidates: jara, matthei, kast, kaiser, parisi, meo, hmn, artes

**Checklist:**
- [ ] candidatos.json backup created
- [ ] All 8 candidates have foto property
- [ ] Photo paths are correct (/fotos/candidatos/{id}.webp)
- [ ] JSON file is valid (no syntax errors)

---

### Step 4: Update HomePage.jsx - Political Map (45 minutes)

**File:** `D:\Desarrollos\elecciones\comparador-react\src\pages\HomePage.jsx`

#### 4.1: Replace Photo Rendering (Lines 531-593)

**Find this code:**
```jsx
<div className="relative">
  {candidato.foto ? (
    <>
      <img
        src={candidato.foto}
        alt={candidato.nombre}
        className={`...`}
        onError={(e) => {
          console.log('Error cargando foto:', candidato.nombre, candidato.foto);
          e.target.style.display = 'none';
          e.target.nextElementSibling.style.display = 'flex';
        }}
        loading="eager"
        crossOrigin="anonymous"
      />
      ...
```

**Replace with:**
```jsx
<div className="relative">
  <picture>
    <source
      srcSet={`/fotos/candidatos/${candidato.id}-small.webp`}
      type="image/webp"
    />
    <img
      src={`/fotos/candidatos/${candidato.id}-small.jpg`}
      alt={`Foto de ${candidato.nombre}, candidato presidencial de ${candidato.partido}`}
      className={`
        relative w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28
        rounded-full object-cover
        ring-4 ${ringColor} ring-offset-2 ring-offset-slate-900
        group-hover:ring-8 group-hover:scale-110
        transition-all duration-300
        shadow-xl group-hover:shadow-2xl
        cursor-pointer
        bg-slate-800
      `}
      onError={(e) => {
        e.target.style.display = 'none';
        const parent = e.target.closest('.relative');
        const fallback = parent.querySelector('.fallback-initials');
        if (fallback) fallback.style.display = 'flex';
      }}
      loading="eager"
    />
  </picture>

  {/* Initials fallback */}
  <div
    className={`
      fallback-initials hidden w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28
      rounded-full bg-gradient-to-br from-slate-600 to-slate-800
      items-center justify-center
      text-white font-black text-xl sm:text-2xl lg:text-3xl
      ring-4 ${ringColor} ring-offset-2 ring-offset-slate-900
      group-hover:ring-8 group-hover:scale-110
      transition-all duration-300
      shadow-xl group-hover:shadow-2xl
      cursor-pointer
    `}
    style={{ fontFamily: 'Outfit, sans-serif' }}
  >
    {candidato.nombre.split(' ').map(n => n[0]).join('').slice(0, 2)}
  </div>
</div>
```

**Checklist:**
- [ ] Code replaced in MapaPolitico component
- [ ] candidato.id used (not candidato.foto)
- [ ] Picture element with WebP source
- [ ] Fallback to JPEG
- [ ] Fallback to initials on error
- [ ] Alt text is descriptive
- [ ] className preserves all styling

---

### Step 5: Update CandidatePage.jsx - Header Photo (30 minutes)

**File:** `D:\Desarrollos\elecciones\comparador-react\src\pages\CandidatePage.jsx`

#### 5.1: Replace Avatar with Photo (Lines 64-67)

**Find this code:**
```jsx
<div className={`inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-gradient-to-br ${colorScheme.gradient} text-white text-4xl font-black mb-6 shadow-[0_8px_30px_rgba(0,0,0,0.3)] border-4 border-white/30 animate-scaleIn`} style={{ fontFamily: 'Outfit, sans-serif' }}>
  {candidato.nombre.split(' ').map(n => n[0]).join('').slice(0, 2)}
</div>
```

**Replace with:**
```jsx
<div className="relative inline-block mb-6 animate-scaleIn">
  <picture>
    <source
      srcSet={`/fotos/candidatos/${id}.webp`}
      type="image/webp"
    />
    <img
      src={`/fotos/candidatos/${id}.jpg`}
      alt={`Foto oficial de ${candidato.nombre}, candidato presidencial de ${candidato.partido}`}
      className="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 rounded-3xl object-cover shadow-[0_8px_30px_rgba(0,0,0,0.3)] border-4 border-white/30"
      onError={(e) => {
        e.target.style.display = 'none';
        const fallback = e.target.parentElement.nextElementSibling;
        if (fallback) fallback.style.display = 'flex';
      }}
      loading="eager"
    />
  </picture>

  {/* Fallback initials */}
  <div
    className={`hidden w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 rounded-3xl bg-gradient-to-br ${colorScheme.gradient} items-center justify-center text-white text-4xl sm:text-5xl lg:text-6xl font-black shadow-[0_8px_30px_rgba(0,0,0,0.3)] border-4 border-white/30`}
    style={{ fontFamily: 'Outfit, sans-serif' }}
  >
    {candidato.nombre.split(' ').map(n => n[0]).join('').slice(0, 2)}
  </div>
</div>
```

**Checklist:**
- [ ] Avatar replaced with photo
- [ ] Uses large size (400px source)
- [ ] Responsive sizing (120-192px)
- [ ] Rounded square shape (rounded-3xl)
- [ ] Fallback to initials on error
- [ ] Alt text is descriptive

---

### Step 6: Update ComparePage.jsx - Selector Photos (30 minutes)

**File:** `D:\Desarrollos\elecciones\comparador-react\src\pages\ComparePage.jsx`

#### 6.1: Replace Initials with Photos (Lines 89-96)

**Find this code:**
```jsx
<div className="text-3xl mb-2">
  {candidato.nombre.split(' ').map(n => n[0]).join('').slice(0, 2)}
</div>
<div className="text-xs font-semibold text-gray-900 truncate">
  {candidato.nombre.split(' ')[0]}
</div>
```

**Replace with:**
```jsx
<div className="relative mb-2">
  <picture>
    <source
      srcSet={`/fotos/candidatos/${candidato.id}-small.webp`}
      type="image/webp"
    />
    <img
      src={`/fotos/candidatos/${candidato.id}-small.jpg`}
      alt={candidato.nombre}
      className="w-16 h-16 rounded-full object-cover border-2 border-slate-200"
      onError={(e) => {
        e.target.style.display = 'none';
        const fallback = e.target.parentElement.nextElementSibling;
        if (fallback) fallback.style.display = 'flex';
      }}
      loading="lazy"
    />
  </picture>

  {/* Fallback initials */}
  <div className="hidden w-16 h-16 rounded-full bg-gradient-to-br from-slate-600 to-slate-800 items-center justify-center text-white font-bold text-xl border-2 border-slate-200">
    {candidato.nombre.split(' ').map(n => n[0]).join('').slice(0, 2)}
  </div>
</div>

<div className="text-xs font-semibold text-gray-900 truncate">
  {candidato.nombre.split(' ')[0]}
</div>
```

**Checklist:**
- [ ] Initials replaced with photos
- [ ] Small size photos (256px source)
- [ ] 64px display size
- [ ] Circular shape
- [ ] Lazy loading enabled
- [ ] Fallback to initials

---

### Step 7: Testing & Validation (45 minutes)

#### 7.1: Visual Testing

**Start development server:**
```bash
npm run dev
```

**Test HomePage - Political Map:**
- [ ] Navigate to http://localhost:5173
- [ ] All 8 candidate photos visible on political map
- [ ] Photos are circular and properly cropped
- [ ] Ring colors correct (red/violet/blue based on tendency)
- [ ] Hover effect works (scale + ring expansion)
- [ ] Tooltip appears with candidate info
- [ ] Photos don't overlap (anti-overlap algorithm works)

**Test HomePage - Grid View:**
- [ ] Click "Vista Grid" button
- [ ] All 8 candidate photos visible in grid cards
- [ ] Photos are large and circular (160px)
- [ ] Hover scale effect works
- [ ] "Ver Propuestas" button works

**Test CandidatePage:**
- [ ] Click any candidate from map or grid
- [ ] Large header photo displays (120-192px)
- [ ] Photo is rounded square (not circle)
- [ ] Border and shadow visible
- [ ] Scale-in animation plays on load

**Test ComparePage:**
- [ ] Navigate to /comparar
- [ ] All 8 candidate selector cards show photos
- [ ] Photos are small circles (64px)
- [ ] Selected state works (checkmark appears)
- [ ] Comparison view shows candidate names correctly

#### 7.2: Responsive Testing

**Mobile (375px):**
- [ ] Political map photos: 80px, clearly visible
- [ ] Grid photos: 120px, properly sized
- [ ] Candidate header: 120px, not oversized
- [ ] Touch targets adequate (44px minimum)

**Tablet (768px):**
- [ ] Political map photos: 96px
- [ ] Layout adapts properly
- [ ] No horizontal scrolling

**Desktop (1920px):**
- [ ] Political map photos: 128px
- [ ] Large candidate header: 192px
- [ ] All elements properly spaced

#### 7.3: Fallback Testing

**Test photo error handling:**
1. Open DevTools → Network tab
2. Block request to `/fotos/candidatos/jara-small.webp`
3. Verify initials "JJ" display instead
4. Check no console errors

- [ ] Fallback to initials works
- [ ] No broken image icons
- [ ] No JavaScript errors

#### 7.4: Accessibility Testing

**Keyboard navigation:**
1. Press Tab repeatedly
2. Focus should move through candidate photos
3. Focus indicators should be visible

- [ ] All photos focusable via keyboard
- [ ] Focus indicators visible (outline)
- [ ] Can activate photos with Enter/Space

**Screen reader testing (NVDA/JAWS):**
- [ ] Photos announced with descriptive alt text
- [ ] "Foto de Jeannette Jara, candidato presidencial de..."
- [ ] Links properly labeled

**Color contrast:**
- [ ] Ring colors visible on dark background
- [ ] Text readable on all backgrounds

#### 7.5: Performance Testing

**Run Lighthouse audit:**
```bash
npm run build
npm run preview
# Open http://localhost:4173 in Chrome
# DevTools → Lighthouse → Analyze page load
```

**Target scores:**
- [ ] Performance: > 90
- [ ] Accessibility: > 95
- [ ] Best Practices: > 90
- [ ] SEO: > 90

**Check metrics:**
- [ ] LCP (Largest Contentful Paint): < 2.5s
- [ ] CLS (Cumulative Layout Shift): < 0.1
- [ ] FID (First Input Delay): < 100ms

**Network analysis:**
- [ ] Photos load in WebP format (Chrome/Firefox)
- [ ] Photos cached on subsequent loads (304 status)
- [ ] Total page weight: < 1 MB
- [ ] 8 photos load in < 1 second total

---

## PHASE 2: POLITICAL MAP REFINEMENT (2-3 hours)

### Step 8: Verify Johannes Kaiser Data (30 minutes)

**Analyze Kaiser's positioning:**

```bash
cd D:/Desarrollos/elecciones/comparador-react
node -e "const data = require('./src/data/candidatos.json'); const k = data.kaiser; console.log('Seguridad:', k.categorias.seguridad.tendencia.valor); console.log('Migracion:', k.categorias.migracion.tendencia.valor); console.log('Social:', k.categorias.social.tendencia.valor);"
```

**Expected output:**
```
Seguridad: 65
Migracion: 65
Social: 65
```

**Analysis:**
- Kaiser's economic position: 95 (extreme right) ✓ Correct
- Kaiser's social position: 65 (statist/authoritarian)
  - Review his actual proposals in seguridad, migracion, social
  - If genuinely authoritarian on these issues, KEEP 65
  - If data error, UPDATE to 30-40 (more libertarian)

**Decision:**
- [ ] Reviewed Kaiser's proposals in detail
- [ ] Decision: KEEP 65 (authoritarian on security/migration)
- [ ] Decision: CHANGE to 35 (libertarian overall)
- [ ] Updated candidatos.json if changed
- [ ] Rationale documented

---

### Step 9: Adjust Anti-Overlap Algorithm (1 hour)

**File:** `D:\Desarrollos\elecciones\comparador-react\src\pages\HomePage.jsx`

#### 9.1: Increase Original Position Attraction

**Find this code (Line 432-433):**
```javascript
posiciones[i].x += dxOriginal * 0.05; // Reducido de 0.1 a 0.05
posiciones[i].y += dyOriginal * 0.05;
```

**Replace with:**
```javascript
posiciones[i].x += dxOriginal * 0.15; // Aumentado a 0.15 para mayor precisión
posiciones[i].y += dyOriginal * 0.15;
```

**Test visually:**
1. Reload http://localhost:5173
2. Observe candidate positions
3. Verify candidates stay closer to true political positions
4. Check no excessive overlapping

**Checklist:**
- [ ] ATRACCION_ORIGINAL changed to 0.15
- [ ] No overlap issues introduced
- [ ] Positions appear more accurate
- [ ] All candidates still visible

#### 9.2: Document Position Changes

**Before adjustment:**
```bash
node verificar-coords.cjs > positions-before.txt
```

**After adjustment:**
Take screenshot of political map, note visual differences

**Checklist:**
- [ ] Documented positions before change
- [ ] Documented positions after change
- [ ] Maximum drift < 10 points
- [ ] Political accuracy improved

---

### Step 10: Add Position Accuracy Indicators (OPTIONAL - 1.5 hours)

**This step is OPTIONAL. Only implement if you want users to see true positions.**

#### 10.1: Add State for True Positions

**File:** HomePage.jsx

**Add near line 6:**
```javascript
const [showTruePositions, setShowTruePositions] = useState(false);
```

#### 10.2: Add Toggle Button

**Add before MapaPolitico component (around line 230):**
```jsx
{view === 'mapa' && (
  <div className="flex justify-center mb-4">
    <button
      onClick={() => setShowTruePositions(!showTruePositions)}
      className="px-4 py-2 bg-slate-700/80 hover:bg-slate-600/80 text-slate-200 rounded-lg text-sm font-semibold transition-colors border border-slate-600/50"
    >
      {showTruePositions ? '✓ Mostrando Posiciones Exactas' : 'Ver Posiciones Exactas'}
    </button>
  </div>
)}
```

#### 10.3: Pass State to Component

**Update MapaPolitico call (around line 231):**
```jsx
<MapaPolitico
  candidatos={candidatosFiltrados}
  calcularPosicion={calcularPosicion}
  showTruePositions={showTruePositions}
/>
```

#### 10.4: Add Connection Lines

**In MapaPolitico component, after the <div className="relative w-full..."> (around line 456):**
```jsx
{/* True position indicators */}
{showTruePositions && (
  <svg className="absolute inset-0 pointer-events-none" style={{ zIndex: 5 }}>
    {candidatosConPosiciones.map(c => {
      const distX = Math.abs(c.x - c.originalX);
      const distY = Math.abs(c.y - c.originalY);
      const hasDrift = distX > 2 || distY > 2; // Only show if drifted > 2 points

      if (!hasDrift) return null;

      return (
        <g key={c.id}>
          {/* Connection line */}
          <line
            x1={`${c.originalX}%`}
            y1={`${c.originalY}%`}
            x2={`${c.x}%`}
            y2={`${c.y}%`}
            stroke="rgb(148, 163, 184)"
            strokeWidth="1.5"
            strokeDasharray="4 4"
            opacity="0.6"
          />
          {/* Original position dot */}
          <circle
            cx={`${c.originalX}%`}
            cy={`${c.originalY}%`}
            r="4"
            fill="rgb(148, 163, 184)"
            opacity="0.8"
          />
        </g>
      );
    })}
  </svg>
)}
```

**Checklist (if implemented):**
- [ ] Toggle button works
- [ ] Connection lines appear when toggled
- [ ] Lines connect adjusted position to true position
- [ ] Small dot marks true position
- [ ] Lines only shown for candidates with >2 point drift
- [ ] Lines don't interfere with interaction

---

### Step 11: Final Testing & Documentation (30 minutes)

#### 11.1: Political Accuracy Validation

**Visual inspection:**
- [ ] Left candidates (Artés, Jara) in left half of map
- [ ] Right candidates (Kast, Kaiser, Matthei) in right half
- [ ] Libertarian candidates (Artés, Kast, Parisi) in lower half
- [ ] Statist candidates (MEO, Matthei, Kaiser) in upper half
- [ ] Relative distances feel proportional

**Quantitative check:**
```bash
node verificar-coords.cjs
```

Verify output matches expected political science classifications.

#### 11.2: User Testing

**Ask 2-3 people to:**
1. Look at the political map
2. Identify where specific candidates are
3. Assess if positions "feel right" politically

**Feedback:**
- [ ] Positions intuitive
- [ ] No obvious misplacements
- [ ] Photos make candidates recognizable

#### 11.3: Documentation

**Update README.md:**
- [ ] Add section on photo system
- [ ] Document photo optimization process
- [ ] Explain political positioning methodology
- [ ] Add screenshots

**Create CHANGELOG entry:**
```markdown
## [1.1.0] - 2025-11-06

### Added
- Real candidate photos integrated across all views
- Photo optimization system (WebP + JPEG fallback)
- Improved political map accuracy (reduced drift to <10 points)
- True position indicators (optional toggle)

### Changed
- Replaced placeholder initials with professional candidate photos
- Refined anti-overlap algorithm (0.05 → 0.15 attraction)
- Enhanced accessibility with descriptive alt text

### Fixed
- Political map positioning now more scientifically accurate
- Responsive photo sizing across all breakpoints
```

**Checklist:**
- [ ] README updated
- [ ] CHANGELOG created/updated
- [ ] Code commented where complex
- [ ] UX audit document finalized

---

## COMPLETION CHECKLIST

### Phase 1: Photo Integration
- [ ] All 32 optimized photos generated
- [ ] candidatos.json updated with foto paths
- [ ] HomePage map photos implemented
- [ ] CandidatePage header photos implemented
- [ ] ComparePage selector photos implemented
- [ ] Grid view photos working
- [ ] All visual tests passed
- [ ] All accessibility tests passed
- [ ] Performance benchmarks met

### Phase 2: Political Map Refinement
- [ ] Kaiser data verified and corrected if needed
- [ ] Anti-overlap algorithm adjusted
- [ ] Position accuracy improved
- [ ] Optional true position indicators added (if desired)
- [ ] Political accuracy validated
- [ ] User testing completed

### Documentation & Deployment
- [ ] README updated
- [ ] CHANGELOG created
- [ ] Code committed to version control
- [ ] Production build tested
- [ ] Ready for deployment

---

## ROLLBACK INSTRUCTIONS

If issues occur during implementation:

**Restore candidatos.json:**
```bash
cp src/data/candidatos.json.backup src/data/candidatos.json
```

**Restore HomePage.jsx:**
```bash
cp src/pages/HomePage.jsx.backup src/pages/HomePage.jsx
```

**Remove optimized photos:**
```bash
rm -rf public/fotos/candidatos/
```

**Verify rollback:**
```bash
git status
git diff
```

---

## SUPPORT & TROUBLESHOOTING

### Issue: Photos not loading

**Check:**
1. Photo files exist: `ls public/fotos/candidatos/`
2. Paths correct in candidatos.json: `grep foto src/data/candidatos.json`
3. Browser console for 404 errors
4. Vite dev server restarted

**Solution:**
```bash
npm run dev  # Restart dev server
```

### Issue: WebP not working

**Check:**
1. Browser supports WebP: caniuse.com/webp
2. JPEG fallback working: DevTools → Network → Check image type
3. Picture element syntax correct

**Solution:**
Ensure `<picture>` element has both `<source type="image/webp">` and `<img src=".jpg">`.

### Issue: Performance degraded

**Check:**
1. Lighthouse performance score
2. Photo file sizes: `ls -lh public/fotos/candidatos/`
3. Lazy loading enabled for below-fold images

**Solution:**
Re-optimize photos with lower quality:
```javascript
// In optimize-photos.js, change:
const QUALITY = {
  webp: 70,  // Reduced from 80
  jpeg: 80   // Reduced from 85
};
```

### Issue: Political map overlapping

**Check:**
1. ATRACCION_ORIGINAL value (should be 0.15)
2. FUERZA_REPULSION value (should be 3.5)
3. ITERACIONES value (should be 100)

**Solution:**
Increase DISTANCIA_MINIMA or reduce FUERZA_REPULSION.

---

## ESTIMATED TIMELINE

| Task | Time | Cumulative |
|------|------|------------|
| Install dependencies | 5 min | 0:05 |
| Optimize photos | 15 min | 0:20 |
| Update candidatos.json | 10 min | 0:30 |
| Update HomePage.jsx | 45 min | 1:15 |
| Update CandidatePage.jsx | 30 min | 1:45 |
| Update ComparePage.jsx | 30 min | 2:15 |
| Testing & validation | 45 min | 3:00 |
| **PHASE 1 TOTAL** | **3:00** | **3:00** |
| Verify Kaiser data | 30 min | 3:30 |
| Adjust anti-overlap | 1:00 | 4:30 |
| Optional indicators | 1:30 | 6:00 |
| Final testing | 30 min | 6:30 |
| **PHASE 2 TOTAL** | **3:00** | **6:30** |
| **GRAND TOTAL** | **6:30** | - |

---

**Document Version:** 1.0
**Last Updated:** November 6, 2025
**Prepared by:** Claude (Anthropic) - UX Design Expert
