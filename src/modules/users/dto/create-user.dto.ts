import {
  IsDefined,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  @MinLength(2)
  @MaxLength(8)
  readonly userName: string;

  @IsNumber()
  @IsInt()
  @IsNotEmpty()
  @IsDefined()
  readonly role: number | any;
}
