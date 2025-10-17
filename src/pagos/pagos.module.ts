import { Module } from '@nestjs/common';
import { PagosService } from './pagos.service';
import { PagosController } from './pagos.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Pago, PagoSchema } from './entities/pago.entity';
import { ConfigModule } from '@nestjs/config';
import { AlumnoModule } from 'src/alumno/alumno.module';


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
    AlumnoModule,
  ],
  exports: [MongooseModule],
})
export class PagosModule {}
