// asistencias.service.ts
import { BadRequestException, Injectable } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { CreateAsistenciaDto } from './dto/create-asistencia.dto';

@Injectable()
export class AsistenciasService {
  private readonly table = 'horarios_alumnos';

  constructor(private readonly supabase: SupabaseService) {}

  private get client() {
    return this.supabase.getClient();
  }

  async registrarClase(data: any) {
    const { alumno_id, fecha, hora } = data;

    // 1. Validar si ya existe ese registro para evitar duplicados
    const { data: existente } = await this.client
      .from(this.table)
      .select('id')
      .match({ alumno_id, fecha, hora })
      .single();

    if (existente) {
      throw new BadRequestException(
        'El alumno ya está programado para esta clase y hora.',
      );
    }

    // 2. Insertar el nuevo registro
    const { data: nuevaAsistencia, error } = await this.client
      .from(this.table)
      .insert([
        {
          alumno_id,
          fecha,
          hora,
          created_at: new Date(),
        },
      ])
      .select()
      .single();

    if (error) {
      throw new BadRequestException(`Error de Supabase: ${error.message}`);
    }

    return nuevaAsistencia;
  }

  async obtenerAsistenciasPorFecha(fecha: string) {
    const { data, error } = await this.client
      .from(this.table)
      .select(
        `
        id,
        hora,
        alumnos (
          id,
          nombre
        )
      `,
      )
      .eq('fecha', fecha)
      .order('hora', { ascending: true });

    if (error) throw new BadRequestException(error.message);
    return data;
  }
}
