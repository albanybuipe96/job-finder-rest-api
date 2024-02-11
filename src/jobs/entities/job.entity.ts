import { Column, Entity } from 'typeorm'

@Entity()
export class Job {

    @Column()
    title: string

    @Column()
    location: string

    @Column()
    description: string

    @Column()
    company: string

    @Column({ default: '' })
    url: string

    @Column('text', { array: true, default: [] })
    requirements: string[]
}