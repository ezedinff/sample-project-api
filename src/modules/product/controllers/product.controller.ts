import { Body, Controller, Get, HttpStatus, Post } from "@nestjs/common";
import {
    ApiBearerAuth,
    ApiOperation,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';
import { ProductDTO } from "../dto/product.dto";

@ApiBearerAuth()
@ApiTags('products')
@Controller('products')
export class ProductController {

    @Post()
    @ApiOperation({ summary: "Create New Product" })
    @ApiResponse({ status: HttpStatus.CREATED, description: "New Product Registered" })
    async create(@Body() product: ProductDTO) {
        // if the user is trying to register again with the same type and date,
        // increment on to already available document
        // else register

        // products registered everyday
        // products not sold will be added to the next days
    }


    @Get()
    async findAll() { }

}

// @ApiProperty({ example: 1, description: 'The age of the Cat' })
// age: number;