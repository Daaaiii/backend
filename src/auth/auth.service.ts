import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt/dist';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class AuthService {
  constructor(
    private readonly JWTService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  async createToken() {
    return 'This action adds a new auth';
  }

  async checkToken(token: string) {
    return `This action returns all auth`;
  }

  async login(email: string, password: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        email,
        password,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Email e/ou senha incorretos.');
    }
    return user;
  }
  async forget(email: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Email está incorreto.');
    }
    //TODO: enviar email
    return true;
  }
  async reset(password: string, token: string) {
    //TODO: validar o token
    const id = 0;
    await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        password,
      },
    });
    return true;
  }
}