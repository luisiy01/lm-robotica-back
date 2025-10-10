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
  findByAlumno(
    @Query('alumno') alumnoId?: string,
    @Query('periodo') periodoDePago?: string,
    @Query('pagado') pagado?: boolean,
    @Query('total') total?: number,
    @Query('paquete') paquete?: string,
    @Query('fecha') fecha?: number,
  ) {
    return this.pagosService.findByAlumno(
      alumnoId,
      periodoDePago,
      pagado,
      total,
      paquete,
      fecha,
    );
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePagoDto: UpdatePagoDto) {
    return this.pagosService.update(+id, updatePagoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pagosService.remove(+id);
  }
}
