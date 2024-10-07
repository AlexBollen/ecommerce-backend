import { Module } from '@nestjs/common';
import { SucursalesController } from './sucursales.controller';
import { SucursalesService } from './sucursales.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sucursal } from './sucursal.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Sucursal])],
  controllers: [SucursalesController],
  providers: [SucursalesService],
})
export class SucursalesModule {}
