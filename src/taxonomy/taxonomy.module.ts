import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocumentsService } from './../documents/services/documents.service';
import { ContentType } from './../nodes/entities/content-type.entity';
import { Node } from './../nodes/entities/node.entity';
import { NodesService } from './../nodes/services/nodes.services';
import { User } from './../users/entities/user.entity';
import { Document } from './../documents/entities/documents.entity';

import { TaxonomyController } from './controllers/taxonomy.controller';
import { TermController } from './controllers/term.controller';
import { TermFieldController } from './controllers/terms_fields.controller';
import { TermFieldValueController } from './controllers/terms_fields_value.controller';
import { Taxonomy } from './entities/taxonomy.entity';
import { Term } from './entities/term.entity';
import { TermFields } from './entities/terms_fields.entity';
import { TermFieldsValue } from './entities/terms_fields_value.entity';
import { TaxonomyService } from './services/taxonomy.service';
import { TermService } from './services/term.service';
import { TermFieldsService } from './services/term_fields.service';
import { TermFieldsValueService } from './services/term_fields_value.service';
import { CommentsService } from './../comments/services/comments.service';
import { Comment } from './../comments/entities/comments.entity';
import { NodeFieldsService } from './../nodes/services/node_fields.service';
import { NodeFields } from './../nodes/entities/nodes_fields.entity';
import { NodeFieldsValue } from './../nodes/entities/nodes_fields_value.entity';
import { NodeFieldsValueService } from './../nodes/services/node_fields_value.service';
import { Question } from './../questions/entities/question.entity';
import { QuestionsService } from './../questions/services/questions.service';
import { Option } from './../questions/entities/options.entity';
import { OptionsService } from './../questions/services/options.service';
import { FieldBrandService } from 'src/nodes/services/field-brand.services';
import { FieldBrand } from 'src/nodes/entities/field-brand.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Taxonomy,
      User,
      Term,
      TermFields,
      Node,
      FieldBrand,
      Document,
      ContentType,
      TermFieldsValue,
      Comment,
      NodeFields,
      NodeFieldsValue,
      Question,
      Option,
    ]),
  ],
  controllers: [
    TaxonomyController,
    TermController,
    TermFieldController,
    TermFieldValueController,
  ],
  providers: [
    NodesService,
    TaxonomyService,
    TermService,
    TermFieldsService,
    TermFieldsValueService,
    DocumentsService,
    CommentsService,
    NodeFieldsService,
    NodeFieldsValueService,
    QuestionsService,
    OptionsService,
    FieldBrandService,
  ],
})
export class TaxonomyModule {}
