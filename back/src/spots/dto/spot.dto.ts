export class SpotDto {
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

export class CreateSpotDto {
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

export class UpdateSpotDto {
  name?: string;
  address?: string;
  description?: string;
  latitude?: number;
  longitude?: number;
  price_per_bag?: number;
  max_bags?: number;
  open_time?: string;
  close_time?: string;
  image_url?: string;
  is_active?: boolean;
}
