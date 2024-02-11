import { Transform } from 'class-transformer'
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'

export class SearchJobDto {
    @Transform(({ value }) => value.trim().toLowerCase())
    @IsString()
    @IsOptional()
    title: string

    @Transform(({ value }) => value.trim().toLowerCase())
    @IsString()
    @IsOptional()
    location: string

    @Transform(({ value }) => value.trim().toLowerCase())
    @IsString()
    @IsOptional()
    company: string

    @IsNumber()
    @IsOptional()
    salary: number
}
