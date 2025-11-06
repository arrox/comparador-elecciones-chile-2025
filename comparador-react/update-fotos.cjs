const fs = require('fs');
const path = require('path');

// Leer candidatos.json
const dataPath = path.join(__dirname, 'src', 'data', 'candidatos.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

// Actualizar URLs a UI Avatars (sin problemas de CORS)
Object.keys(data).forEach(id => {
  const candidato = data[id];
  const iniciales = candidato.nombre.split(' ').map(n => n[0]).join('').slice(0, 2);

  // Colores según posición política
  const tendencia = candidato.categorias.economia.tendencia.valor;
  let bgColor = '6366f1'; // indigo por defecto

  if (tendencia < 33) {
    bgColor = 'ef4444'; // rojo (izquierda)
  } else if (tendencia < 66) {
    bgColor = 'a855f7'; // púrpura (centro)
  } else {
    bgColor = '3b82f6'; // azul (derecha)
  }

  data[id].foto = `https://ui-avatars.com/api/?name=${iniciales}&size=256&background=${bgColor}&color=fff&bold=true&format=png&font-size=0.4`;

  console.log(`${candidato.nombre}: ${data[id].foto}`);
});

// Guardar
fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), 'utf-8');
console.log('\n✓ URLs de fotos actualizadas correctamente');
