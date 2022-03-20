import { IsString, IsNotEmpty, IsPositive, IsEnum } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Fields } from 'src/models/fields.model';

export class CreateNodesFieldsDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly title: string;

  @IsEnum(Fields)
  @IsString()
  @ApiProperty()
  readonly type: Fields;

  @IsPositive()
  @ApiProperty()
  readonly contentTypeId: number;
}

export class UpdateNodesFieldsDto extends PartialType(CreateNodesFieldsDto) {}
