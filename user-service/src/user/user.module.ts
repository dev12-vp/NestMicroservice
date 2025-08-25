import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { HttpModule } from '@nestjs/axios';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [TypeOrmModule.forFeature([User]), ClientsModule.register([{
    name: 'KAFKA-SERVICE',
    transport: Transport.KAFKA,
    options: {
      client: { clientId: 'user-service', brokers: ['localhost:9092'] },
      consumer: { groupId: 'user-consumer' },
    }
  },]),
    HttpModule],
  providers: [UserService],
  controllers: [UserController]
})
export class UserModule { }
