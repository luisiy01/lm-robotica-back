// asistencias.service.ts
import { Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { CreateAsistenciaDto } from './dto/create-asistencia.dto';

@Injectable()
export class AsistenciasService {
  constructor(private readonly supabase: SupabaseClient) {}

  async registrarClase(createAsistenciaDto: CreateAsistenciaDto) {
    const { alumno_id, fecha, hora } = createAsistenciaDto;

    const { data, error } = await this.supabase
      .from('horarios_alumnos')
      .insert([
        {
          alumno_id,
          fecha,
          hora,
        },
      ])
      .select();

    if (error) throw new Error(error.message);
    return data;
  }
}
