import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductTransferService } from './product-transfer.service';
import { CreateProductTransferDto } from './dto/create-product-transfer.dto';
import { UpdateProductTransferDto } from './dto/update-product-transfer.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ProductTransfer } from './entities/product-transfer.entity';

@ApiTags('Products-Transfers')
@Controller('product-transfer')
export class ProductTransferController {
  constructor(
    private readonly productTransferService: ProductTransferService,
  ) {}

  /*@Post()
  create(@Body() createProductTransferDto: CreateProductTransferDto) {
    return this.productTransferService.create(createProductTransferDto);
  }*/

  @Get()
  @ApiOperation({
    summary: 'Obtener transferencias de productos',
    description:
      'Este endpoint sirve para listar todas las transferencias de productos',
  })
  getAllTransferences(): Promise<ProductTransfer[]> {
    return this.productTransferService.getAllTransferences();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productTransferService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProductTransferDto: UpdateProductTransferDto,
  ) {
    return this.productTransferService.update(+id, updateProductTransferDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productTransferService.remove(+id);
  }
}
