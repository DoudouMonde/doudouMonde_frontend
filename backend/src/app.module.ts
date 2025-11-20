import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChildModule } from './domains/child/child.module';
import { PerformanceModule } from './domains/performance/performance.module';
import { ReviewModule } from './domains/review/review.module';
import { AuthModule } from '@/domains/auth/auth.module';
import { ENV_KEYS } from '@/shared/constants';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>(ENV_KEYS.DB_HOST),
        port: configService.get<number>(ENV_KEYS.DB_PORT),
        username: configService.get<string>(ENV_KEYS.DB_USERNAME),
        password: configService.get<string>(ENV_KEYS.DB_PASSWORD),
        database: configService.get<string>(ENV_KEYS.DB_DATABASE),
        entities: [__dirname + '/**/*.entity.{js,ts}'],
        synchronize: true,
        logging:
          configService.get<string>(ENV_KEYS.TYPEORM_LOGGING) === 'true' ||
          configService.get<string>(ENV_KEYS.NODE_ENV) === 'development',
        ssl:
          configService.get<string>(ENV_KEYS.NODE_ENV) === 'production'
            ? {
                rejectUnauthorized: false,
              }
            : false,
      }),
    }),

    ChildModule,
    PerformanceModule,
    ReviewModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
