import {
  IsDefined,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
} from 'class-validator';

// 列表接口常用参数
export class ListCommonDto {
  @Min(1)
  @IsInt()
  @IsNumber()
  @IsNotEmpty()
  @IsDefined()
  readonly page: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  readonly pageSize: number;

  @IsString()
  // @IsOptional()
  @IsDefined()
  readonly queryStr: string;

  @IsString()
  readonly column: string;

  @IsString()
  @IsIn(['ASC', 'DESC', ''])
  @IsDefined()
  readonly order: 'ASC' | 'DESC' | '';
}
