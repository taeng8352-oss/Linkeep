import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { SupabaseService } from '../../common/supabase/supabase.service';

@Injectable()
export class HostReservationsService {
  constructor(private supabaseService: SupabaseService) {}

  async findAllByHost(hostId: string) {
    // First get all spot IDs for this host
    const { data: spots, error: spotsError } = await this.supabaseService
      .getClient()
      .from('spots')
      .select('id')
      .eq('host_id', hostId);

    if (spotsError) {
      throw new Error(spotsError.message);
    }

    if (!spots || spots.length === 0) {
      return [];
    }

    const spotIds = spots.map((s) => s.id);

    // Get all reservations for these spots
    const { data, error } = await this.supabaseService
      .getClient()
      .from('reservations')
      .select(`
        *,
        spots (
          id,
          name,
          address
        )
      `)
      .in('spot_id', spotIds)
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  async findTodayReservations(hostId: string) {
    const { data: spots } = await this.supabaseService
      .getClient()
      .from('spots')
      .select('id')
      .eq('host_id', hostId);

    if (!spots || spots.length === 0) {
      return [];
    }

    const spotIds = spots.map((s) => s.id);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const { data, error } = await this.supabaseService
      .getClient()
      .from('reservations')
      .select(`
        *,
        spots (
          id,
          name,
          address
        )
      `)
      .in('spot_id', spotIds)
      .gte('start_time', today.toISOString())
      .lt('start_time', tomorrow.toISOString())
      .order('start_time', { ascending: true });

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  async updateStatus(hostId: string, reservationId: string, status: string) {
    // Verify the reservation belongs to a spot owned by this host
    const { data: reservation } = await this.supabaseService
      .getClient()
      .from('reservations')
      .select('spot_id')
      .eq('id', reservationId)
      .single();

    if (!reservation) {
      throw new NotFoundException('Reservation not found');
    }

    const { data: spot } = await this.supabaseService
      .getClient()
      .from('spots')
      .select('host_id')
      .eq('id', reservation.spot_id)
      .single();

    if (!spot || spot.host_id !== hostId) {
      throw new NotFoundException('Reservation not found');
    }

    const { data, error } = await this.supabaseService
      .getClient()
      .from('reservations')
      .update({ status })
      .eq('id', reservationId)
      .select()
      .single();

    if (error) {
      throw new BadRequestException(error.message);
    }

    return data;
  }
}
