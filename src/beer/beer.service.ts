import {
  Injectable,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { catchError, lastValueFrom, map } from 'rxjs';
import { request } from 'express';
import { ApiBadRequestResponse } from '@nestjs/swagger';

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

  async findBeerByName(name: string) {
    try {
      let apiUrl = 'https://api.punkapi.com/v2/beers/';
      if (name) {
        apiUrl += `?beer_name=${name}`;
      }

      const request = this.http
        .get(apiUrl)
        .pipe(map((res) => res.data))
        .pipe(
          catchError(() => {
            throw new ForbiddenException('API not available');
          }),
        );
      const beer = await lastValueFrom(request);

      return beer;
    } catch (e) {
      throw ApiBadRequestResponse(e);
    }
  }
}
