import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { PagosService } from './pagos.service';
import { UpdatePagoDto } from './dto/update-pago.dto';

@Controller('pagos')
export class PagosController {
  constructor(private readonly pagosService: PagosService) {}

  @Get()
  findAll() {
    return this.pagosService.findAll();
  }

  /*    @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pagosService.findOne(+id);
  } */

  @Get('find/')
  async findByAlumno(
    @Query('alumno') alumnoId?: string,
    @Query('periodo') periodoDePago?: string,
    @Query('pagado') pagado?: boolean,
    @Query('total') totalPagado?: number,
    @Query('paquete') nombrePaquete?: string,
    @Query('fecha') fechaDePago?: number,
  ) {
    return await this.pagosService.find({
      alumnoId,
      periodoDePago,
      pagado,
      totalPagado,
      nombrePaquete,
      fechaDePago,
    });
  }

  @Patch(':id')
  registrarPago(@Param('id') id: string, @Body() updatePagoDto: UpdatePagoDto) {
    return this.pagosService.registrarPago(id, updatePagoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pagosService.remove(+id);
  }
}
