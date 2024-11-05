import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Put } from '@nestjs/common';
import { EmployeeAgencyRelationService } from './employee-agency-relation.service';
import { CreateEmployeeAgencyRelationDto } from './dto/create-employee-agency-relation.dto';
import { UpdateEmployeeAgencyRelationDto } from './dto/update-employee-agency-relation.dto';
import { EmployeeAgencyRelation } from './entities/employee-agency-relation.entity';
import { ApiBody, ApiOperation, ApiParam } from '@nestjs/swagger';

@Controller('employee-agency-relation')
export class EmployeeAgencyRelationController {
  constructor(private readonly employeeAgencyRelationService: EmployeeAgencyRelationService) {}

  @Get()
  @ApiOperation({
    summary: 'Obtener todas las relaciones entre empleados y sucursales',
    description: 'Este endpoint sirve para listar todas las relaciones activas'
  })
  /*getAllRelations(): Promise<EmployeeAgencyRelation[]> {
    //return this.employeeAgencyRelationService.getAllRelations();
  }*/

  @Get(':id')
  @ApiOperation({
    summary: 'Obtener relación por ID',
    description: 'Este endpoint sirve para obtener una relación específica por su ID',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID de la relación a obtener',
    example: '1',
  })
  getRelation(@Param('id', ParseIntPipe) id: number): Promise<EmployeeAgencyRelation> {
    return this.employeeAgencyRelationService.getRelation(id);
  }

  @Post()
  @ApiOperation({
    summary: 'Crear una nueva relación entre empleado y sucursal',
    description: 'Este endpoint sirve para crear una nueva relación entre empleado y sucursal',
  })
  @ApiBody({
    description: 'Datos necesarios para crear una nueva relación.',
    schema: {
      type: 'object',
      properties: {
        id_usuario: { type: 'number', example: 1 },
        id_sucursal: { type: 'number', example: 2 },
        estado: { type: 'number', example: 1 },
      },
    },
  })
  createRelation(@Body() newRelation: CreateEmployeeAgencyRelationDto) {
    return this.employeeAgencyRelationService.createRelation(newRelation);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Actualizar una relación',
    description: 'Este endpoint sirve para actualizar una relación existente',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID de la relación a actualizar',
    example: '1',
  })
  @ApiBody({
    description: 'Datos para actualizar una relación.',
    schema: {
      type: 'object',
      properties: {
        id_usuario: { type: 'number', example: 1 },
        id_sucursal: { type: 'number', example: 2 },
        estado: { type: 'number', example: 1 },
      },
    },
  })
  updateRelation(
    @Param('id', ParseIntPipe) id: number,
    @Body() relationData: UpdateEmployeeAgencyRelationDto,
  ) {
    return this.employeeAgencyRelationService.updateRelation(id, relationData);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Desactivar una relación',
    description: 'Este endpoint sirve para desactivar una relación marcándola con estado 0',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID de la relación a desactivar',
    example: '1',
  })
  deleteRelation(@Param('id', ParseIntPipe) id: number) {
    return this.employeeAgencyRelationService.deleteRelation(id);
  }
}
