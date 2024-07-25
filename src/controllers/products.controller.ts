import { Controller, Get, Param, Query } from '@nestjs/common';
import { ProductsService } from '@/services/product.service';
import { ListProductsQueryDto } from '@/dtos/list-products-query.dto';
import { ProductResponse } from '@/grpc/products/ProductResponse';
import { Observable } from 'rxjs';
import { ListProductsResponse } from '@/grpc/products/ListProductsResponse'; // Import your DTO

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get(':id')
  getProduct(@Param('id') id: string): Observable<ProductResponse> {
    return this.productsService.getProductById(id);
  }

  @Get()
  listProducts(
    @Query() query: ListProductsQueryDto,
  ): Observable<ListProductsResponse> {
    return this.productsService.listProducts(query);
  }
}
