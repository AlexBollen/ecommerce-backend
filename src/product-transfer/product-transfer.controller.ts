import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ProductTransferService } from './product-transfer.service';
import { CreateProductTransferDto } from './dto/create-product-transfer.dto';
import { UpdateProductTransferDto } from './dto/update-product-transfer.dto';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ProductTransfer } from './entities/product-transfer.entity';

@ApiTags('Products-Transfers')
@Controller('product-transfer')
export class ProductTransferController {
  constructor(
    private readonly productTransferService: ProductTransferService,
  ) {}

  @Get('/all/:sucursalId')
  @ApiOperation({
    summary: 'Obtener transferencias de productos',
    description:
      'Este endpoint sirve para listar todas las transferencias de productos',
  })
  getTransfersBySucursal(@Param('sucursalId') sucursalId: number) {
    return this.productTransferService.getAllTransferences(sucursalId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productTransferService.getTransfer(+id);
  }

  @Post()
  @ApiOperation({
    summary: 'Crear una nueva transferencia de productos',
    description:
      'Este endpoint sirve para crear una nueva transferencia de productos entre sucursales. La transferencia ajustará los stocks de las sucursales correspondientes.',
  })
  @ApiBody({
    description: 'Datos necesarios para crear una transferencia de productos.',
    schema: {
      type: 'object',
      properties: {
        descripcion_transferencia: {
          type: 'string',
          example: 'Transferencia de prueba',
        },
        sucursal_Saliente: { type: 'number', example: 1 },
        sucursal_Entrante: { type: 'number', example: 2 },
        id_estado_transferencia: { type: 'number', example: 1 },
        id_usuario: { type: 'number', example: 1 },
        detalles: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              productoIdProducto: { type: 'number', example: 1 },
              id_stock: { type: 'number', example: 1 },
              cantidad_transferida: { type: 'number', example: 5 },
            },
          },
        },
      },
    },
  })
  async createTransference(@Body() transferencia: CreateProductTransferDto) {
    try {
      const result =
        await this.productTransferService.createTransference(transferencia);
      return {
        message: 'Transferencia creada exitosamente',
        data: result,
      };
    } catch (error) {
      throw new HttpException(
        {
          message: 'Error al crear la transferencia',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Patch(':id/actualizar-estado-y-crear-stocks')
  async actualizarEstadoYCrearStocks(@Param('id') id: number): Promise<void> {
    await this.productTransferService.updateStateAndCreateStock(id);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Eliminar transferencia de productos',
    description:
      'Este endpoint marca una transferencia de productos como eliminada (estado = 0)',
  })
  async deleteTransfer(@Param('id') id: string) {
    try {
      const result = await this.productTransferService.deleteTransfer(+id);
      if (result.affected === 0) {
        throw new HttpException(
          {
            message: `La transferencia con ID ${id} no existe o ya fue eliminada.`,
          },
          HttpStatus.NOT_FOUND,
        );
      }
      return {
        message: `La transferencia con ID ${id} fue eliminada exitosamente.`,
      };
    } catch (error) {
      throw new HttpException(
        {
          message: 'Error al eliminar la transferencia',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
