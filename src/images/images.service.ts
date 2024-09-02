import {
  PutObjectCommand,
  PutObjectCommandInput,
  S3Client,
} from '@aws-sdk/client-s3';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as sharp from 'sharp';
import { v4 as uuidv4 } from 'uuid';
import { IImageData } from './interfaces/image-data.interface';
@Injectable()
export class ImagesService {
  constructor(private configService: ConfigService) {}
  async uploadImages(files: Express.Multer.File[]) {
    const s3client = new S3Client({
      region: this.configService.get('S3_REGION'),
      endpoint: this.configService.get('S3_ENDPOINT'),
      credentials: {
        accessKeyId: this.configService.get('S3_ACCESS_KEY'),
        secretAccessKey: this.configService.get('S3_SECRET_KEY'),
      },
    });

    const compressed = await this.compressImages(files);
    for (let i = 0; i < compressed.length; i++) {
      for (const key in compressed[i].quality) {
        const params: PutObjectCommandInput = {
          Bucket: this.configService.get('S3_BUCKET'),
          Key: compressed[i].uuid + '/' + key,
          ContentType: compressed[i].quality[key].info.format,
          ContentLength: compressed[i].quality[key].info.size,
          Body: compressed[i].quality[key].data,
        };

        const command = new PutObjectCommand(params);

        try {
          s3client.send(command);
        } catch {
          throw new InternalServerErrorException();
        }
      }
    }

    return compressed.map((item) => item.uuid);
  }

  private async compressImages(
    files: Express.Multer.File[],
  ): Promise<IImageData[]> {
    const resized: IImageData[] = [];

    for (let i = 0; i < files.length; i++) {
      const original = await sharp(files[i].buffer)
        .png({ compressionLevel: 0 })
        .toBuffer({ resolveWithObject: true });
      const medium = await sharp(files[i].buffer)
        .png({ compressionLevel: 4 })
        .toBuffer({ resolveWithObject: true });
      const small = await sharp(files[i].buffer)
        .png({ compressionLevel: 9 })
        .toBuffer({ resolveWithObject: true });

      resized.push({
        uuid: uuidv4(),
        quality: {
          original,
          medium,
          small,
        },
      });
    }

    return resized;
  }
}
