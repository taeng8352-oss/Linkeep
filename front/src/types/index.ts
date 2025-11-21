export interface Spot {
  id: string;
  name: string;
  address: string;
  description?: string;
  latitude?: number;
  longitude?: number;
  price_per_bag: number;
  max_bags: number;
  open_time: string;
  close_time: string;
  image_url?: string;
  is_active: boolean;
}

export interface Reservation {
  id: string;
  spot_id: string;
  guest_name: string;
  guest_phone: string;
  bags: number;
  start_time: string;
  end_time: string;
  total_price: number;
  status: 'pending' | 'paid' | 'completed' | 'cancelled';
  payment_id?: string;
  created_at: string;
  spots?: {
    name: string;
    address: string;
    latitude?: number;
    longitude?: number;
    image_url?: string;
  };
}

export interface Host {
  id: string;
  email: string;
  name: string;
  phone?: string;
}

export interface ReservationInput {
  spot_id: string;
  guest_name: string;
  guest_phone: string;
  bags: number;
  start_time: string;
  end_time: string;
}

export interface PaymentInput {
  reservation_id: string;
  amount: number;
}

export interface HostLoginInput {
  email: string;
  password: string;
}

export interface HostRegisterInput {
  email: string;
  password: string;
  name: string;
  phone?: string;
}

export interface CreateSpotInput {
  name: string;
  address: string;
  description?: string;
  latitude?: number;
  longitude?: number;
  price_per_bag?: number;
  max_bags?: number;
  open_time?: string;
  close_time?: string;
  image_url?: string;
}
