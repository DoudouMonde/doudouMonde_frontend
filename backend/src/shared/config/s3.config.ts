import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ENV_KEYS } from '@/shared/constants';

@Injectable()
export class S3Config {
  private readonly endpoint: string;
  private readonly regionName: string;
  private readonly accessKey: string;
  private readonly secretKey: string;
  private readonly bucketName: string;

  constructor(private readonly configService: ConfigService) {
    this.endpoint = this.configService.get<string>(ENV_KEYS.AWS_ENDPOINT) || '';
    this.regionName = this.configService.get<string>(ENV_KEYS.AWS_REGION) || '';
    this.accessKey = this.configService.get<string>(ENV_KEYS.AWS_ACCESS_KEY) || '';
    this.secretKey = this.configService.get<string>(ENV_KEYS.AWS_SECRET_KEY) || '';
    this.bucketName = this.configService.get<string>(ENV_KEYS.AWS_S3_BUCKET) || '';
  }

  getEndpoint(): string {
    return this.endpoint;
  }

  getRegionName(): string {
    return this.regionName;
  }

  getAccessKey(): string {
    return this.accessKey;
  }

  getSecretKey(): string {
    return this.secretKey;
  }

  getBucketName(): string {
    return this.bucketName;
  }
}
