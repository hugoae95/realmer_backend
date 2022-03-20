import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(user: string) {
    await this.mailerService.sendMail({
      to: user,
      subject: 'Bienvenido',
      template: './confirmation',
      context: {
        name: 'hugo',
        url: '',
      },
    });
  }

  async sendUserCode(code: string, to: string) {
    await this.mailerService.sendMail({
      to,
      subject: 'Código de recuperación de contraseña',
      template: './code',
      context: { code },
    });
  }
}
