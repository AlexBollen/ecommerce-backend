import { Location } from 'src/locations/location.entity';

export class UpdateAgencyDto {
  nombre_sucursal?: string;
  direccion_detallada?: string;
  telefono?: string;
  correo?: string;
  ubicacion?: Location;
}
