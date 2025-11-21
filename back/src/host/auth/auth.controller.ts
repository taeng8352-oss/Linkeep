import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { HostRegisterDto, HostLoginDto } from '../dto/host.dto';

@Controller('api/host')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registerDto: HostRegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  async login(@Body() loginDto: HostLoginDto) {
    return this.authService.login(loginDto);
  }
}
