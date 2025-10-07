import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Alumno extends Document {
  @Prop({
    unique: true,
    index: true,
  })
  name: string;

  @Prop()
  fecha1: string;

  @Prop()
  fecha2: string;

  @Prop({ min: 1, max: 31 })
  diaCobro: number;

  @Prop()
  costoMensual: number;

  @Prop()
  contacto: string;

  @Prop()
  createdOn: number;

  @Prop()
  updatedOn?: number;
}

export const AlumnoSchema = SchemaFactory.createForClass(Alumno);
