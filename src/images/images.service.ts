import {
  PutObjectCommand,
  PutObjectCommandInput,
  S3Client,
} from '@aws-sdk/client-s3';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v4 as uuidv4 } from 'uuid';
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

    files.forEach((file) => {
      console.log(file);
      file.originalname = uuidv4();
      const params: PutObjectCommandInput = {
        Bucket: 'acac74b6-4391c9c0-f181-4ee0-a92c-3ff4548cf6a5',
        Key: file.originalname,
        ContentType: file.mimetype,
        ContentLength: file.size,
        Body: file.buffer,
      };

      const command = new PutObjectCommand(params);

      try {
        s3client.send(command);
        return file.originalname;
      } catch {
        throw new InternalServerErrorException();
      }
    });

    return files.map((file) => file.originalname);
  }
}
