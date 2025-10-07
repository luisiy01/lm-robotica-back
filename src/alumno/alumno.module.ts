import { Module } from '@nestjs/common';
import { AlumnoService } from './alumno.service';
import { AlumnoController } from './alumno.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Alumno, AlumnoSchema } from './entities/alumno.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [AlumnoController],
  providers: [AlumnoService],
  imports: [
    ConfigModule,
    MongooseModule.forFeature([
      {
        name: Alumno.name,
        schema: AlumnoSchema,
      },
    ]),
  ],
  exports: [MongooseModule],
})
export class AlumnoModule {}
