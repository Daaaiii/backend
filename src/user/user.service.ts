import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateUserDto) {
    if (
      await this.prisma.user.findUnique({
        where: {
          email: data.email,
        },
      })
    ) {
      throw new ConflictException(`Email já cadastrado.`);
    }

    const salt = await bcrypt.genSalt();

    data.password = await bcrypt.hash(data.password, salt);

    return this.prisma.user.create({ data });
  }

  async findAll() {
    try {
      return this.prisma.user.findMany({});
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  async findOne(id: number) {
    await this.exists(id);
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async update(id: number, { name, email, password, role }: UpdateUserDto) {
    if (!this.exists(id)) {
      throw new NotFoundException('Usuário não encontrado');
    }
    if (
      await this.prisma.user.findUnique({
        where: {
          email,
        },
      })
    ) {
      throw new ConflictException(`Email já cadastrado.`);
    }

    try {
      const salt = await bcrypt.genSalt();

      password = await bcrypt.hash(password, salt);

      return await this.prisma.user.update({
        where: { id },
        data: {
          name,
          email,
          password,
          role,
          updateat: new Date(),
        },
      });
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async remove(id: number) {
    if (!this.exists(id)) {
      throw new NotFoundException('Usuário não encontrado');
    }
    return this.prisma.user.delete({
      where: { id },
    });
  }

  async exists(id: number) {
    if (
      !(await this.prisma.user.count({
        where: {
          id,
        },
      }))
    ) {
      throw new NotFoundException(`Usuário não encontrado.`);
    }
  }
}
