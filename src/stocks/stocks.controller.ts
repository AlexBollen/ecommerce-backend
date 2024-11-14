import { StocksService } from './stocks.service';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { Stock } from './entities/stock.entity';

import {
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
  ApiBody,
} from '@nestjs/swagger';
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

@ApiTags('Stocks')
@Controller('stocks')
export class StocksController {
  constructor(private readonly stocksService: StocksService) {}

  @Get()
  @ApiOperation({
    summary: 'Obtener stocks',
    description: 'Este endpoint sirve para listar todos los stocks',
  })
  getAllStocks(): Promise<Stock[]> {
    return this.stocksService.getAllStocks();
  }

  // @Get(':id_stock')
  // @ApiOperation({
  //   summary: 'Obtener stock',
  //   description: 'Este endpoint sirve para obtener un stock',
  // })
  // @ApiParam({
  //   name: 'id_stock',
  //   type: Number,
  //   description: 'Id del stock a obtener',
  //   example: '1',
  // })
  // getStock(@Param('id_stock', ParseIntPipe) id_stock: number): Promise<Stock> {
  //   return this.stocksService.getStock(id_stock);
  // }

  @Get(':id_product')
  @ApiOperation({
    summary: 'Obtener stocks de producto específico',
    description: 'Este endpoint sirve para listar los stocks de un producto',
  })
  @ApiParam({
    name: 'id_product',
    type: Number,
    description: 'Id del producto a obtener stocks',
    example: '1',
  })
  getStocksByProduct(@Param('id_product', ParseIntPipe) id_product: number) {
    return this.stocksService.getStocksByProducct(id_product);
  }

  @Post()
  @ApiOperation({
    summary: 'Crear un nuevo stock',
    description: 'Este endpoint sirve para crear nuevos stocks',
  })
  @ApiBody({
    description: 'Datos necesarios para crear  un nuevo stock.',
    schema: {
      type: 'object',
      properties: {
        cantidad_inicial: {
          type: 'number',
          example: '12',
        },
        cantidad_actual: {
          type: 'number',
          example: '17',
        },
      },
    },
  })
  createStock(@Body() newStock: CreateStockDto) {
    return this.stocksService.createStock(newStock);
  }

  @Patch(':id_stock')
  @ApiOperation({
    summary: 'Actualizar un stock',
    description: 'Este endpoint sirve para actualizar una stock',
  })
  @ApiParam({
    name: 'id_stock',
    type: Number,
    description: 'Id del stock actualizar',
    example: '1',
  })
  @ApiBody({
    description: 'Se puede utilizar cualquiera de estos datos para actualizar',
    schema: {
      type: 'object',
      properties: {
        cantidad_inicial: {
          type: 'number',
          example: '12',
        },
        cantidad_actual: {
          type: 'number',
          example: '12',
        },
      },
    },
  })
  updateStock(
    @Param('id_stock', ParseIntPipe) id_stock: number,
    @Body() stock: UpdateStockDto,
  ) {
    return this.stocksService.updateStock(id_stock, stock);
  }

  @Put(':id_stock')
  @ApiOperation({
    summary: 'Eliminar un stock',
    description: 'Este endpoint sirve para eliminar un stock ',
  })
  @ApiParam({
    name: 'id_stock',
    type: Number,
    description: 'Id del stock a eliminar',
    example: '1',
  })
  deleteStock(@Param('id_stock', ParseIntPipe) id_stock: number) {
    return this.stocksService.deleteStock(id_stock);
  }
}
