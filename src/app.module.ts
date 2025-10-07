import { Module } from '@nestjs/common';
import { AlumnoModule } from './alumno/alumno.module';
import { ConfigModule } from '@nestjs/config';
import { EnvConfiguration } from './config/env.config';
import { JoiValidationSchema } from './config/joi.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [EnvConfiguration],
      validationSchema: JoiValidationSchema,
    }),

    AlumnoModule,
  ],
  controllers: [],
})
export class AppModule {}
