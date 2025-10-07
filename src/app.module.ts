import { Module } from '@nestjs/common';
import { AlumnoModule } from './alumno/alumno.module';
import { ConfigModule } from '@nestjs/config';
import { EnvConfiguration } from './config/env.config';
import { JoiValidationSchema } from './config/joi.validation';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [EnvConfiguration],
      validationSchema: JoiValidationSchema,
    }),

    MongooseModule.forRoot(
      process.env.MONGODB || 'mongodb://localhost:27017/lm-robotica',
      {
        dbName: 'alumnosdb',
      },
    ),

    AlumnoModule,
  ],
  controllers: [],
})
export class AppModule {}
