import { Controller, Get, Post, Put, Delete, Body, Param, Headers, UnauthorizedException } from '@nestjs/common';
import { HostSpotsService } from './host-spots.service';
import { CreateSpotDto, UpdateSpotDto } from '../../spots/dto/spot.dto';

@Controller('api/host/spots')
export class HostSpotsController {
  constructor(private readonly hostSpotsService: HostSpotsService) {}

  private extractHostId(authHeader: string): string {
    // Dummy token format: "dummy_token_<host_id>"
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

  @Post()
  async create(
    @Headers('authorization') authHeader: string,
    @Body() createSpotDto: CreateSpotDto,
  ) {
    const hostId = this.extractHostId(authHeader);
    return this.hostSpotsService.create(hostId, createSpotDto);
  }

  @Get()
  async findAll(@Headers('authorization') authHeader: string) {
    const hostId = this.extractHostId(authHeader);
    return this.hostSpotsService.findAllByHost(hostId);
  }

  @Get(':uuid')
  async findById(
    @Headers('authorization') authHeader: string,
    @Param('uuid') uuid: string,
  ) {
    const hostId = this.extractHostId(authHeader);
    return this.hostSpotsService.findById(hostId, uuid);
  }

  @Put(':uuid')
  async update(
    @Headers('authorization') authHeader: string,
    @Param('uuid') uuid: string,
    @Body() updateSpotDto: UpdateSpotDto,
  ) {
    const hostId = this.extractHostId(authHeader);
    return this.hostSpotsService.update(hostId, uuid, updateSpotDto);
  }

  @Delete(':uuid')
  async delete(
    @Headers('authorization') authHeader: string,
    @Param('uuid') uuid: string,
  ) {
    const hostId = this.extractHostId(authHeader);
    return this.hostSpotsService.delete(hostId, uuid);
  }
}
