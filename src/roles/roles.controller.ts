import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { RolesService } from './roles.service';
import { Role } from './role.entity';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@ApiTags('Roles')
@Controller('roles')
export class RolesController {
  constructor(private roleService: RolesService) {}

  @Get()
  @ApiOperation({
    summary: 'Obtener todos los roles activos con paginación',
    description:
      'Este endpoint lista los roles activos con soporte para paginación',
  })
  @ApiQuery({
    name: 'page',
    type: Number,
    required: false,
    example: 1,
  })
  @ApiQuery({
    name: 'limit',
    type: Number,
    required: false,
    example: 1,
  })
  getAllRoles(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ): Promise<{
    data: any[];
    total: number;
    currentPage: number;
    totalPages: number;
  }> {
    return this.roleService.getAllRoles(page, limit);
  }

  @Get(':id_rol')
  @ApiOperation({
    summary: 'Obtener rol',
    description: 'Este endpoint sirve para obtener un rol',
  })
  @ApiParam({
    name: 'id_rol',
    type: Number,
    description: 'Id del rol a obtener',
    example: '1',
  })
  getRole(@Param('id_rol', ParseIntPipe) id_rol: number): Promise<Role> {
    return this.roleService.getRole(id_rol);
  }

  @Post()
  @ApiOperation({
    summary: 'Crear un nuevo rol',
    description: 'Este endpoint sirve para crear nuevos roles',
  })
  @ApiBody({
    description: 'Datos necesarios para crear un nuevo rol',
    schema: {
      type: 'object',
      properties: {
        nombre_rol: {
          type: 'string',
          example: 'Administrador',
        },
        descripcion_rol: {
          type: 'string',
          example: 'Tiene acceso a todo el sistema',
        },
      },
    },
  })
  createRole(@Body() newRole: CreateRoleDto) {
    return this.roleService.createRole(newRole);
  }

  @Patch(':id_rol')
  @ApiOperation({
    summary: 'Actualizar un rol',
    description: 'Este endpoint sirve para actualizar un rol',
  })
  @ApiParam({
    name: 'id_rol',
    type: Number,
    description: 'Id del rol a actualizar',
    example: '1',
  })
  @ApiBody({
    description: 'Se puede utilizar cualquiera de estos datos para actualizar',
    schema: {
      type: 'object',
      properties: {
        nombre_rol: {
          type: 'string',
          example: 'Administrador general',
        },
        descripcion_rol: {
          type: 'string',
          example: 'Tiene todas las acciones sobre el sistema',
        },
      },
    },
  })
  updateRole(
    @Param('id_rol', ParseIntPipe) id_rol: number,
    @Body() role: UpdateRoleDto,
  ) {
    return this.roleService.updateRole(id_rol, role);
  }

  @Put(':id_rol')
  @ApiOperation({
    summary: 'Eliminar un rol',
    description:
      'Este endpoint sirve para eliminar un rol (hacerlo no visible)',
  })
  @ApiParam({
    name: 'id_rol',
    type: Number,
    description: 'Id del rol a eliminar',
    example: '1',
  })
  deleteRole(@Param('id_rol', ParseIntPipe) id_rol: number) {
    return this.roleService.deleteRole(id_rol);
  }
}
