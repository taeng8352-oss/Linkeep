import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { SupabaseService } from '../common/supabase/supabase.service';
import { CreateReservationDto } from './dto/reservation.dto';

@Injectable()
export class ReservationsService {
  constructor(private supabaseService: SupabaseService) {}

  async create(createReservationDto: CreateReservationDto) {
    // Get spot to calculate price
    const { data: spot, error: spotError } = await this.supabaseService
      .getClient()
      .from('spots')
      .select('price_per_bag, max_bags')
      .eq('id', createReservationDto.spot_id)
      .single();

    if (spotError || !spot) {
      throw new NotFoundException('Spot not found');
    }

    // Calculate total price (price per bag * number of bags)
    const total_price = spot.price_per_bag * createReservationDto.bags;

    // Check if bags exceed max
    if (createReservationDto.bags > spot.max_bags) {
      throw new BadRequestException(`Maximum ${spot.max_bags} bags allowed`);
    }

    const { data, error } = await this.supabaseService
      .getClient()
      .from('reservations')
      .insert({
        spot_id: createReservationDto.spot_id,
        guest_name: createReservationDto.guest_name,
        guest_phone: createReservationDto.guest_phone,
        bags: createReservationDto.bags,
        start_time: createReservationDto.start_time,
        end_time: createReservationDto.end_time,
        total_price,
        status: 'pending',
      })
      .select()
      .single();

    if (error) {
      throw new BadRequestException(error.message);
    }

    return data;
  }

  async findById(id: string) {
    const { data, error } = await this.supabaseService
      .getClient()
      .from('reservations')
      .select(`
        *,
        spots (
          name,
          address,
          latitude,
          longitude,
          image_url
        )
      `)
      .eq('id', id)
      .single();

    if (error || !data) {
      throw new NotFoundException('Reservation not found');
    }

    return data;
  }

  async updateStatus(id: string, status: string, payment_id?: string) {
    const updateData: Record<string, string> = { status };
    if (payment_id) {
      updateData.payment_id = payment_id;
    }

    const { data, error } = await this.supabaseService
      .getClient()
      .from('reservations')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw new BadRequestException(error.message);
    }

    return data;
  }
}
