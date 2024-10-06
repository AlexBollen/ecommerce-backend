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
import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoriesService } from './categories.service';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Category } from './category.entity';
import { UpdateCategoryDto } from './dto/update-category.dto';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private categoryService: CategoriesService) {}

  @Get()
  @ApiOperation({
    summary: 'Obtener categorías',
    description: 'Este endpoint sirve para listar todas las categorías',
  })
  getAllCategories(): Promise<Category[]> {
    return this.categoryService.getAllCategories();
  }

  @Get(':id_categoria')
  @ApiOperation({
    summary: 'Obtener categoría',
    description: 'Este endpoint sirve para obtener una categoría',
  })
  @ApiParam({
    name: 'id_categoria',
    type: Number,
    description: 'Id de la categoría a obtener',
    example: '1',
  })
  getCategory(
    @Param('id_categoria', ParseIntPipe) id_categoria: number,
  ): Promise<Category> {
    return this.categoryService.getCategory(id_categoria);
  }

  @Post()
  @ApiOperation({
    summary: 'Crear una nueva categoría',
    description: 'Este endpoint sirve para crear nuevas categorías',
  })
  @ApiBody({
    description: 'Datos necesarios para crear una nueva categoría.',
    schema: {
      type: 'object',
      properties: {
        nombre_categoria: {
          type: 'string',
          example: 'Nueva categoria',
        },
      },
    },
  })
  createCategory(@Body() newCategory: CreateCategoryDto) {
    return this.categoryService.createCategory(newCategory);
  }

  @Patch(':id_categoria')
  @ApiOperation({
    summary: 'Actualizar una categoría',
    description: 'Este endpoint sirve para actualizar una categoría',
  })
  @ApiParam({
    name: 'id_categoria',
    type: Number,
    description: 'Id de la categoría a actualizar',
    example: '1',
  })
  @ApiBody({
    description: 'Se puede utilizar cualquiera de estos datos para actualizar',
    schema: {
      type: 'object',
      properties: {
        nombre_categoria: {
          type: 'string',
          example: 'categoría actualizada',
        },
      },
    },
  })
  updateCategory(
    @Param('id_categoria', ParseIntPipe) id_categoria: number,
    @Body() category: UpdateCategoryDto,
  ) {
    return this.categoryService.updateCategory(id_categoria, category);
  }

  @Put(':id_categoria')
  @ApiOperation({
    summary: 'Eliminar una categoría',
    description: 'Este endpoint sirve para eliminar un categoría (hacerla no visible)'
  })
  @ApiParam({
    name: 'id_categoria',
    type: Number,
    description: 'Id de la categoría a eliminar',
    example: '1',
  })
  deleteCategory(@Param('id_categoria', ParseIntPipe) id_categoria: number){
    return this.categoryService.deleteCategory(id_categoria)
  }
}
