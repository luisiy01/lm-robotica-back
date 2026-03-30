// src/pagos/pagos.controller.ts
import { Controller, Get, Post, Body, Delete, Param, UseGuards, ParseUUIDPipe } from '@nestjs/common';
import { PagosService } from './pagos.service';
import { CreatePagoDto } from './dto/create-pago.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('pagos')
@UseGuards(AuthGuard) // Solo usuarios logueados pueden gestionar pagos
export class PagosController {
    constructor(private readonly pagosService: PagosService) { }

    @Post()
    create(@Body() createPagoDto: CreatePagoDto) {
        return this.pagosService.create(createPagoDto);
    }

    @Get()
    findAll() {
        return this.pagosService.findAll();
    }

    @Delete(':id')
    remove(@Param('id', ParseUUIDPipe) id: string) {
        return this.pagosService.remove(id);
    }
}