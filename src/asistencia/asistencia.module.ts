import { Module } from '@nestjs/common';
import { AsistenciaService } from './asistencia.service';
import { AsistenciaController } from './asistencia.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Asistencia, AsistenciaSchema } from './entities/asistencia.entity';
import { ConfigModule } from '@nestjs/config';
import { AlumnoModule } from 'src/alumno/alumno.module';

@Module({
  controllers: [AsistenciaController],
  providers: [AsistenciaService],
  imports: [
    ConfigModule,
    MongooseModule.forFeature([
      {
        name: Asistencia.name,
        schema: AsistenciaSchema,
      },
    ]),
    AlumnoModule,
  ],
  exports: [MongooseModule],
})
export class AsistenciaModule {}
