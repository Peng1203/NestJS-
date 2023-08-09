import { IsNotEmpty, IsString } from 'class-validator';

export class SendMsgDto {
  @IsString()
  @IsNotEmpty()
  readonly str: string;
}
