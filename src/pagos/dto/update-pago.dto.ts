import { PartialType } from '@nestjs/mapped-types';
import { CreatePagoDto } from './create-pago.dto';
import { IsBoolean, IsNumber, IsString } from 'class-validator';
import { type NombrePaquete } from '../interfaces/NombrePaquete';

export class UpdatePagoDto extends PartialType(CreatePagoDto) {
  @IsNumber()
  totalPagado?: number;
  @IsString()
  nombrePaquete?: NombrePaquete;
  @IsBoolean()
  pagado?: boolean;
}
