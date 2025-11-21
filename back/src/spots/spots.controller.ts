import { Controller, Get, Param } from '@nestjs/common';
import { SpotsService } from './spots.service';

@Controller('api/spots')
export class SpotsController {
  constructor(private readonly spotsService: SpotsService) {}

  @Get()
  async findAll() {
    return this.spotsService.findAll();
  }

  @Get(':uuid')
  async findById(@Param('uuid') uuid: string) {
    return this.spotsService.findById(uuid);
  }
}
