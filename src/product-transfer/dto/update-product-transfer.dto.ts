import { PartialType } from '@nestjs/swagger';
import { CreateProductTransferDto } from './create-product-transfer.dto';

export class UpdateProductTransferDto extends PartialType(CreateProductTransferDto) {}
