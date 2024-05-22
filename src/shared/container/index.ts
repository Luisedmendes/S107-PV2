import './providers';
import { container } from 'tsyringe';
import { IUsersRepositoryDTO } from '@modules/users/repositories/IUsersRepository';
import { UsersRepository } from '@modules/users/repositories/UsersRepository';

container.registerSingleton<IUsersRepositoryDTO>(
  'UsersRepository',
  UsersRepository,
);
