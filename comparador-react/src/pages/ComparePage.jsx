import { useState } from 'react';
import { Link } from 'react-router-dom';
import candidatosData from '../data/candidatos.json';

const CATEGORIAS_INFO = {
  economia: { nombre: 'Economía', icono: '💰', color: 'blue' },
  seguridad: { nombre: 'Seguridad', icono: '🛡️', color: 'red' },
  migracion: { nombre: 'Migración', icono: '🌎', color: 'green' },
  salud: { nombre: 'Salud', icono: '🏥', color: 'pink' },
  educacion: { nombre: 'Educación', icono: '📚', color: 'purple' },
  medio_ambiente: { nombre: 'Medio Ambiente', icono: '🌱', color: 'green' }
};

export default function ComparePage() {
  const [candidatosSeleccionados, setCandidatosSeleccionados] = useState([]);
  const [categoriaActiva, setCategoriaActiva] = useState('economia');

  const candidatos = Object.entries(candidatosData).map(([id, data]) => ({
    id,
    ...data
  }));

  const toggleCandidato = (id) => {
    if (candidatosSeleccionados.includes(id)) {
      setCandidatosSeleccionados(candidatosSeleccionados.filter(c => c !== id));
    } else {
      if (candidatosSeleccionados.length < 3) {
        setCandidatosSeleccionados([...candidatosSeleccionados, id]);
      }
    }
  };

  const candidatosComparacion = candidatosSeleccionados.map(id =>
    candidatos.find(c => c.id === id)
  );

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <Link
          to="/"
          className="inline-block mb-6 px-6 py-3 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all font-semibold text-gray-700 hover:text-indigo-600"
        >
          ← Volver al Inicio
        </Link>

        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-6">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              📊 Comparación de Candidatos
            </h1>
            <p className="text-gray-600">
              Selecciona 2 o 3 candidatos para comparar sus propuestas lado a lado
            </p>
          </div>

          {/* Selector de candidatos */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-900">
                Candidatos Seleccionados ({candidatosSeleccionados.length}/3)
              </h3>
              {candidatosSeleccionados.length > 0 && (
                <button
                  onClick={() => setCandidatosSeleccionados([])}
                  className="text-sm text-red-600 hover:text-red-700 font-semibold"
                >
                  Limpiar selección
                </button>
              )}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
              {candidatos.map(candidato => {
                const isSelected = candidatosSeleccionados.includes(candidato.id);
                const isDisabled = !isSelected && candidatosSeleccionados.length >= 3;

                return (
                  <button
                    key={candidato.id}
                    onClick={() => toggleCandidato(candidato.id)}
                    disabled={isDisabled}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      isSelected
                        ? 'border-indigo-500 bg-indigo-50'
                        : isDisabled
                        ? 'border-gray-200 bg-gray-100 opacity-50 cursor-not-allowed'
                        : 'border-gray-200 hover:border-indigo-300 hover:bg-indigo-50'
                    }`}
                  >
                    {candidato.foto ? (
                      <picture>
                        <source srcSet={candidato.foto.replace('.webp', '-small.webp')} type="image/webp" />
                        <source srcSet={candidato.foto.replace('.webp', '-small.jpg')} type="image/jpeg" />
                        <img
                          src={candidato.foto.replace('.webp', '-small.jpg')}
                          alt={candidato.nombre}
                          className="w-16 h-16 rounded-full object-cover mx-auto mb-2"
                          onError={(e) => {
                            e.target.parentElement.parentElement.style.display = 'none';
                            e.target.parentElement.parentElement.nextElementSibling.style.display = 'block';
                          }}
                        />
                      </picture>
                    ) : null}
                    <div className={`${candidato.foto ? 'hidden' : 'block'} text-3xl mb-2`}>
                      {candidato.nombre.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </div>
                    <div className="text-xs font-semibold text-gray-900 truncate">
                      {candidato.nombre.split(' ')[0]}
                    </div>
                    {isSelected && (
                      <div className="mt-2 text-indigo-600 font-bold text-lg">✓</div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Comparación */}
          {candidatosComparacion.length >= 2 ? (
            <>
              {/* Tabs de categorías */}
              <div className="border-b border-gray-200 mb-6">
                <div className="flex overflow-x-auto">
                  {Object.entries(CATEGORIAS_INFO).map(([key, info]) => (
                    <button
                      key={key}
                      onClick={() => setCategoriaActiva(key)}
                      className={`px-6 py-4 font-semibold whitespace-nowrap transition-all ${
                        categoriaActiva === key
                          ? `text-${info.color}-600 border-b-4 border-${info.color}-600 bg-gray-50`
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      }`}
                    >
                      <span className="mr-2">{info.icono}</span>
                      {info.nombre}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tabla de comparación */}
              <div className="overflow-x-auto">
                {/* Tendencias */}
                <div className="mb-8">
                  <h3 className="font-bold text-gray-900 mb-4">Posicionamiento Político</h3>
                  <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${candidatosComparacion.length}, 1fr)` }}>
                    {candidatosComparacion.map(candidato => {
                      const tendencia = candidato.categorias[categoriaActiva].tendencia;
                      return (
                        <div key={candidato.id} className="bg-gray-50 rounded-xl p-4">
                          <h4 className="font-bold text-gray-900 mb-2">{candidato.nombre}</h4>
                          <p className="text-sm text-gray-600 mb-3">{tendencia.etiqueta}</p>
                          <div className="relative">
                            <div className="flex justify-between mb-1 text-xs text-gray-600">
                              <span>{tendencia.izq}</span>
                              <span>{tendencia.der}</span>
                            </div>
                            <div className="relative h-6 bg-gradient-to-r from-red-400 via-gray-300 to-blue-400 rounded-full">
                              <div
                                className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-indigo-600 rounded-full"
                                style={{ left: `calc(${tendencia.valor}% - 8px)` }}
                              ></div>
                            </div>
                            <div className="text-center mt-1 text-xs font-bold text-gray-700">
                              {tendencia.valor}/100
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Propuestas comparadas */}
                <div>
                  <h3 className="font-bold text-gray-900 mb-4">
                    Propuestas de {CATEGORIAS_INFO[categoriaActiva].nombre}
                  </h3>

                  <TablaComparacion
                    candidatos={candidatosComparacion}
                    categoria={categoriaActiva}
                  />
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-2xl">
              <div className="text-6xl mb-4">👆</div>
              <p className="text-gray-600 text-lg">
                Selecciona al menos 2 candidatos para comenzar la comparación
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function TablaComparacion({ candidatos, categoria }) {
  // Obtener el máximo número de propuestas
  const maxPropuestas = Math.max(...candidatos.map(c => c.categorias[categoria].propuestas.length));

  return (
    <div className="space-y-4">
      {Array.from({ length: maxPropuestas }).map((_, idx) => (
        <div key={idx} className="grid gap-4" style={{ gridTemplateColumns: `repeat(${candidatos.length}, 1fr)` }}>
          {candidatos.map(candidato => {
            const propuesta = candidato.categorias[categoria].propuestas[idx];

            if (!propuesta) {
              return (
                <div key={candidato.id} className="bg-gray-50 rounded-xl p-4 min-h-[100px] flex items-center justify-center">
                  <span className="text-gray-400 text-sm">Sin propuesta</span>
                </div>
              );
            }

            return (
              <PropuestaComparacionCard
                key={candidato.id}
                propuesta={propuesta}
                candidato={candidato}
                numero={idx + 1}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}

function PropuestaComparacionCard({ propuesta, candidato, numero }) {
  const [expandida, setExpandida] = useState(false);

  return (
    <div className="bg-white border-2 border-gray-200 rounded-xl overflow-hidden hover:border-indigo-300 transition-all">
      <button
        onClick={() => setExpandida(!expandida)}
        className="w-full p-4 text-left hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-start justify-between gap-2 mb-2">
          <span className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded text-xs font-bold">
            #{numero}
          </span>
          <div className={`text-lg transition-transform ${expandida ? 'rotate-180' : ''}`}>
            ▼
          </div>
        </div>
        <h4 className="font-bold text-gray-900 text-sm mb-2 line-clamp-2">
          {propuesta.titulo}
        </h4>
        <p className="text-xs text-gray-600 line-clamp-3">
          {propuesta.detalle}
        </p>
      </button>

      {expandida && (
        <div className="border-t-2 border-gray-100 bg-gray-50 p-4 text-xs">
          <div className="mb-3">
            <h5 className="font-bold text-gray-700 mb-1 flex items-center gap-1">
              <span>🎯</span> Contexto
            </h5>
            <p className="text-gray-700">{propuesta.problema}</p>
          </div>

          <div className="mb-3">
            <h5 className="font-bold text-gray-700 mb-1 flex items-center gap-1">
              <span>✓</span> Verificar ({propuesta.verificar.length})
            </h5>
            <ul className="space-y-1">
              {propuesta.verificar.slice(0, 3).map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-indigo-500">•</span>
                  <span className="text-gray-700 flex-1">{item}</span>
                </li>
              ))}
              {propuesta.verificar.length > 3 && (
                <li className="text-gray-500 italic">+{propuesta.verificar.length - 3} más...</li>
              )}
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-amber-900 mb-1 flex items-center gap-1">
              <span>⚠️</span> Desafíos ({propuesta.desafios.length})
            </h5>
            <ul className="space-y-1">
              {propuesta.desafios.slice(0, 3).map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-amber-600">•</span>
                  <span className="text-gray-800 flex-1">{item}</span>
                </li>
              ))}
              {propuesta.desafios.length > 3 && (
                <li className="text-gray-500 italic">+{propuesta.desafios.length - 3} más...</li>
              )}
            </ul>
          </div>

          <Link
            to={`/candidato/${candidato.id}`}
            className="inline-block mt-3 text-indigo-600 hover:text-indigo-700 font-semibold"
          >
            Ver todas las propuestas →
          </Link>
        </div>
      )}
    </div>
  );
}
