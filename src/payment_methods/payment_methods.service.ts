import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment_Method } from './payment_method.entity';
import { Repository } from 'typeorm';
import { CreatePayment_MethodDto } from './dto/create-payment_method.dto';
import { UpdatePayment_MethodDto } from './dto/update-payment_method.dto';

@Injectable()
export class PaymentMethodsService {
  constructor(
    @InjectRepository(Payment_Method)
    private payment_method_Repository: Repository<Payment_Method>,
  ) {}
  getAllPaymentMethods() {
    return this.payment_method_Repository.find();
  }
  getPaymentMethod(id_metodo_pago: number) {
    return this.payment_method_Repository.findOne({
      where: {
        id_metodo_pago,
      },
    });
  }
  createPaymentMethod(payment_method: CreatePayment_MethodDto) {
    const newPaymentMethod =
      this.payment_method_Repository.create(payment_method);
    this.payment_method_Repository.save(newPaymentMethod);
  }
  updatePaymentMethod(
    id_metodo_pago: number,
    payment_method: UpdatePayment_MethodDto,
  ) {
    return this.payment_method_Repository.update(
      { id_metodo_pago: id_metodo_pago },
      payment_method,
    );
  }
  deletePaymentMethod(id_metodo_pago: number) {
    return this.payment_method_Repository.update(
      { id_metodo_pago },
      { estado: 0 },
    );
  }
}
