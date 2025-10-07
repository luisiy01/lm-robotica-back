import {
  IsInt,
  IsPositive,
  IsString,
  Max,
  Min,
  MinLength,
} from 'class-validator';

export class CreateAlumnoDto {
  @IsString()
  @MinLength(1)
  name: string;

  @IsString()
  @MinLength(1)
  fecha1: string;

  @IsString()
  @MinLength(1)
  fecha2: string;

  @IsInt()
  @IsPositive()
  @Min(1)
  @Max(31)
  diaCobro: number;

  @IsInt()
  @IsPositive()
  costoMensual: number;

  @IsString()
  @MinLength(1)
  contacto: string;

}
