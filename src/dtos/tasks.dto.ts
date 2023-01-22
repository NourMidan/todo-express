import { Status } from '@prisma/client';
import { IsNotEmpty, IsString, MinLength, MaxLength, IsEnum } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  description: string;
}

export class UpdateTaskDto {
  @IsEnum(Status)
  status: Status;
}
