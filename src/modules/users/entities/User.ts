import { Entity, Column } from 'typeorm';
import { Base } from '@shared/container/modules/entities/Base';

@Entity('users')
export class User extends Base {
  @Column({ type: 'varchar', nullable: true })
  public email: string;

  @Column({ type: 'varchar', nullable: true })
  public password: string;
}
