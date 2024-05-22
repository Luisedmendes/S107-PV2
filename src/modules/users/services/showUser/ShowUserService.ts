import { injectable, inject } from 'tsyringe';
import { AppError } from '@shared/errors/AppError';
import { IUsersRepositoryDTO } from '@modules/users/repositories/IUsersRepository';
import { User } from '@modules/users/entities/User';
import { instanceToInstance } from 'class-transformer';
import { IResponseDTO } from '@dtos/IResponseDTO';
import { IConnectionDTO } from '@shared/typeorm';
import { Get, Route, Tags, Path } from 'tsoa';

@Route('/users')
@injectable()
export class ShowUserService {
  public constructor(
    @inject('UsersRepository')
    private readonly usersRepository: IUsersRepositoryDTO,

    @inject('Connection')
    private readonly connection: IConnectionDTO,
  ) {}

  @Get('{id}')
  @Tags('User')
  public async execute(@Path() id?: string): Promise<IResponseDTO<User>> {
    const trx = this.connection.mysql.createQueryRunner();

    await trx.startTransaction();
    try {
      const user = await this.usersRepository.findBy(
        { where: { id } },
        trx,
      );

      if (!user) {
        throw new AppError('NOT_FOUND', 'User not found', 404);
      }

      if (trx.isTransactionActive) await trx.commitTransaction();

      return {
        code: 200,
        message_code: 'FOUND',
        message: 'User found successfully',
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
