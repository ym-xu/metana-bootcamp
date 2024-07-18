import sequelize from '../config/db';

beforeAll(async () => {
  await sequelize.authenticate();
  console.log('Database connection successful');
});

afterAll(async () => {
  await sequelize.close();
  console.log('Database connection closed');
});