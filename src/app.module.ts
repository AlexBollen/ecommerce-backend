import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static'
import { CategoriesModule } from './categories/categories.module';
import { AgenciesModule } from './agencies/agencies.module';
import { PaymentMethodsModule } from './payment-methods/payment-methods.module';
import { RolesModule } from './roles/roles.module';
import { TransferStatesModule } from './transfer-states/transfer-states.module';
import { BrandsModule } from './brands/brands.module';
import { CustomersModule } from './customers/customers.module';
import { LocationsModule } from './locations/locations.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { StocksModule } from './stocks/stocks.module';
import { QuotesModule } from './quotes/quotes.module';
import { DetailQuotesModule } from './detail-quotes/detail-quotes.module';
import { SalesModule } from './sales/sales.module';
import * as Joi from 'joi';
import { join } from 'path';
import { ProductTransferModule } from './product-transfer/product-transfer.module';
import { TransferDetailModule } from './transfer-detail/transfer-detail.module';
import { AgencyEmployeeRelationModule } from './agency-employee-relation/agency-employee-relation.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env.development',
      validationSchema: Joi.object({
        PORT: Joi.number().default(3000),
        JWT_SECRET: Joi.string().required(),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.number().default(3306),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_NAME: Joi.string().required(),
        ROOT_PASSWORD: Joi.string().required(),
      }),
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: `${process.env.DB_HOST}`,
      port: +process.env.DB_PORT,
      username: `${process.env.DB_USERNAME}`,
      password: `${process.env.DB_PASSWORD}`,
      database: `${process.env.DB_NAME}`,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads'
    }),
    AuthModule,
    AgenciesModule,
    BrandsModule,
    CategoriesModule,
    CustomersModule,
    LocationsModule,
    PaymentMethodsModule,
    ProductsModule,
    RolesModule,
    TransferStatesModule,
    UsersModule,
    StocksModule,
    QuotesModule,
    DetailQuotesModule,
    SalesModule,
    ProductTransferModule,
    TransferDetailModule,
    AgencyEmployeeRelationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
