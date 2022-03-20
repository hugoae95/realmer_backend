import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionsController } from './controllers/questions.controller';
import { Question } from './entities/question.entity';
import { Option } from './entities/options.entity';
import { QuestionsService } from './services/questions.service';
import { OptionsService } from './services/options.service';
import { Node } from 'src/nodes/entities/node.entity';
import { OptionsController } from './controllers/options.controller';
import { Trivia } from './entities/trivia.entity';
import { TriviaController } from './controllers/trivia.controller';
import { TriviaService } from './services/trivia.service';
import { User } from './../users/entities/user.entity';
import { Answers } from './entities/answer.entity';
import { AnswersController } from './controllers/answers.controller';
import { AnswersService } from './services/answers.service';
import { NodesService } from './../nodes/services/nodes.services';
import { Term } from './../taxonomy/entities/term.entity';
import { Document } from './../documents/entities/documents.entity';
import { ContentType } from './../nodes/entities/content-type.entity';
import { DocumentsService } from './../documents/services/documents.service';
import { CommentsService } from './../comments/services/comments.service';
import { NodeFieldsService } from './../nodes/services/node_fields.service';
import { NodeFieldsValue } from './../nodes/entities/nodes_fields_value.entity';
import { NodeFieldsValueService } from './../nodes/services/node_fields_value.service';
import { NodeFields } from './../nodes/entities/nodes_fields.entity';
import { Comment } from './../comments/entities/comments.entity';
import { FieldBrandService } from './../nodes/services/field-brand.services';
import { FieldBrand } from './../nodes/entities/field-brand.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Question,
      Option,
      Node,
      Trivia,
      User,
      Answers,
      Term,
      Document,
      Comment,
      ContentType,
      NodeFieldsValue,
      NodeFields,
      FieldBrand,
    ]),
  ],
  controllers: [
    QuestionsController,
    OptionsController,
    TriviaController,
    AnswersController,
  ],
  providers: [
    QuestionsService,
    OptionsService,
    TriviaService,
    AnswersService,
    NodesService,
    DocumentsService,
    CommentsService,
    NodeFieldsService,
    NodeFieldsValueService,
    FieldBrandService,
  ],
})
export class QuestionsModule {}
