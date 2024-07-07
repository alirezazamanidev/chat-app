import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { ContentType, SwaggerTags } from 'src/common/enums/swagger.enum';
import { LoginDto } from './dto/auth.dto';
import { Request } from 'express';
import { Auth } from 'src/common/decorators/auth.decorator';

@ApiTags(SwaggerTags.Auth)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiConsumes(ContentType.UrlEncoded,ContentType.Json)
  login(@Body() LoginDto:LoginDto){
    return this.authService.login(LoginDto)
  }
  @HttpCode(HttpStatus.OK)
  @Auth()
  @Get('/check-login')
  checklogin(@Req() req:Request){
    return {
      userLogin:req.user
    }
  }
}
