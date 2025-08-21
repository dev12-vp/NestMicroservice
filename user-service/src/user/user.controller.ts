import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserCreateDto } from './dto/user.dto';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }

    @MessagePattern('create_user')
    async handleCreateUser(@Payload() payload: UserCreateDto) {
        return this.userService.create(payload)
    }

    @MessagePattern('get_users')
    async handleGetUser() {
        return this.userService.findAll()
    }
}
