import request from 'supertest';
import { MysqlDataSource } from '@shared/typeorm/dataSources/mysqlDataSource';
import { IConnectionDTO } from '@shared/typeorm';
import { app } from '@shared/app';
import { v4 as uuid } from 'uuid';

let connection: IConnectionDTO;

describe('ListUserController', (): void => {
  beforeAll(async (): Promise<void> => {
    connection = {
      client: 'database_test',
      mysql: await MysqlDataSource('database_test').initialize(),
    };
    await connection.mysql.runMigrations();

    return connection.mysql.query(
      'INSERT INTO users (id, email, password) VALUES (?, ?, ?);',
      [uuid(), 'user@outlook.com.br', '12345'],
    );
  });

  afterAll(async (): Promise<void> => {
    await connection.mysql.dropDatabase();
    return connection.mysql.destroy();
  });

  it('Should be able to list all users', async (): Promise<void> => {
    const response = await request(app.server).get('/users');

    expect(response.status).toBe(200);
    expect(response.body.data[0]).toHaveProperty('id');
  });
});
