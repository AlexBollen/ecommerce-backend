import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentMethod } from './payment-method.entity';
import { Repository } from 'typeorm';
import { CreatePaymentMethodDto } from './dto/create-payment-method.dto';
import { UpdatePaymentMethodDto } from './dto/update-payment-method.dto';

@Injectable()
export class PaymentMethodsService {
  constructor(
    @InjectRepository(PaymentMethod)
    private paymentMethodRepository: Repository<PaymentMethod>,
  ) {}
  getAllPaymentMethods() {
    return this.paymentMethodRepository.find();
  }
  getPaymentMethod(id_metodo_pago: number) {
    return this.paymentMethodRepository.findOne({
      where: {
        id_metodo_pago,
      },
    });
  }
  createPaymentMethod(paymentMethod: CreatePaymentMethodDto) {
    const newPaymentMethod = this.paymentMethodRepository.create(paymentMethod);
    this.paymentMethodRepository.save(newPaymentMethod);
  }
  updatePaymentMethod(
    id_metodo_pago: number,
    paymentMethod: UpdatePaymentMethodDto,
  ) {
    return this.paymentMethodRepository.update(
      { id_metodo_pago: id_metodo_pago },
      paymentMethod,
    );
  }
  deletePaymentMethod(id_metodo_pago: number) {
    return this.paymentMethodRepository.update(
      { id_metodo_pago },
      { estado: 0 },
    );
  }
}
