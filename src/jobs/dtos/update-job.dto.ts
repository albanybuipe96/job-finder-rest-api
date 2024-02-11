import { Transform } from 'class-transformer'
import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator'

export class UpdateJobDto {
    @Transform(({ value }) => value.trim().toLowerCase())
    @IsString()
    @IsOptional()
    title: string

    @Transform(({ value }) => value.trim().toLowerCase())
    @IsString()
    @IsOptional()
    location: string

    @IsString()
    @IsOptional()
    description: string

    @IsNumber()
    @IsOptional()
    salary: number

    @Transform(({ value }) => value.trim().toLowerCase())
    @IsString()
    @IsOptional()
    company: string

    @IsString()
    @IsOptional()
    url: string

    @IsArray()
    @IsOptional()
    requirements: string[]

}