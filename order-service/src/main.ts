import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  // const port = Number(process.env.TCP_PORT) || 5000;
  // const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
  //   transport: Transport.TCP,
  //   options: { host: '127.0.0.1', port },
  // });

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.KAFKA,
     options: {
      client: { clientId: 'order-service', brokers: ['localhost:9092'] },
      consumer: { groupId: 'order-consumer' },
    },
  });
  await app.listen();
  console.log(`Order service (TCP) listening on kafka`);
}
bootstrap();
