import { Injectable } from '@nestjs/common';
import { v2 } from 'cloudinary';
import toStream = require('buffer-to-stream');
import { SharpPipe } from 'src/cloudinary/sharp.pipe';

@Injectable()
export class CloudinaryService {
  constructor(private readonly sharpPipe: SharpPipe) {}

  /**
   * Uploads a file to Cloudinary.
   * @param file - The file to upload.
   * @returns The secure URL of the uploaded file.
   * @throws Error if an error occurs during file upload.
   */
  private async uploadToCloudinary(
    fileStream: NodeJS.ReadableStream,
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      const upload = v2.uploader.upload_stream((error, result) => {
        if (error)
          return reject(
            new Error(`Cloudinary upload failed: ${error.message}`),
          );
        resolve(result.secure_url);
      });

      fileStream.pipe(upload);
    });
  }

  /**
   * Uploads a file directly to Cloudinary.
   * @param file - The file to upload.
   * @returns The secure URL of the uploaded file.
   * @throws Error if an error occurs during the upload.
   */
  async uploadFile(file: Express.Multer.File): Promise<string> {
    try {
      // Upload the file directly to Cloudinary
      return this.uploadToCloudinary(toStream(file.buffer));
    } catch (error) {
      console.error('Error uploading the file:', error);
      throw new Error(`Failed to upload file: ${error.message}`);
    }
  }

  /**
   * Uploads and optimizes an image before uploading to Cloudinary.
   * @param file - The image file to upload.
   * @returns The secure URL of the uploaded image.
   * @throws Error if an error occurs during the image processing or upload.
   */
  async uploadImage(file: Express.Multer.File): Promise<string> {
    try {
      // Optimize the image using SharpPipe
      const optimizedImagePath = await this.sharpPipe.transform(file);

      // Upload the optimized image to Cloudinary
      return this.uploadToCloudinary(toStream(optimizedImagePath));
    } catch (error) {
      console.error('Error processing or uploading the image:', error);
      throw new Error(`Failed to process and upload image: ${error.message}`);
    }
  }
}
