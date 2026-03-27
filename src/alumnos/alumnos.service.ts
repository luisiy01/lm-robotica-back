// src/alumnos/alumnos.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { CreateAlumnoDto } from './dto/create-alumno.dto';
import { UpdateAlumnoDto } from './dto/update-alumno.dto';

@Injectable()
export class AlumnosService {
    private readonly table = 'alumnos';

    constructor(private readonly supabase: SupabaseService) { }

    private get client() {
        return this.supabase.getClient();
    }

    async findAll() {
        const { data, error } = await this.client
            .from(this.table)
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data;
    }

    async findOne(id: string) {
        const { data, error } = await this.client
            .from(this.table)
            .select('*')
            .eq('id', id)
            .single();

        if (error || !data) throw new NotFoundException('Alumno no encontrado');
        return data;
    }

    async create(createAlumnoDto: CreateAlumnoDto, usuarioId: string) {
        const { data, error } = await this.client
            .from(this.table)
            .insert([{ ...createAlumnoDto, creado_por: usuarioId }])
            .select()
            .single();

        if (error) throw error;
        return data;
    }

    async update(id: string, updateAlumnoDto: UpdateAlumnoDto) {
        const { data, error } = await this.client
            .from(this.table)
            .update(updateAlumnoDto)
            .eq('id', id)
            .select()
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