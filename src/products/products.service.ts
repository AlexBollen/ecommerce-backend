import { Injectable } from '@nestjs/common';
import { Product } from './product.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Request } from 'express';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) {}

  getAllProducts(req: Request) {
    const host = `${req.protocol}://${req.get('host')}`;

    return this.productRepository
      .createQueryBuilder('producto')
      .leftJoinAndSelect('producto.categoria', 'categoria')
      .select([
        'producto.id_producto AS id_producto',
        'producto.nombre_producto AS nombre_producto',
        'producto.descripcion_producto AS descripcion_producto',
        'producto.precio_venta AS precio_venta',
        'producto.imagen AS imagen',
        'categoria.nombre_categoria AS nombre_categoria',
      ])
      .where('producto.estado = 1')
      .getRawMany()
      .then((products) => {
        return products.map((product) => ({
          ...product,
          imagen: `${host}${product.imagen}`,
        }));
      });
  }
  getProduct(id_producto: number) {
    return this.productRepository.findOne({
      where: {
        id_producto,
      },
    });
  }

  async getProductsPaginated(page: number, limit: number) {
    const queryBuilder = this.productRepository
      .createQueryBuilder('producto')
      .leftJoinAndSelect('producto.categoria', 'categoria')
      .where('producto.estado = 1')
      .select([
        'producto.id_producto',
        'producto.nombre_producto',
        'producto.descripcion_producto',
        'producto.precio_venta',
        `producto.imagen`,
        'categoria.nombre_categoria',
      ]);

    const total = await queryBuilder.getCount();
    const products = await queryBuilder
      .skip((page - 1) * limit)
      .take(limit)
      .getMany();

    const totalPages = Math.ceil(total / limit);

    return {
      data: products,
      total,
      currentPage: page,
      totalPages,
    };
  }

  createProduct(product: CreateProductDto) {
    const newProduct = this.productRepository.create(product);
    this.productRepository.save(newProduct);
  }

  updateProduct(id_producto: number, product: UpdateProductDto) {
    return this.productRepository.update({ id_producto: id_producto }, product);
  }

  deleteProduct(id_producto: number) {
    return this.productRepository.update({ id_producto }, { estado: 0 });
  }
}
