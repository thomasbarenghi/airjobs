import { Injectable } from '@nestjs/common';
import { PipeTransform } from '@nestjs/common';
import * as sharp from 'sharp';
import * as path from 'path';
import * as fs from 'fs/promises';

/**
 * Pipe that processes images to resize and convert them to WebP format.
 * Optimizes images before uploading to a cloud storage or database.
 */
@Injectable()
export class SharpPipe
  implements PipeTransform<Express.Multer.File, Promise<Buffer>>
{
  /**
   * Transforms and optimizes an image by resizing it to 800px width and converting it to WebP format.
   * @param image - The image file to process (as a buffer).
   * @returns A promise that resolves with the optimized image as a Buffer.
   * @throws Error if any error occurs during the transformation process.
   */
  async transform(image: Express.Multer.File): Promise<Buffer> {
    try {
      // Generate filename based on current timestamp and original name
      const originalName = path.parse(image.originalname).name;
      const filename = `${Date.now()}-${originalName}.webp`;

      const outputPath = path.join('uploads', filename);

      // Ensure the "uploads" directory exists
      await fs.mkdir('uploads', { recursive: true });

      // Process the image: resize and convert to WebP format
      await sharp(image.buffer)
        .resize(800)
        .webp({ effort: 3 })
        .toFile(outputPath); // Save the optimized image to disk

      // Read the optimized image as a buffer to return it
      const optimizedImageBuffer = await fs.readFile(outputPath);

      // Clean up the temporary file
      await fs.unlink(outputPath);

      return optimizedImageBuffer; // Return the optimized buffer
    } catch (error) {
      console.error('Error during image transformation:', error);
      throw new Error('Image transformation failed'); // You can customize this message
    }
  }
}
