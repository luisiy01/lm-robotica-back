export const EnvConfiguration = () => ({
  port: process.env.PORT || 3000,
  environment: process.env.NODE_ENV || 'dev',
  supabaseUrl: process.env.SUPABASE_URL || '',
  supabaseKey: process.env.SUPABASE_KEY || '',
  jwtSecret: process.env.JWT_SECRET || '',
});
