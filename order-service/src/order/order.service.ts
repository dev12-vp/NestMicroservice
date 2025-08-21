import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entity/order.entity';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create.order.dto';

@Injectable()
export class OrderService {
    constructor(@InjectRepository(Order) private orderRepo: Repository<Order>) { }

    create(dto: CreateOrderDto) {
        const order = this.orderRepo.create(dto)
        return this.orderRepo.save(order)
    }

    findAll(userId?: number) {
        return userId ? this.orderRepo.findBy({ userId }) : this.orderRepo.find()
    }
}
