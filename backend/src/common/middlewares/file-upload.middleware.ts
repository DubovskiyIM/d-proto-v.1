import { Injectable, NestMiddleware } from '@nestjs/common';
import multer from 'multer';
import * as path from 'path';

@Injectable()
export class FileUploadMiddleware implements NestMiddleware {
    use(_req, _res, next) {
            const storage = multer.diskStorage({
                destination: (_req, _file, cb) => {
                    cb(null, './uploads/images');
                },
                filename: (_req, file, cb) => {
                    cb(
                        null,
                        `${file.fieldname}-${Date.now()}${path
                            .extname(file.originalname)
                            .toLowerCase()}`
                    );
                }
            });

            function imageFilter(_request, file, cb) {
                if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
                    return cb('Only image files are allowed!', false);
                }
                cb(null, true);
            }

            _req.upload = multer({
                storage: storage,
                fileFilter: imageFilter
            }).any();

            next();
        };

}
