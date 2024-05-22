import { injectable, inject } from 'tsyringe';
import { ICacheProviderDTO } from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import { IUsersRepositoryDTO } from '@modules/users/repositories/IUsersRepository';
import { IUserDTO } from '@modules/users/dtos/IUserDTO';
import { User } from '@modules/users/entities/User';
import { instanceToInstance } from 'class-transformer';
import { IResponseDTO } from '@dtos/IResponseDTO';
import { IConnectionDTO } from '@shared/typeorm';
import { Route, Tags, Post, Body } from 'tsoa';
import { AppError } from '@shared/errors/AppError';

@Route('/users')
@injectable()
export class CreateUserService {
  public constructor(
    @inject('UsersRepository')
    private readonly usersRepository: IUsersRepositoryDTO,

    @inject('CacheProvider')
    private readonly cacheProvider: ICacheProviderDTO,

    @inject('Connection')
    private readonly connection: IConnectionDTO,
  ) {}

  @Post()
  @Tags('User')
  public async execute(
    @Body() userData: IUserDTO,
  ): Promise<IResponseDTO<User>> {
    const trx = this.connection.mysql.createQueryRunner();

    await trx.startTransaction();
    try {
      if (!userData.email) {
        throw new AppError('FAILED_TO_CREATE', 'Email is required');
      }
      const user = await this.usersRepository.create(userData, trx);


      await this.cacheProvider.invalidatePrefix(
        `${this.connection.client}:users`,
      );
      if (trx.isTransactionActive) await trx.commitTransaction();

      return {
        code: 201,
        message_code: 'CREATED',
        message: 'User successfully created',
        data: instanceToInstance(user),
      };
    } catch (error: unknown) {
      if (trx.isTransactionActive) await trx.rollbackTransaction();
      throw error;
    } finally {
      if (!trx.isReleased) await trx.release();
    }
  }
}
