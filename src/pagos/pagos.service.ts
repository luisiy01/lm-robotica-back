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
import { Alumno } from 'src/alumno/entities/alumno.entity';
import { type NombrePaquete } from './interfaces/NombrePaquete';

@Injectable()
export class PagosService {
  constructor(
    @InjectModel(Pago.name)
    private readonly pagoModel: Model<Pago>,
    @InjectModel(Alumno.name)
    private readonly alumnoModel: Model<Alumno>,
  ) {}

  async findAll() {
    return this.pagoModel
      .find()
      .sort({ name: 1 })
      .select('-__v -createdAt -updatedAt');
  }

  async find(camposBusqueda: any) {
    let pagos: any | null = null;

    let objetoBusqueda = {};

    for (const key in camposBusqueda) {
      if (camposBusqueda[key]) objetoBusqueda[key] = camposBusqueda[key];
    }

    pagos = await this.pagoModel
      .find(objetoBusqueda)
      .select('-__v -createdAt -updatedAt');

    const newPagos: any[] = [];

    for await (const pago of pagos) {
      let alumno = await this.alumnoModel
        .findById(pago.alumnoId)
        .select('-__v -createdAt -updatedAt');
      newPagos.push({
        pago: pago._doc,
        alumno,
      });
    }

    return newPagos;
  }

  findOne(id: number) {
    return `This action returns a #${id} pago`;
  }

  siguientePeriodo = (paquete: NombrePaquete): string => {
    const currentDate = new Date();
    switch (paquete) {
      case '1 mes':
      case 'personalizado':
        currentDate.setMonth(currentDate.getMonth() + 1);
        return `${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;
      case '3 meses':
        currentDate.setMonth(currentDate.getMonth() + 3);
        return `${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;
      case '6 meses':
        currentDate.setMonth(currentDate.getMonth() + 6);
        return `${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;
      default:
        currentDate.setMonth(currentDate.getMonth() + 1);
        return `${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;
    }
  };

  agregarProximosPagos = async (
    pago,
    paquete: NombrePaquete,
    siguientePeriodoText: string,
  ) => {
    const currentDate = new Date();
    switch (paquete) {
      case '1 mes':
      case 'personalizado':
        currentDate.setMonth(currentDate.getMonth() + 1);
        await this.pagoModel.create({
          alumnoId: pago.alumnoId,
          periodoDePago: `${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`,
          pagado: false,
          periodoProxDePago: siguientePeriodoText,
        });
        break;
      case '3 meses':
        for (let i = 1; i < 2; i++) {
          currentDate.setMonth(currentDate.getMonth() + 1);
          await this.pagoModel.create({
            alumnoId: pago.alumnoId,
            periodoDePago: `${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`,
            pagado: true,
            periodoProxDePago: siguientePeriodoText,
          });
        }
        currentDate.setMonth(currentDate.getMonth() + 1);
        await this.pagoModel.create({
          alumnoId: pago.alumnoId,
          periodoDePago: `${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`,
          pagado: false,
          periodoProxDePago: siguientePeriodoText,
        });
        break;
      case '6 meses':
        for (let i = 1; i < 5; i++) {
          currentDate.setMonth(currentDate.getMonth() + 1);
          await this.pagoModel.create({
            alumnoId: pago.alumnoId,
            periodoDePago: `${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`,
            pagado: true,
            periodoProxDePago: siguientePeriodoText,
          });
        }
        currentDate.setMonth(currentDate.getMonth() + 1);
        await this.pagoModel.create({
          alumnoId: pago.alumnoId,
          periodoDePago: `${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`,
          pagado: false,
          periodoProxDePago: siguientePeriodoText,
        });
        break;
      default:
        break;
    }
  };

  async registrarPago(id: string, updatePagoDto: UpdatePagoDto) {
    try {
      const pago = await this.pagoModel.findById(id);

      if (!pago) {
        throw new InternalServerErrorException(`El id del pago no existe`);
      }

      if (pago.pagado) {
        throw new InternalServerErrorException(
          `El pago tiene status de pagado`,
        );
      }

      // revisar si es el mismo alumno

      

      const siguientePeriodoText = this.siguientePeriodo(
        updatePagoDto.nombrePaquete!.toLowerCase() as NombrePaquete,
      );

      await pago!.updateOne(updatePagoDto, {
        periodoProxDePago: siguientePeriodoText,
        fechaDePago: new Date().getTime(),
      });

      // depende el paquete agregar en los proximos pagos
      this.agregarProximosPagos(
        pago,
        updatePagoDto.nombrePaquete!.toLowerCase() as NombrePaquete,
        siguientePeriodoText,
      );

      return { ...pago!.toJSON(), ...updatePagoDto };
    } catch (error) {
      this.handleExceptions(error);
    }
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
