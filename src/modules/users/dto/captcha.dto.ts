import { IsString, MaxLength, MinLength } from "class-validator";

export class ValidateCaptchaDto {
  @IsString()
  @MinLength(4)
  @MaxLength(4)
  code: string
}