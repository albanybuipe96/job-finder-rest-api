import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Job {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

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