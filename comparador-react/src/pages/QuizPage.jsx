import { useState } from 'react';
import { Link } from 'react-router-dom';
import preguntasData from '../data/preguntas-quiz.json';
import candidatosData from '../data/candidatos.json';

const CATEGORIAS_INFO = {
  economia: {
    nombre: 'Economía',
    icono: '💰',
    bgClass: 'bg-blue-100',
    textClass: 'text-blue-700'
  },
  seguridad: {
    nombre: 'Seguridad',
    icono: '🛡️',
    bgClass: 'bg-red-100',
    textClass: 'text-red-700'
  },
  migracion: {
    nombre: 'Migración',
    icono: '🌎',
    bgClass: 'bg-green-100',
    textClass: 'text-green-700'
  },
  salud: {
    nombre: 'Salud',
    icono: '🏥',
    bgClass: 'bg-pink-100',
    textClass: 'text-pink-700'
  },
  educacion: {
    nombre: 'Educación',
    icono: '📚',
    bgClass: 'bg-purple-100',
    textClass: 'text-purple-700'
  },
  medio_ambiente: {
    nombre: 'Medio Ambiente',
    icono: '🌱',
    bgClass: 'bg-emerald-100',
    textClass: 'text-emerald-700'
  }
};

export default function QuizPage() {
  const [estado, setEstado] = useState('inicio'); // 'inicio', 'quiz', 'resultados'
  const [preguntaActual, setPreguntaActual] = useState(0);
  const [respuestas, setRespuestas] = useState({});
  const [resultados, setResultados] = useState(null);

  const handleIniciarQuiz = () => {
    setEstado('quiz');
    setRespuestas({});
    setPreguntaActual(0);
  };

  const handleResponder = (peso) => {
    const nuevasRespuestas = {
      ...respuestas,
      [preguntasData[preguntaActual].id]: {
        categoria: preguntasData[preguntaActual].categoria,
        peso: peso
      }
    };
    setRespuestas(nuevasRespuestas);

    // Avanzar a la siguiente pregunta o mostrar resultados
    if (preguntaActual < preguntasData.length - 1) {
      setPreguntaActual(preguntaActual + 1);
    } else {
      // Calcular resultados
      calcularAfinidad(nuevasRespuestas);
    }
  };

  const calcularAfinidad = (respuestasUsuario) => {
    const candidatos = Object.entries(candidatosData).map(([id, data]) => ({
      id,
      ...data
    }));

    const resultadosCandidatos = candidatos.map(candidato => {
      let sumaDistancias = 0;
      let contadorPreguntas = 0;

      Object.values(respuestasUsuario).forEach(respuesta => {
        const categoriaValor = candidato.categorias[respuesta.categoria].tendencia.valor;
        const distancia = Math.abs(categoriaValor - respuesta.peso);
        sumaDistancias += distancia;
        contadorPreguntas++;
      });

      // Calcular porcentaje de afinidad (invertir distancia)
      const distanciaPromedio = sumaDistancias / contadorPreguntas;
      const afinidad = Math.max(0, 100 - distanciaPromedio);

      return {
        candidato,
        afinidad: afinidad.toFixed(1),
        distanciaPromedio: distanciaPromedio.toFixed(1)
      };
    });

    // Ordenar por afinidad descendente
    resultadosCandidatos.sort((a, b) => b.afinidad - a.afinidad);

    setResultados(resultadosCandidatos);
    setEstado('resultados');
  };

  const reiniciarQuiz = () => {
    setEstado('inicio');
    setRespuestas({});
    setPreguntaActual(0);
    setResultados(null);
  };

  if (estado === 'inicio') {
    return <PantallaInicio onIniciar={handleIniciarQuiz} />;
  }

  if (estado === 'quiz') {
    return (
      <PantallaQuiz
        pregunta={preguntasData[preguntaActual]}
        numeroPregunta={preguntaActual + 1}
        totalPreguntas={preguntasData.length}
        onResponder={handleResponder}
        progreso={(preguntaActual / preguntasData.length) * 100}
      />
    );
  }

  if (estado === 'resultados') {
    return <PantallaResultados resultados={resultados} onReiniciar={reiniciarQuiz} />;
  }
}

function PantallaInicio({ onIniciar }) {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Link
          to="/"
          className="inline-block mb-6 px-6 py-3 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all font-semibold text-gray-700 hover:text-indigo-600"
        >
          ← Volver al Inicio
        </Link>

        <div className="bg-white rounded-3xl shadow-2xl p-12 text-center">
          <div className="text-6xl mb-6">🎯</div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Calculadora de Afinidad Política
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Descubre qué candidato se alinea más con tus ideas
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8 max-w-2xl mx-auto">
            {Object.entries(CATEGORIAS_INFO).map(([key, info]) => (
              <div key={key} className="bg-gray-50 rounded-xl p-4">
                <div className="text-3xl mb-2">{info.icono}</div>
                <div className="text-sm font-semibold text-gray-700">{info.nombre}</div>
              </div>
            ))}
          </div>

          <div className="bg-indigo-50 rounded-2xl p-6 mb-8 text-left max-w-2xl mx-auto">
            <h3 className="font-bold text-gray-900 mb-3">📋 Cómo funciona:</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-indigo-600">•</span>
                Responderás 25 preguntas sobre 6 categorías políticas
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-600">•</span>
                Cada respuesta representa una posición en el espectro político
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-600">•</span>
                Calcularemos tu afinidad con cada candidato (0-100%)
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-600">•</span>
                Verás un ranking de candidatos ordenado por compatibilidad
              </li>
            </ul>
          </div>

          <button
            onClick={onIniciar}
            className="px-12 py-5 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xl rounded-2xl font-bold hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Comenzar Quiz
          </button>
        </div>
      </div>
    </div>
  );
}

function PantallaQuiz({ pregunta, numeroPregunta, totalPreguntas, onResponder, progreso }) {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Barra de progreso */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold text-white">
              Pregunta {numeroPregunta} de {totalPreguntas}
            </span>
            <span className="text-sm font-semibold text-white">
              {progreso.toFixed(0)}%
            </span>
          </div>
          <div className="h-3 bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300"
              style={{ width: `${progreso}%` }}
            ></div>
          </div>
        </div>

        {/* Tarjeta de pregunta */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
          {/* Categoría */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="text-4xl">{CATEGORIAS_INFO[pregunta.categoria].icono}</span>
            <span className={`px-4 py-2 ${CATEGORIAS_INFO[pregunta.categoria].bgClass} ${CATEGORIAS_INFO[pregunta.categoria].textClass} rounded-full font-bold`}>
              {CATEGORIAS_INFO[pregunta.categoria].nombre}
            </span>
          </div>

          {/* Pregunta */}
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
            {pregunta.pregunta}
          </h2>

          {/* Opciones */}
          <div className="space-y-4">
            {pregunta.opciones.map((opcion, idx) => (
              <button
                key={idx}
                onClick={() => onResponder(opcion.peso)}
                className="w-full p-6 text-left bg-gray-50 hover:bg-indigo-50 border-2 border-gray-200 hover:border-indigo-500 rounded-2xl transition-all group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-white border-2 border-gray-300 group-hover:border-indigo-500 flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-4 h-4 rounded-full bg-transparent group-hover:bg-indigo-500 transition-all"></div>
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 mb-1">{opcion.texto}</p>
                    <p className="text-sm text-gray-600">{opcion.descripcion}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function PantallaResultados({ resultados, onReiniciar }) {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <Link
          to="/"
          className="inline-block mb-6 px-6 py-3 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all font-semibold text-gray-700 hover:text-indigo-600"
        >
          ← Volver al Inicio
        </Link>

        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 mb-6">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">🎉</div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Resultados de tu Afinidad Política
            </h1>
            <p className="text-gray-600">
              Basado en tus respuestas, estos son los candidatos más afines a tus ideas
            </p>
          </div>

          {/* Podio - Top 3 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {resultados.slice(0, 3).map((resultado, idx) => (
              <div
                key={resultado.candidato.id}
                className={`relative rounded-2xl p-6 text-center ${
                  idx === 0
                    ? 'bg-gradient-to-br from-yellow-400 to-yellow-600 text-white md:scale-110 md:-mt-4'
                    : idx === 1
                    ? 'bg-gradient-to-br from-gray-300 to-gray-500 text-white'
                    : 'bg-gradient-to-br from-amber-600 to-amber-800 text-white'
                }`}
              >
                <div className="text-4xl mb-2">
                  {idx === 0 ? '🥇' : idx === 1 ? '🥈' : '🥉'}
                </div>
                <h3 className="font-bold text-xl mb-1">{resultado.candidato.nombre}</h3>
                <p className="text-sm opacity-90 mb-3">{resultado.candidato.partido}</p>
                <div className="text-3xl font-black">{resultado.afinidad}%</div>
                <p className="text-sm opacity-90 mt-2">de afinidad</p>
                <Link
                  to={`/candidato/${resultado.candidato.id}`}
                  className="inline-block mt-4 px-4 py-2 bg-white text-gray-900 rounded-xl text-sm font-semibold hover:scale-105 transition-transform"
                >
                  Ver Propuestas
                </Link>
              </div>
            ))}
          </div>

          {/* Resto de candidatos */}
          <div className="space-y-3">
            <h3 className="font-bold text-gray-900 mb-4">Otros candidatos:</h3>
            {resultados.slice(3).map((resultado, idx) => (
              <div
                key={resultado.candidato.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-4 flex-1">
                  <span className="text-2xl font-bold text-gray-400">#{idx + 4}</span>
                  <div>
                    <h4 className="font-bold text-gray-900">{resultado.candidato.nombre}</h4>
                    <p className="text-sm text-gray-600">{resultado.candidato.partido}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">{resultado.afinidad}%</div>
                    <div className="text-xs text-gray-500">afinidad</div>
                  </div>
                  <Link
                    to={`/candidato/${resultado.candidato.id}`}
                    className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-xl text-sm font-semibold hover:bg-indigo-200 transition-colors"
                  >
                    Ver Propuestas
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Botón reiniciar */}
          <div className="text-center mt-8">
            <button
              onClick={onReiniciar}
              className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg hover:shadow-xl"
            >
              🔄 Hacer el Quiz Nuevamente
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
