import { Controller, Get, Post, Body, Patch, Param, Delete, Put, ParseIntPipe } from '@nestjs/common';
import { SalesService } from './sales.service';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags} from '@nestjs/swagger';
import { Sale } from './entities/sale.entity';

@ApiTags('Sales')
@Controller('sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  @Get()
  @ApiOperation({
    summary: 'Obtener ventas',
    description: 'Este endpoint sirve para listar todas las ventas',
  })
  getAllSales(): Promise<Sale[]> {
    return this.salesService.getAllSales();
  }


  @Get(':id_venta')
  @ApiOperation({
    summary: 'Obtener una venta',
    description: 'Este endpoint sirve para obtener una venta',
  })
  @ApiParam({
    name: 'id_venta',
    type: Number,
    description: 'Id de la venta a obtener',
    example: '1',
  })
  getSale(
    @Param('id_venta', ParseIntPipe) id_venta: number,
  ): Promise<Sale> {
    return this.salesService.getSale(id_venta);
  }


  @Post()
  @ApiOperation({
    summary: 'Crear una nueva venta',
    description: 'Este endpoint sirve para crear nueva venta',
  })
  @ApiBody({
    description: 'Datos necesarios para crear una nueva venta.',
    schema: {
      type: 'object',
      properties: {
        total_pagado: {
          type: 'number',
          example: '216.42',
        },
        descuento_aplicado: {
          type: 'number',
          example: '443.25',
        }
      },
    },
  })
  createSale(@Body() newSale: CreateSaleDto) {
    return this.salesService.createSale(newSale);
  }


  @Patch(':id_venta')
  @ApiOperation({
    summary: 'Actualizar una venta',
    description: 'Este endpoint sirve para actualizar una venta',
  })
  @ApiParam({
    name: 'id_venta',
    type: Number,
    description: 'Id de la venta actualizar',
    example: '1',
  })
  @ApiBody({
    description: 'Se puede utilizar cualquiera de estos datos para actualizar',
    schema: {
      type: 'object',
      properties: {
        total_pagado: {
          type: 'number',
          example: '276',
        },
        descuento_aplicado: {
          type: 'number',
          example: '443',
        }
      },
    },
  })
  updateSale(
    @Param('id_venta', ParseIntPipe) id_venta: number,
    @Body() venta: UpdateSaleDto,
  ) {
    return this.salesService.updateSale(id_venta, venta);
  }


  @Put(':id_venta')
  @ApiOperation({
    summary: 'Eliminar una venta',
    description:
      'Este endpoint sirve para eliminar una venta (hacerla no visible)',
  })
  @ApiParam({
    name: 'id_venta',
    type: Number,
    description: 'Id de la venta a eliminar',
    example: '1',
  })
  deleteSale(@Param('id_venta', ParseIntPipe) id_venta: number) {
    return this.salesService.deleteSale(id_venta);
  }
}
