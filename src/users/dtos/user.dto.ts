import { Expose } from 'class-transformer'

export class UserDto {
    @Expose()
    id: number

    @Expose()
    username: string

    @Expose()
    password: string

    @Expose()
    email: string

    @Expose()
    profile: string

    @Expose()
    location: string

    @Expose()
    phone: string

    @Expose()
    admin: boolean

    agent: boolean

    @Expose()
    skills: string[]
}