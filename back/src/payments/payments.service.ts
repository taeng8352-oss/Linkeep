import { Injectable, NotFoundException } from '@nestjs/common';
import { ReservationsService } from '../reservations/reservations.service';
import { CreatePaymentDto } from './dto/payment.dto';

@Injectable()
export class PaymentsService {
  constructor(private reservationsService: ReservationsService) {}

  async processPayment(createPaymentDto: CreatePaymentDto) {
    // Verify reservation exists
    const reservation = await this.reservationsService.findById(
      createPaymentDto.reservation_id,
    );

    if (!reservation) {
      throw new NotFoundException('Reservation not found');
    }

    // Generate dummy payment ID
    const payment_id = `PAY_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Update reservation status to paid
    await this.reservationsService.updateStatus(
      createPaymentDto.reservation_id,
      'paid',
      payment_id,
    );

    return {
      success: true,
      payment_id,
      message: 'Payment processed successfully',
    };
  }
}
