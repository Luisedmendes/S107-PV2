import request from 'supertest';
import { MysqlDataSource } from '@shared/typeorm/dataSources/mysqlDataSource';
import { IConnectionDTO } from '@shared/typeorm';
import { app } from '@shared/app';
import { v4 as uuid } from 'uuid';

const id = uuid();
let connection: IConnectionDTO;

describe('DeleteUserController', (): void => {
  beforeAll(async (): Promise<void> => {
    connection = {
      client: 'database_test',
      mysql: await MysqlDataSource('database_test').initialize(),
    };
    await connection.mysql.runMigrations();

    return connection.mysql.query(
      'INSERT INTO users (id, email, password) VALUES (?, ?, ?);',
      [id, 'user@outlook', '12345'],
    );
  });

  afterAll(async (): Promise<void> => {
    await connection.mysql.dropDatabase();
    return connection.mysql.destroy();
  });

  it('Should be able to delete a user', async (): Promise<void> => {
    const response = await request(app.server).delete(`/users/${id}`);

    expect(response.status).toBe(200);
  });
});
