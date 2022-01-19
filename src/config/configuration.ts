import { registerAs } from '@nestjs/config';

class Config {
    appName: string;
    nodeEnv: string;
    mongoDbUrl: string;
}

export default registerAs(
    'configuration',
    (): Config => ({
      appName: process.env.APP_NAME,
      nodeEnv: process.env.NODE_ENV,
      mongoDbUrl: process.env.MONGO_DB_URL,
    })
)