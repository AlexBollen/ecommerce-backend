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
import { CreateBrandDto } from './dto/create-brand.dto';
import { BrandsService } from './brands.service';
import {
    ApiBody,
    ApiOperation,
    ApiParam,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';
import { Brand } from './brand.entity';
import { UpdateBrandDto } from './dto/update-brand.dto';

@ApiTags('Brands')
@Controller('brands')
export class BrandsController {
    constructor(private brandService: BrandsService) {}

    @Get()
    @ApiOperation({
        summary: 'Obtener marcas',
        description: 'Este endpoint sirve para listar todas las marcas',        
    })
    getAllBrands(): Promise<Brand[]> {
        return this.brandService.getAllBrands();
      }
    
      @Get(':id_marca')
      @ApiOperation({
        summary: 'Obtener marca',
        description: 'Este endpoint sirve para obtener una marca',
      })
      @ApiParam({
        name: 'id_marca',
        type: Number,
        description: 'Id de la marca a obtener',
        example: '1',
      })
      getBrand(
        @Param('id_brand', ParseIntPipe) id_marca: number,
      ): Promise<Brand> {
        return this.brandService.getBrand(id_marca);
      }
    
      @Post()
      @ApiOperation({
        summary: 'Crear una nueva marca',
        description: 'Este endpoint sirve para crear nuevas marcas',
      })
      @ApiBody({
        description: 'Datos necesarios para crear una nueva marca.',
        schema: {
          type: 'object',
          properties: {
            nombre_marca: {
              type: 'string',
              example: 'Nueva marca',
            },
          },
        },
      })
      createBrand(@Body() newBrand: CreateBrandDto) {
        return this.brandService.createBrand(newBrand);
      }
    
      @Patch(':id_marca')
      @ApiOperation({
        summary: 'Actualizar una marca',
        description: 'Este endpoint sirve para actualizar una marca',
      })
      @ApiParam({
        name: 'id_marca',
        type: Number,
        description: 'Id de la marca a actualizar',
        example: '1',
      })
      @ApiBody({
        description: 'Se puede utilizar cualquiera de estos datos para actualizar',
        schema: {
          type: 'object',
          properties: {
            nombre_marca: {
              type: 'string',
              example: 'Marca actualizada',
            },
          },
        },
      })
      updateBrand(
        @Param('id_marca', ParseIntPipe) id_marca: number,
        @Body() brand: UpdateBrandDto,
      ) {
        return this.brandService.updateBrand(id_marca, brand);
      }
    
      @Put(':id_marca')
      @ApiOperation({
        summary: 'Eliminar una marca',
        description: 'Este endpoint sirve para eliminar una marca '
      })
      @ApiParam({
        name: 'id_marca',
        type: Number,
        description: 'Id de la marca a eliminar',
        example: '1',
      })
      deletebrand(@Param('id_marca', ParseIntPipe) id_marca: number){
        return this.brandService.deleteBrand(id_marca)
      }
}
