import { AuthGuard } from '@nestjs/passport';
import { Controller, Get, Post, Request, Response, UnauthorizedException, UseGuards, UseFilters } from '@nestjs/common';

import { jwtConstants } from './constants';
import { User } from './user.decorator';
import { AuthExceptionFilter } from './auth-exception.filter';

@UseFilters(AuthExceptionFilter)
@Controller('auth')
export class AuthController {
  @UseGuards(AuthGuard('jwt-on-cookie'))
  @Get('me')
  async getMe(@User() user) {
    return user;
  }

  @UseGuards(AuthGuard('jwt-on-bearer'))
  @Post('signin/jwt')
  async postSigninJwt(@Request() request, @Response() res) {
    if (request.header('Origin') !== `https://${jwtConstants.kerberosDomain}`) {
      throw new UnauthorizedException();
    }

    const { exp } = request.user.payload;
    res.cookie(jwtConstants.cookieName, request.jwt, {
      domain: '',
      expires: new Date(exp * 1000),
      httpOnly: false,
      path: '/',
      secure: false,
      signed: false,
    });

    return res.status(200).send({ status: 200 });
  }
}
