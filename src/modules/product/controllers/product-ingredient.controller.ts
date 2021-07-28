import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiCookieAuth,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { cookieNames } from 'src/modules/auth/constants';
import { Role } from 'src/modules/user/user';
import { Roles } from 'src/shared/decorators/role';
import { RolesGuard } from 'src/shared/guards/role.guard';
import { ProductIngredientDTO } from '../dto/product-ingredient.dto';
import { ProductIngredientService } from '../services/product-ingredient.service';

@Controller('product-ingredients')
@ApiTags('Product Ingredients')
@ApiBearerAuth()
@UseGuards(RolesGuard, AuthGuard('jwt'))
export class ProductIngredientController {
  constructor(private productIngredientService: ProductIngredientService) {}
  @Post()
  @ApiOperation({ summary: 'Create New Product Ingredient' })
  @ApiResponse({ status: HttpStatus.CREATED })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED })
  async create(@Body() ingredient: ProductIngredientDTO) {
    return await this.productIngredientService.create(ingredient);
  }

  @Get()
  @ApiResponse({ status: HttpStatus.OK })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED })
  async findAll() {
    return await this.productIngredientService.findAll({});
  }

  @Get(':id')
  @ApiResponse({ status: HttpStatus.OK })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED })
  async findOne(@Param('id') id: string) {
    return await this.productIngredientService.findById(id);
  }

  @Patch(':id')
  @ApiResponse({ status: HttpStatus.OK })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED })
  async update(
    @Param('id') id: string,
    @Body() updates: Partial<ProductIngredientDTO>,
  ) {
    return await this.productIngredientService.update(id, updates);
  }

  @Delete(':id')
  @ApiResponse({ status: HttpStatus.OK })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED })
  async remove(@Param('id') id: string) {
    return await this.productIngredientService.deleteById(id);
  }
}
