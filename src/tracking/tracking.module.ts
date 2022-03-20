import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Node } from './../nodes/entities/node.entity';
import { DocumentsService } from './../documents/services/documents.service';
import { Term } from './../taxonomy/entities/term.entity';
import { User } from './../users/entities/user.entity';
import { TrackingController } from './controllers/tracking.controller';
import { Tracking } from './entities/tracking.entity';
import { TrackingService } from './services/tracking.service';
import { Document } from './../documents/entities/documents.entity';
import { NodesService } from './../nodes/services/nodes.services';
import { Question } from './../questions/entities/question.entity';
import { ContentType } from './../nodes/entities/content-type.entity';
import { CommentsService } from './../comments/services/comments.service';
import { NodeFields } from './../nodes/entities/nodes_fields.entity';
import { NodeFieldsService } from './../nodes/services/node_fields.service';
import { NodeFieldsValue } from './../nodes/entities/nodes_fields_value.entity';
import { QuestionsService } from './../questions/services/questions.service';
import { FieldBrand } from './../nodes/entities/field-brand.entity';
import { FieldBrandService } from './../nodes/services/field-brand.services';
import { Comment } from './../comments/entities/comments.entity';
import { NodeFieldsValueService } from './../nodes/services/node_fields_value.service';
import { Option } from './../questions/entities/options.entity';
import { OptionsService } from './../questions/services/options.service';
import { TriviaService } from './../questions/services/trivia.service';
import { Trivia } from './../questions/entities/trivia.entity';
import { AnswersService } from './../questions/services/answers.service';
import { Answers } from './../questions/entities/answer.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Term,
      User,
      Tracking,
      Node,
      Document,
      Question,
      ContentType,
      NodeFields,
      NodeFieldsValue,
      FieldBrand,
      Comment,
      Trivia,
      Answers,
      Option,
    ]),
  ],
  controllers: [TrackingController],
  providers: [
    TrackingService,
    DocumentsService,
    NodesService,
    CommentsService,
    NodeFieldsService,
    NodeFieldsValueService,
    QuestionsService,
    FieldBrandService,
    TriviaService,
    AnswersService,
    OptionsService,
  ],
})
export class TrackingModule {}
