import { Controller, Get, Put, Param, Body, Headers, UnauthorizedException } from '@nestjs/common';
import { HostReservationsService } from './host-reservations.service';

@Controller('api/host/reservations')
export class HostReservationsController {
  constructor(private readonly hostReservationsService: HostReservationsService) {}

  private extractHostId(authHeader: string): string {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('No token provided');
    }
    const token = authHeader.replace('Bearer ', '');
    const hostId = token.replace('dummy_token_', '');
    if (!hostId) {
      throw new UnauthorizedException('Invalid token');
    }
    return hostId;
  }

  @Get()
  async findAll(@Headers('authorization') authHeader: string) {
    const hostId = this.extractHostId(authHeader);
    return this.hostReservationsService.findAllByHost(hostId);
  }

  @Get('today')
  async findToday(@Headers('authorization') authHeader: string) {
    const hostId = this.extractHostId(authHeader);
    return this.hostReservationsService.findTodayReservations(hostId);
  }

  @Put(':id/status')
  async updateStatus(
    @Headers('authorization') authHeader: string,
    @Param('id') id: string,
    @Body('status') status: string,
  ) {
    const hostId = this.extractHostId(authHeader);
    return this.hostReservationsService.updateStatus(hostId, id, status);
  }
}
