import { FakeCacheProvider } from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import { ICacheProviderDTO } from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import { FakeUsersRepository } from '@modules/users/repositories/fakes/FakeUsersRepository';
import { IUsersRepositoryDTO } from '@modules/users/repositories/IUsersRepository';
import { Connection, IConnectionDTO } from '@shared/typeorm';
import { AppError } from '@shared/errors/AppError';
import { FakeDataSource } from '@shared/typeorm/dataSources/fakes/fakeDataSource';
import { CreateUserService } from './CreateUserService';

let fakeUsersRepository: IUsersRepositoryDTO;
let fakeCacheProvider: ICacheProviderDTO;
let connection: IConnectionDTO;
let createUserService: CreateUserService;

describe('CreateUserService', (): void => {
  beforeAll((): void => {
    connection = new Connection('database_test', FakeDataSource);
  });

  beforeEach((): void => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeCacheProvider = new FakeCacheProvider();
    createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeCacheProvider,
      connection,
    );
  });

  it('Should be able to create a new user', async (): Promise<void> => {
    const response = await createUserService.execute({
      email: 'test@gmail.com',
      password: '123456',
    });

    expect(response.code).toBe(201);
    expect(response.message_code).toBe('CREATED');
    expect(response.message).toBe('User successfully created');
  });

  it('should not be able to create a user with no email', async (): Promise<void> => {
    await expect(
      createUserService.execute({ email: '', password: '123456' }),
    ).rejects.toThrow(new AppError('FAILED_TO_CREATE', 'Email is required'));
  });
});
