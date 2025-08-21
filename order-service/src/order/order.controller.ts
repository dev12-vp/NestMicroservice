import { Controller } from '@nestjs/common';
import { OrderService } from './order.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateOrderDto } from './dto/create.order.dto';

@Controller('order')
export class OrderController {
    constructor(private readonly orderService: OrderService) { }

    @MessagePattern('create_order')
    handleCreateOrder(@Payload() payload: CreateOrderDto) {
        this.orderService.create(payload)
    }

    @MessagePattern('get_orders')
    handleGetOrder(@Payload() payload: { userId?: number }) {
        this.orderService.findAll(payload?.userId)
    }
}
