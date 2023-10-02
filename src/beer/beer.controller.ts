import { BadRequestException, Controller, Get, Param, Query } from '@nestjs/common';
import { BeerService } from './beer.service';
import {
  ApiBadRequestResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('beer')
@Controller('beer')
export class BeerController {
  constructor(private readonly beerService: BeerService) {}

  @Get()
  @ApiOperation({ summary: 'Lista todas as cervejas ou filtra por nome' })
  @ApiResponse({ status: 404, description: 'Bad Request.' })
  async findAll(@Query('name') name: string) {
    try {
      const beers = await this.beerService.findBeerByName(name);
      return beers;
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Filtra as cervejas por id' })
  @ApiResponse({ status: 404, description: 'Bad Request.' })
  findOne(@Param('id') id: string) {
    return this.beerService.findOne(+id);
  }
}
