// src/alumnos/alumnos.controller.ts
import {
    Controller, Get, Post, Body, Patch, Param, Delete,
    UseGuards, Request, ParseUUIDPipe
} from '@nestjs/common';
import { AlumnosService } from './alumnos.service';
import { CreateAlumnoDto } from './dto/create-alumno.dto';
import { UpdateAlumnoDto } from './dto/update-alumno.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('alumnos')
@UseGuards(AuthGuard) // Protege todos los endpoints de este controlador
export class AlumnosController {
    constructor(private readonly alumnosService: AlumnosService) { }

    @Post()
    create(@Body() createAlumnoDto: CreateAlumnoDto, @Request() req) {
        // El id del usuario viene del token decodificado por el AuthGuard
        const usuarioId = req.user.sub;
        return this.alumnosService.create(createAlumnoDto, usuarioId);
    }

    @Get()
    findAll() {
        return this.alumnosService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseUUIDPipe) id: string) {
        return this.alumnosService.findOne(id);
    }

    @Patch(':id')
    update(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() updateAlumnoDto: UpdateAlumnoDto
    ) {
        return this.alumnosService.update(id, updateAlumnoDto);
    }

    @Delete(':id')
    remove(@Param('id', ParseUUIDPipe) id: string) {
        return this.alumnosService.remove(id);
    }
}