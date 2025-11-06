import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import candidatosData from '../data/candidatos.json';

export default function HomePage() {
  const [view, setView] = useState('mapa');
  const [busqueda, setBusqueda] = useState('');
  const [filtroTags, setFiltroTags] = useState([]);
  const [filtroEje, setFiltroEje] = useState({ min: 0, max: 100 });
  const [filtrosAbiertos, setFiltrosAbiertos] = useState(false);

  const candidatos = Object.entries(candidatosData).map(([id, data]) => ({
    id,
    ...data
  }));

  // Calcular posición en mapa político
  const calcularPosicion = (candidato) => {
    const categorias = candidato.categorias;
    const ejeX = categorias.economia.tendencia.valor;
    const categoriasEjeY = ['seguridad', 'migracion', 'social'];
    const valoresY = categoriasEjeY.map(cat => categorias[cat].tendencia.valor);
    const ejeY = valoresY.reduce((a, b) => a + b, 0) / valoresY.length;

    return {
      x: ejeX,
      y: 100 - ejeY
    };
  };

  // Obtener todos los tags únicos
  const todosLosTags = useMemo(() => {
    const tags = new Set();
    candidatos.forEach(c => c.tags.forEach(tag => tags.add(tag)));
    return Array.from(tags).sort();
  }, []);

  // Filtrar candidatos
  const candidatosFiltrados = useMemo(() => {
    return candidatos.filter(candidato => {
      const matchBusqueda = busqueda === '' ||
        candidato.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
        candidato.partido.toLowerCase().includes(busqueda.toLowerCase());

      const matchTags = filtroTags.length === 0 ||
        filtroTags.some(tag => candidato.tags.includes(tag));

      const ejeX = candidato.categorias.economia.tendencia.valor;
      const matchEje = ejeX >= filtroEje.min && ejeX <= filtroEje.max;

      return matchBusqueda && matchTags && matchEje;
    });
  }, [candidatos, busqueda, filtroTags, filtroEje]);

  const toggleTag = (tag) => {
    if (filtroTags.includes(tag)) {
      setFiltroTags(filtroTags.filter(t => t !== tag));
    } else {
      setFiltroTags([...filtroTags, tag]);
    }
  };

  const limpiarFiltros = () => {
    setBusqueda('');
    setFiltroTags([]);
    setFiltroEje({ min: 0, max: 100 });
  };

  const hayFiltrosActivos = busqueda !== '' || filtroTags.length > 0 || filtroEje.min !== 0 || filtroEje.max !== 100;
  const cantidadFiltrosActivos = [busqueda !== '', filtroTags.length > 0, (filtroEje.min !== 0 || filtroEje.max !== 100)].filter(Boolean).length;

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Moderno con Paleta Pastel Agradable */}
        <header className="relative overflow-hidden rounded-3xl mb-16 animate-fadeIn shadow-xl shadow-indigo-100/50">
          {/* Fondo con gradiente suave tipo Hawaii/Georgia */}
          <div className="relative bg-gradient-to-br from-sky-400 via-indigo-400 to-violet-500 px-8 py-20 md:py-24">
            {/* Patrón sutil de ondas */}
            <div className="absolute inset-0 opacity-[0.07]">
              <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="wave" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                    <path d="M0 50 Q 25 25, 50 50 T 100 50" stroke="white" strokeWidth="2" fill="none"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#wave)"/>
              </svg>
            </div>

            {/* Formas decorativas suaves */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-yellow-300/20 to-orange-300/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-pink-300/20 to-rose-300/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

            {/* Contenido */}
            <div className="relative z-10 text-center">
              {/* Badge con diseño más suave */}
              <div className="inline-flex items-center gap-2 bg-white/25 backdrop-blur-sm px-5 py-2.5 rounded-full mb-8 border-2 border-white/40 shadow-lg">
                <span className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-pulse shadow-sm"></span>
                <span className="text-white text-sm font-bold tracking-wide">Datos Actualizados · 2025</span>
              </div>

              {/* Título Principal con mejor jerarquía */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 tracking-tight leading-[1.1]" style={{ fontFamily: 'Outfit, sans-serif' }}>
                Elecciones Presidenciales
                <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl bg-clip-text text-transparent bg-gradient-to-r from-amber-200 via-yellow-100 to-white mt-3 drop-shadow-lg">
                  Chile 2025
                </span>
              </h1>

              {/* Subtítulo con mejor espaciado */}
              <p className="text-lg md:text-xl lg:text-2xl text-white font-medium mb-10 max-w-2xl mx-auto leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
                Información clara y verificada para tomar decisiones informadas
              </p>

              {/* Stats Cards con mejor espaciado */}
              <div className="flex flex-wrap justify-center gap-6 mb-12">
                <div className="group bg-white/15 hover:bg-white/25 backdrop-blur-md px-8 py-4 rounded-3xl border-2 border-white/40 transition-all duration-300 hover:scale-105 hover:shadow-2xl shadow-lg">
                  <div className="flex items-center gap-4">
                    <div className="text-4xl">👥</div>
                    <div className="text-left">
                      <div className="text-3xl font-black text-white">8</div>
                      <div className="text-sm text-white/90 font-semibold tracking-wide">Candidatos</div>
                    </div>
                  </div>
                </div>

                <div className="group bg-white/15 hover:bg-white/25 backdrop-blur-md px-8 py-4 rounded-3xl border-2 border-white/40 transition-all duration-300 hover:scale-105 hover:shadow-2xl shadow-lg">
                  <div className="flex items-center gap-4">
                    <div className="text-4xl">📋</div>
                    <div className="text-left">
                      <div className="text-3xl font-black text-white">6</div>
                      <div className="text-sm text-white/90 font-semibold tracking-wide">Categorías</div>
                    </div>
                  </div>
                </div>

                <div className="group bg-white/15 hover:bg-white/25 backdrop-blur-md px-8 py-4 rounded-3xl border-2 border-white/40 transition-all duration-300 hover:scale-105 hover:shadow-2xl shadow-lg">
                  <div className="flex items-center gap-4">
                    <div className="text-4xl">✅</div>
                    <div className="text-left">
                      <div className="text-3xl font-black text-white">155</div>
                      <div className="text-sm text-white/90 font-semibold tracking-wide">Propuestas</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA Buttons con más espacio */}
              <div className="flex flex-wrap justify-center gap-5">
                <a href="#mapa" className="group inline-flex items-center gap-3 bg-white text-indigo-600 px-10 py-5 rounded-2xl font-bold text-lg hover:bg-indigo-50 transition-all duration-300 hover:scale-[1.02] shadow-2xl shadow-black/20">
                  <span>Ver Mapa Político</span>
                  <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>

                <Link to="/quiz" className="group inline-flex items-center gap-3 bg-white/15 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-white/25 backdrop-blur-md border-2 border-white/40 transition-all duration-300 hover:scale-[1.02] shadow-2xl shadow-black/20">
                  <span>Test de Afinidad</span>
                  <span className="text-2xl group-hover:rotate-12 transition-transform">🎯</span>
                </Link>
              </div>
            </div>
          </div>
        </header>

        {/* Banners de Acción Informativos - Tema Claro */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          {/* Banner Calculadora */}
          <Link
            to="/quiz"
            className="group relative bg-white rounded-2xl p-8 border-2 border-violet-200 hover:border-violet-400 transition-all duration-300 hover:shadow-2xl hover:shadow-violet-200/50 hover:-translate-y-1"
          >
            <div className="flex items-start gap-6">
              <div className="text-6xl flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                🎯
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-slate-900 mb-3" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  Encuentra tu Candidato Ideal
                </h3>
                <p className="text-slate-600 text-base mb-4 leading-relaxed">
                  Responde 20 preguntas sobre tus posturas políticas y descubre qué candidatos se alinean mejor con tus valores e ideas.
                </p>
                <div className="inline-flex items-center gap-2 bg-violet-50 px-3 py-1.5 rounded-full text-sm text-violet-700 mb-4 font-medium border border-violet-200">
                  <span className="text-violet-600">✓</span>
                  Compara con 8 candidatos en 6 categorías
                </div>
                <div className="flex items-center gap-2 text-violet-600 font-semibold group-hover:gap-3 transition-all">
                  <span>Comenzar Test de Afinidad</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </div>
            </div>
          </Link>

          {/* Banner Comparar */}
          <Link
            to="/comparar"
            className="group relative bg-white rounded-2xl p-8 border-2 border-sky-200 hover:border-sky-400 transition-all duration-300 hover:shadow-2xl hover:shadow-sky-200/50 hover:-translate-y-1"
          >
            <div className="flex items-start gap-6">
              <div className="text-6xl flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                📊
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-slate-900 mb-3" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  Compara Propuestas Lado a Lado
                </h3>
                <p className="text-slate-600 text-base mb-4 leading-relaxed">
                  Selecciona 2 o más candidatos para ver sus posiciones sobre economía, seguridad, educación y más en un formato fácil de leer.
                </p>
                <div className="inline-flex items-center gap-2 bg-sky-50 px-3 py-1.5 rounded-full text-sm text-sky-700 mb-4 font-medium border border-sky-200">
                  <span className="text-sky-600">✓</span>
                  155 propuestas analizadas y verificadas
                </div>
                <div className="flex items-center gap-2 text-sky-600 font-semibold group-hover:gap-3 transition-all">
                  <span>Iniciar Comparación</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Layout de 2 Columnas: Contenido + Filtros */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Contenido Principal (75%) */}
          <div className="flex-1 lg:w-3/4">
            {/* Botón de filtros móvil */}
            <div className="lg:hidden mb-4">
              <button
                onClick={() => setFiltrosAbiertos(!filtrosAbiertos)}
                className="w-full bg-white text-slate-700 px-4 py-3 rounded-xl border-2 border-slate-200 font-semibold flex items-center justify-between hover:border-violet-300 transition-all shadow-sm"
              >
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                  </svg>
                  Filtros
                  {cantidadFiltrosActivos > 0 && (
                    <span className="bg-violet-500 text-white text-xs px-2 py-0.5 rounded-full">
                      {cantidadFiltrosActivos}
                    </span>
                  )}
                </span>
                <svg className={`w-5 h-5 transition-transform ${filtrosAbiertos ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>

            {/* Toggle Vista */}
            <div className="flex justify-center gap-3 mb-6">
              <button
                onClick={() => setView('mapa')}
                className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                  view === 'mapa'
                    ? 'bg-violet-600 text-white shadow-lg shadow-violet-200'
                    : 'bg-white text-slate-600 hover:bg-slate-50 border-2 border-slate-200'
                }`}
              >
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                  Mapa Político
                </span>
              </button>
              <button
                onClick={() => setView('grid')}
                className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                  view === 'grid'
                    ? 'bg-violet-600 text-white shadow-lg shadow-violet-200'
                    : 'bg-white text-slate-600 hover:bg-slate-50 border-2 border-slate-200'
                }`}
              >
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                  Vista Grid
                </span>
              </button>
            </div>

            {/* Contenido según vista */}
            {candidatosFiltrados.length > 0 ? (
              view === 'mapa' ? (
                <MapaPolitico candidatos={candidatosFiltrados} calcularPosicion={calcularPosicion} />
              ) : (
                <GridCandidatos candidatos={candidatosFiltrados} />
              )
            ) : (
              <div className="bg-white rounded-3xl shadow-lg p-12 text-center border-2 border-indigo-100">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">
                  No se encontraron candidatos
                </h3>
                <p className="text-slate-600 mb-6 text-base">
                  Intenta ajustar los filtros de búsqueda
                </p>
                <button
                  onClick={limpiarFiltros}
                  className="px-8 py-3 bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-600 hover:to-violet-600 text-white rounded-xl font-semibold transition-all shadow-md hover:shadow-lg"
                >
                  Limpiar filtros
                </button>
              </div>
            )}
          </div>

          {/* Sidebar de Filtros (25%) */}
          <aside className={`lg:w-1/4 ${filtrosAbiertos ? 'block' : 'hidden lg:block'}`}>
            <div className="lg:sticky lg:top-6 bg-white rounded-3xl p-6 border-2 border-indigo-100 space-y-6 shadow-lg">
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b-2 border-indigo-100">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                  </svg>
                  Filtros
                </h3>
                {hayFiltrosActivos && (
                  <button
                    onClick={limpiarFiltros}
                    className="text-xs text-red-500 hover:text-red-600 font-semibold"
                  >
                    Limpiar
                  </button>
                )}
              </div>

              {/* Búsqueda */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Búsqueda
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Nombre o partido..."
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    className="w-full px-4 py-2.5 bg-indigo-50 border-2 border-indigo-200 rounded-lg focus:border-indigo-400 focus:outline-none text-slate-900 placeholder-slate-500 text-sm"
                  />
                  {busqueda && (
                    <button
                      onClick={() => setBusqueda('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>

              {/* Tags */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Orientación Política
                </label>
                <div className="flex flex-wrap gap-2">
                  {todosLosTags.map(tag => (
                    <button
                      key={tag}
                      onClick={() => toggleTag(tag)}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                        filtroTags.includes(tag)
                          ? 'bg-indigo-600 text-white ring-2 ring-indigo-300'
                          : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200'
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Eje Económico */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Posición Económica
                </label>
                <div className="space-y-3">
                  <div className="flex justify-between text-xs text-slate-600 font-medium">
                    <span>Izquierda</span>
                    <span>Derecha</span>
                  </div>
                  <div className="space-y-2">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={filtroEje.min}
                      onChange={(e) => setFiltroEje({ ...filtroEje, min: Number(e.target.value) })}
                      className="w-full accent-indigo-500"
                    />
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={filtroEje.max}
                      onChange={(e) => setFiltroEje({ ...filtroEje, max: Number(e.target.value) })}
                      className="w-full accent-indigo-500"
                    />
                  </div>
                  <div className="flex justify-between text-xs text-slate-600 font-mono bg-indigo-50 px-3 py-2 rounded-lg">
                    <span className="font-bold">{filtroEje.min}</span>
                    <span>—</span>
                    <span className="font-bold">{filtroEje.max}</span>
                  </div>
                </div>
              </div>

              {/* Contador */}
              <div className="pt-4 border-t-2 border-indigo-100">
                <div className="text-center">
                  <p className="text-sm text-slate-600">
                    Mostrando{' '}
                    <span className="text-indigo-600 font-bold text-lg">
                      {candidatosFiltrados.length}
                    </span>
                    {' '}de{' '}
                    <span className="font-semibold text-slate-900">
                      {candidatos.length}
                    </span>
                    {' '}candidatos
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

// Componente Mapa Político Mejorado con Fotos Reales
function MapaPolitico({ candidatos, calcularPosicion }) {
  // Algoritmo de ajuste de posiciones con repulsión MEJORADO
  const ajustarPosicionesConRepulsion = (candidatos, calcularPosicion) => {
    const RADIO_AVATAR = 32; // Reducido para no tapar leyendas
    const DISTANCIA_MINIMA = RADIO_AVATAR * 3.0; // Separación moderada
    const ITERACIONES = 50; // Menos iteraciones = menos movimiento
    const FUERZA_REPULSION = 2.5; // Fuerza moderada

    let posiciones = candidatos.map(c => {
      const pos = calcularPosicion(c);
      return {
        ...c,
        x: pos.x,
        y: pos.y,
        originalX: pos.x,
        originalY: pos.y
      };
    });

    for (let iter = 0; iter < ITERACIONES; iter++) {
      const fuerzas = posiciones.map(() => ({ fx: 0, fy: 0 }));

      for (let i = 0; i < posiciones.length; i++) {
        for (let j = i + 1; j < posiciones.length; j++) {
          const dx = posiciones[j].x - posiciones[i].x;
          const dy = posiciones[j].y - posiciones[i].y;
          const distancia = Math.sqrt(dx * dx + dy * dy);

          if (distancia < DISTANCIA_MINIMA && distancia > 0) {
            const fuerza = (DISTANCIA_MINIMA - distancia) / distancia * FUERZA_REPULSION;
            const fx = (dx / distancia) * fuerza;
            const fy = (dy / distancia) * fuerza;

            fuerzas[i].fx -= fx;
            fuerzas[i].fy -= fy;
            fuerzas[j].fx += fx;
            fuerzas[j].fy += fy;
          }
        }
      }

      for (let i = 0; i < posiciones.length; i++) {
        posiciones[i].x += fuerzas[i].fx;
        posiciones[i].y += fuerzas[i].fy;

        // Fuerte atracción a posición original para mantener precisión política
        const dxOriginal = posiciones[i].originalX - posiciones[i].x;
        const dyOriginal = posiciones[i].originalY - posiciones[i].y;
        posiciones[i].x += dxOriginal * 0.25; // 25% de atracción = máxima precisión
        posiciones[i].y += dyOriginal * 0.25;

        // Límites del mapa con más margen para leyendas
        posiciones[i].x = Math.max(12, Math.min(88, posiciones[i].x));
        posiciones[i].y = Math.max(12, Math.min(88, posiciones[i].y));
      }
    }

    return posiciones;
  };

  const candidatosConPosiciones = ajustarPosicionesConRepulsion(candidatos, calcularPosicion);

  return (
    <div className="bg-white rounded-3xl shadow-xl p-8 border-2 border-indigo-100">
      <h2 className="text-3xl font-bold text-slate-900 mb-6 text-center flex items-center justify-center gap-3" style={{ fontFamily: 'Outfit, sans-serif' }}>
        <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
        </svg>
        Mapa de Posicionamiento Político
      </h2>

      {/* Gráfico 2D */}
      <div className="relative w-full min-h-[600px] h-[700px] rounded-2xl overflow-hidden shadow-lg border-2 border-indigo-200">
        {/* Fondo con gradientes pastel suaves */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
          <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-gradient-to-br from-rose-100/40 to-pink-100/20"></div>
          <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-sky-100/40 to-blue-100/20"></div>
          <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-rose-100/30 to-pink-50/10"></div>
          <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-sky-100/30 to-blue-50/10"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/3 h-1/3 bg-violet-200/20 rounded-full blur-3xl"></div>
        </div>

        {/* Grid lines sutiles */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-0 right-0 h-px bg-indigo-200/40"></div>
          <div className="absolute top-3/4 left-0 right-0 h-px bg-indigo-200/40"></div>
          <div className="absolute left-1/4 top-0 bottom-0 w-px bg-indigo-200/40"></div>
          <div className="absolute left-3/4 top-0 bottom-0 w-px bg-indigo-200/40"></div>
        </div>

        {/* Ejes principales */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="absolute w-full h-px bg-gradient-to-r from-rose-400/50 via-violet-400/50 to-sky-400/50"></div>
          <div className="absolute h-full w-px bg-gradient-to-b from-indigo-400/50 via-violet-400/50 to-indigo-300/40"></div>
        </div>

        {/* Labels de ejes */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full border-2 border-indigo-200 shadow-sm">
          <span className="text-xs font-bold text-slate-700">Estatista</span>
        </div>
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full border-2 border-indigo-200 shadow-sm">
          <span className="text-xs font-bold text-slate-700">Libertario</span>
        </div>
        <div className="absolute left-4 top-1/2 -translate-y-1/2 bg-rose-50/90 backdrop-blur-md px-4 py-2 rounded-full border-2 border-rose-300 shadow-sm">
          <span className="text-xs font-bold text-rose-700">Izquierda</span>
        </div>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 bg-sky-50/90 backdrop-blur-md px-4 py-2 rounded-full border-2 border-sky-300 shadow-sm">
          <span className="text-xs font-bold text-sky-700">Derecha</span>
        </div>

        {/* Labels de cuadrantes */}
        <div className="absolute top-12 left-12 text-xs font-semibold text-slate-600 bg-white/60 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-sm">
          Izq. Estatista
        </div>
        <div className="absolute top-12 right-12 text-xs font-semibold text-slate-600 bg-white/60 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-sm">
          Der. Estatista
        </div>
        <div className="absolute bottom-12 left-12 text-xs font-semibold text-slate-600 bg-white/60 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-sm">
          Izq. Libertaria
        </div>
        <div className="absolute bottom-12 right-12 text-xs font-semibold text-slate-600 bg-white/60 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-sm">
          Der. Libertaria
        </div>

        {/* Candidatos con fotos reales */}
        {candidatosConPosiciones.map((candidato) => {
          const tendencia = candidato.categorias.economia.tendencia.valor;
          const ringColor = tendencia < 33
            ? 'ring-rose-400'
            : tendencia < 66
            ? 'ring-violet-400'
            : 'ring-sky-400';

          // Determinar si el tooltip debe ir arriba o abajo según posición Y
          const tooltipAbajo = candidato.y < 50;
          const tooltipClasses = tooltipAbajo
            ? 'top-full mt-4 group-hover:-translate-y-1'
            : 'bottom-full mb-4 group-hover:translate-y-1';
          const arrowClasses = tooltipAbajo
            ? '-top-1.5 rotate-45 border-t border-l'
            : '-bottom-1.5 rotate-[225deg] border-b border-r';

          return (
            <Link
              key={candidato.id}
              to={`/candidato/${candidato.id}`}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 group z-10"
              style={{
                left: `${candidato.x}%`,
                top: `${candidato.y}%`
              }}
            >
              <div className="relative">
                {/* Glow sutil en hover */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-300/30 to-violet-400/30 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Foto del candidato con WebP/JPEG fallback */}
                <div className="relative">
                  {candidato.foto ? (
                    <>
                      <picture>
                        <source
                          srcSet={candidato.foto.replace('.webp', '-small.webp')}
                          type="image/webp"
                        />
                        <source
                          srcSet={candidato.foto.replace('.webp', '-small.jpg')}
                          type="image/jpeg"
                        />
                        <img
                          src={candidato.foto.replace('.webp', '-small.jpg')}
                          alt={`${candidato.nombre} - Candidato presidencial Chile 2025`}
                          className={`
                            relative w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20
                            rounded-full object-cover
                            ring-4 ${ringColor} ring-offset-2 ring-offset-white
                            group-hover:ring-6 group-hover:scale-110
                            transition-all duration-300
                            shadow-lg group-hover:shadow-xl
                            cursor-pointer
                            bg-white
                          `}
                          onError={(e) => {
                            e.target.parentElement.parentElement.style.display = 'none';
                            e.target.parentElement.parentElement.nextElementSibling.style.display = 'flex';
                          }}
                          loading="eager"
                        />
                      </picture>
                      {/* Fallback a iniciales si fallan todas las fotos */}
                      <div
                        className={`
                          hidden w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20
                          rounded-full bg-gradient-to-br from-indigo-400 to-violet-500
                          items-center justify-center
                          text-white font-black text-base sm:text-lg lg:text-xl
                          ring-4 ${ringColor} ring-offset-2 ring-offset-white
                          group-hover:ring-6 group-hover:scale-110
                          transition-all duration-300
                          shadow-lg group-hover:shadow-xl
                          cursor-pointer
                        `}
                        style={{ fontFamily: 'Outfit, sans-serif' }}
                      >
                        {candidato.nombre.split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </div>
                    </>
                  ) : (
                    /* Si no hay foto en datos, mostrar iniciales directamente */
                    <div
                      className={`
                        w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20
                        rounded-full bg-gradient-to-br from-indigo-400 to-violet-500
                        flex items-center justify-center
                        text-white font-black text-base sm:text-lg lg:text-xl
                        ring-4 ${ringColor} ring-offset-2 ring-offset-white
                        group-hover:ring-6 group-hover:scale-110
                        transition-all duration-300
                        shadow-lg group-hover:shadow-xl
                        cursor-pointer
                      `}
                      style={{ fontFamily: 'Outfit, sans-serif' }}
                    >
                      {candidato.nombre.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </div>
                  )}
                </div>

                {/* Tooltip mejorado con información completa - posición dinámica */}
                <div className={`absolute ${tooltipClasses} left-1/2 -translate-x-1/2 bg-white/98 backdrop-blur-xl px-5 py-4 rounded-xl shadow-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap z-[100] border-2 border-indigo-200 min-w-[220px] pointer-events-none`}>
                  <p className="font-bold text-slate-900 text-lg mb-1" style={{ fontFamily: 'Outfit, sans-serif' }}>
                    {candidato.nombre}
                  </p>
                  <p className="text-xs text-slate-600 mb-3">{candidato.partido}</p>
                  <div className="flex gap-1.5 flex-wrap mb-3">
                    {candidato.tags.slice(0, 3).map((tag, idx) => (
                      <span key={idx} className="text-xs bg-indigo-100 px-2.5 py-1 rounded-full text-indigo-700 font-medium border border-indigo-200">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="text-xs text-slate-600 border-t border-indigo-100 pt-2 mt-2">
                    <div className="flex justify-between">
                      <span>Total propuestas:</span>
                      <span className="font-bold text-slate-900">
                        {Object.values(candidato.categorias).reduce((acc, cat) => acc + cat.propuestas.length, 0)}
                      </span>
                    </div>
                  </div>
                  {/* Flecha del tooltip - posición dinámica */}
                  <div className={`absolute ${arrowClasses} left-1/2 -translate-x-1/2 w-3 h-3 bg-white/98 border-indigo-200`}></div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Leyenda */}
      <div className="mt-8 text-center space-y-2">
        <p className="text-sm text-slate-600 font-medium">
          Posición calculada según promedio de tendencias en las 6 categorías
        </p>
        <p className="text-sm text-slate-500">
          Haz clic en un candidato para ver sus propuestas detalladas
        </p>
      </div>
    </div>
  );
}

// Componente Grid de Candidatos
function GridCandidatos({ candidatos }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {candidatos.map((candidato) => {
        const tendenciaEconomica = candidato.categorias.economia.tendencia.valor;
        const colorClasses = tendenciaEconomica < 33
          ? 'from-rose-400 to-pink-400'
          : tendenciaEconomica < 66
          ? 'from-violet-400 to-purple-400'
          : 'from-sky-400 to-blue-400';

        const borderColor = tendenciaEconomica < 33
          ? 'border-rose-200'
          : tendenciaEconomica < 66
          ? 'border-violet-200'
          : 'border-sky-200';

        return (
          <Link
            key={candidato.id}
            to={`/candidato/${candidato.id}`}
            className="group"
          >
            <div className={`relative bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 cursor-pointer border-2 ${borderColor} hover:border-opacity-100`}>
              {/* Avatar section con foto */}
              <div className={`relative h-64 bg-gradient-to-br ${colorClasses} flex items-center justify-center overflow-hidden`}>
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '16px 16px' }}></div>

                <img
                  src={candidato.foto || candidato.imagen}
                  alt={candidato.nombre}
                  className="relative w-40 h-40 rounded-full object-cover ring-4 ring-white shadow-2xl group-hover:scale-110 transition-transform duration-300"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                {/* Fallback a iniciales */}
                <div className="hidden relative w-40 h-40 rounded-full bg-white/30 backdrop-blur-md items-center justify-center text-white font-black text-6xl ring-4 ring-white shadow-2xl" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  {candidato.nombre.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </div>
              </div>

              {/* Info section */}
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold text-slate-900 mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  {candidato.nombre}
                </h3>
                <p className="text-sm text-slate-600 mb-4 font-medium">{candidato.partido}</p>

                {/* Tags */}
                <div className="flex flex-wrap justify-center gap-2 mb-5">
                  {candidato.tags.slice(0, 3).map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-full text-xs font-semibold border border-indigo-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Button */}
                <button className={`w-full bg-gradient-to-r ${colorClasses} text-white py-3 px-4 rounded-xl font-semibold shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-105 flex items-center justify-center gap-2`} style={{ fontFamily: 'Outfit, sans-serif' }}>
                  Ver Propuestas
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
