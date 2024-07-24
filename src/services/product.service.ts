import { Injectable, Inject, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { GetProductByIdRequest } from '@/grpc/products/GetProductByIdRequest';
import { ListProductsRequest } from '@/grpc/products/ListProductsRequest';
import { ProductResponse } from '@/grpc/products/ProductResponse';
import { ListProductsResponse } from '@/grpc/products/ListProductsResponse';

interface ProductService {
  GetProductById(data: GetProductByIdRequest): Observable<ProductResponse>;
  ListProducts(data: ListProductsRequest): Observable<ListProductsResponse>;
}

@Injectable()
export class ProductsService implements OnModuleInit {
  private productService: ProductService;

  constructor(@Inject('PRODUCT_PACKAGE') private readonly client: ClientGrpc) {}

  onModuleInit() {
    this.productService =
      this.client.getService<ProductService>('ProductService');
  }

  getProductById(id: string): Observable<ProductResponse> {
    const request: GetProductByIdRequest = { id }; // Ensure id is properly defined
    return this.productService.GetProductById(request);
  }

  listProducts(query: ListProductsRequest): Observable<ListProductsResponse> {
    const request: ListProductsRequest = query; // Ensure query is properly passed
    return this.productService.ListProducts(request);
  }
}
