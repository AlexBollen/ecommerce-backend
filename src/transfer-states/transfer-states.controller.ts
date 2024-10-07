import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { TransferStatesService } from './transfer-states.service';
import { TransferState } from './transfer-state.entity';
import { CreateTransferStateDto } from './dto/create-transfer-state.dto';
import { UpdateTransferStateDto } from './dto/update-transfer-state.dto';

@ApiTags('Transfer States')
@Controller('transfer-states')
export class TransferStatesController {
  constructor(private transferStateService: TransferStatesService) {}

  @Get()
  @ApiOperation({
    summary: 'Obtener estado de transferencia',
    description:
      'Este endpoint sirve para listar todos los estados de transferencias',
  })
  getAllTransferStates(): Promise<TransferState[]> {
    return this.transferStateService.getAllTransferStates();
  }

  @Get(':id_estado_transferencia')
  @ApiOperation({
    summary: 'Obtener estado de transferencia',
    description: 'Este endpoint sirve para obtener un estado de transferencia',
  })
  @ApiParam({
    name: 'id_estado_transferencia',
    type: Number,
    description: 'Id del estado de transferencia a obtener',
    example: '1',
  })
  getTransferState(
    @Param('id_estado_transferencia', ParseIntPipe)
    id_estado_transferencia: number,
  ): Promise<TransferState> {
    return this.transferStateService.getTransferState(id_estado_transferencia);
  }

  @Post()
  @ApiOperation({
    summary: 'Crear un nuevo estado de transferencia',
    description:
      'Este endpoint sirve para crear un nuevo estado de transferencia',
  })
  @ApiBody({
    description: 'Datos necesarios para crear un nuevo estado',
    schema: {
      type: 'object',
      properties: {
        nombre_estado_transferencia: {
          type: 'string',
          example: 'Recibido',
        },
      },
    },
  })
  createTransferState(@Body() newTransferState: CreateTransferStateDto) {
    return this.transferStateService.createTransferState(newTransferState);
  }

  @Patch(':id_estado_transferencia')
  @ApiOperation({
    summary: 'Actualizar un estado de transferencia',
    description: 'Este endpoint sirve para actualizar un estado',
  })
  @ApiParam({
    name: 'id_estado_transferencia',
    type: Number,
    description: 'Id del estado de transferencia a actualizar',
    example: '1',
  })
  @ApiBody({
    description: 'Se puede utilizar cualquiera de estos datos para actualizar',
    schema: {
      type: 'object',
      properties: {
        nombre_estado_transferencia: {
          type: 'string',
          example: 'Denegado',
        },
      },
    },
  })
  updateTransferState(
    @Param('id_estado_transferencia', ParseIntPipe)
    id_estado_transferencia: number,
    @Body() transfer_state: UpdateTransferStateDto,
  ) {
    return this.transferStateService.updateTransferState(
      id_estado_transferencia,
      transfer_state,
    );
  }

  @Put(':id_estado_transferencia')
  @ApiOperation({
    summary: 'Eliminar un estado de tranferencia',
    description:
      'Este endpoint sirve para eliminar un estado de transferencia (hacerlo no visible)',
  })
  @ApiParam({
    name: 'id_estado_transferencia',
    type: Number,
    description: 'Id del estado de transferencia a eliminar',
    example: '1',
  })
  deleteTransferState(
    @Param('id_estado_transferencia', ParseIntPipe)
    id_estado_transferencia: number,
  ) {
    return this.transferStateService.deleteTransferState(
      id_estado_transferencia,
    );
  }
}
