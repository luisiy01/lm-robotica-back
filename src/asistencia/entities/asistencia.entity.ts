import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';

export interface Semana {
  numSemana: number;
  dia1: boolean;
  dia2: boolean;
}

@Schema({ timestamps: true })
export class Asistencia extends Document {
  @Prop()
  fechaAsistencia: string;

  @Prop({
    type: Array,
    default: [],
  })
  semanas?: Array<Semana>;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Alumno',
    required: true,
    index: true,
  })
  alumnoId: Types.ObjectId;
}

export const AsistenciaSchema = SchemaFactory.createForClass(Asistencia);
