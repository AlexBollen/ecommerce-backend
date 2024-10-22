import { Controller, Get } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Product } from './product.entity';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @ApiOperation({
    summary: 'Obtener productos',
    description: 'Este endpoint sirve para listar todos los productos'
  })
  getAllProducts(): Promise<Product[]> {
    return this.productsService.getAllProducts()
  }
}
