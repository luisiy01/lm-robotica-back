// dto/create-asistencia.dto.ts
import { IsNotEmpty, IsUUID, IsString } from 'class-validator';

export class CreateAsistenciaDto {
  @IsUUID()
  @IsNotEmpty()
  alumno_id: string;

  @IsString()
  @IsNotEmpty()
  fecha: string; // Formato YYYY-MM-DD

  @IsString()
  @IsNotEmpty()
  hora: string; // Formato HH:mm
}
