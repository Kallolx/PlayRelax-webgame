import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const optimizeImage = async (inputPath: string, outputPath: string, options: sharp.ResizeOptions) => {
  await sharp(inputPath)
    .resize(options)
    .webp({ quality: 90 })
    .toFile(outputPath + '.webp');
    
  // Create JPG fallback
  await sharp(inputPath)
    .resize(options)
    .jpeg({ quality: 90, mozjpeg: true })
    .toFile(outputPath + '.jpg');
};

// Usage example:
optimizeImage(
  'src/assets/games/space-shooter/original.png',
  'src/assets/games/space-shooter/banner',
  {
    width: 1920,
    height: 1080,
    fit: 'cover',
    position: 'center'
  }
); 