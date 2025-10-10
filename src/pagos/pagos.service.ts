import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreatePagoDto } from './dto/create-pago.dto';
import { UpdatePagoDto } from './dto/update-pago.dto';
import { Pago } from './entities/pago.entity';
import mongoose, { isValidObjectId, Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PagosService {
  constructor(
    @InjectModel(Pago.name)
    private readonly pagoModel: Model<Pago>,
  ) {}

  async findAll() {
    return this.pagoModel
      .find()
      .sort({ name: 1 })
      .select('-__v -createdAt -updatedAt');
  }

  async findByAlumno(camposBusqueda: any) {
    let pagos: any | null = null;

    let objetoBusqueda = {};

    for (const key in camposBusqueda) {
      if (camposBusqueda[key]) objetoBusqueda[key] = camposBusqueda[key];
    }

    console.log('objetoBusqueda', objetoBusqueda);

    pagos = await this.pagoModel
      .find(objetoBusqueda)
      .select('-__v -createdAt -updatedAt');

    return pagos;
  }

  findOne(id: number) {
    return `This action returns a #${id} pago`;
  }

  update(id: number, updatePagoDto: UpdatePagoDto) {
    return `This action updates a #${id} pago`;
  }

  remove(id: number) {
    return `This action removes a #${id} pago`;
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
