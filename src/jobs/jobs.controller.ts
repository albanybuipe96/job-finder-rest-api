import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common'
import { JobsService } from './jobs.service'
import { CreateJobDto } from './dtos/create-job.dto'
import { CheckAdministrativeAccess } from 'src/guards/admin.guard'
import { GuardRoute } from 'src/guards/auth.guard'
import { UpdateJobDto } from './dtos/update-job.dto'
import { Serialize } from 'src/interceptors/serialize.interceptor'
import { JobDto } from './dtos/job.dto'
import { CurrentUser } from 'src/users/decorators/current-user.decorator'
import { User } from 'src/users/entities/user.entity'
import { SearchJobDto } from './dtos/search-job.dto'

@Controller('jobs')
@Serialize(JobDto)
export class JobsController {
    constructor(protected readonly jobsService: JobsService) { }

    @Post('create')
    @CheckAdministrativeAccess()
    addJob(@Body() createJobDto: CreateJobDto, @CurrentUser() user: User) {
        return this.jobsService.create(createJobDto, user)
    }

    @Get('/:id/detail')
    @GuardRoute()
    getJobById(@Param('id') id: number) {
        return this.jobsService.findOne(id)
    }

    @Patch('/:id/update')
    @CheckAdministrativeAccess()
    updateJob(@Param('id') id: number, @Body() updateJobDto: UpdateJobDto) {
        return this.jobsService.update(id, updateJobDto)
    }

    @Delete('/:id/delete')
    @CheckAdministrativeAccess()
    deleteJob(@Param('id') id: number) {
        return this.jobsService.delete(id)
    }

    @Get()
    getJobs() {
        return this.jobsService.find(null)
    }

    @Get('search')
    search(@Query() searchQuery: SearchJobDto) {
        return this.jobsService.search(searchQuery)
    }
}
