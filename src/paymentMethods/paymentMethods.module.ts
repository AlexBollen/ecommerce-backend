import { Module } from '@nestjs/common';
import { PaymentMethodsController } from './paymentMethods.controller';
import { PaymentMethodsService } from './paymentMethods.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentMethod } from './paymentMethod.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PaymentMethod])],
  controllers: [PaymentMethodsController],
  providers: [PaymentMethodsService],
})
export class PaymentMethodsModule {}
