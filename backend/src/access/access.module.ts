/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AccessController } from './access.controller';
import { AccessService } from './access.service';
import { RegistrationController } from './registration/registration.controller';
import { RegistrationService } from './registration/registration.service';
import { LoginController } from './login/login.controller';
import { LoginService } from './login/login.service';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AppService } from 'src/app.service';

@Module({
  controllers: [AccessController, RegistrationController, LoginController, AuthController],
  providers: [AccessService, RegistrationService, LoginService, AuthService, AppService]
})
export class AccessModule {}

