// src/pagos/dto/create-pago.dto.ts
import {
  IsUUID,
  IsNumber,
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEnum,
  Min,
} from 'class-validator';

export class CreatePagoDto {
  @IsUUID('4', { message: 'El ID del alumno debe ser un UUID válido' })
  @IsNotEmpty({ message: 'El ID del alumno es obligatorio' })
  alumno_id: string;

  @IsNumber({}, { message: 'El monto debe ser un número' })
  @Min(0, { message: 'El monto no puede ser negativo' })
  @IsNotEmpty({ message: 'El monto es obligatorio' })
  monto: number;

  @IsNumber({}, { message: 'La duración debe ser un número' })
  @IsNotEmpty({ message: 'La duración es obligatoria' })
  duracion: number;

  @IsString({ message: 'El concepto debe ser texto' })
  @IsNotEmpty({ message: 'El concepto es obligatorio' })
  concepto: string;

  @IsEnum(['completado', 'pendiente', 'cancelado'], {
    message: 'Estado no válido',
  })
  @IsOptional()
  estado?: string;

  @IsEnum(['efectivo', 'transferencia', 'tarjeta'], {
    message: 'Método no válido',
  })
  @IsOptional()
  metodo_pago?: string;

  @IsString()
  @IsOptional()
  notas?: string;
}
