import { Module } from '@nestjs/common';
import { PagosService } from './pagos.service';
import { PagosController } from './pagos.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Pago, PagoSchema } from './entities/pago.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [PagosController],
  providers: [PagosService],
  imports: [
    ConfigModule,
    MongooseModule.forFeature([
      {
        name: Pago.name,
        schema: PagoSchema,
      },
    ]),
  ],
  exports: [MongooseModule],
})
export class PagosModule {}
