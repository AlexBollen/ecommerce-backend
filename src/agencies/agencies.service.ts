import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Agency } from './agency.entity';
import { Repository } from 'typeorm';
import { CreateAgencyDto } from './dto/create-agency.dto';
import { UpdateAgencyDto } from './dto/update-agency.dto';
import { LocationsService } from 'src/locations/locations.service';
import { GpsLocationDto } from 'src/locations/dto/create-location.dto';
import { CreateAgencyLocationDto } from './dto/create-agency-location.dto';
import { haversineDistance } from 'src/utils/haversine.utils';

@Injectable()
export class AgenciesService {
  constructor(
    @InjectRepository(Agency)
    private AgencyRepository: Repository<Agency>,
    private locationService: LocationsService,
  ) {}

  getAllAgencies() {
    return this.AgencyRepository.createQueryBuilder('sucursal')
      .leftJoinAndSelect('sucursal.ubicacion', 'ubicacion')
      .select([
        'sucursal.id_sucursal AS id_sucursal',
        'sucursal.nombre_sucursal AS nombre_sucursal',
        'sucursal.direccion_detallada AS direccion_detallada',
        'sucursal.telefono AS telefono',
        'sucursal.correo AS correo',
        'sucursal.estado AS estado',
        'sucursal.created_at AS created_at',
        'sucursal.updated_at AS updated_at',
        'ubicacion.id_ubicacion AS id_ubicacion',
        'ST_X(ubicacion.ubicacion_gps) AS latitud',
        'ST_Y(ubicacion.ubicacion_gps) AS longitud',
      ])
      .getRawMany();
  }

  async getClosestLocation(userCoordinates: { lat: number; lon: number }) {
    const agencies = await this.getAllAgencies();

    let closest = agencies[0];
    let minDistance = haversineDistance(
      userCoordinates.lat,
      userCoordinates.lon,
      closest.latitud,
      closest.longitud,
    );
    for (const agency of agencies) {
      const distance = haversineDistance(
        userCoordinates.lat,
        userCoordinates.lon,
        agency.latitud,
        agency.longitud
      )
      if (distance < minDistance) {
        minDistance = distance
        closest = agency
      }
    }
    return closest;
  }

  getAgency(id_sucursal: number) {
    return this.AgencyRepository.findOne({
      where: {
        id_sucursal,
      },
    });
  }

  async createAgency(sucursal: CreateAgencyDto) {
    let relatedLocation = null;
    if (sucursal.latitud_gps && sucursal.longitud_gps) {
      const newLocation: GpsLocationDto = {
        latitud_gps: sucursal.latitud_gps,
        longitud_gps: sucursal.longitud_gps,
      };
      relatedLocation = await this.locationService.createLocation(newLocation);
    }
    const newAgency = this.AgencyRepository.create({
      nombre_sucursal: sucursal.nombre_sucursal,
      direccion_detallada: sucursal.direccion_detallada,
      telefono: sucursal.telefono,
      correo: sucursal.correo || null,
      ubicacion: relatedLocation,
    });
    await this.AgencyRepository.save(newAgency);
  }

  updateAgency(id_sucursal: number, sucursal: UpdateAgencyDto) {
    return this.AgencyRepository.update({ id_sucursal: id_sucursal }, sucursal);
  }

  deleteAgency(id_sucursal: number) {
    return this.AgencyRepository.update({ id_sucursal }, { estado: 0 });
  }
}
