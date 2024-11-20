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


  
  @Get('detalle_cotizacion/:id_detalle_cotizacion')
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


  @Get('top-selling')
  @ApiOperation({
    summary: 'Obtener los productos más vendidos',
    description: 'Este endpoint sirve para listar los productos más vendidos',
  })
  getTopSellingProducts() {
    
    return this.detailQuotesService.getTopSellingProducts();
  } 


  @Get('top-selling-agency/:id_sucursal')
  @ApiOperation({
    summary: 'Obtener los productos más vendidos según sucursal',
    description: 'Este endpoint sirve para listar los productos más vendidos según sucursal',
  })
  @ApiParam({
    name: 'id_sucursal',
    type: 'number',
    description: 'Id de la sucursal a filtrar',
    example: '1',
  })
  getTopSellingProductsAgencies(@Param('id_sucursal') id_sucursal: number) {
    return this.detailQuotesService.getTopSellingProductsAgencies(id_sucursal);
  } 

  
  @Get('top-product-by-month')
  @ApiOperation({
    summary: 'Obtener los productos más vendidos en base al mes',
    description: 'Este endpoint sirve para listar los productos más vendidos en base al mes',
  })
  getProductByMounth() {
    return this.detailQuotesService.getProductByMonth();
  } 

  @Get('month-product-summary')
  @ApiOperation({
    summary: 'Obtener la cantidad de los productos vendidos en base al mes',
    description: 'Este endpoint sirve para listar la cantidad de los productos más vendidos en base al mes',
  })
  getMonthlyProductSummary() {
    return this.detailQuotesService.getMonthlyProductSummary();
  } 


  @Get('month-product-summary-agency/:id_sucursal')
  @ApiOperation({
    summary: 'Obtener la cantidad de los productos vendidos en base a la agencia',
    description: 'Este endpoint sirve para listar la cantidad de los productos más vendidos en base a la agencia',
  })
  @ApiParam({
    name: 'id_sucursal',
    type: 'number',
    description: 'Id de la sucursal a filtrar',
    example: '1',
  })
  getMonthlyProductSummaryByAgency(@Param('id_sucursal') id_sucursal: number) {
    return this.detailQuotesService.getMonthlyProductSummaryByAgency(id_sucursal);
  } 

  @Get('month-product-summary-general')
  @ApiOperation({
    summary: 'Obtener la cantidad de los productos vendidos de forma general',
    description: 'Este endpoint sirve para listar la cantidad de los productos más vendidos de forma general',
  })
  getMonthlyProductByGeneral() {
    return this.detailQuotesService.getMonthlyProductByGeneral();
  } 
}
