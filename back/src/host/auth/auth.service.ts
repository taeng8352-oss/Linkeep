import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { SupabaseService } from '../../common/supabase/supabase.service';
import { HostRegisterDto, HostLoginDto } from '../dto/host.dto';

@Injectable()
export class AuthService {
  constructor(private supabaseService: SupabaseService) {}

  async register(registerDto: HostRegisterDto) {
    // Check if email already exists
    const { data: existing } = await this.supabaseService
      .getClient()
      .from('hosts')
      .select('id')
      .eq('email', registerDto.email)
      .single();

    if (existing) {
      throw new BadRequestException('Email already registered');
    }

    // Insert new host (dummy - no password hashing)
    const { data, error } = await this.supabaseService
      .getClient()
      .from('hosts')
      .insert({
        email: registerDto.email,
        password: registerDto.password, // In production, hash this!
        name: registerDto.name,
        phone: registerDto.phone,
      })
      .select('id, email, name, phone')
      .single();

    if (error) {
      throw new BadRequestException(error.message);
    }

    return {
      success: true,
      host: data,
      message: 'Registration successful',
    };
  }

  async login(loginDto: HostLoginDto) {
    const { data: host, error } = await this.supabaseService
      .getClient()
      .from('hosts')
      .select('id, email, name, phone, password')
      .eq('email', loginDto.email)
      .single();

    if (error || !host) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // Dummy password check (no hashing)
    if (host.password !== loginDto.password) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // Return host without password
    const { password: _, ...hostWithoutPassword } = host;

    return {
      success: true,
      host: hostWithoutPassword,
      // In production, return JWT token here
      token: `dummy_token_${host.id}`,
    };
  }

  async getHostById(id: string) {
    const { data, error } = await this.supabaseService
      .getClient()
      .from('hosts')
      .select('id, email, name, phone')
      .eq('id', id)
      .single();

    if (error || !data) {
      throw new UnauthorizedException('Host not found');
    }

    return data;
  }
}
