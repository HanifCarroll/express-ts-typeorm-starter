module.exports = {
  type: process.env.DB_TYPE,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: true,
  entities: ['src/typeorm/entity/*.(js|ts)'],
  migrations: ['src/typeorm/migration/*.(js|ts)'],
  subscribers: ['src/subscriber/**/*.(js|ts)'],
  cli: {
    entitiesDir: 'src/typeorm/entity',
    migrationsDir: 'src/typeorm/migration',
    subscribersDir: 'src/typeorm/subscriber',
  },
};
