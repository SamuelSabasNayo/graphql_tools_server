import { config } from 'dotenv';

config();

const env = process.env.NODE_ENV || 'development';

const development = {
  PORT: process.env.PORT,
  URL: process.env.DATABASE_URL
};

const test= {
  PORT: process.env.PORT,
  url: process.env.DATABASE_URL_TEST
};

const staging = {
  database_url: process.env.DATABASE_URL
};

const production = {
  database_url: process.env.DATABASE_URL
};

const configs = {
    development,
    test,
    staging,
    production
};

export default configs[env];
