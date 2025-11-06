# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a single-file interactive web application for comparing Chilean presidential candidates' proposals for the 2025 elections. The application displays 8 candidates with detailed policy positions across 6 categories (economía, seguridad, migración, salud, educación, medio ambiente).

**File:** `comparador-elecciones-chile-2025.html`
- Single-page application (no build process)
- Self-contained: HTML + CSS + JavaScript
- Uses TailwindCSS via CDN
- No external dependencies or frameworks

## Architecture

### Data Structure

The application centers around the `CANDIDATOS` object (line ~198), which contains all candidate data:

```javascript
CANDIDATOS = {
  candidateId: {
    nombre: string,
    partido: string,
    imagen: string (URL),
    tags: string[],
    categorias: {
      categoryName: {
        tendencia: {
          etiqueta: string,
          izq: string,      // Left label
          der: string,      // Right label
          valor: number     // 0-100 scale position
        },
        propuestas: [{
          titulo: string,
          detalle: string,
          verificar: string[],     // Fact-checking points
          problema: string,
          desafios: string[]
        }]
      }
    }
  }
}
```

### Categories (6 total)
- `economia` - Economic policies
- `seguridad` - Security/public safety
- `migracion` - Immigration policy
- `salud` - Healthcare system
- `educacion` - Education system
- `medio ambiente` - Environment/climate

### View System

Two-view architecture controlled by `mostrarVista()` (line ~802):
1. **Overview** (`#view-overview`) - Grid of candidate cards
2. **Dashboard** (`#view-dashboard`) - Detailed candidate comparison with tabs

### Key Functions

- `renderizarCards()` (line ~816) - Generates candidate grid for overview
- `renderizarDashboard()` (line ~846) - Generates detailed dashboard with category tabs and proposals
- `abrirModal(prop)` (line ~938) - Opens modal with full proposal details (4-section analysis)
- `cerrarModal()` (line ~962) - Closes proposal modal
- `escapar(txt)` (line ~796) - XSS protection for rendering user data

### State Management

Global variables track application state:
- `candidatoActual` - Currently selected candidate ID
- `categoriaActual` - Currently selected category name

### Modal Structure

4-section analysis for each proposal:
1. **Titular** - Proposal headline
2. **Detalle del Programa** - Detailed program description
3. **Puntos Clave a Verificar** - Fact-checking points (citizen verification)
4. **Análisis de Aplicabilidad** - Implementation analysis
   - Problema a Resolver (problem statement)
   - Desafíos de Implementación (implementation challenges)

## Development Workflow

### Running the Application
```bash
# Open directly in browser (no server required)
start comparador-elecciones-chile-2025.html

# OR use a local server for testing
python -m http.server 8000
# Then navigate to http://localhost:8000/comparador-elecciones-chile-2025.html
```

### Testing Changes
No build process - simply refresh the browser after making changes.

### Adding a New Candidate

1. Add entry to `CANDIDATOS` object following the existing structure
2. Include all 6 categories with at least one `propuesta` each
3. Ensure `tendencia.valor` is between 0-100
4. Use placeholder image or actual photo URL
5. Test both overview card and dashboard view

### Adding a New Category

1. Add category to all candidate objects in `CANDIDATOS`
2. Update `renderizarDashboard()` to include new tab
3. Ensure category follows same structure as existing ones
4. Add appropriate tendencia labels (izq/der)

### Modifying Styles

All CSS is in `<style>` tag (lines ~9-53):
- Tailwind utility classes via CDN
- Custom CSS for animations, cards, tabs, modals
- Gradient backgrounds and hover effects

## Data Integrity

**Critical:** All candidate data is embedded in the HTML file. Changes to proposals, fact-checking points, or analysis require editing the `CANDIDATOS` object directly.

### Validation Checklist
- Each candidate must have all 6 categories
- Each category must have `tendencia` object
- Each `propuesta` must include: titulo, detalle, verificar[], problema, desafios[]
- Tendency values must be 0-100 (0=left, 100=right)
- Image URLs must be valid

## Security Considerations

- XSS prevention: All user-facing text is escaped via `escapar()` function
- No user input or form submissions
- Read-only data presentation
- Static content delivery

## Political Neutrality

The application presents factual analysis without bias:
- Fact-checking points highlight verifiable claims
- Implementation challenges show realistic obstacles
- Tendency scale shows ideological position objectively
- Disclaimer text included in modal footer
