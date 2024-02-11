import { User } from 'src/users/entities/user.entity'
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Job {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @ManyToOne(() => User, user => user.jobs)
    user: User

    @Column()
    location: string

    @Column()
    salary: number

    @Column()
    description: string

    @Column()
    company: string

    @Column({ default: '' })
    url: string

    @Column('text', { array: true, default: [] })
    requirements: string[]
}