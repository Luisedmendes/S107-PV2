import { FakeCacheProvider } from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import { ICacheProviderDTO } from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import { AppError } from '@shared/errors/AppError';
import { FakeUsersRepository } from '@modules/users/repositories/fakes/FakeUsersRepository';
import { IUsersRepositoryDTO } from '@modules/users/repositories/IUsersRepository';
import { Connection, IConnectionDTO } from '@shared/typeorm';
import { FakeDataSource } from '@shared/typeorm/dataSources/fakes/fakeDataSource';
import { UpdateUserService } from './UpdateUserService';

let fakeUsersRepository: IUsersRepositoryDTO;
let fakeCacheProvider: ICacheProviderDTO;
let connection: IConnectionDTO;
let updateUserService: UpdateUserService;

describe('UpdateUserService', (): void => {
  beforeAll((): void => {
    connection = new Connection('database_test', FakeDataSource);
  });

  beforeEach((): void => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeCacheProvider = new FakeCacheProvider();
    updateUserService = new UpdateUserService(
      fakeUsersRepository,
      fakeCacheProvider,
      connection,
    );
  });

  it('Should be able to update a user', async (): Promise<void> => {
    const user = await fakeUsersRepository.create({
      email: 'user@outlook.com.br',
      password: '12345',
    });

    const updatedUser = await updateUserService.execute(
      { ...user, email: 'updatedUser@outlook.com.br' },
      user.id,
    );

    expect(updatedUser.data.email).toEqual('updatedUser@outlook.com.br');
  });

  it('Should not be able to update a user with a non-existing id', async (): Promise<void> => {
    await expect(
      updateUserService.execute({}, 'non-existing-user-id'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
