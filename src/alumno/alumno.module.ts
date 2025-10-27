import { Module } from '@nestjs/common';
import { AlumnoService } from './alumno.service';
import { AlumnoController } from './alumno.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Alumno, AlumnoSchema } from './entities/alumno.entity';
import { ConfigModule } from '@nestjs/config';
import { SeedService } from 'src/seed/seed.service';
import { Pago, PagoSchema } from 'src/pagos/entities/pago.entity';
import {
  Asistencia,
  AsistenciaSchema,
} from 'src/asistencia/entities/asistencia.entity';

@Module({
  controllers: [AlumnoController],
  providers: [AlumnoService, SeedService],
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
  exports: [MongooseModule, AlumnoService],
})
export class AlumnoModule {}
