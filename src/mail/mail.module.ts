import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import config from '../config';

import { MailService } from './services/mail.service';
import { ConfigType } from '@nestjs/config';

@Module({
  imports: [
    MailerModule.forRootAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => ({
        transport: {
          host: configService.stmp.host,
          secure: false,
          port: configService.stmp.port,
          auth: {
            user: configService.stmp.user,
            pass: configService.stmp.pass,
          },
        },
        defaults: {
          from: '"No Reply" <' + configService.stmp.mail + '>',
        },
        template: {
          dir: __dirname + '/templates',
          adapter: new HandlebarsAdapter(), // or new PugAdapter() or new EjsAdapter()
          options: {
            strict: false,
          },
        },
      }),
    }),
  ],
  providers: [MailService],
})
export class MailModule {}
