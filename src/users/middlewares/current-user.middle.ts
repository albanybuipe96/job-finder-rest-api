import { Injectable, NestMiddleware } from '@nestjs/common'
import { NextFunction, Request, Response } from 'express'
import { UsersService } from '../services/users.service'

declare global {
    namespace Express {
        interface Request {
            currentUser?: any
        }
    }
}

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
    constructor(private readonly userService: UsersService) { }
    async use(req: Request, res: Response, next: NextFunction) {
        const { userId } = req.session || {}

        if (userId) {
            const user = await this.userService.findOne(userId)
            req.currentUser = user
        }

        next()
    }
}