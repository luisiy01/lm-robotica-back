import { IsString, MinLength } from 'class-validator';
import mongoose from 'mongoose';

export class CreateAsistenciaDto {
    @IsString()
      @MinLength(1)
      alumnoId: string | mongoose.Types.ObjectId;
}
