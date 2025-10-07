import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateAlumnoDto } from './dto/create-alumno.dto';
import { UpdateAlumnoDto } from './dto/update-alumno.dto';
import { Alumno } from './entities/alumno.entity';
import { Model } from 'mongoose';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class AlumnoService {
  constructor(
    @InjectModel(Alumno.name)
    private readonly alumnoModel: Model<Alumno>,

    private readonly configService: ConfigService,
  ) {}

  mapDtoToEntity(createAlumnoDto: CreateAlumnoDto): Partial<Alumno> {
    return {
      name: createAlumnoDto.name,
      fecha1: createAlumnoDto.fecha1,
      fecha2: createAlumnoDto.fecha2,
      diaCobro: createAlumnoDto.diaCobro,
      costoMensual: createAlumnoDto.costoMensual,
      contacto: createAlumnoDto.contacto,
      createdOn: new Date().getTime(),
    };
  }

  async create(createAlumnoDto: CreateAlumnoDto) {
    const newAlumno = this.mapDtoToEntity(createAlumnoDto);

    try {
      const alumno = await this.alumnoModel.create(newAlumno);

      return alumno;
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  findAll() {
    return `This action returns all alumno`;
  }

  findOne(id: number) {
    return `This action returns a #${id} alumno`;
  }

  update(id: number, updateAlumnoDto: UpdateAlumnoDto) {
    return `This action updates a #${id} alumno`;
  }

  remove(id: number) {
    return `This action removes a #${id} alumno`;
  }

  private handleExceptions(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(
        `Alumno ya existe en la db ${JSON.stringify(error.keyValue)}`,
      );
    }
    console.log(error);
    throw new InternalServerErrorException(
      `No se puede crear el Alumno - revisar server logs`,
    );
  }
}
