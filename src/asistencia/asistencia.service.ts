import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateAsistenciaDto } from './dto/create-asistencia.dto';
import { UpdateAsistenciaDto } from './dto/update-asistencia.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Asistencia } from './entities/asistencia.entity';
import { Model } from 'mongoose';
import { Alumno } from 'src/alumno/entities/alumno.entity';

interface Semana {
  numSemana: number;
  dia1: boolean;
  dia2: boolean;
}

@Injectable()
export class AsistenciaService {
  constructor(
    @InjectModel(Asistencia.name)
    private readonly asistenciaModel: Model<Asistencia>,
    @InjectModel(Alumno.name)
    private readonly alumnoModel: Model<Alumno>,
  ) {}

  create(createAsistenciaDto: CreateAsistenciaDto) {
    return 'This action adds a new asistencia';
  }

  findAll() {
    return `This action returns all asistencia`;
  }

  async find(camposBusqueda: any) {
    let asistencias: any | null = null;

    let objetoBusqueda = {};

    for (const key in camposBusqueda) {
      if (camposBusqueda[key]) objetoBusqueda[key] = camposBusqueda[key];
    }

    console.log('objetoBusqueda', objetoBusqueda);
    asistencias = await this.asistenciaModel
      .find(objetoBusqueda)
      .select('-__v -createdAt -updatedAt');

    const newAsistencias: any[] = [];

    for await (const asistencia of asistencias) {
      let alumno = await this.alumnoModel
        .findById(asistencia.alumnoId)
        .select('-__v -createdAt -updatedAt');
      newAsistencias.push({
        asistencia: asistencia._doc,
        alumno,
      });
    }

    return newAsistencias;
  }

  findOne(id: number) {
    return `This action returns a #${id} asistencia`;
  }

  async registrarAsistencia(
    id: string,
    updateAsistenciaDto: UpdateAsistenciaDto,
  ) {
    try {
      const asistencia = await this.asistenciaModel.findById(id);

      if (!asistencia) {
        throw new InternalServerErrorException(
          `El id de la asistencia no existe`,
        );
      }

      if (asistencia.alumnoId != updateAsistenciaDto.alumnoId) {
        throw new InternalServerErrorException(
          `La asistencia no corresponde al alumno`,
        );
      }

      const newSeamanas = asistencia.semanas?.map((semana) => {
        if (semana.numSemana === updateAsistenciaDto.numSemana) {
          semana.dia1 = updateAsistenciaDto.fecha1;
          semana.dia2 = updateAsistenciaDto.fecha2;
        }
        return semana;
      });

      await asistencia!.updateOne({
        semanas: newSeamanas,
      });

      return { ...asistencia!.toJSON() };
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} asistencia`;
  }

  private handleExceptions(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(
        `Asistencia ya existe en la db ${JSON.stringify(error.keyValue)}`,
      );
    }
    console.log(error);
    throw new InternalServerErrorException(
      `No se puede crear la Asistencia - revisar server logs`,
    );
  }
}
