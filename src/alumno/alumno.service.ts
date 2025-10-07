import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateAlumnoDto } from './dto/create-alumno.dto';
import { UpdateAlumnoDto } from './dto/update-alumno.dto';
import { Alumno } from './entities/alumno.entity';
import { isValidObjectId, Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class AlumnoService {
  constructor(
    @InjectModel(Alumno.name)
    private readonly alumnoModel: Model<Alumno>,
  ) {}

  mapDtoToEntity(createAlumnoDto: CreateAlumnoDto): Partial<Alumno> {
    return {
      ...createAlumnoDto,
      createdOn: new Date().getTime(),
    };
  }

  mapDtoToEntityUpdate(createAlumnoDto: UpdateAlumnoDto): Partial<Alumno> {
    return {
      ...createAlumnoDto,
      updatedOn: new Date().getTime(),
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

  async findAll() {
    return this.alumnoModel.find().sort({ name: 1 }).select('-__v');
  }

  async findOne(id: string) {
    let alumno: Alumno | null = null;
    if (isValidObjectId(id)) {
      alumno = await this.alumnoModel.findById(id);
    }

    if (!alumno)
      throw new NotFoundException(`Alumno con id "${id}" no se encuentra`);

    return alumno;
  }

  async update(id: string, updateAlumnoDto: UpdateAlumnoDto) {
    const alumno = await this.findOne(id);

    const newAlumno = this.mapDtoToEntityUpdate(updateAlumnoDto);

    try {
      await alumno.updateOne(newAlumno, {
        new: true,
      });
      const alumnoUpdated = { ...alumno.toJSON(), ...newAlumno };
      delete alumnoUpdated['__v'];
      return alumnoUpdated;
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async remove(id: string) {
    const { deletedCount } = await this.alumnoModel.deleteOne({ _id: id });

    if (deletedCount === 0)
      throw new BadRequestException(`Alumno con id "${id}" no se encontro`);

    return;
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
