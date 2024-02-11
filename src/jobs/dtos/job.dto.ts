import { Expose, Transform } from 'class-transformer'

export class JobDto {
    @Expose()
    id: number

    @Expose()
    title: string

    @Expose()
    location: string

    @Expose()
    salary: string

    @Expose()
    @Transform(({ obj }) => obj.user ? obj.user.id : null)
    userId: number

    @Expose()
    @Transform(({ obj }) => obj.user ? obj.user.email : null)
    email: string

    @Expose()
    company: string

    @Expose()
    url: string

    // @Expose()
    requirements: string[]

    @Expose()
    description: string

    @Expose()
    @Transform(() => new Date().toLocaleString())
    timeAccessed: Date
}