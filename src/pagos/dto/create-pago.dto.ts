import {
  IsInt,
  IsPositive,
  IsString,
  Max,
  Min,
  MinLength,
  IsBoolean,
} from 'class-validator';

export class CreatePagoDto {
  @IsString()
  @MinLength(1)
  alumnoId: string;

  @IsString()
  @MinLength(1)
  periodoPagado: string;

  @IsInt()
  @IsPositive()
  total: number;

  @IsString()
  @MinLength(1)
  nombrePaquete: string;

  @IsInt()
  fechaPago?: number;

  @IsBoolean()
  pagado: boolean;
}
