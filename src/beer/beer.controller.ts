import { Controller, Get, Param, Query } from '@nestjs/common';
import { BeerService } from './beer.service';
import { ApiBadRequestResponse, ApiProperty, ApiQuery } from '@nestjs/swagger';

@Controller('beer')
export class BeerController {
  constructor(private readonly beerService: BeerService) {}

  @ApiProperty()
  @Get()
  async findAll(@Query('name') name: string) {
    try {
      const beers = await this.beerService.findBeerByName(name);
      return beers;
    } catch (e) {
      throw ApiBadRequestResponse(e);
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.beerService.findOne(+id);
  }
}
