// src/pagos/pagos.module.ts
import { Module } from '@nestjs/common';
import { PagosService } from './pagos.service';
import { PagosController } from './pagos.controller';
import { SupabaseModule } from '../supabase/supabase.module';
import { AuthGuard } from '../auth/auth.guard';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [SupabaseModule],
  controllers: [PagosController],
  providers: [PagosService, AuthGuard, JwtService],
})
export class PagosModule { }