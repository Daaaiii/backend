import { Controller, Get, Param } from '@nestjs/common';
import { BeerService } from './beer.service';
import { ApiProperty } from '@nestjs/swagger';
import { HttpService } from '@nestjs/axios';

@Controller('beer')
export class BeerController {
  constructor(private readonly beerService: BeerService) {}

  @ApiProperty()
  @Get()
  async findAll() {
    return await this.beerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.beerService.findOne(+id);
  }
}
