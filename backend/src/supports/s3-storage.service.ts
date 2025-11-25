import { Injectable } from '@nestjs/common';
import { S3Client, PutObjectCommand, S3ClientConfig } from '@aws-sdk/client-s3';
import { FileService } from '@/supports/file.service.interface';
import { S3Config } from '@/shared/config/s3.config';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class S3StorageService implements FileService {
  private readonly s3Client: S3Client;
  private readonly bucketName: string;
  private readonly region: string;
  private readonly endpoint: string;

  constructor(private readonly s3Config: S3Config) {
    this.endpoint = this.s3Config.getEndpoint();
    this.region = this.s3Config.getRegionName();
    this.bucketName = this.s3Config.getBucketName();

    const clientConfig: S3ClientConfig = {
      region: this.region,
      credentials: {
        accessKeyId: this.s3Config.getAccessKey(),
        secretAccessKey: this.s3Config.getSecretKey(),
      },
      forcePathStyle: true, // path-style URL 사용 (버킷 이름에 점이 있거나 특정 엔드포인트 요구 시 필요)
      ...(this.endpoint && {
        endpoint: this.endpoint,
      }),
    };

    this.s3Client = new S3Client(clientConfig);
  }

  async uploadFile(file: Express.Multer.File, folder: string): Promise<string> {
    const fileExtension = file.originalname.split('.').pop();
    const fileName = `${folder}/${uuidv4()}-${Date.now()}.${fileExtension}`;

    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: fileName,
      Body: file.buffer,
      ContentType: file.mimetype,
    });

    await this.s3Client.send(command);

    // forcePathStyle를 사용하므로 path-style URL 형식 사용
    if (this.endpoint) {
      // endpoint가 있으면 path-style 형식: endpoint/bucket/key
      return `${this.endpoint}/${this.bucketName}/${fileName}`;
    }
    // endpoint가 없으면 기본 S3 path-style URL 형식: s3.region.amazonaws.com/bucket/key
    return `https://s3.${this.region}.amazonaws.com/${this.bucketName}/${fileName}`;
  }

  async uploadFiles(files: Express.Multer.File[], folder: string): Promise<string[]> {
    const uploadPromises = files.map((file) => this.uploadFile(file, folder));
    return Promise.all(uploadPromises);
  }
}
