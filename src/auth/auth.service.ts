import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private readonly supabaseService: SupabaseService,
        private readonly jwtService: JwtService,
    ) { }

    async login(email: string, pass: string) {
        const client = this.supabaseService.getClient();

        // 1. Buscar usuario por email
        const { data: usuario, error } = await client
            .from('usuarios')
            .select('*')
            .eq('email', email.toLowerCase())
            .single();

        if (error || !usuario) {
            throw new UnauthorizedException('Credenciales inválidas');
        }

        // 2. Verificar contraseña con bcrypt
        const isMatch = await bcrypt.compare(pass, usuario.password_hash);
        if (!isMatch) {
            throw new UnauthorizedException('Credenciales inválidas');
        }

        // 3. Generar el JWT
        const payload = {
            sub: usuario.id,
            email: usuario.email,
            rol: usuario.rol,
            nombre: usuario.nombre_completo
        };

        return {
            access_token: await this.jwtService.signAsync(payload),
            user: {
                id: usuario.id,
                nombre: usuario.nombre_completo,
                rol: usuario.rol
            }
        };
    }
}