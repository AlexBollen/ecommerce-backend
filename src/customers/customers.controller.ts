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

import { CreateCustomerDto } from './dto/create-customer.dto';
import { CustomerLoginDto } from './dto/customer-login.dto';
import { CustomersService } from './customers.service';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { Customer } from './customer.entity';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@ApiTags('Customers')
@Controller('customers')
export class CustomersController {
  constructor(private customerService: CustomersService) {}

  @Get()
  @ApiOperation({
    summary: 'Obtener Clientes',
    description: 'Este endpoint sirve para listar todas los clientes',
  })
  getAllCustomers(): Promise<Customer[]> {
    return this.customerService.getAllCustomers();
  }

  @Get('cliente/:id_cliente')
  @ApiOperation({
    summary: 'Obtener cliente',
    description: 'Este endpoint sirve para obtener un cliente',
  })
  @ApiParam({
    name: 'id_cliente',
    type: Number,
    description: 'Id del cliente a obtener',
    example: '1',
  })
  getCustomer(
    @Param('id_cliente', ParseIntPipe) id_cliente: number,
  ): Promise<Customer> {
    return this.customerService.getCustomer(id_cliente);
  }

  @Get('correo/:correo_cliente')
  @ApiOperation({
    summary: 'Obtener cliente',
    description: 'Este endpoint sirve para obtener un cliente por su correo',
  })
  @ApiParam({
    name: 'correo_cliente',
    type: 'string',
    description: 'Correo del cliente a obtener',
    example: 'marredxxx@mail.com',
  })
  getCustomerByEmail(
    @Param('correo_cliente') correo_cliente: string,
  ): Promise<Customer> {
    return this.customerService.getCustomerByEmail(correo_cliente);
  }

  @Post('customerLogin')
  @ApiOperation({
    summary: 'Iniciar sesión con cliente',
    description: 'Este endpoint sirve para iniciar sesión para los clientes',
  })
  @ApiBody({
    description: 'Datos necesarios para iniciar sesión',
    schema: {
      type: 'object',
      properties: {
        correo_cliente: {
          type: 'string',
          example: 'example@gmail.com',
        },
        password_cliente: {
          type: 'string',
          example: '123456',
        },
      },
    },
  })
  customerLogin(@Body() loginDto: CustomerLoginDto) {
    return this.customerService.customerLogin(loginDto);
  }

  @Post()
  @ApiOperation({
    summary: 'Crear un nuevo cliente',
    description: 'Este endpoint sirve para crear un nuevo cliente',
  })
  @ApiBody({
    description: 'Datos necesarios para crear un nueco cliente.',
    schema: {
      type: 'object',
      properties: {
        nombre_cliente: {
          type: 'string',
          example: 'Nueva cliente',
        },
        nit_cliente: {
          type: 'string',
          example: '17844954',
        },
        telefono_cliente: {
          type: 'string',
          example: '42314748',
        },
        correo_cliente: {
          type: 'string',
          example: 'example@gmail.com',
        },
        password_cliente: {
          type: 'string',
          example: '123456',
        },
        direccion_cliente: {
          type: 'string',
          example: '12 calle 8-5 zona 3',
        },
        municipio_cliente: {
          type: 'string',
          example: 'Quetzaltenango',
        },
        departamento_cliente: {
          type: 'string',
          example: 'Quetzaltenango',
        },
      },
    },
  })
  createCustomer(@Body() newCustomer: CreateCustomerDto) {
    return this.customerService.createCustomer(newCustomer);
  }

  @Patch(':id_cliente')
  @ApiOperation({
    summary: 'Actualizar un cliente',
    description: 'Este endpoint sirve para actualizar un cliente',
  })
  @ApiParam({
    name: 'id_cliente',
    type: Number,
    description: 'Id del cliente a actualizar',
    example: '1',
  })
  @ApiBody({
    description: 'Se puede utilizar cualquiera de estos datos para actualizar',
    schema: {
      type: 'object',
      properties: {
        nombre_cliente: {
          type: 'string',
          example: 'cliente actualizada',
        },
        nit_cliente: {
          type: 'string',
          example: 'Nit actualizado',
        },
        telefono_cliente: {
          type: 'string',
          example: 'Telefono actualizado',
        },
        correo_cliente: {
          type: 'string',
          example: 'Correo actualizado',
        },
        direccion_cliente: {
          type: 'string',
          example: 'Direccion actualizada',
        },
      },
    },
  })
  updateCustomer(
    @Param('id_cliente', ParseIntPipe) id_cliente: number,
    @Body() customer: UpdateCustomerDto,
  ) {
    return this.customerService.updateCustomer(id_cliente, customer);
  }

  @Put(':id_cliente')
  @ApiOperation({
    summary: 'Eliminar un cliente',
    description:
      'Este endpoint sirve para eliminar un cliente (hacerla no visible)',
  })
  @ApiParam({
    name: 'id_cliente',
    type: Number,
    description: 'Id del cliente a eliminar',
    example: '1',
  })
  deleteCategory(@Param('id_cliente', ParseIntPipe) id_cliente: number) {
    return this.customerService.deleteCustomer(id_cliente);
  }
}
