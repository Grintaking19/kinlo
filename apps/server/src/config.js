import {z} from 'zod';
import dotenv from 'dotenv';

dotenv.config();

const envSchema = z.object({
    PORT: z.string().transform((val) => parseInt(val, 10)).default('3000'),
    NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
    DATABASE_URL: z.url(),
    POSTGRES_USER: z.string(),
    POSTGRES_PASSWORD: z.string(),
    POSTGRES_DB: z.string(),
})

const env = envSchema.safeParse(process.env);

if (!env.success) {
    console.error('Invalid environment variables:', env.error.format());
    process.exit(1);
}

export default env.data;