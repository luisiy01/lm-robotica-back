// asistencias.controller.ts
import {
  Controller,
  Post,
  Body,
  Res,
  HttpStatus,
  Get,
  Query,
  Delete,
  Param,
} from '@nestjs/common';
import { CreateAsistenciaDto } from './dto/create-asistencia.dto';
import { AsistenciasService } from './assistencias.service';

@Controller('asistencias')
export class AsistenciasController {
  constructor(private readonly asistenciasService: AsistenciasService) {}

  @Post('programar')
  async registrar(
    @Body() createAsistenciaDto: CreateAsistenciaDto,
    @Res() res,
  ) {
    try {
      const result =
        await this.asistenciasService.registrarClase(createAsistenciaDto);
      return res.status(HttpStatus.CREATED).json({
        message: 'Clase programada con éxito',
        data: result,
      });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error al registrar la clase',
        error: error.message,
      });
    }
  }

  @Get()
  async listarPorFecha(@Query('fecha') fecha: string) {
    return await this.asistenciasService.obtenerAsistenciasPorFecha(fecha);
  }

  @Delete(':id')
  async eliminar(@Param('id') id: string) {
    return await this.asistenciasService.eliminarAsistencia(id);
  }
}
