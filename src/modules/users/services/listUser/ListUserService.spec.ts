import { FakeUsersRepository } from '@modules/users/repositories/fakes/FakeUsersRepository';
import { IUsersRepositoryDTO } from '@modules/users/repositories/IUsersRepository';
import { FakeCacheProvider } from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import { ICacheProviderDTO } from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import { Connection, IConnectionDTO } from '@shared/typeorm';
import { AppError } from '@shared/errors/AppError';
import { FakeDataSource } from '@shared/typeorm/dataSources/fakes/fakeDataSource';
import { ListUserService } from './ListUserService';

let fakeUsersRepository: IUsersRepositoryDTO;
let connection: IConnectionDTO;
let fakeCacheProvider: ICacheProviderDTO;
let listUserService: ListUserService;

describe('ListUserService', (): void => {
  beforeAll((): void => {
    connection = new Connection('database_test', FakeDataSource);
  });

  beforeEach((): void => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeCacheProvider = new FakeCacheProvider();
    listUserService = new ListUserService(
      fakeUsersRepository,
      fakeCacheProvider,
      connection,
    );
  });

  it('Should be able to list all the users', async (): Promise<void> => {
    const [user01, user02] = await fakeUsersRepository.createMany([
      {
        email: 'user@outlook.com.br',
        password: '12345',
      },
      {
        email: 'user@outlook.com.br',
        password: '12345',
      },
    ]);

    const userList = await listUserService.execute(1, 2, {});

    expect(userList.data).toEqual([user01, user02]);
  });

  it('Should be able to list all the users using cache', async (): Promise<void> => {
    const [user01, user02] = await fakeUsersRepository.createMany([
      {
        email: 'user@outlook.com.br',
        password: '12345',
      },
      {
        email: 'user@outlook.com.br',
        password: '12345',
      },
    ]);

    await listUserService.execute(1, 2, {});

    const userList = await listUserService.execute(1, 2, {});

    expect(userList.data).toEqual(JSON.parse(JSON.stringify([user01, user02])));
  });

  it('Should be able to list the users with the specified pagination', async (): Promise<void> => {
    const [user01, user02] = await fakeUsersRepository.createMany([
      {
        email: 'user@outlook.com.br',
        password: '12345',
      },
      {
        email: 'user@outlook.com.br',
        password: '12345',
      },
      {
        email: 'user@outlook.com.br',
        password: '12345',
      },
    ]);

    const userList01 = await listUserService.execute(1, 1, {});

    expect(userList01.data).toEqual([user01]);

    const userList02 = await listUserService.execute(1, 2, {});

    expect(userList02.data).toEqual([user01, user02]);
  });

  it('Should return AppError', async (): Promise<void> => {
    jest.spyOn(fakeUsersRepository, 'findAll').mockImplementationOnce(() => {
      throw new AppError('FAILED_TO_LIST', 'Failed to list users');
    });

    await expect(listUserService.execute(1, 2, {})).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
