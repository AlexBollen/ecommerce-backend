import { PartialType } from '@nestjs/swagger';
import { CreateAgencyEmployeeRelationDto } from './create-agency-employee-relation.dto';

export class UpdateAgencyEmployeeRelationDto extends PartialType(
  CreateAgencyEmployeeRelationDto,
) {}
