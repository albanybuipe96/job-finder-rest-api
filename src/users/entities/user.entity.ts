import { Job } from 'src/jobs/entities/job.entity'
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm'

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    username: string

    @Column()
    password: string

    @Column()
    email: string

    @OneToMany(() => Job, (job) => job.user)
    jobs: Job[]

    @Column({ default: 'https://d326fntlu7tb1e.cloudfront.net/uploads/4821d814-ac87-4b22-aa80-ac7336916c9a-403017_avatar_default_head_person_unknown_icon.png' })
    profile: string

    @Column({ default: '' })
    location: string

    @Column({ default: '' })
    phone: string

    @Column({ default: false })
    admin: boolean

    @Column({ default: false })
    agent: boolean

    @Column('text', { array: true, default: [] })
    skills: string[]

}