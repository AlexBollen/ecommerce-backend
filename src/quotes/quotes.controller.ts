import { Controller, Get, Post, Body, Patch, Param, Delete, Put, ParseIntPipe } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags, ApiBody } from '@nestjs/swagger';
import { QuotesService } from './quotes.service';
import { CreateQuoteDto } from './dto/create-quote.dto';
import { UpdateQuoteDto } from './dto/update-quote.dto';
import { Quote } from './entities/quote.entity';

@ApiTags('Quotes')
@Controller('quotes')
export class QuotesController {
  constructor(private readonly quotesService: QuotesService) {}

  @Get()
  @ApiOperation({
    summary: 'Obtener cotizaciones',
    description: 'Este endpoint sirve para listar todos las cotizaciones'
  })
  getAllQuotes(): Promise<Quote[]> {
    return this.quotesService.getAllQuotes()
  }


  @Get(':id_cotizacion')
  @ApiOperation({
    summary: 'Obtener cotización',
    description: 'Este endpoint sirve para obtener una cotización',
  })
  @ApiParam({
    name: 'id_cotizacion',
    type: Number,
    description: 'Id de la cotizacion obtener',
    example: '1',
  })
  getQuote(
    @Param('id_cotizacion', ParseIntPipe) id_cotizacion: number,
  ): Promise<Quote> {
    return this.quotesService.getQuote(id_cotizacion);
  }


  @Post()
  @ApiOperation({
    summary: 'Crear una nueva cotizacion',
    description: 'Este endpoint sirve para crear una nuva cotización',
  })
  @ApiBody({
    description: 'Datos necesarios para crear una nueva cotización .',
    schema: {
      type: 'object',
      properties: {
        monto_total: {
          type: 'number',
          example: '145',
        }
      },
    },
  })
  createQuote(@Body() newQuote: CreateQuoteDto) {
    return this.quotesService.createQuote(newQuote);
  }

  @Patch(':id_cotizacion')
  @ApiOperation({
    summary: 'Actualizar un nueva cotizacion',
    description: 'Este endpoint sirve para actualizar un nueva cotizacion',
  })
  @ApiParam({
    name: 'id_cotizacion',
    type: Number,
    description: 'Id de la cotización a actualizar',
    example: '1',
  })
  @ApiBody({
    description: 'Se puede utilizar cualquiera de estos datos para actualizar',
    schema: {
      type: 'object',
      properties: {
        monto_total: {
          type: 'number',
          example: '66',
        }
      },
    },
  })
  updateQuote(
    @Param('id_cotizacion', ParseIntPipe) id_cotizacion: number,
    @Body() quote: UpdateQuoteDto,
  ) {
    return this.quotesService.updateQuote(id_cotizacion, quote);
  }


  @Put(':id_cotizacion')
  @ApiOperation({
    summary: 'Eliminar una cotizacion',
    description:
      'Este endpoint sirve para eliminar una cotización (hacerla no visible)',
  })
  @ApiParam({
    name: 'id_cotizacion',
    type: Number,
    description: 'Id de la cotización a eliminar',
    example: '1',
  })
  deleteQuote(@Param('id_cotizacion', ParseIntPipe) id_cotizacion: number) {
    return this.quotesService.deleteQuote(id_cotizacion);
  }
}