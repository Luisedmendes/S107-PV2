import request from 'supertest';
import { app } from '@shared/app';
import { IConnectionDTO } from '@shared/typeorm';
import { MysqlDataSource } from '@shared/typeorm/dataSources/mysqlDataSource';

let connection: IConnectionDTO;
describe('CreateUserController', (): void => {
  beforeAll(async (): Promise<void> => {
    connection = {
      client: 'database_test',
      mysql: await MysqlDataSource('database_test').initialize(),
    };
    await connection.mysql.runMigrations();
  });

  afterAll(async (): Promise<void> => {
    await connection.mysql.dropDatabase();
    await connection.mysql.destroy();
  });

  it('Should be able to create a new user', async (): Promise<void> => {
    const response = await request(app.server).post('/users').send({
      email: 'user@outlook',
      password: '12345',
    });

    expect(response.status).toBe(201);
  });
});
