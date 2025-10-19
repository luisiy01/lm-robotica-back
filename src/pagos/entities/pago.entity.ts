import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Pago extends Document {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Alumno',
    required: true,
    index: true,
  })
  alumnoId: Types.ObjectId;

  @Prop({ required: true, index: true })
  periodoDePago: string;

  @Prop()
  periodoProxDePago?: string;

  @Prop()
  totalPagado?: number;

  @Prop()
  nombrePaquete?: string;

  @Prop()
  fechaDePago?: number;

  @Prop({ required: true, index: true })
  pagado: boolean;
}

export const PagoSchema = SchemaFactory.createForClass(Pago);
