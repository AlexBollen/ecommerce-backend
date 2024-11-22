import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Agency } from 'src/agencies/agency.entity';
import { AgencyEmployeeRelation } from 'src/agency-employee-relation/entities/agency-employee-relation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Agency, AgencyEmployeeRelation])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
