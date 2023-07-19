import {
  ArrayMinSize,
  IsArray,
  IsDefined,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
  IsNumberString,
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

export class IdsDto {
  @IsArray()
  @ArrayMinSize(1, { message: '至少包含一个ID' })
  @IsInt({ each: true, message: '每个ID必须为整数' })
  readonly ids: number[];
}
