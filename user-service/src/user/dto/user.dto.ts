import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from "class-validator";

export class UserCreateDto {
    @IsString()
    @IsNotEmpty()
    name: string

    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsEmail()
    @IsNotEmpty()
    workEmail: string

    @IsStrongPassword()
    @IsNotEmpty()
    password: string
}