const dbConfig = {
  HOST: 'localhost',
  USER: 'root',
  PASSWORD: 'Root1234@',
  DB: 'to_do_db',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};

export default dbConfig;
