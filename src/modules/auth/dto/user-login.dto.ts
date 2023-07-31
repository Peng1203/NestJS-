import { IsString, MaxLength, MinLength } from "class-validator"

export class UserLoginDto {
  @IsString()
  @MinLength(2)
  @MaxLength(8)
  userName: string

  @IsString()
  @MinLength(6)
  password: string

  @IsString()
  @MinLength(4)
  @MaxLength(4)
  code: string
}
