import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { SupabaseService } from '../../common/supabase/supabase.service';
import { CreateSpotDto, UpdateSpotDto } from '../../spots/dto/spot.dto';

@Injectable()
export class HostSpotsService {
  constructor(private supabaseService: SupabaseService) {}

  async create(hostId: string, createSpotDto: CreateSpotDto) {
    const { data, error } = await this.supabaseService
      .getClient()
      .from('spots')
      .insert({
        ...createSpotDto,
        host_id: hostId,
      })
      .select()
      .single();

    if (error) {
      throw new BadRequestException(error.message);
    }

    return data;
  }

  async findAllByHost(hostId: string) {
    const { data, error } = await this.supabaseService
      .getClient()
      .from('spots')
      .select('*')
      .eq('host_id', hostId)
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  async findById(hostId: string, spotId: string) {
    const { data, error } = await this.supabaseService
      .getClient()
      .from('spots')
      .select('*')
      .eq('id', spotId)
      .eq('host_id', hostId)
      .single();

    if (error || !data) {
      throw new NotFoundException('Spot not found');
    }

    return data;
  }

  async update(hostId: string, spotId: string, updateSpotDto: UpdateSpotDto) {
    // Verify ownership
    await this.findById(hostId, spotId);

    const { data, error } = await this.supabaseService
      .getClient()
      .from('spots')
      .update(updateSpotDto)
      .eq('id', spotId)
      .eq('host_id', hostId)
      .select()
      .single();

    if (error) {
      throw new BadRequestException(error.message);
    }

    return data;
  }

  async delete(hostId: string, spotId: string) {
    // Verify ownership
    await this.findById(hostId, spotId);

    const { error } = await this.supabaseService
      .getClient()
      .from('spots')
      .delete()
      .eq('id', spotId)
      .eq('host_id', hostId);

    if (error) {
      throw new BadRequestException(error.message);
    }

    return { success: true, message: 'Spot deleted' };
  }
}
