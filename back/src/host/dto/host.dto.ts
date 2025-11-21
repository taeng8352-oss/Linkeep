export class HostRegisterDto {
  email: string;
  password: string;
  name: string;
  phone?: string;
}

export class HostLoginDto {
  email: string;
  password: string;
}

export class HostDto {
  id: string;
  email: string;
  name: string;
  phone?: string;
}
