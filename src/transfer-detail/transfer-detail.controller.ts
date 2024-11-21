import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { TransferDetailService } from './transfer-detail.service';
import { CreateTransferDetailDto } from './dto/create-transfer-detail.dto';
import { UpdateTransferDetailDto } from './dto/update-transfer-detail.dto';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ProductTransfer } from 'src/product-transfer/entities/product-transfer.entity';

@ApiTags('Transfers-Details')
@Controller('transfer-detail')
export class TransferDetailController {
  constructor(private readonly transferDetailService: TransferDetailService) {}

  @Get(':id')
  @ApiOperation({
    summary: 'Obtener un detalle de una transferencia de productos',
    description:
      'Este endpoint sive para listar los detalles de una transferencia',
  })
  findOne(@Param('id') id: string) {
    return this.transferDetailService.getTransferDetail(+id);
  }

  @Get(':id/nombre-producto')
  @ApiOperation({
    summary: 'Obtener el nombre del producto según el detalle',
    description:
      'Este endpoint sive para obtener el nombre de los productos de un detalle',
  })
  async getTransferDetails(@Param('id', ParseIntPipe) id: ProductTransfer) {
    return await this.transferDetailService.getFormattedTransferDetails(id);
  }

  @Post()
  @ApiOperation({
    summary: 'Crear un nuevo detalle para transferencia',
    description:
      'Este endpoint sirve para crear un nuevo detalle de transferencia de productos',
  })
  @ApiBody({
    description:
      'Datos necesarios para crear un nuevo detalle de transferencia de productos.',
    schema: {
      type: 'object',
      properties: {
        cantidad_transferencia: {
          type: 'number',
          example: '2',
        },
      },
    },
  })
  createTransferDetail(@Body() newTransferDetail: CreateTransferDetailDto) {
    return this.transferDetailService.createTransferDetail(newTransferDetail);
  }
}
