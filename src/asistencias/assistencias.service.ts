// asistencias.service.ts
import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { CreateAsistenciaDto } from './dto/create-asistencia.dto';

@Injectable()
export class AsistenciasService {
  private readonly table = 'horarios_alumnos';

  constructor(private readonly supabase: SupabaseService) {}

  private get client() {
    return this.supabase.getClient();
  }

  async registrarClase(createAsistenciaDto: CreateAsistenciaDto) {
    const { alumno_id, fecha, hora } = createAsistenciaDto;

    const { data, error } = await this.client
      .from(this.table)
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
