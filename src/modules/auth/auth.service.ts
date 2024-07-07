import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { AuthMessage } from 'src/common/enums/message.enum';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async login(LoginDto: LoginDto) {
    let { username, password } = LoginDto;

    let user = await this.userRepository.findOneBy({ username });
    if (user) {
      if (!this.checkPassword(password, user.hashPassword))
        throw new UnauthorizedException(AuthMessage.pPasswordInCurrent);
    // create token
    return 'user login'
    }else {
        user=this.userRepository.create({username,hashPassword:password})
        await this.userRepository.save(user)
        // create token
        return 'user register'
    }
  }

  async checkPassword(pass: string, hashPass: string) {
    return bcrypt.compareSync(pass, hashPass);
  }
}
