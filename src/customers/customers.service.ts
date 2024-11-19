import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from './customer.entity';
import { Repository } from 'typeorm';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import * as bcryptjs from 'bcryptjs';
import { CustomerLoginDto } from './dto/customer-login.dto';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
  ) {}

  getAllCustomers() {
    return this.customerRepository.find();
  }

  getCustomer(id_cliente: number) {
    return this.customerRepository.findOne({
      where: {
        id_cliente,
      },
    });
  }

  getCustomerByEmail(email: string) {
    return this.customerRepository.findOne({
      where: {
        correo_cliente: email,
      },
    });
  }

  async customerLogin({ correo_cliente, password_cliente }: CustomerLoginDto) {
    const customer = await this.getCustomerByEmail(correo_cliente);
    if (!customer) {
      throw new Error(`No existe un cliente con correo ${correo_cliente}`);
    }
    const isPasswordValid = await bcryptjs.compare(
      password_cliente,
      customer.password_cliente,
    );
    if (!isPasswordValid) {
      throw new Error('La contraseña no es correcta');
    }
    return customer;
  }

  async createCustomer(customer: CreateCustomerDto) {
    const newCustomer = this.customerRepository.create({
      ...customer,
      password_cliente: await bcryptjs.hash(customer.password_cliente, 10),
    });
    return this.customerRepository.save(newCustomer);
  }

  updateCustomer(id_cliente: number, customer: UpdateCustomerDto) {
    return this.customerRepository.update({ id_cliente: id_cliente }, customer);
  }

  deleteCustomer(id_cliente: number) {
    return this.customerRepository.update({ id_cliente }, { estado: 0 });
  }

}
