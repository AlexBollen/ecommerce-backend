export class CreateAgencyDto {
  nombre_sucursal: string;
  direccion_detallada: string;
  telefono: string;
  correo?: string;
  latitud_gps?: number;
  longitud_gps?: number;
}
