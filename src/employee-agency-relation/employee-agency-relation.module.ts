import { Module } from '@nestjs/common';
import { EmployeeAgencyRelationService } from './employee-agency-relation.service';
import { EmployeeAgencyRelationController } from './employee-agency-relation.controller';
import { TypeOrmModule} from '@nestjs/typeorm';
import { EmployeeAgencyRelation } from './entities/employee-agency-relation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EmployeeAgencyRelation])],
  controllers: [EmployeeAgencyRelationController, ],
  providers: [EmployeeAgencyRelationService],
  exports: [EmployeeAgencyRelationService]
})
export class EmployeeAgencyRelationModule {}
