import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );
  // CORS 허용 설정
  app.enableCors({
    origin: 'http://localhost:3000', // 요청을 허용할 origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // 필요한 경우 쿠키 허용
  });

  // Swagger 설정
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
  SwaggerModule.setup('/api/docs', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
