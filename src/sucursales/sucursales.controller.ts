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

import { CreateSucursalDto } from './dto/create-sucursal.dto';
import { SucursalesService } from './sucursales.service';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { Sucursal } from './sucursal.entity';
import { UpdateSucursalDto } from './dto/update-sucursal.dto';

@ApiTags('Sucursales')
@Controller('sucursales')
export class SucursalesController {
  constructor(private sucursalesService: SucursalesService) {}

  @Get()
  @ApiOperation({
    summary: 'Obtener Sucursales',
    description: 'Este endpoint sirve para listar todas las sucursales',
  })
  getAllSucursals(): Promise<Sucursal[]> {
    return this.sucursalesService.getAllSucursales();
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
  getSucursal(
    @Param('id_sucursal', ParseIntPipe) id_sucursal: number,
  ): Promise<Sucursal> {
    return this.sucursalesService.getSucursal(id_sucursal);
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
  createSucursal(@Body() newSucursal: CreateSucursalDto) {
    return this.sucursalesService.createSucursal(newSucursal);
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
  updateSucursal(
    @Param('id_sucursal', ParseIntPipe) id_sucursal: number,
    @Body() sucursal: UpdateSucursalDto,
  ) {
    return this.sucursalesService.updateSucursal(id_sucursal, sucursal);
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
  deleteSucursal(@Param('id_sucursal', ParseIntPipe) id_sucursal: number) {
    return this.sucursalesService.deleteSucursal(id_sucursal);
  }
}
