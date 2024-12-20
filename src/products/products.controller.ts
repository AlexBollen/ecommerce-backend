import {
  Body,
  Controller,
  Post,
  Get,
  Put,
  Patch,
  Param,
  ParseIntPipe,
  UseInterceptors,
  UploadedFile,
  DefaultValuePipe,
  Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './product.entity';
import {
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiBody,
  ApiConsumes,
  ApiQuery,
} from '@nestjs/swagger';
import { CreateProductDto } from 'src/products/dto/create-product.dto';
import { UpdateProductDto } from 'src/products/dto/update-product.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { extname } from 'path';
import { Request } from 'express';
import { Req } from '@nestjs/common';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @ApiOperation({
    summary: 'Obtener productos',
    description: 'Este endpoint sirve para listar todos los productos',
  })
  getAllProducts(@Req() req: Request): Promise<Product[]> {
    return this.productsService.getAllProducts(req);
  }

  @Get('producto/:id_producto')
  @ApiOperation({
    summary: 'Obtener producto',
    description: 'Este endpoint sirve para obtener una producto',
  })
  @ApiParam({
    name: 'id_producto',
    type: Number,
    description: 'Id del producto a obtener',
    example: '1',
  })
  getProduct(
    @Param('id_producto', ParseIntPipe) id_producto: number,
  ): Promise<Product> {
    return this.productsService.getProduct(id_producto);
  }

  @Get('productos_paginados')
  @ApiOperation({
    summary: 'Obtener todos los usuarios activos con paginación',
    description:
      'Este endpoint lista los usuarios activos con soporte para paginación',
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
  async getProductsPaginated(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ): Promise<{
    data: any[];
    total: number;
    currentPage: number;
    totalPages: number;
  }> {
    return this.productsService.getProductsPaginated(page, limit);
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('imagen', {
      storage: diskStorage({
        destination: './uploads/products',
        filename: (req, file, callback) => {
          const uniqueSuffix = `${uuidv4()}${extname(file.originalname)}`;
          callback(null, uniqueSuffix);
        },
      }),
    }),
  )
  @ApiOperation({
    summary: 'Crear una nuevo producto',
    description: 'Este endpoint sirve para crear nuevo producto ',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Datos necesarios para crear un nuevo producto .',
    schema: {
      type: 'object',
      properties: {
        nombre_producto: {
          type: 'string',
          example: 'producto nuevo',
        },
        descripcion_producto: {
          type: 'string',
          example: 'este es la descripcion del producto',
        },
        modelo_producto: {
          type: 'string',
          example: 'modelo nuevo',
        },
        cantidad_minima: {
          type: 'string',
          example: '14',
        },
        precio_costo: {
          type: 'string',
          example: '145.0',
        },
        precio_venta: {
          type: 'string',
          example: '170.0',
        },
        imagen: {
          type: 'string',
          format: 'binary',
        },
        categoria: {
          type: 'number',
          example: '1',
        },
        marca: {
          type: 'number',
          example: '1',
        },
      },
    },
  })
  createProduct(
    @Body() newProduct: CreateProductDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    newProduct.cantidad_minima = Number(newProduct.cantidad_minima);
    newProduct.precio_costo = Number(newProduct.precio_costo);
    newProduct.precio_venta = Number(newProduct.precio_venta);
    newProduct.imagen = file ? `/uploads/products/${file.filename}` : null;
    return this.productsService.createProduct(newProduct);
  }

  @Patch(':id_producto')
  @ApiOperation({
    summary: 'Actualizar un nuevo producto',
    description: 'Este endpoint sirve para actualizar un nuevo producto',
  })
  @ApiParam({
    name: 'id_producto',
    type: Number,
    description: 'Id de la categoría a actualizar',
    example: '1',
  })
  @ApiBody({
    description: 'Se puede utilizar cualquiera de estos datos para actualizar',
    schema: {
      type: 'object',
      properties: {
        nombre_producto: {
          type: 'string',
          example: 'producto nuevo',
        },
        descripcion_producto: {
          type: 'string',
          example: 'este es la descripcion del producto',
        },
        modelo_producto: {
          type: 'string',
          example: 'modelo nuevo',
        },
        cantidad_minima: {
          type: 'number',
          example: '14',
        },
        precio_costo: {
          type: 'number',
          example: '145',
        },
        precio_venta: {
          type: 'number',
          example: '145',
        },
      },
    },
  })
  updateProduct(
    @Param('id_producto', ParseIntPipe) id_producto: number,
    @Body() product: UpdateProductDto,
  ) {
    return this.productsService.updateProduct(id_producto, product);
  }

  @Put(':id_producto')
  @ApiOperation({
    summary: 'Eliminar un producto',
    description:
      'Este endpoint sirve para eliminar un producto(hacerla no visible)',
  })
  @ApiParam({
    name: 'id_producto',
    type: Number,
    description: 'Id del producto eliminar',
    example: '1',
  })
  deleteProduct(@Param('id_producto', ParseIntPipe) id_producto: number) {
    return this.productsService.deleteProduct(id_producto);
  }
}
