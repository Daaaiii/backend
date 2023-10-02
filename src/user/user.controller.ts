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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RoleGuard } from 'src/guards/role.guard';
import { AuthGuard } from 'src/guards/auth.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enums/role.enums';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Cria o usuário' })
  @ApiResponse({ status: 409, description: 'Conflitct.' })
  async create(@Body() data: CreateUserDto) {
    return this.userService.create(data);
  }

  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RoleGuard)
  @Get()
  @ApiOperation({ summary: 'Lista todos os usuários' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  async findAll() {
    return this.userService.findAll();
  }
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RoleGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Lista usuário por id' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Not Found.' })
  async findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }
  @Roles(Role.User, Role.Admin)
  @Patch(':id')
  @ApiOperation({ summary: 'Atualiza usuário' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Not Found.' })
  @ApiResponse({ status: 409, description: 'Conflict.' })
  async update(@Param('id') id: string, @Body() data: UpdateUserDto) {
    return this.userService.update(+id, data);
  }
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RoleGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Exclui usuário' })
  @ApiResponse({ status: 403, description: 'Forbbiden Resource.' })
  @ApiResponse({ status: 404, description: 'Not Found.' })
  async remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
