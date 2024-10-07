import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brand } from './brand.entity';
import { Repository } from 'typeorm';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';

@Injectable()
export class BrandsService {
  constructor(
    @InjectRepository(Brand)
    private brandRepository: Repository<Brand>,
  ) {}

  getAllBrands() {
    return this.brandRepository.find();
  }

  getBrand(id_marca: number) {
    return this.brandRepository.findOne({
      where: {
        id_marca,
      },
    });
  }

  createBrand(brand: CreateBrandDto) {
    const newBrand = this.brandRepository.create(brand);
    this.brandRepository.save(newBrand);
  }

  updateBrand(id_marca: number, brand: UpdateBrandDto) {
    return this.brandRepository.update({ id_marca: id_marca }, brand);
  }

  deleteBrand(id_marca: number) {
    return this.brandRepository.update({ id_marca }, { estado: 0 });
  }
}
