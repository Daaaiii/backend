import { Controller, Get, Post, Body, Patch, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ParamId } from 'src/decorators/param-id.decorator';
import { ApiTags } from '@nestjs/swagger';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiTags()
  @Post()
  create(@Body() data: CreateUserDto) {
    return this.userService.create(data);
  }

  @ApiTags()
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @ApiTags()
  @Get(':id')
  findOne(@ParamId() id: string) {
    return this.userService.findOne(+id);
  }
  @ApiTags()
  @Patch(':id')
  update(@ParamId() id: string, @Body() data: UpdateUserDto) {
    return this.userService.update(+id, data);
  }
  @ApiTags()
  @Delete(':id')
  remove(@ParamId() id: string) {
    return this.userService.remove(+id);
  }
}
