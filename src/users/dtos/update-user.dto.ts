import { IsArray, IsBoolean, IsOptional, IsString } from 'class-validator'

export class UpdateUser {

    @IsString()
    @IsOptional()
    username: string

    @IsString()
    @IsOptional()
    email: string

    @IsString()
    @IsOptional()
    profile: string

    @IsString()
    @IsOptional()
    location: string

    @IsString()
    @IsOptional()
    phone: string

    @IsBoolean()
    @IsOptional()
    admin: boolean

    @IsBoolean()
    @IsOptional()
    agent: boolean

    @IsArray()
    @IsOptional()
    skills: string[]

}