import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {
    private readonly logger = new Logger(SupabaseService.name);
    private clientInstance: SupabaseClient;

    constructor(private configService: ConfigService) { }

    getClient() {
        if (this.clientInstance) {
            return this.clientInstance;
        }
        const url = process.env.SUPABASE_URL || '';
        const key = process.env.SUPABASE_KEY || '';

        this.clientInstance = createClient(url, key);
        this.logger.log('Supabase Client initialized ✅');
        return this.clientInstance;
    }
}