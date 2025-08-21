import { IsNumber, IsOptional, IsArray } from 'class-validator';

export class CreateOrderDto {
  @IsNumber() userId: number;
  @IsOptional() @IsArray() items?: any[];
}
