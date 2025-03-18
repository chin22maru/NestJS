/* eslint-disable @typescript-eslint/require-await */
import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configValidationSchema } from './config.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.stage.${process.env.STAGE}`],
      validationSchema: configValidationSchema,
    }),
    TasksModule, 
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (confSer: ConfigService) => ({
        type: 'postgres',
        host: confSer.get('DB_HOST'),
        port: confSer.get('DB_PORT'),
        username: confSer.get('DB_USERNAME'),
        password: confSer.get('DB_PASSWORD'),
        database: confSer.get('DB'),
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    AuthModule,
  ],
})
export class AppModule {}
