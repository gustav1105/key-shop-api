import { Controller, Get, Param, Query } from '@nestjs/common';
import { ProductsService } from './services/product.service';
import { ListProductsQueryDto } from './dtos/list-products-query.dto'; // Import your DTO

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get(':id')
  getProduct(@Param('id') id: string) {
    return this.productsService.getProductById(id);
  }

  @Get()
  listProducts(@Query() query: ListProductsQueryDto) {
    return this.productsService.listProducts(query);
  }
}
