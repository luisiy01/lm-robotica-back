import { IsString, MinLength } from 'class-validator';
import mongoose from 'mongoose';

export class CreatePagoDto {
  @IsString()
  @MinLength(1)
  alumnoId: string | mongoose.Types.ObjectId;

  @IsString()
  @MinLength(1)
  periodoPagado: string;
}
