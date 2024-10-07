import { Module } from '@nestjs/common';
import { AgenciesController } from './agencies.controller';
import { AgenciesService } from './agencies.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Agency } from './agency.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Agency])],
  controllers: [AgenciesController],
  providers: [AgenciesService],
})
export class AgenciesModule {}
