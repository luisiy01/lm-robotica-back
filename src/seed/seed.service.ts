import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Alumno } from 'src/alumno/entities/alumno.entity';
import { Pago } from 'src/pagos/entities/pago.entity';
import { Asistencia } from 'src/asistencia/entities/asistencia.entity';

export interface Semana {
  numSemana: number;
  dia1: boolean;
  dia2: boolean;
}

@Injectable()
export class SeedService {
  constructor(
    @InjectModel(Alumno.name)
    private readonly alumnoModel: Model<Alumno>,
    @InjectModel(Pago.name)
    private readonly pagoModel: Model<Pago>,
    @InjectModel(Asistencia.name)
    private readonly asistenciaModel: Model<Asistencia>,
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

  getWeekOfMonth(year: number, month_number: number): number {
    // month_number is in the range 1..12

    var firstOfMonth = new Date(year, month_number - 1, 1);
    var lastOfMonth = new Date(year, month_number, 0);

    var used = firstOfMonth.getDay() + lastOfMonth.getDate();

    return Math.ceil(used / 7);
  }

  async executeAsistenciaSeed() {
    const allAlumnos = this.alumnoModel
      .find()
      .sort({ name: 1 })
      .select('-__v -createdAt -updatedAt');

    const mesActual = `${new Date().getMonth() + 1}-${new Date().getFullYear()}`;
    // numero de semanas del mes
    const weeks = this.getWeekOfMonth(
      new Date().getFullYear(),
      new Date().getMonth() + 1,
    );

    const semanasObj: Semana[] = [];
    for (let i = 1; i <= weeks; i++) {
      semanasObj.push({ numSemana: i, dia1: false, dia2: false });
    }    

    (await allAlumnos).forEach((alumno) => {
      const asistenciaDeAlumno = this.asistenciaModel
        .find({
          alumnoId: alumno._id,
          fechaAsistencia: mesActual,
        })
        .exec()
        .then(async (results: any) => {
          if (results.length === 0) {
            await this.asistenciaModel.create({
              alumnoId: alumno._id,
              fechaAsistencia: mesActual,
              semanas: semanasObj,
            });
          }
        });
    });

    return this.asistenciaModel.find().select('-__v -createdAt -updatedAt');
  }
}
