import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { LocationsService } from './locations.service';
import { Location } from './location.entity';
import { GpsLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';

@ApiTags('Locations')
@Controller('locations')
export class LocationsController {
  constructor(private locationService: LocationsService) {}

  @Get()
  @ApiOperation({
    summary: 'Obtener ubicaciones',
    description: 'Este endpoint sirve para listar todas las ubicaciones',
  })
  getAllLocations(): Promise<Location[]> {
    return this.locationService.getAllLocations();
  }

  @Get(':id_ubicacion')
  @ApiOperation({
    summary: 'Obtener ubicación',
    description: 'Este endpoint sirve para obtener una ubicación',
  })
  @ApiParam({
    name: 'id_ubicacion',
    type: Number,
    description: 'Id de la ubicación a obtener',
    example: '1',
  })
  getLocation(
    @Param('id_ubicacion', ParseIntPipe) id_ubicacion: number,
  ): Promise<Location> {
    return this.locationService.getLocation(id_ubicacion);
  }

  @Post()
  @ApiOperation({
    summary: 'Crear una nueva ubicación',
    description: 'Este endpoint sirve para crear nuevas ubicaciones',
  })
  @ApiBody({
    description: 'Datos necesarios para crear una nueva marca.',
    schema: {
      type: 'object',
      properties: {
        latitud_gps: {
          type: 'number',
          example: '12.2332',
        },
        longitud_gps: {
          type: 'number',
          example: '21.3212',
        },
      },
    },
  })
  createLocation(@Body() newLocation: GpsLocationDto) {
    return this.locationService.createLocation(newLocation);
  }

  @Patch(':id_ubicacion')
  @ApiOperation({
    summary: 'Actualizar una ubicación',
    description: 'Este endpoint sirve para actualizar una ubicación',
  })
  @ApiParam({
    name: 'id_ubicacion',
    type: Number,
    description: 'Id de la ubicación a actualizar',
    example: '1',
  })
  @ApiBody({
    description: 'Se puede utilizar cualquiera de estos datos para actualizar',
    schema: {
      type: 'object',
      properties: {
        latitud_gps: {
          type: 'number',
          example: '15.2288',
        },
        longitud_gps: {
          type: 'number',
          example: '23.0212',
        },
      },
    },
  })
  updateLocation(
    @Param('id_ubicacion', ParseIntPipe) id_ubicacion: number,
    @Body() location: UpdateLocationDto,
  ) {
    return this.locationService.updateLocation(id_ubicacion, location);
  }

  @Put(':id_ubicacion')
  @ApiOperation({
    summary: 'Eliminar una ubicación',
    description: 'Este endpoint sirve para eliminar una ubicación',
  })
  @ApiParam({
    name: 'id_ubicacion',
    type: Number,
    description: 'Id de la ubicación a eliminar',
    example: '1',
  })
  deleteLocation(@Param('id_ubicacion', ParseIntPipe) id_ubicacion: number) {
    return this.locationService.deleteLocation(id_ubicacion);
  }
}
