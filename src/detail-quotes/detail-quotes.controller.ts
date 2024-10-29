import { Controller, Get, Post, Body, Patch, Param, Delete, Put, ParseIntPipe } from '@nestjs/common';
import { DetailQuotesService } from './detail-quotes.service';
import { CreateDetailQuoteDto } from './dto/create-detail-quote.dto';
import { UpdateDetailQuoteDto } from './dto/update-detail-quote.dto';
import { DetailQuote } from './entities/detail-quote.entity';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@Controller('detail-quotes')
export class DetailQuotesController {
  constructor(private readonly detailQuotesService: DetailQuotesService) {}

  @Get()
  @ApiOperation({
    summary: 'Obtener Detalle de cotización',
    description: 'Este endpoint sirve para listar todos los detalles de cotización',
  })
  getAllDetailQuote(): Promise<DetailQuote[]> {
    return this.detailQuotesService.getAllDetailQuotes();
  }


  @Get(':id_detalle_cotizacion')
  @ApiOperation({
    summary: 'Obtener un detalle de cotización',
    description: 'Este endpoint sirve para obtener un detalle de cotización',
  })
  @ApiParam({
    name: 'id_detalle_cotizacion',
    type: Number,
    description: 'Id del detalle de cotización a obtener',
    example: '1',
  })
  getDetailQuote(
    @Param('id_detalle_cotizacion', ParseIntPipe) id_detalle_cotizacion: number,
  ): Promise<DetailQuote> {
    return this.detailQuotesService.getDetailQuote(id_detalle_cotizacion);
  }


  @Post()
  @ApiOperation({
    summary: 'Crear un nuevo detalle de cotización',
    description: 'Este endpoint sirve para crear un nuevo detalle de cotización',
  })
  @ApiBody({
    description: 'Datos necesarios para crear un nuevo detalle de cotización.',
    schema: {
      type: 'object',
      properties: {
        cantidad_solicitada: {
          type: 'number',
          example: '2',
        },
      },
    },
  })
  createDetailQuote(@Body() newDetailQuote: CreateDetailQuoteDto) {
    return this.detailQuotesService.createDetailQuote(newDetailQuote);
  }


  @Patch(':id_detalle_cotizacion')
  @ApiOperation({
    summary: 'Actualizar un nuevo detalle de cotización',
    description: 'Este endpoint sirve para actualizar un nuevo detalle de cotización',
  })
  @ApiParam({
    name: 'id_detalle_cotizacion',
    type: Number,
    description: 'Id del detalle de cotización a actualizar',
    example: '1',
  })
  @ApiBody({
    description: 'Se puede utilizar cualquiera de estos datos para actualizar',
    schema: {
      type: 'object',
      properties: {
        cantidad_solicitada: {
          type: 'number',
          example: '3',
        }
      },
    },
  })
  updateDetailQuote(
    @Param('id_detalle_cotizacion', ParseIntPipe) id_detalle_cotizacion: number,
    @Body() quote: UpdateDetailQuoteDto,
  ) {
    return this.detailQuotesService.updateDetailQuote(id_detalle_cotizacion, quote);
  }


  @Put(':id_detalle_cotizacion')
  @ApiOperation({
    summary: 'Eliminar un detalle de cotización',
    description:
      'Este endpoint sirve para eliminar un detalle de cotización (hacerla no visible)',
  })
  @ApiParam({
    name: 'id_detalle_cotizacion',
    type: Number,
    description: 'Id del detalle de cotización a eliminar',
    example: '1',
  })
  deleteDetailQuote(@Param('id_detalle_cotizacion', ParseIntPipe) id_detalle_cotizacion: number) {
    return this.detailQuotesService.deleteDetailQuote(id_detalle_cotizacion);
  }
}