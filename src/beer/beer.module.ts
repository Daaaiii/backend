import { Module } from '@nestjs/common';
import { BeerService } from './beer.service';
import { BeerController } from './beer.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [BeerController],
  providers: [BeerService, HttpModule],
})
export class BeerModule {}
