import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Length } from "class-validator";

export class LoginDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    username:string
    @ApiProperty()
    @Length(8,20)
    password:string
}