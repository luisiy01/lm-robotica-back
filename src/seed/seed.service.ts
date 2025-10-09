import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Alumno } from 'src/alumno/entities/alumno.entity';
import { Pago } from 'src/pagos/entities/pago.entity';

@Injectable()
export class SeedService {
  constructor(
    @InjectModel(Alumno.name)
    private readonly alumnoModel: Model<Alumno>,
    @InjectModel(Pago.name)
    private readonly pagoModel: Model<Pago>,
  ) {}

  async executeSeed() {
    const allAlumnos = this.alumnoModel
      .find()
      .sort({ name: 1 })
      .select('-__v -createdAt -updatedAt');

    const mesActual = `${new Date().getMonth() + 1}-${new Date().getFullYear()}`;

    (await allAlumnos).forEach((alumno) => {
      const pagosDeAlumno = this.pagoModel
        .find({
          alumnoId: alumno._id,
          periodoDePago: mesActual,
        })
        .exec()
        .then(async (results: any) => {
          if (results.length === 0) {
            await this.pagoModel.create({
              alumnoId: alumno._id,
              periodoDePago: mesActual,
              pagado: false,
            });
          }
        });
    });

    return this.pagoModel.find().select('-__v -createdAt -updatedAt');
  }
}
