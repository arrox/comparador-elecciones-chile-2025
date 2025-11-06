const data = require('./src/data/candidatos.json');

console.log('VERIFICACIÓN DE COORDENADAS:\n');
console.log('Candidato'.padEnd(25) + 'X (Econ)'.padStart(10) + 'Y (Display)'.padStart(12) + ' | Seg/Mig/Soc');
console.log('='.repeat(80));

Object.entries(data).forEach(([id, c]) => {
  const ejeX = c.categorias.economia.tendencia.valor;
  const valY = [
    c.categorias.seguridad.tendencia.valor,
    c.categorias.migracion.tendencia.valor,
    c.categorias.social.tendencia.valor
  ];
  const ejeY = valY.reduce((a,b) => a+b, 0) / valY.length;
  const displayY = 100 - ejeY;

  console.log(
    c.nombre.padEnd(25) +
    ejeX.toString().padStart(10) +
    displayY.toFixed(0).padStart(12) +
    ' | ' + valY.join('/')
  );
});

console.log('\nNota: Y_display invertido (0=Libertario/abajo, 100=Estatista/arriba)');
