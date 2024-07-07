import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './types/payload.type';

@Injectable()
export class TokenService {
  constructor(private jwtService: JwtService) {}

  createJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload, {
      secret: process.env.JWT_TOKEN_SECRET,
      expiresIn: '7d',
    });
    return token;
  }
}
