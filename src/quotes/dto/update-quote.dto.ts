import { PartialType } from '@nestjs/swagger';
import { CreateQuoteDto } from './create-quote.dto';
import { IsDecimal, IsInt, IsOptional, MinLength, Min } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateQuoteDto extends PartialType(CreateQuoteDto) {
    @IsOptional()
    @IsInt()
    @Min(1)
    monto_total?: number;
}
