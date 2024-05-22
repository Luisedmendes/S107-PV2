import { User } from '@modules/users/entities/User';
import { IUsersRepositoryDTO } from '@modules/users/repositories/IUsersRepository';
import { BaseRepository } from '@shared/container/modules/repositories/BaseRepository';

export class UsersRepository
  extends BaseRepository<User>
  implements IUsersRepositoryDTO
{
  public constructor() {
    super(User);
  }

  // non-generic methods here
}
