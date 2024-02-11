import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from '../entities/user.entity'
import { CreateUserDto } from '../dtos/create-user.dto'
import { UpdateUser } from '../dtos/update-user.dto'

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private readonly repo: Repository<User>) { }

    create(email: string, password: string, username: string) {
        const user = this.repo.create({ email, password, username })

        return this.repo.save(user)
    }

    find(email: string) {
        return this.repo.find({ where: { email } })
    }

    async findOne(userId: number) {
        const [user] = await this.repo.find({ where: { id: userId } })
        if (!user) {
            return null
        }
        return user
    }

    async updateUser(id: number, { location, phone, admin, agent, skills }: UpdateUser) {
        const user = await this.repo.findOne({ where: { id } })
        if (!user) {
            throw new NotFoundException('No user found with given id')
        }

        user.admin = admin
        user.agent = agent
        user.location = location
        user.skills = skills
        user.phone = phone

        // this.repo.update(+id, {})
        return this.repo.save(user)
    }

    async clear() {
        return this.repo.clear()
    }

}
