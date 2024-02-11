import { Transform } from 'class-transformer'
import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator'

export class CreateJobDto {
    @Transform(({ value }) => value.trim().toLowerCase())
    @IsString()
    title: string

    @Transform(({ value }) => value.trim().toLowerCase())
    @IsString()
    location: string

    @IsString()
    @IsOptional()
    description: string

    @IsNumber()
    salary: number

    @Transform(({ value }) => value.trim().toLowerCase())
    @IsString()
    company: string

    @IsString()
    @IsOptional()
    url: string

    @IsArray()
    @IsOptional()
    requirements: string

}