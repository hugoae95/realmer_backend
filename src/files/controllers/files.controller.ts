import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  NotFoundException,
  Get,
  Param,
  Res,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { of } from 'rxjs';
// import entire SDK
import AWS from 'aws-sdk';
import fs from 'fs';

export const editFileName = (req, file, callback) => {
  const name = file.originalname.split('.')[0];
  const fileExtName = extname(file.originalname);
  const randomName = Array(4)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('');
  callback(null, `${name}-${randomName}${fileExtName}`);
};

@ApiTags('Files')
@Controller('files')
export class FilesController {
  @Post('temp')
  @UseInterceptors(
    FileInterceptor('files', {
      storage: diskStorage({
        destination: './uploads',
        filename: editFileName,
      }),
    }),
  )
  createTemp(@UploadedFile() file) {
    if (!file) {
      throw new NotFoundException('No image');
    }
    return file;
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('files', {
      storage: diskStorage({
        destination: './uploads',
        filename: editFileName,
      }),
    }),
  )
  create(@UploadedFile() file2) {
    const spacesEndpoint = new AWS.Endpoint(process.env.DO_SPACES_ENDPOINT);
    const s3 = new AWS.S3({
      endpoint: spacesEndpoint,
      accessKeyId: process.env.DO_SPACES_KEY,
      secretAccessKey: process.env.DO_SPACES_SECRET,
    });
    if (!file2) {
      throw new NotFoundException('No image');
    }
    fs.readFile(file2.path, (err, data) => {
      if (err) throw err;

      const params = {
        ACL: 'public-read',
        Bucket: process.env.DO_SPACES_NAME,
        Key: process.env.DO_DIR + '/' + file2.filename,
        Body: data,
        ContentType: file2.mimetype,
      };

      s3.putObject(params, (err, data) => {
        if (err) return console.log('Error: ', err);
        console.log('Your file has been uploaded successfully!', data);
      });
    });
    return file2;
  }

  @Get('upload/:file')
  findFile(@Param('file') file, @Res() res) {
    if (!file) {
      throw new NotFoundException('No image');
    }
    try {
      return of(res.sendFile(join(process.cwd(), 'uploads/', file)));
    } catch (e) {
      throw new NotFoundException(e);
    }
  }
}
