import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { AgencyEmployeeRelationService } from './agency-employee-relation.service';
import { CreateAgencyEmployeeRelationDto } from './dto/create-agency-employee-relation.dto';
import { UpdateAgencyEmployeeRelationDto } from './dto/update-agency-employee-relation.dto';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AgencyEmployeeRelation } from './entities/agency-employee-relation.entity';

@ApiTags('RelacionEmpleadoSucursal')
@Controller('agency-employee-relation')
export class AgencyEmployeeRelationController {
  constructor(
    private readonly agencyEmployeeRelationService: AgencyEmployeeRelationService,
  ) {}

  @Get()
  @ApiOperation({
    summary: 'Listar todas las relaciones empleado-sucursal',
    description:
      'Este endpoint sirve para obtener todas las relaciones existentes.',
  })
  @ApiResponse({
    status: 200,
    description: 'Relaciones obtenidas correctamente.',
    type: [AgencyEmployeeRelation],
  })
  getAllRelations(): Promise<AgencyEmployeeRelation[]> {
    return this.agencyEmployeeRelationService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obtener una relación por ID',
    description: 'Este endpoint sirve para obtener una relación específica.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID de la relación a obtener',
    type: Number,
    example: 1,
  })
  getRelationById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<AgencyEmployeeRelation> {
    return this.agencyEmployeeRelationService.findOne(id);
  }

  @Post()
  @ApiOperation({
    summary: 'Crear una nueva relación empleado-sucursal',
    description: 'Este endpoint sirve para crear una nueva relación.',
  })
  @ApiBody({
    description: 'Datos necesarios para crear una nueva relación.',
    schema: {
      type: 'object',
      properties: {
        id_usuario: {
          type: 'number',
          example: 3,
        },
        id_sucursal: {
          type: 'number',
          example: 2,
        },
        estado: {
          type: 'number',
          example: 1,
        },
      },
    },
  })
  createRelation(
    @Body() createRelacionDto: CreateAgencyEmployeeRelationDto,
  ): Promise<AgencyEmployeeRelation> {
    return this.agencyEmployeeRelationService.create(createRelacionDto);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Actualizar una relación existente',
    description: 'Este endpoint sirve para actualizar una relación existente.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID de la relación a actualizar',
    type: Number,
    example: 1,
  })
  @ApiBody({
    description: 'Datos a actualizar en la relación.',
    schema: {
      type: 'object',
      properties: {
        id_usuario: {
          type: 'number',
          example: 3,
        },
        id_sucursal: {
          type: 'number',
          example: 2,
        },
        estado: {
          type: 'number',
          example: 1,
        },
      },
    },
  })
  updateRelation(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRelacionDto: UpdateAgencyEmployeeRelationDto,
  ): Promise<AgencyEmployeeRelation> {
    return this.agencyEmployeeRelationService.update(id, updateRelacionDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Eliminar una relación',
    description:
      'Este endpoint sirve para eliminar una relación (marcarla como inactiva).',
  })
  @ApiParam({
    name: 'id',
    description: 'ID de la relación a eliminar',
    type: Number,
    example: 1,
  })
  deleteRelation(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.agencyEmployeeRelationService.remove(id);
  }
}
