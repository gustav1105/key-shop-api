import { Module } from '@nestjs/common';
import { ProductsController } from './controllers/products.controller';
import { ProductsService } from './services/product.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'PRODUCT_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'products',
          protoPath: join(__dirname, '../dist/proto/products.proto'),
          url: process.env.GRPC_SERVER || 'localhost:50051',
        },
      },
    ]),
  ],
  controllers: [ProductsController], // Controllers should be listed here
  providers: [ProductsService],
})
export class AppModule {}
