import { BaseEntity } from 'src/common/entities/base.entity';
import { EntityName } from 'src/common/enums/entityName.enum';
import {
  AfterInsert,
  Column,
  CreateDateColumn,
  Entity,
  UpdateDateColumn,
} from 'typeorm';
import { genSaltSync, hashSync } from 'bcrypt';
@Entity(EntityName.User)
export class UserEntity extends BaseEntity {
  @Column({ unique: true })
  username: string;
  @Column()
  hashPassword: string;
  @Column({nullable:true})
  avatar: string;
  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  updated_at: Date;

  @AfterInsert()
  hashedPassword() {
    const salt = genSaltSync(15);
    this.hashPassword = hashSync(this.hashPassword, salt);
  }
}
