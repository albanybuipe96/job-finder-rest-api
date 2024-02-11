import { BadRequestException, Injectable } from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUserDto } from '../dtos/create-user.dto'
import { scrypt as _scrypt, randomBytes } from 'crypto'
import { promisify } from 'util'
import { SignInDto } from '../dtos/sign-in.dto'

const scrypt = promisify(_scrypt)

@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService) { }

    async signup({ email, password, username }: CreateUserDto) {

        const users = await this.usersService.find(email)
        if (users.length) {
            throw new BadRequestException('Email already in use')
        }

        const salt = randomBytes(8).toString('hex')
        const hash = (await scrypt(password, salt, 32)) as Buffer
        const encrypted = salt + '.' + hash.toString('hex')

        const user = await this.usersService.create(email, encrypted, username)
        return user
    }

    async signin({ email, password }: SignInDto) {
        const [user] = await this.usersService.find(email)
        if (!user) {
            throw new BadRequestException('Invalid credentials')
        }

        const [salt, storedHash] = user.password.split('.')
        const hash = (await scrypt(password, salt, 32)) as Buffer

        if (storedHash !== hash.toString('hex')) {
            throw new BadRequestException('Invalid credentials')
        }

        return user
    }
}