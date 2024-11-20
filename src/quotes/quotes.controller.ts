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


  @Get('cotizacion/:id_cotizacion')
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
        },
        cliente: {
          type: 'number',
          example: '1'
        },
        sucursal: {
          type: 'number',
          example: '1'
        },
        usuario: {
          type: 'number',
          example: '1'
        },
        lista_productos: {
          type: 'array',
          items: {
            type: 'array',
            items: {
              type: 'number',
            },
          },
          example: [[1, 3], [2, 5]],
        },
        tipo_transaccion: {
          type: 'string',
          example: 'V'
        },
        tipo: {
          type: 'boolean',
          example: 'true'
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


  @Get('best-customer-general')
  @ApiOperation({
    summary: 'Obtener los clientes que compran más seguido de forma general',
    description: 'Este endpoint sirve para listar los clientes que comprarn más seguido ',
  })
  getBestCustomersGeneral() {
    
    return this.quotesService.getBestCustomersGeneral();
  } 

  @Get('best-customer-agency/:id_sucursal')
  @ApiOperation({
    summary: 'Obtener los clientes que compran más seguido en base a la sucursal',
    description: 'Este endpoint sirve para listar los clientes que comprarn más seguido según la sucursal ',
  })
  @ApiParam({
    name: 'id_sucursal',
    type: 'number',
    description: 'Id de la sucursal a filtrar',
    example: '1',
  })
  getBestCustomersAgency(@Param('id_sucursal') id_sucursal: number) {  
    return this.quotesService.getBestCustomersAgency(id_sucursal);
  } 

  @Get('sale-by-date')
  @ApiOperation({
    summary: 'Obtenie las ventas segun el rango de fechas',
    description: 'Este endpoint sirve para listar todas las ventas en base al rango ingresado',
  })
  getSaleByDate() {  
    return this.quotesService.getSaleByDate();
  } 

  @Get('historical-sales-general')
  @ApiOperation({
    summary: 'Obtiene los cambios que se realizan en las facturas',
    description: 'Este endpoint sirve para listar los cambios de las facturas',
  })
  getHistoricalSales() {  
    return this.quotesService.getHistoricalSales();
  } 

  @Get('historical-sales-agency/:id_sucursal')
  @ApiOperation({
    summary: 'Obtiene los cambios que se realizan en las facturas en base a la agencia',
    description: 'Este endpoint sirve para listar los cambios de las facturas en base a la agencia',
  })
  @ApiParam({
    name: 'id_sucursal',
    type: 'number',
    description: 'Id de la sucursal a filtrar',
    example: '1',
  })
  getHistoricalSalesByAgency(@Param('id_sucursal') id_sucursal: number) {  
    return this.quotesService.getHistoricalSalesByAgency(id_sucursal);
  } 
}
