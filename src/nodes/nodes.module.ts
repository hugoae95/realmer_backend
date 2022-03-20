import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './../users/entities/user.entity';
import { Node } from './entities/node.entity';
import { Document } from './../documents/entities/documents.entity';
import { Comment } from './../comments/entities/comments.entity';
import { NodesController } from './controllers/nodes.controller';
import { NodesService } from './services/nodes.services';
import { ContentTypeController } from './controllers/content-type.controller';
import { ContentType } from './entities/content-type.entity';
import { ContentTypeService } from './services/content-type.services';
import { Term } from './../taxonomy/entities/term.entity';
import { FieldBrandController } from './controllers/field-brands.controller';
import { FieldBrand } from './entities/field-brand.entity';
import { FieldBrandService } from './services/field-brand.services';
import { DocumentsService } from './../documents/services/documents.service';
import { CommentsService } from './../comments/services/comments.service';
import { NodeFieldController } from './controllers/nodes_fields.controller';
import { NodeFieldValueController } from './controllers/nodes_fields_value.controller';
import { NodeFieldsService } from './services/node_fields.service';
import { NodeFieldsValueService } from './services/node_fields_value.service';
import { NodeFields } from './entities/nodes_fields.entity';
import { NodeFieldsValue } from './entities/nodes_fields_value.entity';
import { Question } from './../questions/entities/question.entity';
import { QuestionsService } from './../questions/services/questions.service';
import { Option } from './../questions/entities/options.entity';
import { OptionsService } from './../questions/services/options.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Node,
      ContentType,
      Term,
      FieldBrand,
      Document,
      Comment,
      NodeFields,
      NodeFieldsValue,
      Question,
      Option,
    ]),
  ],
  controllers: [
    NodesController,
    ContentTypeController,
    FieldBrandController,
    NodeFieldController,
    NodeFieldValueController,
  ],
  providers: [
    NodesService,
    ContentTypeService,
    FieldBrandService,
    TypeOrmModule,
    DocumentsService,
    CommentsService,
    NodeFieldsService,
    NodeFieldsValueService,
    QuestionsService,
    OptionsService,
    FieldBrandService,
  ],
})
export class NodesModule {}
