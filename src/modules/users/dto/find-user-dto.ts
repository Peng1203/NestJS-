import { ListCommonDto } from '@/common/dto';
import { IsInt, IsNotEmpty, IsNumber } from 'class-validator';

export class FindUserDto extends ListCommonDto {
  @IsInt()
  @IsNumber()
  @IsNotEmpty()
  readonly roleId: number;
}
