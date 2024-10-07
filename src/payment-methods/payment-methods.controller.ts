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
import { CreatePaymentMethodDto } from './dto/create-payment-method.dto';
import { PaymentMethodsService } from './payment-methods.service';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PaymentMethod } from './payment-method.entity';
import { UpdatePaymentMethodDto } from './dto/update-payment-method.dto';

@ApiTags('Payment Methods')
@Controller('payment-methods')
export class PaymentMethodsController {
  constructor(private paymentMethodService: PaymentMethodsService) {}

  @Get()
  @ApiOperation({
    summary: 'Obtener Metodos de Pago',
    description: 'Este endpoint sirve para listar todos los tipos de pago',
  })
  getAllPaymentMethods(): Promise<PaymentMethod[]> {
    return this.paymentMethodService.getAllPaymentMethods();
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
  ): Promise<PaymentMethod> {
    return this.paymentMethodService.getPaymentMethod(id_metodo_pago);
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
          example: 'Efectivo',
        },
      },
    },
  })
  createPaymentMethod(@Body() newPaymentMethod: CreatePaymentMethodDto) {
    return this.paymentMethodService.createPaymentMethod(newPaymentMethod);
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
    @Body() payment_method: UpdatePaymentMethodDto,
  ) {
    return this.paymentMethodService.updatePaymentMethod(
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
    return this.paymentMethodService.deletePaymentMethod(id_metodo_pago);
  }
}
