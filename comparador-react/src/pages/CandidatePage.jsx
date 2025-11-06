import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import candidatosData from '../data/candidatos.json';

const CATEGORIAS_INFO = {
  economia: { nombre: 'Economía', icono: '💰', color: 'blue' },
  seguridad: { nombre: 'Seguridad', icono: '🛡️', color: 'red' },
  migracion: { nombre: 'Migración', icono: '🌎', color: 'green' },
  salud: { nombre: 'Salud', icono: '🏥', color: 'pink' },
  social: { nombre: 'Social', icono: '👥', color: 'purple' },
  tecnologia: { nombre: 'Tecnología', icono: '💻', color: 'indigo' }
};

export default function CandidatePage() {
  const { id } = useParams();
  const candidato = candidatosData[id];
  const [categoriaActiva, setCategoriaActiva] = useState('economia');
  const [propuestaExpandida, setPropuestaExpandida] = useState(null);

  if (!candidato) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Candidato no encontrado</h1>
          <Link to="/" className="text-indigo-300 hover:text-indigo-100">
            Volver al inicio
          </Link>
        </div>
      </div>
    );
  }

  const totalPropuestas = Object.values(candidato.categorias).reduce((acc, cat) => acc + cat.propuestas.length, 0);
  const categoriaData = candidato.categorias[categoriaActiva];

  // Determinar color basado en posición económica
  const tendenciaEconomica = candidato.categorias.economia.tendencia.valor;
  const colorScheme = tendenciaEconomica < 33
    ? { gradient: 'from-red-500 via-red-600 to-red-700', bg: 'from-red-50 to-red-100', text: 'text-red-700' }
    : tendenciaEconomica < 66
    ? { gradient: 'from-purple-500 via-purple-600 to-purple-700', bg: 'from-purple-50 to-purple-100', text: 'text-purple-700' }
    : { gradient: 'from-blue-500 via-blue-600 to-blue-700', bg: 'from-blue-50 to-blue-100', text: 'text-blue-700' };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Botón volver mejorado */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 mb-8 px-6 py-3 bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.15)] transition-all font-bold text-gray-700 dark:text-gray-200 hover:scale-105 border border-white/20 animate-slideInLeft"
          style={{ fontFamily: 'Outfit, sans-serif' }}
        >
          <span className="text-xl">←</span>
          Volver al Resumen
        </Link>

        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.15)] overflow-hidden border border-white/20 animate-fadeIn">
          {/* Header mejorado con gradiente personalizado */}
          <div className={`relative p-10 bg-gradient-to-br ${colorScheme.bg} dark:from-gray-900 dark:to-gray-800 overflow-hidden`}>
            {/* Pattern overlay */}
            <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>

            <div className="relative z-10">
              {/* Avatar grande con foto real */}
              {candidato.foto ? (
                <picture className="inline-block">
                  <source srcSet={candidato.foto} type="image/webp" />
                  <source srcSet={candidato.foto.replace('.webp', '.jpg')} type="image/jpeg" />
                  <img
                    src={candidato.foto.replace('.webp', '.jpg')}
                    alt={`${candidato.nombre} - Candidato presidencial Chile 2025`}
                    className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-3xl object-cover shadow-[0_8px_30px_rgba(0,0,0,0.3)] border-4 border-white/30 animate-scaleIn mb-6"
                    onError={(e) => {
                      e.target.parentElement.parentElement.style.display = 'none';
                      e.target.parentElement.parentElement.nextElementSibling.style.display = 'inline-flex';
                    }}
                  />
                </picture>
              ) : null}
              <div className={`${candidato.foto ? 'hidden' : 'inline-flex'} items-center justify-center w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-3xl bg-gradient-to-br ${colorScheme.gradient} text-white text-5xl sm:text-6xl md:text-7xl font-black mb-6 shadow-[0_8px_30px_rgba(0,0,0,0.3)] border-4 border-white/30 animate-scaleIn`} style={{ fontFamily: 'Outfit, sans-serif' }}>
                {candidato.nombre.split(' ').map(n => n[0]).join('').slice(0, 2)}
              </div>

              <h1 className={`text-5xl md:text-6xl font-black text-gray-900 dark:text-white mb-3 tracking-tight animate-slideInLeft delay-100`} style={{ fontFamily: 'Outfit, sans-serif' }}>
                {candidato.nombre}
              </h1>
              <p className="text-2xl text-gray-700 dark:text-gray-300 mb-6 font-semibold animate-slideInLeft delay-200">{candidato.partido}</p>

              {/* Tags mejorados */}
              <div className="flex flex-wrap gap-3 mb-6 animate-slideInLeft delay-300">
                {candidato.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className={`px-5 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md ${colorScheme.text} dark:text-white rounded-full text-sm font-bold shadow-md border border-white/30`}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Stats */}
              <div className="inline-flex items-center gap-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md px-6 py-3 rounded-full shadow-md border border-white/30 animate-slideInLeft delay-400">
                <span className="text-2xl">📝</span>
                <span className="text-sm font-bold text-gray-900 dark:text-white">
                  {totalPropuestas} Propuestas Analizadas
                </span>
              </div>
            </div>
          </div>

          {/* Información Biográfica y Gestión Pública */}
          {candidato.biografia && (
            <div className="p-8 border-b border-gray-200">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Columna 1: Datos Básicos */}
                <div className="bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-4 flex items-center">
                    <span className="mr-2">👤</span>
                    Datos Personales
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="font-semibold text-slate-700 dark:text-slate-300">Nombre completo:</span>
                      <p className="text-slate-600 dark:text-slate-400">{candidato.nombreCompleto}</p>
                    </div>
                    <div>
                      <span className="font-semibold text-slate-700 dark:text-slate-300">Edad:</span>
                      <p className="text-slate-600 dark:text-slate-400">{candidato.edad} años</p>
                    </div>
                    <div>
                      <span className="font-semibold text-slate-700 dark:text-slate-300">Lugar de nacimiento:</span>
                      <p className="text-slate-600 dark:text-slate-400">{candidato.lugarNacimiento}</p>
                    </div>
                    <div>
                      <span className="font-semibold text-slate-700 dark:text-slate-300">Profesión:</span>
                      <p className="text-slate-600 dark:text-slate-400">{candidato.profesion}</p>
                    </div>
                  </div>
                </div>

                {/* Columna 2: Biografía */}
                <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-2xl p-6 border-2 border-slate-200 dark:border-slate-700">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-4 flex items-center">
                    <span className="mr-2">📖</span>
                    Biografía
                  </h3>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
                    {candidato.biografia}
                  </p>
                </div>
              </div>

              {/* Gestión Pública */}
              {candidato.gestionPublica && (
                <div className="mt-6 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-6 flex items-center">
                    <span className="mr-2">🏛️</span>
                    Trayectoria en Gestión Pública
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Cargos */}
                    <div>
                      <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-3 text-sm flex items-center">
                        <span className="mr-2">📋</span>
                        Cargos Desempeñados
                      </h4>
                      <ul className="space-y-2">
                        {candidato.gestionPublica.cargos.map((cargo, idx) => (
                          <li key={idx} className="text-sm text-slate-700 dark:text-slate-300 pl-4 border-l-2 border-slate-400 dark:border-slate-500">
                            {cargo}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Logros */}
                    <div>
                      <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-3 text-sm flex items-center">
                        <span className="mr-2">🏆</span>
                        Principales Logros
                      </h4>
                      <ul className="space-y-2">
                        {candidato.gestionPublica.logros.map((logro, idx) => (
                          <li key={idx} className="text-sm text-slate-700 dark:text-slate-300 pl-4 border-l-2 border-emerald-400 dark:border-emerald-500">
                            {logro}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Proyectos Emblemáticos */}
                    <div>
                      <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-3 text-sm flex items-center">
                        <span className="mr-2">⭐</span>
                        Proyectos Emblemáticos
                      </h4>
                      <ul className="space-y-2">
                        {candidato.gestionPublica.proyectosEmblematicos.map((proyecto, idx) => (
                          <li key={idx} className="text-sm text-slate-700 dark:text-slate-300 pl-4 border-l-2 border-violet-400 dark:border-violet-500">
                            {proyecto}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Evaluación */}
                    <div>
                      <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-3 text-sm flex items-center">
                        <span className="mr-2">📊</span>
                        Evaluación de Gestión
                      </h4>
                      <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-white dark:bg-slate-900 p-4 rounded-lg border border-slate-200 dark:border-slate-600">
                        {candidato.gestionPublica.evaluacion}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Tabs de Categorías mejorados */}
          <div className="border-b-2 border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-r from-gray-50/50 to-gray-100/50 dark:from-gray-900/50 dark:to-gray-800/50 backdrop-blur-md px-4">
            <div className="flex overflow-x-auto gap-2 py-4 scrollbar-hide">
              {Object.entries(CATEGORIAS_INFO).map(([key, info], idx) => (
                <button
                  key={key}
                  onClick={() => setCategoriaActiva(key)}
                  className={`group px-6 py-3 font-bold whitespace-nowrap transition-all duration-300 rounded-xl animate-slideInRight delay-${idx}00 ${
                    categoriaActiva === key
                      ? `bg-gradient-to-br ${colorScheme.gradient} text-white shadow-[0_4px_20px_rgba(0,0,0,0.2)] scale-105`
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-gray-700/50 hover:scale-105'
                  }`}
                  style={{ fontFamily: 'Outfit, sans-serif' }}
                >
                  <div className="flex items-center gap-2">
                    <span className={`text-2xl ${categoriaActiva === key ? 'animate-pulse-slow' : ''}`}>{info.icono}</span>
                    <span>{info.nombre}</span>
                    <span className={`ml-1 px-2 py-0.5 rounded-full text-xs font-black ${
                      categoriaActiva === key
                        ? 'bg-white/30 text-white'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                    }`}>
                      {candidato.categorias[key].propuestas.length}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Contenido de la Categoría */}
          <div className="p-8">
            {/* Tendencia de la categoría */}
            <div className="mb-8 p-6 bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 rounded-2xl">
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-50 mb-4">
                {categoriaData.tendencia.etiqueta}
              </h3>
              <div className="relative">
                <div className="flex justify-between mb-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
                  <span>{categoriaData.tendencia.izq}</span>
                  <span>{categoriaData.tendencia.der}</span>
                </div>
                <div className="relative h-8 bg-gradient-to-r from-red-400 via-slate-300 to-blue-400 rounded-full">
                  <div
                    className="absolute top-1/2 -translate-y-1/2 w-6 h-6 bg-white dark:bg-slate-900 border-4 border-violet-600 dark:border-violet-400 rounded-full shadow-lg"
                    style={{ left: `calc(${categoriaData.tendencia.valor}% - 12px)` }}
                  ></div>
                </div>
                <div className="text-center mt-2 text-sm text-slate-700 dark:text-slate-300">
                  Posición: <span className="font-bold">{categoriaData.tendencia.valor}/100</span>
                </div>
              </div>
            </div>

            {/* Lista de Propuestas */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-6">
                Propuestas de {CATEGORIAS_INFO[categoriaActiva].nombre}
              </h3>
              {categoriaData.propuestas.map((propuesta, idx) => (
                <PropuestaCard
                  key={idx}
                  propuesta={propuesta}
                  index={idx}
                  expandida={propuestaExpandida === idx}
                  onToggle={() => setPropuestaExpandida(propuestaExpandida === idx ? null : idx)}
                  color={CATEGORIAS_INFO[categoriaActiva].color}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PropuestaCard({ propuesta, index, expandida, onToggle, color }) {
  return (
    <div className={`border-2 rounded-2xl overflow-hidden transition-all ${
      expandida ? `border-${color}-400 shadow-xl` : 'border-indigo-200 hover:border-indigo-300 shadow-md'
    }`}>
      {/* Header de la propuesta */}
      <button
        onClick={onToggle}
        className="w-full p-6 text-left bg-white hover:bg-indigo-50/50 transition-colors"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span className={`px-3 py-1 bg-${color}-100 text-${color}-700 rounded-full text-xs font-bold border border-${color}-200`}>
                #{index + 1}
              </span>
              <h4 className="text-lg font-bold text-slate-900 flex-1">
                {propuesta.titulo}
              </h4>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed">
              {propuesta.detalle}
            </p>
          </div>
          <div className={`text-2xl text-slate-500 transition-transform ${expandida ? 'rotate-180' : ''}`}>
            ▼
          </div>
        </div>
      </button>

      {/* Contenido expandido */}
      {expandida && (
        <div className="border-t-2 border-indigo-100 bg-indigo-50/50">
          {/* Problema */}
          <div className="p-6 border-b border-indigo-100">
            <h5 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
              <span>🎯</span> CONTEXTO Y PROBLEMA
            </h5>
            <p className="text-slate-700 leading-relaxed">{propuesta.problema}</p>
          </div>

          {/* Verificar */}
          <div className="p-6 border-b border-indigo-100">
            <h5 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
              <span>✓</span> PUNTOS A VERIFICAR
            </h5>
            <ul className="space-y-2">
              {propuesta.verificar.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-indigo-500 mt-1">•</span>
                  <span className="text-slate-700 flex-1">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Desafíos */}
          <div className="p-6 bg-amber-50">
            <h5 className="text-sm font-bold text-amber-900 mb-3 flex items-center gap-2">
              <span>⚠️</span> DESAFÍOS Y RIESGOS
            </h5>
            <ul className="space-y-2">
              {propuesta.desafios.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-amber-600 mt-1">•</span>
                  <span className="text-slate-800 flex-1">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
