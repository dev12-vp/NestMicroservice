import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientKafka, ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { UserCreateDto } from './dto/user.dto';

@Injectable()
export class UserService implements OnModuleInit {
    //TSC transport

    // private readonly orderClient: ClientProxy?
    // constructor(@InjectRepository(User) private userRepo: Repository<User>) {
    //     const orderPort = Number(process.env.ORDER_SERVICE_PORT) || 5000;

    //     this.orderClient = ClientProxyFactory.create({
    //         transport: Transport.TCP,
    //         options: { host: '127.0.0.1', port: orderPort },
    //     });
    // }

    constructor(
        @InjectRepository(User) private userRepo: Repository<User>,
        @Inject('KAFKA-SERVICE') private readonly kafkaClient: ClientKafka
    ) { }

    async onModuleInit() {
        try {
            await this.kafkaClient.connect()
        } catch (error) {
            console.log("error", error)
        }
    }

    async create(dto: UserCreateDto) {
        const user = this.userRepo.create(dto)
        const save = await this.userRepo.save(user)

        this.kafkaClient.emit('create_order', {
            userId: save.id,
            items: [{ sku: 'welcome1', qty: 1 }],
        })

        return save
    }

    findAll() { return this.userRepo.find() };
    findById(id: number) { return this.userRepo.findOneBy({ id }) }
}
