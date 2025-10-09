import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Pago extends Document {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Alumno', required: true })
  alumnoId: Types.ObjectId;

  @Prop({ required: true })
  periodoDePago: string;

  @Prop()
  total?: number;

  @Prop()
  nombrePaquete?: string;

  @Prop()
  fechaPago?: number;

  @Prop({ required: true })
  pagado: boolean;

  @Prop()
  createdOn: number;

  @Prop()
  updatedOn?: number;
}

export const PagoSchema = SchemaFactory.createForClass(Pago);
