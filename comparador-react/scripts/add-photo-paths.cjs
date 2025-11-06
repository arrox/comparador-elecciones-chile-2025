/**
 * Automated Script to Add Photo Paths to candidatos.json
 *
 * This script updates the candidatos.json file to include the "foto" property
 * for each candidate, pointing to the optimized WebP photos.
 *
 * Usage: node scripts/add-photo-paths.js
 */

const fs = require('fs');
const path = require('path');

// File paths
const CANDIDATOS_FILE = path.join(__dirname, '../src/data/candidatos.json');
const BACKUP_FILE = path.join(__dirname, '../src/data/candidatos.json.backup');

// Photo mapping: candidate ID → photo path
const PHOTO_PATHS = {
  jara: '/fotos/candidatos/jara.webp',
  matthei: '/fotos/candidatos/matthei.webp',
  kast: '/fotos/candidatos/kast.webp',
  kaiser: '/fotos/candidatos/kaiser.webp',
  parisi: '/fotos/candidatos/parisi.webp',
  meo: '/fotos/candidatos/meo.webp',
  hmn: '/fotos/candidatos/hmn.webp',
  artes: '/fotos/candidatos/artes.webp'
};

/**
 * Main execution function
 */
function main() {
  console.log('==========================================');
  console.log('Add Photo Paths to candidatos.json');
  console.log('==========================================\n');

  // Read candidatos.json
  console.log('Reading candidatos.json...');
  let candidatosData;
  try {
    const fileContent = fs.readFileSync(CANDIDATOS_FILE, 'utf8');
    candidatosData = JSON.parse(fileContent);
  } catch (error) {
    console.error('❌ Error reading candidatos.json:', error.message);
    process.exit(1);
  }

  // Create backup
  console.log('Creating backup...');
  try {
    fs.copyFileSync(CANDIDATOS_FILE, BACKUP_FILE);
    console.log(`✅ Backup created: ${BACKUP_FILE}\n`);
  } catch (error) {
    console.error('❌ Error creating backup:', error.message);
    process.exit(1);
  }

  // Add photo paths to each candidate
  console.log('Adding photo paths to candidates...');
  let updatedCount = 0;

  for (const [candidateId, photoPath] of Object.entries(PHOTO_PATHS)) {
    if (candidatosData[candidateId]) {
      candidatosData[candidateId].foto = photoPath;
      console.log(`✅ ${candidateId}: ${photoPath}`);
      updatedCount++;
    } else {
      console.warn(`⚠️  Candidate ID not found in JSON: ${candidateId}`);
    }
  }

  // Write updated data back to file
  console.log('\nWriting updated data to candidatos.json...');
  try {
    const jsonString = JSON.stringify(candidatosData, null, 2);
    fs.writeFileSync(CANDIDATOS_FILE, jsonString, 'utf8');
    console.log(`✅ Successfully updated ${updatedCount} candidates\n`);
  } catch (error) {
    console.error('❌ Error writing candidatos.json:', error.message);
    console.log('Restoring from backup...');
    fs.copyFileSync(BACKUP_FILE, CANDIDATOS_FILE);
    console.log('✅ Backup restored');
    process.exit(1);
  }

  console.log('==========================================');
  console.log('Photo paths added successfully!');
  console.log('==========================================\n');

  console.log('Summary:');
  console.log(`  - Updated candidates: ${updatedCount}/8`);
  console.log(`  - Backup location: ${BACKUP_FILE}\n`);

  console.log('Next steps:');
  console.log('  1. Verify changes: cat src/data/candidatos.json | grep foto');
  console.log('  2. Update React components to use foto property');
  console.log('  3. Test in browser');
  console.log('  4. If issues occur, restore from backup\n');
}

// Run the script
main();
