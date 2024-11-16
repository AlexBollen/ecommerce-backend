import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TransferDetailService } from './transfer-detail.service';
import { CreateTransferDetailDto } from './dto/create-transfer-detail.dto';
import { UpdateTransferDetailDto } from './dto/update-transfer-detail.dto';

@Controller('transfer-detail')
export class TransferDetailController {
  constructor(private readonly transferDetailService: TransferDetailService) {}

  @Post()
  create(@Body() createTransferDetailDto: CreateTransferDetailDto) {
    return this.transferDetailService.create(createTransferDetailDto);
  }

  @Get()
  findAll() {
    return this.transferDetailService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.transferDetailService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTransferDetailDto: UpdateTransferDetailDto) {
    return this.transferDetailService.update(+id, updateTransferDetailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.transferDetailService.remove(+id);
  }
}
