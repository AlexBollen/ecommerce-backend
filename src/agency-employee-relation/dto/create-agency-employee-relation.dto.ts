import { IsIn, IsInt, Min } from 'class-validator';
import { Agency } from 'src/agencies/agency.entity';
import { User } from 'src/users/entities/user.entity';

export class CreateAgencyEmployeeRelationDto {
  @IsInt()
  @Min(1)
  id_sucursal: Agency;

  @IsInt()
  @Min(1)
  id_usuario: User;
}
