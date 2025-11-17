import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { writeFileSync } from 'fs';
import { join } from 'path';
import { AppModule } from '../src/app.module';

async function generateSwagger() {
  const app = await NestFactory.create(AppModule, { logger: false });

  const config = new DocumentBuilder()
    .setTitle('DoudouMonde API')
    .setDescription('DoudouMonde 백엔드 API 문서')
    .setVersion('1.0')
    .addTag('members', '회원 관리')
    .addTag('children', '아이 관리')
    .addTag('performances', '공연 관리')
    .addTag('reviews', '리뷰 관리')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  
  // 프로젝트 루트에 swagger.json 파일 생성
  const outputPath = join(__dirname, '../../swagger.json');
  writeFileSync(outputPath, JSON.stringify(document, null, 2), { encoding: 'utf-8' });
  
  console.log(`✅ Swagger JSON generated at: ${outputPath}`);
  
  await app.close();
  process.exit(0);
}

generateSwagger().catch((error) => {
  console.error('❌ Failed to generate Swagger JSON:', error);
  process.exit(1);
});

