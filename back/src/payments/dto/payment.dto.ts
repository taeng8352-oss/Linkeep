export class CreatePaymentDto {
  reservation_id: string;
  amount: number;
}

export class PaymentResponseDto {
  success: boolean;
  payment_id: string;
  message: string;
}
