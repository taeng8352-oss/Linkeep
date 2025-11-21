import { Module } from '@nestjs/common';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { HostSpotsController } from './spots/host-spots.controller';
import { HostSpotsService } from './spots/host-spots.service';
import { HostReservationsController } from './reservations/host-reservations.controller';
import { HostReservationsService } from './reservations/host-reservations.service';

@Module({
  controllers: [AuthController, HostSpotsController, HostReservationsController],
  providers: [AuthService, HostSpotsService, HostReservationsService],
})
export class HostModule {}
