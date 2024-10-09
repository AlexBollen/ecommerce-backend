import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Location } from './location.entity';
import { Repository } from 'typeorm';
import { UpdateLocationDto } from './dto/update-location.dto';
import { GpsLocationDto } from './dto/create-location.dto';

@Injectable()
export class LocationsService {
  constructor(
    @InjectRepository(Location)
    private locationRepository: Repository<Location>,
  ) {}

  getAllLocations() {
    return this.locationRepository
      .createQueryBuilder('ubicacion')
      .select([
        'ubicacion.id_ubicacion AS id_ubicacion',
        'ST_X(ubicacion.ubicacion_gps) AS latitud',
        'ST_Y(ubicacion.ubicacion_gps) AS longitud',
        'ubicacion.estado AS estado',
        'ubicacion.created_at AS created_at',
        'ubicacion.updated_at AS updated_at',
      ])
      .getRawMany();
  }

  getLocation(id_ubicacion: number) {
    return this.locationRepository.findOne({
      where: {
        id_ubicacion,
      },
    });
  }

  async createLocation(points: GpsLocationDto) {
    await this.locationRepository
      .createQueryBuilder()
      .insert()
      .into(Location)
      .values({
        ubicacion_gps: () =>
          `ST_GeomFromText('POINT(${points.latitud_gps} ${points.longitud_gps})')`,
      })
      .execute();
  }

  async updateLocation(id_ubicacion: number, location: UpdateLocationDto) {
    await this.locationRepository
      .createQueryBuilder()
      .update(Location)
      .set({
        ubicacion_gps: () =>
          `ST_GeomFromText('POINT(${location.latitud_gps} ${location.longitud_gps})')`,
      })
      .where('id_ubicacion = :id_ubicacion', { id_ubicacion })
      .execute();
  }

    deleteLocation(id_ubicacion: number) {
      return this.locationRepository.update({ id_ubicacion }, { estado: 0 });
    }
}
