export class CreateReservationDto {
  spot_id: string;
  guest_name: string;
  guest_phone: string;
  bags: number;
  start_time: string;
  end_time: string;
}

export class ReservationDto {
  id: string;
  spot_id: string;
  guest_name: string;
  guest_phone: string;
  bags: number;
  start_time: string;
  end_time: string;
  total_price: number;
  status: string;
  payment_id?: string;
  created_at: string;
}
