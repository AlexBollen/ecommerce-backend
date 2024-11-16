import { PartialType } from '@nestjs/swagger';
import { CreateTransferDetailDto } from './create-transfer-detail.dto';

export class UpdateTransferDetailDto extends PartialType(CreateTransferDetailDto) {}
