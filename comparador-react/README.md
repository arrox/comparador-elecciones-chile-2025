# Comparador Elecciones Chile 2025 - Versión React

## 🎯 Comparador Interactivo de Propuestas Presidenciales

Plataforma web moderna y neutral para comparar las propuestas de los 8 candidatos presidenciales de Chile 2025. Permite a los ciudadanos tomar decisiones informadas mediante herramientas interactivas de análisis y comparación.

## ✨ Funcionalidades Principales

### ✅ Funcionalidades Implementadas

#### 1. **Página Principal con Mapa Político 2D**
- 🗺️ Visualización interactiva de candidatos en ejes Izquierda-Derecha / Estatista-Libertario
- 📋 Vista alternativa en grid con tarjetas de candidatos
- 🔍 Sistema de búsqueda y filtros avanzados:
  - Búsqueda por nombre o partido
  - Filtro por tags de orientación política
  - Filtro por posición económica (rango 0-100)
- 📊 Contador de resultados en tiempo real

#### 2. **Páginas Individuales de Candidatos**
- 📑 6 tabs organizados por categoría (Economía, Seguridad, Migración, Salud, Social, Tecnología)
- 📈 Visualizador de tendencia política por categoría (slider 0-100)
- 📝 155 propuestas totales expandibles con:
  - 🎯 Contexto y problema que resuelven
  - ✓ Puntos a verificar con fact-checking
  - ⚠️ Desafíos y riesgos de implementación
- 🏷️ Tags de orientación política

#### 3. **Calculadora de Afinidad Política (Quiz)**
- 🎯 25 preguntas distribuidas en 6 categorías
- 🧮 Algoritmo de cálculo de afinidad basado en distancia euclidiana
- 🥇 Podio con Top 3 candidatos más afines
- 📊 Ranking completo con porcentajes de afinidad (0-100%)
- 🔄 Posibilidad de reiniciar el quiz
- 🔗 Links directos a propuestas de cada candidato

#### 4. **Comparador Lado a Lado**
- 👥 Selección de 2-3 candidatos para comparar
- 📊 Comparación de posicionamiento político por categoría
- 📋 Propuestas alineadas lado a lado
- 🔍 Propuestas expandibles con toda la información
- 🎨 Interfaz visual clara y fácil de entender

### 📋 Por Implementar
- [ ] Modo oscuro con toggle
- [ ] Histórico de encuestas con gráficos (Chart.js)
- [ ] Análisis de sentimiento en RRSS
- [ ] Sistema de favoritos con localStorage
- [ ] Compartir resultados en redes sociales
- [ ] Exportar comparaciones a PDF

## 🛠️ Stack Tecnológico

- **Frontend**: React 18 + Vite
- **Estilos**: TailwindCSS
- **Routing**: React Router 6
- **Estado**: Zustand
- **Gráficos**: Chart.js + React-Chartjs-2
- **Búsqueda**: Fuse.js
- **PDF**: jsPDF
- **Hosting**: Vercel (planeado)

## 🏃 Ejecutar Localmente

```bash
# Instalar dependencias
npm install

# Modo desarrollo
npm run dev

# Build para producción
npm run build

# Preview de producción
npm run preview
```

## 📦 Estructura de Datos

### Candidatos y Propuestas
```
📁 src/data/
├── candidatos.json (196 KB)
│   ├── 8 candidatos presidenciales
│   ├── 6 categorías por candidato
│   ├── 155 propuestas totales
│   └── Promedio de 3-4 propuestas por categoría
│
└── preguntas-quiz.json
    ├── 25 preguntas políticas
    ├── 4 opciones por pregunta
    └── Pesos calculados (0-100)
```

### Categorías de Análisis
1. 💰 **Economía** - Rol del Estado, impuestos, empresas estatales, pensiones
2. 🛡️ **Seguridad** - Penas de prisión, FFAA, protestas, porte de armas
3. 🌎 **Migración** - Política migratoria, irregulares, frontera norte
4. 🏥 **Salud** - Sistema de salud, farmacéutica, eutanasia, listas de espera
5. 👥 **Social** - Matrimonio igualitario, aborto, marihuana, educación sexual, educación superior
6. 💻 **Tecnología** - IA, datos personales, infraestructura digital, Big Tech, gobierno digital

### Candidatos Incluidos
- **Jeannette Jara** (Unidad por Chile - PCCh)
- **Evelyn Matthei** (Chile Vamos - UDI)
- **José Antonio Kast** (Partido Republicano)
- **Johannes Kaiser** (Partido Libertario)
- **Franco Parisi** (Partido de la Gente)
- **Marco Enríquez-Ominami** (Partido Progresista)
- **Harold Mayne-Nicholls** (Independiente)
- **Eduardo Artés** (Unión Patriótica)

## 🎯 Objetivos del Proyecto

1. **Informar** 📰: Proporcionar información neutral y completa sobre candidatos
2. **Comparar** 📊: Facilitar comparación directa de propuestas
3. **Educar** 🎓: Ayudar a ciudadanos a tomar decisiones informadas
4. **Verificar** ✓: Incluir fact-checking y fuentes verificables
5. **Democratizar** 🗳️: Acceso gratuito y sin sesgos políticos

## 📄 Licencia

Proyecto de código abierto para uso educativo y democrático.

## 👥 Contribuciones

Las contribuciones son bienvenidas. Este proyecto busca mantener neutralidad política y rigor analítico.

---

**Última actualización**: Noviembre 2024
