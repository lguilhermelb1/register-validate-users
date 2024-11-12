import { IsEmail, IsString, Length } from "class-validator";

export class CreateUserDto {
    @IsString({ message: 'Name must be a string' })
    @Length(3, 100, { message: 'Name must be longer than or equal to 3 and shorter than or equal to 100 characters' })
    readonly name: string;

    @IsEmail({}, { message: 'Invalid email' })
    readonly email: string;

    @IsString({ message: 'Password must be a string' })
    @Length(6, 100, { message: 'Password must be longer than or equal to 6 and shorter than or equal to 100 characters' })
    readonly password: string;

    readonly createdAt?: string;

    readonly updatedAt?: string;
}
