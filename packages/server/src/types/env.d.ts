export interface IEnvConfig {
    PORT: number;
    JWT_SECRET: string;
    SALT: string;
    NODE_ENV: 'production' | 'development' | 'test';
    FRONTEND_URL: string;
    DATABASE_URL: string;
}