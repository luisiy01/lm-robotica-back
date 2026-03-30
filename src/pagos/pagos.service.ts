// src/pagos/pagos.service.ts
import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { CreatePagoDto } from './dto/create-pago.dto';

@Injectable()
export class PagosService {
    private readonly table = 'pagos';

    constructor(private readonly supabase: SupabaseService) { }

    private get client() {
        return this.supabase.getClient();
    }

    async findAll() {
        const { data, error } = await this.client
            .from(this.table)
            .select(`
        *,
        alumnos (
          nombre
        )
      `)
            .order('fecha_pago', { ascending: false });

        if (error) throw error;
        return data;
    }

    async create(createPagoDto: CreatePagoDto) {
        const { data, error } = await this.client
            .from(this.table)
            .insert([createPagoDto])
            .select(`
        *,
        alumnos (nombre)
      `)
            .single();

        if (error) throw error;
        return data;
    }

    async remove(id: string) {
        const { error } = await this.client
            .from(this.table)
            .delete()
            .eq('id', id);

        if (error) throw error;
        return { deleted: true };
    }
}