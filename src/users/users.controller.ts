import { Body, Controller, Get, Param, Patch, Post, Query, Session, UseGuards } from '@nestjs/common'
import { UsersService } from './services/users.service'
import { CreateUserDto } from './dtos/create-user.dto'
import { Serialize } from 'src/interceptors/serialize.interceptor'
import { UserDto } from './dtos/user.dto'
import { AuthService } from './services/auth.service'
import { SignInDto } from './dtos/sign-in.dto'
import { CurrentUser } from './decorators/current-user.decorator'
import { User } from './entities/user.entity'
import { GuardRoute } from 'src/guards/auth.guard'
import { AdminGuard, CheckAdministrativeAccess } from 'src/guards/admin.guard'
import { UpdateUser as UpdateUserDto } from './dtos/update-user.dto'

@Controller('users')
@Serialize(UserDto)
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
        private readonly authService: AuthService,
    ) { }

    @Post('auth/signup')
    async signup(@Body() createUserDto: CreateUserDto, @Session() session: any) {
        const user = await this.authService.signup(createUserDto)
        session.userId = user.id
        return user
    }

    @Post('auth/signin')
    async signin(@Body() signInDto: SignInDto, @Session() session: any) {
        const user = await this.authService.signin(signInDto)
        session.userId = user.id
        return user
    }

    @Post('auth/signout')
    signout(@Session() session: any) {
        session.userId = null
    }

    @Patch('/:id/update')
    update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
        return this.usersService.updateUser(id, updateUserDto)
    }

    @Get()
    // @GuardRoute()
    @UseGuards(AdminGuard)
    users() {
        return this.usersService.find(null)
    }

    @Get('profile')
    async profile(@CurrentUser() user: User) {
        return user
    }
}
