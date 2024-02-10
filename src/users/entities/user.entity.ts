import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

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

    @Column({ default: 'https://d326fntlu7tb1e.cloudfront.net/uploads/4821d814-ac87-4b22-aa80-ac7336916c9a-403017_avatar_default_head_person_unknown_icon.png' })
    profile: string

    @Column()
    location: string

    @Column()
    phone: string

    @Column({ default: false })
    admin: boolean

    @Column({ default: false })
    agent: boolean

    @Column()
    skills: string[]

}