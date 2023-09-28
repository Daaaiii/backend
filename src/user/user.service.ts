import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create({ name, email, password }: CreateUserDto) {
    return this.prisma.user.create({
      data: {
        name,
        email,
        password,
        createdat: new Date(),
        updateat: new Date(),
      },
    });
  }

  async findAll() {
    return this.prisma.user.findMany({});
  }

  async findOne(id: number) {
    await this.exists(id);
    return this.prisma.user.findFirst({
      where: {
        id,
      },
    });
  }

  async update(id: number, { name, email, password }: UpdateUserDto) {
    await this.exists(id);
    return await this.prisma.user.update({
      where: { id },
      data: {
        name,
        email,
        password,
        updateat: new Date(),
      },
    });
  }

  async remove(id: number) {
    await this.exists(id);
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
      // throw new NotFoundException(`O usuário ${id} não existe.`);
    }
  }
}
