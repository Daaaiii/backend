import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  Param,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { RoleGuard } from 'src/guards/role.guard';
import { AuthGuard } from 'src/guards/auth.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enums/role.enums';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiTags('user')
  @Post()
  async create(@Body() data: CreateUserDto) {
    return this.userService.create(data);
  }

  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RoleGuard)
  @ApiTags('user')
  @Get()
  async findAll() {
    return this.userService.findAll();
  }
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RoleGuard)
  @ApiTags('user')
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }
  @ApiTags('user')
  @Patch(':id')
  async update(@Param('id') id: string, @Body() data: UpdateUserDto) {
    return this.userService.update(+id, data);
  }
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RoleGuard)
  @ApiTags('user')
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
