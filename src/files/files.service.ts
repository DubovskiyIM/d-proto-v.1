import { Injectable } from '@nestjs/common';
import { MFile } from './classes/mfile.class';
import { FileElementResponse } from './dto/file-element.response';
import { format } from 'date-fns';
import { path } from 'app-root-path';
import { ensureDir, writeFile } from 'fs-extra';
import * as sharp from 'sharp';

@Injectable()
export class FilesService {
  async saveFiles(files: MFile[]): Promise<FileElementResponse[]> {
    const dateFolder = format(new Date(), 'yyyy-MM-dd');
    const uploadFolder = `${path}/uploads/${dateFolder}`;
    await ensureDir(uploadFolder);
    const response: FileElementResponse[] = [];
    for (const file of files) {
      await writeFile(`${uploadFolder}/${file.originalname}`, file.buffer);
      response.push({
        url: `${dateFolder}/${file.originalname}`,
        name: file.originalname,
      });
    }
    return response;
  }

  public convertToWebP(file: Buffer): Promise<Buffer> {
    return sharp(file).webp().toBuffer();
  }
}
