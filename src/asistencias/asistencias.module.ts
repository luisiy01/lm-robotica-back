import { Module } from '@nestjs/common';
import { AsistenciasService } from './assistencias.service';
import { AsistenciasController } from './asistencias.controller';
import { AuthGuard } from '../auth/auth.guard';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  providers: [AsistenciasService, AuthGuard, JwtService, ConfigService],
  controllers: [AsistenciasController],
})
export class AsistenciasModule {}
