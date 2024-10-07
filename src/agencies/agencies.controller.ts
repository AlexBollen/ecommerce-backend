import {
  Body,
  Controller,
  Post,
  Get,
  Put,
  Patch,
  Param,
  ParseIntPipe,
} from '@nestjs/common';

import { CreateAgencyDto } from './dto/create-agency.dto';
import { AgenciesService } from './agencies.service';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { Agency } from './agency.entity';
import { UpdateAgencyDto } from './dto/update-agency.dto';

@ApiTags('Agencies')
@Controller('agencies')
export class AgenciesController {
  constructor(private agenciesService: AgenciesService) {}

  @Get()
  @ApiOperation({
    summary: 'Obtener Sucursales',
    description: 'Este endpoint sirve para listar todas las sucursales',
  })
  getAllAgencies(): Promise<Agency[]> {
    return this.agenciesService.getAllAgencies();
  }

  @Get(':id_sucursal')
  @ApiOperation({
    summary: 'Obtener sucursal',
    description: 'Este endpoint sirve para obtener una sucursal',
  })
  @ApiParam({
    name: 'id_sucursal',
    type: Number,
    description: 'Id de la sucursal a obtener',
    example: '1',
  })
  getAgency(
    @Param('id_sucursal', ParseIntPipe) id_sucursal: number,
  ): Promise<Agency> {
    return this.agenciesService.getAgency(id_sucursal);
  }

  @Post()
  @ApiOperation({
    summary: 'Crear una nueva sucursal',
    description: 'Este endpoint sirve para crear nuevas sucursales',
  })
  @ApiBody({
    description: 'Datos necesarios para crear una nueva sucursal.',
    schema: {
      type: 'object',
      properties: {
        nombre_sucursal: {
          type: 'string',
          example: 'Nueva Sucursal',
        },
        direccion_detallada: {
          type: 'string',
          example: '10 Calle 6-79 Quetzaltenango, Quetzaltenango',
        },
        telefono: {
          type: 'string',
          example: '12345678',
        },
        correo: {
          type: 'string',
          example: 'example@gmail.com',
        },
      },
    },
  })
  createAgency(@Body() newAgency: CreateAgencyDto) {
    return this.agenciesService.createAgency(newAgency);
  }

  @Patch(':id_sucursal')
  @ApiOperation({
    summary: 'Actualizar una sucursal',
    description: 'Este endpoint sirve para actualizar una sucursal',
  })
  @ApiParam({
    name: 'id_sucursal',
    type: Number,
    description: 'Id de la sucursal a actualizar',
    example: '1',
  })
  @ApiBody({
    description: 'Se puede utilizar cualquiera de estos datos para actualizar',
    schema: {
      type: 'object',
      properties: {
        nombre_sucursal: {
          type: 'string',
          example: 'sucursal actualizada',
        },
        direccion_detallada: {
          type: 'string',
          example: 'Direccion actualizada',
        },
        telefono: {
          type: 'string',
          example: 'tel. actualizado',
        },
        correo: {
          type: 'string',
          example: 'correo actualizado',
        },
      },
    },
  })
  updateAgency(
    @Param('id_sucursal', ParseIntPipe) id_sucursal: number,
    @Body() sucursal: UpdateAgencyDto,
  ) {
    return this.agenciesService.updateAgency(id_sucursal, sucursal);
  }

  @Put(':id_sucursal')
  @ApiOperation({
    summary: 'Eliminar una sucursal',
    description:
      'Este endpoint sirve para eliminar una sucursal (hacerla no visible)',
  })
  @ApiParam({
    name: 'id_sucursal',
    type: Number,
    description: 'Id de la sucursal a eliminar',
    example: '1',
  })
  deleteAgency(@Param('id_sucursal', ParseIntPipe) id_sucursal: number) {
    return this.agenciesService.deleteAgency(id_sucursal);
  }
}
