import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateUserDto) {
    data.password = data.password;

    const salt = await bcrypt.genSalt();


    data.password = await bcrypt.hash(data.password, salt);

    return this.prisma.user.create({ data });
  }

  async findAll() {
    return this.prisma.user.findMany({});
  }

  async findOne(id: number) {
    await this.exists(id);
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async update(id: number, { name, email, password, role }: UpdateUserDto) {
    this.exists(id);
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
  }

  async remove(id: number) {
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
      throw new NotFoundException(`O usuário não existe.`);
    }
  }
}
