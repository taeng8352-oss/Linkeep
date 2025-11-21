import { Injectable, NotFoundException } from '@nestjs/common';
import { SupabaseService } from '../common/supabase/supabase.service';

@Injectable()
export class SpotsService {
  constructor(private supabaseService: SupabaseService) {}

  async findById(uuid: string) {
    const { data, error } = await this.supabaseService
      .getClient()
      .from('spots')
      .select('*')
      .eq('id', uuid)
      .eq('is_active', true)
      .single();

    if (error || !data) {
      throw new NotFoundException('Spot not found');
    }

    return data;
  }

  async findAll() {
    const { data, error } = await this.supabaseService
      .getClient()
      .from('spots')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }
}
