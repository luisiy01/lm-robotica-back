import { Module } from '@nestjs/common';
import { AlumnoModule } from './alumno/alumno.module';
import { ConfigModule } from '@nestjs/config';
import { EnvConfiguration } from './config/env.config';
import { JoiValidationSchema } from './config/joi.validation';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PagosModule } from './pagos/pagos.module';
import { SeedModule } from './seed/seed.module';
import { AsistenciaModule } from './asistencia/asistencia.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [EnvConfiguration],
      validationSchema: JoiValidationSchema,
    }),

    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),

    MongooseModule.forRoot(
      process.env.MONGODB || 'mongodb://localhost:27017/lm-robotica',
      {
        dbName: 'alumnosdb',
      },
    ),

    AlumnoModule,

    PagosModule,

    SeedModule,

    AsistenciaModule,
  ],
  controllers: [],
})
export class AppModule {}
