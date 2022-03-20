import { Module, HttpModule, HttpService } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { DatabaseModule } from './database/database.module';
import { enviroments } from './enviroments';
import { AuthModule } from './auth/auth.module';
import { NodesModule } from './nodes/nodes.module';
import { MailModule } from './mail/mail.module';
import { TaxonomyModule } from './taxonomy/taxonomy.module';
import { FilesModule } from './files/files.module';
import { DocumentsModule } from './documents/documents.module';
import { CommentsModule } from './comments/comments.module';
import { QuestionsModule } from './questions/questions.module';
import { TrackingModule } from './tracking/tracking.module';
import config from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: enviroments[process.env.NODE_ENV] || '.env',
      load: [config],
      isGlobal: true,
      validationSchema: Joi.object({
        API_KEY: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
      }),
    }),
    HttpModule,
    UsersModule,
    ProductsModule,
    DatabaseModule,
    AuthModule,
    NodesModule,
    MailModule,
    TaxonomyModule,
    FilesModule,
    DocumentsModule,
    CommentsModule,
    QuestionsModule,
    TrackingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
