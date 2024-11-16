import { Module } from '@nestjs/common';
import { AgenciesController } from './agencies.controller';
import { AgenciesService } from './agencies.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Agency } from './agency.entity';
import { LocationsService } from 'src/locations/locations.service';
import { Location } from 'src/locations/location.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Agency, Location])],
  controllers: [AgenciesController],
  providers: [AgenciesService, LocationsService],
  exports: [AgenciesService],
})
export class AgenciesModule {}
