import { ClientProxyFactory, Transport } from '@nestjs/microservices';

async function bootstrap() {

  const client = ClientProxyFactory.create({
    transport: Transport.TCP,
    options: {
      host: '127.0.0.1',  
      port: 4000,         
    },
  });

  try {
    const response = await client
      .send('create_user', { name: 'John Doe', email: 'vp@e1xample.com' ,workEmail : 't1est@gmail.com', password : 'bshabs654$&'})
      .toPromise();
    console.log('User Created:', response);
  } catch (error) {
    console.error('Error creating user:', error);
  } finally {
    client.close();
  }
}

bootstrap();
