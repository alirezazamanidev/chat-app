import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { AuthMessage, PublicMessage } from 'src/common/enums/message.enum';
import { TokenService } from './tokens.service';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private tokenService: TokenService,
  ) {}

  async login(LoginDto: LoginDto) {
    let { username, password } = LoginDto;

    let user = await this.userRepository.findOneBy({ username });
    if (user) {
      if (!this.checkPassword(password, user.hashPassword))
        throw new UnauthorizedException(AuthMessage.pPasswordInCurrent);

      
    } else {
      user = this.userRepository.create({ username, hashPassword: password });
      await this.userRepository.save(user);
  
    }
    return {
        message: PublicMessage.LoggedIn,
        token: this.tokenService.createJwtToken({ userId: user.id }),
      };
  }

  async checkPassword(pass: string, hashPass: string) {
    return bcrypt.compareSync(pass, hashPass);
  }
}
