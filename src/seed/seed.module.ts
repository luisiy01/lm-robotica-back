import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Alumno, AlumnoSchema } from '../alumno/entities/alumno.entity';
import { Pago, PagoSchema } from '../pagos/entities/pago.entity';
import {
  Asistencia,
  AsistenciaSchema,
} from '../asistencia/entities/asistencia.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [
    ConfigModule,
    MongooseModule.forFeature([
      {
        name: Alumno.name,
        schema: AlumnoSchema,
      },
      {
        name: Pago.name,
        schema: PagoSchema,
      },
      {
        name: Asistencia.name,
        schema: AsistenciaSchema,
      },
    ]),
  ],
  exports: [MongooseModule, SeedService],
})
export class SeedModule {}
