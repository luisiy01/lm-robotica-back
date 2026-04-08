// asistencias.controller.ts
import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { AsistenciasService } from './assistencias.service';
import { CreateAsistenciaDto } from './dto/create-asistencia.dto';

@Controller('asistencias')
export class AsistenciasController {
  constructor(private readonly asistenciasService: AsistenciasService) {}

  @Post('registrar')
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
}
