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

import { CreatePayment_MethodDto } from './dto/create-payment_method.dto';
import { PaymentMethodsService } from './payment_methods.service';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { Payment_Method } from './payment_method.entity';
import { UpdatePayment_MethodDto } from './dto/update-payment_method.dto';

@ApiTags('Payment_methods')
@Controller('payment_methods')
export class PaymentMethodsController {
  constructor(private paymentmethodsService: PaymentMethodsService) {}

  @Get()
  @ApiOperation({
    summary: 'Obtener Metodos de Pago',
    description: 'Este endpoint sirve para listar todos los tipos de pago',
  })
  getAllPaymentMethods(): Promise<Payment_Method[]> {
    return this.paymentmethodsService.getAllPaymentMethods();
  }

  @Get(':id_metodo_pago')
  @ApiOperation({
    summary: 'Obtener método de pago',
    description: 'Este endpoint sirve para obtener un método de pago',
  })
  @ApiParam({
    name: 'id_metodo_pago',
    type: Number,
    description: 'Id del método de pago a obtener',
    example: '1',
  })
  getPaymentMethod(
    @Param('id_metodo_pago', ParseIntPipe) id_metodo_pago: number,
  ): Promise<Payment_Method> {
    return this.paymentmethodsService.getPaymentMethod(id_metodo_pago);
  }

  @Post()
  @ApiOperation({
    summary: 'Crear un nuevo método de pago',
    description: 'Este endpoint sirve para crear nuevos métodos de pago',
  })
  @ApiBody({
    description: 'Datos necesarios para crear un nuevo método de pago.',
    schema: {
      type: 'object',
      properties: {
        nombre_metodo_pago: {
          type: 'string',
          example: 'Nuevo Metodo de Pago',
        },
      },
    },
  })
  createPaymentMethod(@Body() newPaymentMethod: CreatePayment_MethodDto) {
    return this.paymentmethodsService.createPaymentMethod(newPaymentMethod);
  }

  @Patch(':id_metodo_pago')
  @ApiOperation({
    summary: 'Actualizar un método de pago',
    description: 'Este endpoint sirve para actualizar un método de pago',
  })
  @ApiParam({
    name: 'id_metodo_pago',
    type: Number,
    description: 'Id del método de pago a actualizar',
    example: '1',
  })
  @ApiBody({
    description: 'Se puede utilizar cualquiera de estos datos para actualizar',
    schema: {
      type: 'object',
      properties: {
        nombre_metodo_pago: {
          type: 'string',
          example: 'método de pago actualizado',
        },
      },
    },
  })
  updatePaymentMethod(
    @Param('id_metodo_pago', ParseIntPipe) id_metodo_pago: number,
    @Body() payment_method: UpdatePayment_MethodDto,
  ) {
    return this.paymentmethodsService.updatePaymentMethod(
      id_metodo_pago,
      payment_method,
    );
  }

  @Put(':id_metodo_pago')
  @ApiOperation({
    summary: 'Eliminar un método de pago',
    description:
      'Este endpoint sirve para eliminar un método de pago (hacerlo no visible)',
  })
  @ApiParam({
    name: 'id_metodo_pago',
    type: Number,
    description: 'Id del método de pago a eliminar',
    example: '1',
  })
  deletePaymentMethod(
    @Param('id_metodo_pago', ParseIntPipe) id_metodo_pago: number,
  ) {
    return this.paymentmethodsService.deletePaymentMethod(id_metodo_pago);
  }
}
