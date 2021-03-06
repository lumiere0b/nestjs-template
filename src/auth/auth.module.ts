import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtOnBearerStrategy } from './jwt-on-bearer.strategy';
import { JwtOnCookieStrategy } from './jwt-on-cookie.strategy';
import { RolesGuard } from './roles.guard';


@Module({
  imports: [
    PassportModule,
    JwtModule.register({}),
  ],
  controllers: [
    AuthController,
  ],
  providers: [
    AuthService,
    JwtOnBearerStrategy,
    JwtOnCookieStrategy,
    RolesGuard,
  ],
  exports: [
    AuthService,
    RolesGuard,
  ],
})
export class AuthModule { }
