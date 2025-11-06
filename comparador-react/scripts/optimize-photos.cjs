/**
 * Photo Optimization Script for Chilean Electoral Platform
 *
 * This script processes raw candidate photos and creates optimized versions
 * for web display in multiple sizes and formats (WebP + JPEG fallback).
 *
 * Usage: node scripts/optimize-photos.js
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Configuration
const SOURCE_DIR = path.join(__dirname, '../../candidatos');
const OUTPUT_DIR = path.join(__dirname, '../public/fotos/candidatos');

// Mapping from original filenames to candidate IDs
const PHOTO_MAPPING = {
  'Eduardo_Artés_2021_-_7_de_octubre_(cropped).jpg.webp': 'artes',
  'Evelyn_Matthei,_alcaldesa_de_Providencia.png': 'matthei',
  'Harold_Mayne-Nicholls_(cropped).jpg': 'hmn',
  'Jeannette_Jara,_2022.png': 'jara',
  'Johannes_Kaiser_(BCN).jpg': 'kaiser',
  'José_Antonio_Kast_en_2025.jpg': 'kast',
  'Marco_Enriquez-Ominami_2025.jpg': 'meo',
  'parisi.jpg': 'parisi'
};

// Target sizes
const SIZES = {
  small: 256,   // For political map and comparison view
  large: 400    // For candidate page header and grid cards
};

// Quality settings
const QUALITY = {
  webp: 80,     // WebP compression quality (80% = good balance)
  jpeg: 85      // JPEG compression quality (85% = high quality)
};

/**
 * Create output directory if it doesn't exist
 */
function ensureOutputDir() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    console.log(`Created output directory: ${OUTPUT_DIR}`);
  }
}

/**
 * Optimize a single photo into multiple sizes and formats
 * @param {string} sourceFile - Original filename
 * @param {string} candidateId - Candidate ID for output naming
 */
async function optimizePhoto(sourceFile, candidateId) {
  const sourcePath = path.join(SOURCE_DIR, sourceFile);

  // Check if source file exists
  if (!fs.existsSync(sourcePath)) {
    console.error(`❌ Source file not found: ${sourceFile}`);
    return;
  }

  try {
    // Generate small WebP (256x256, 80% quality)
    await sharp(sourcePath)
      .resize(SIZES.small, SIZES.small, {
        fit: 'cover',
        position: 'top'  // Focus on top of image (faces usually at top)
      })
      .webp({ quality: QUALITY.webp })
      .toFile(path.join(OUTPUT_DIR, `${candidateId}-small.webp`));

    // Generate large WebP (400x400, 80% quality)
    await sharp(sourcePath)
      .resize(SIZES.large, SIZES.large, {
        fit: 'cover',
        position: 'top'
      })
      .webp({ quality: QUALITY.webp })
      .toFile(path.join(OUTPUT_DIR, `${candidateId}.webp`));

    // Generate small JPEG fallback (256x256, 85% quality)
    await sharp(sourcePath)
      .resize(SIZES.small, SIZES.small, {
        fit: 'cover',
        position: 'top'
      })
      .jpeg({ quality: QUALITY.jpeg })
      .toFile(path.join(OUTPUT_DIR, `${candidateId}-small.jpg`));

    // Generate large JPEG fallback (400x400, 85% quality)
    await sharp(sourcePath)
      .resize(SIZES.large, SIZES.large, {
        fit: 'cover',
        position: 'top'
      })
      .jpeg({ quality: QUALITY.jpeg })
      .toFile(path.join(OUTPUT_DIR, `${candidateId}.jpg`));

    console.log(`✅ Optimized: ${candidateId} (${sourceFile})`);
  } catch (error) {
    console.error(`❌ Error optimizing ${candidateId}:`, error.message);
  }
}

/**
 * Main execution function
 */
async function main() {
  console.log('==========================================');
  console.log('Photo Optimization Script');
  console.log('Chilean Electoral Platform 2025');
  console.log('==========================================\n');

  console.log(`Source directory: ${SOURCE_DIR}`);
  console.log(`Output directory: ${OUTPUT_DIR}\n`);

  // Ensure output directory exists
  ensureOutputDir();

  console.log('Starting photo optimization...\n');

  // Process each photo
  for (const [sourceFile, candidateId] of Object.entries(PHOTO_MAPPING)) {
    await optimizePhoto(sourceFile, candidateId);
  }

  console.log('\n==========================================');
  console.log('Photo optimization complete!');
  console.log('==========================================\n');

  // Display summary
  console.log('Generated files:');
  console.log(`  - 8 candidates × 2 sizes × 2 formats = 32 files total\n`);

  console.log('Next steps:');
  console.log('  1. Verify output: ls -lh public/fotos/candidatos/');
  console.log('  2. Update candidatos.json with foto paths');
  console.log('  3. Update React components to use new photos');
  console.log('  4. Test in browser\n');
}

// Run the script
main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
