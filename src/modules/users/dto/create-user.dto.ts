import {
  IsDefined,
  IsIn,
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
  @MaxLength(12)
  readonly userName: string;

  @IsNumber()
  @IsInt()
  @IsNotEmpty()
  @IsDefined()
  readonly role: number | any;

  @IsString()
  @MinLength(8)
  @IsNotEmpty()
  @IsDefined()
  readonly password: string;

  @IsNumber()
  @IsInt()
  @IsIn([0, 1])
  readonly userStatus: number;
}
