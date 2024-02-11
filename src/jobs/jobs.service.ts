import { Injectable, NotFoundException } from '@nestjs/common'
import { Repository } from 'typeorm'
import { Job } from './entities/job.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { CreateJobDto } from './dtos/create-job.dto'
import { UpdateJobDto } from './dtos/update-job.dto'
import { User } from 'src/users/entities/user.entity'
import { SearchJobDto } from './dtos/search-job.dto'

@Injectable()
export class JobsService {
    constructor(
        @InjectRepository(Job) protected readonly repo: Repository<Job>,
    ) { }

    async create({
        title,
        location,
        salary,
        description,
        company,
        url,
    }: CreateJobDto, user: User) {
        const job = this.repo.create({
            title,
            location,
            salary,
            description,
            company,
            url,
        })
        job.user = user
        return this.repo.save(job)
    }

    async findOne(id: number) {
        const job = await this.repo.findOne({ where: { id }, relations: ['user'] })
        if (!job) {
            throw new NotFoundException('No job found with given id')
        }

        return job
    }

    async update(
        id: number,
        {
            title,
            location,
            salary,
            description,
            company,
            url,
            requirements,
        }: UpdateJobDto,
    ) {
        const job = await this.findOne(id)

        job.title = title
        job.location = location
        job.salary = salary
        job.description = description
        job.company = company
        job.url = url
        job.requirements = requirements

        return this.repo.save(job)
    }

    async delete(id: number) {
        return this.repo.delete(id)
    }

    async find(title: string) {
        const jobs = await this.repo.find({ where: { title }, relations: ['user'] })
        return jobs
    }

    async search({ title, location, company, salary }: SearchJobDto) {
        // const jobs = await this.repo.find({
        //     where: [
        //         { title },
        //         { location },
        //         { company },
        //         { salary },
        //     ],
        //     relations: ['user'],
        // })

        const jobsQueried = await this.repo.createQueryBuilder('job')
            .where('job.title = :title', { title })
            .orWhere('job.location = :location', { location })
            .orWhere('job.company = :company', { company })
            .orWhere('job.salary = :salary', { salary })
            .getMany()


        return jobsQueried
    }
}
