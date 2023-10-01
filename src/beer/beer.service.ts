import {
  Injectable,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Observable, catchError, lastValueFrom, map } from 'rxjs';
import { AxiosResponse } from 'axios';
import { Beer } from './entities/beer.entity';

@Injectable()
export class BeerService {
  constructor(private readonly http: HttpService) {}

  async findAll() {
    try {
      const request = this.http
        .get('https://api.punkapi.com/v2/beers')
        .pipe(map((res) => res.data))
        .pipe(
          catchError(() => {
            throw new ForbiddenException('API not available');
          }),
        );
      const beers = await lastValueFrom(request);

      return beers;
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async findOne(id: number) {
    try {
      const request = this.http
        .get(`https://api.punkapi.com/v2/beers/${id}`)
        .pipe(map((res) => res.data))
        .pipe(
          catchError(() => {
            throw new ForbiddenException('API not available');
          }),
        );
      const beer = await lastValueFrom(request);

      return beer;
    } catch (e) {
      throw new BadRequestException(e);
    }
  }
}
