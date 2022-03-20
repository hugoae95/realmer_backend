import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { DocumentsController } from './controllers/documents.controller';
import { Document } from './entities/documents.entity';
import { Node } from 'src/nodes/entities/node.entity';
import { DocumentsService } from './services/documents.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Document, Node])],
  controllers: [DocumentsController],
  providers: [DocumentsService],
})
export class DocumentsModule {}
