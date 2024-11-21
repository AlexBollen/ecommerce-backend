import { Module } from '@nestjs/common';
import { AgencyEmployeeRelationService } from './agency-employee-relation.service';
import { AgencyEmployeeRelationController } from './agency-employee-relation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AgencyEmployeeRelation } from './entities/agency-employee-relation.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AgencyEmployeeRelation, User])],
  controllers: [AgencyEmployeeRelationController],
  providers: [AgencyEmployeeRelationService],
  exports: [AgencyEmployeeRelationService],
})
export class AgencyEmployeeRelationModule {}
