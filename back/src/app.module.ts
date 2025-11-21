import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SupabaseModule } from './common/supabase/supabase.module';
import { SpotsModule } from './spots/spots.module';
import { ReservationsModule } from './reservations/reservations.module';
import { PaymentsModule } from './payments/payments.module';
import { HostModule } from './host/host.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SupabaseModule,
    SpotsModule,
    ReservationsModule,
    PaymentsModule,
    HostModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
