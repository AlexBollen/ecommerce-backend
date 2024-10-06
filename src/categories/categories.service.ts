import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  getAllCategories() {
    return this.categoryRepository.find()
  }

  getCategory(id_categoria: number) {
    return this.categoryRepository.findOne({
        where: {
            id_categoria
        }
    })
  }

  createCategory(category: CreateCategoryDto) {
    const newCategory = this.categoryRepository.create(category);
    this.categoryRepository.save(newCategory);
  }

  updateCategory(id_categoria: number, category: UpdateCategoryDto) {
    return this.categoryRepository.update(
        { id_categoria: id_categoria },
        category
    )
  }

  deleteCategory(id_categoria: number) {
    return this.categoryRepository.update(
        { id_categoria },
        { estado: 0 }
    )
  }
}
