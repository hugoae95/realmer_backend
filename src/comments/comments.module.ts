import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './../users/entities/user.entity';
import { CommentsController } from './controllers/comments.controller';
import { Comment } from './entities/comments.entity';
import { Node } from './../nodes/entities/node.entity';
import { CommentsService } from './services/comments.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Comment, Node])],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}
