import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from './customer.entity';
import { Repository } from 'typeorm';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
@Injectable()
export class CustomersService {
    constructor(
        @InjectRepository(Customer)
        private customerRepository: Repository<Customer>,
      ) {}
    
      getAllCustomers() {
        return this.customerRepository.find()
      }
    
      getCustomer(id_cliente: number) {
        return this.customerRepository.findOne({
            where: {
                id_cliente
            }
        })
      }
    
      createCustomer(customer: CreateCustomerDto) {
        const newCustomer = this.customerRepository.create(customer);
        this.customerRepository.save(newCustomer);
      }
    
      updateCustomer(id_cliente: number, customer: UpdateCustomerDto) {
        return this.customerRepository.update(
            { id_cliente: id_cliente },
            customer
        )
      }
    
      deleteCustomer(id_cliente: number) {
        return this.customerRepository.update(
            { id_cliente },
            { estado: 0 }
        )
      }
    
}