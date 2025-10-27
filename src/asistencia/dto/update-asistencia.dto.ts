import { PartialType } from '@nestjs/swagger';
import { CreateAsistenciaDto } from './create-asistencia.dto';
import { IsBoolean, IsNumber } from 'class-validator';

export class UpdateAsistenciaDto extends PartialType(CreateAsistenciaDto) {
  @IsBoolean()
  fecha1: boolean;
  @IsBoolean()
  fecha2: boolean;
  @IsNumber()
  numSemana: number;
}
