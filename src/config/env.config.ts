export const EnvConfiguration = () => ({
  port: process.env.PORT || 3000,
  mongodb: process.env.MONGODB,
  environment: process.env.NODE_ENV || 'dev',
});
