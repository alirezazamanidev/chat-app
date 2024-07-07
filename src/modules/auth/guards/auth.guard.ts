import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { isJWT } from 'class-validator';
import { Observable } from 'rxjs';
import { AuthMessage } from 'src/common/enums/message.enum';
import { AuthService } from '../auth.service';


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}
  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    let token = this.extractToken(req);
    
  
    req.user = await this.authService.validateJwtToken(token);
    return true;
  }
  protected extractToken(request: Request) {
    let accessToken = null;

    accessToken = request.headers?.['authorization'];

    if (!accessToken || accessToken.trim() == '')
      throw new UnauthorizedException(AuthMessage.LoginIsRequired);
    const [bearer, token] = accessToken.split(' ');
    if (bearer.toLowerCase() !== 'bearer' || !token || !isJWT(token))
      throw new UnauthorizedException(AuthMessage.LoginIsRequired);

    return token;
  }
}
