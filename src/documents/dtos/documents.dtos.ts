import { IsString, IsNotEmpty, IsPositive, IsEnum } from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';
import { DocumentE } from './../models/documents.model';

export class CreateDocumentDto {
  @IsString()
  @ApiProperty({ description: 'the title of node' })
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly source: string;

  @IsEnum(DocumentE)
  @IsNotEmpty()
  @ApiProperty()
  readonly type: DocumentE;

  @IsPositive()
  @ApiProperty()
  readonly userId: number;
}

export class UpdateDocumentDto extends PartialType(CreateDocumentDto) {}
