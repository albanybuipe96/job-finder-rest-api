import { MiddlewareConsumer, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './entities/user.entity'
import { UsersService } from './services/users.service'
import { UsersController } from './users.controller'
import { AuthService } from './services/auth.service'
import { CurrentUserMiddleware } from './middlewares/current-user.middle'

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
    ],
    providers: [UsersService, AuthService],
    controllers: [UsersController],
})
export class UsersModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(CurrentUserMiddleware)
            .forRoutes('*')
    }
}
