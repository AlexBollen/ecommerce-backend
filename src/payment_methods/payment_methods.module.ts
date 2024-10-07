import { Module } from '@nestjs/common';
import { PaymentMethodsController } from './payment_methods.controller';
import { PaymentMethodsService } from './payment_methods.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment_Method } from './payment_method.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Payment_Method])],
  controllers: [PaymentMethodsController],
  providers: [PaymentMethodsService],
})
export class PaymentMethodsModule {}
