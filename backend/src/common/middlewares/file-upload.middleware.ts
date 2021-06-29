import { Injectable, NestMiddleware } from '@nestjs/common';
import * as multer from 'multer';
import * as path from 'path';

@Injectable()
export class FileUploadMiddleware implements NestMiddleware {
    use(req, res, next) {
            const storage = multer.diskStorage({
                destination: (req, file, cb) => {
                    cb(null, './uploads/images');
                },
                filename: (req, file, cb) => {
                    cb(
                        null,
                        `${file.fieldname}-${Date.now()}${path
                            .extname(file.originalname)
                            .toLowerCase()}`
                    );
                }
            });

            function imageFilter(request, file, cb) {
                if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
                    return cb('Only image files are allowed!', false);
                }
                cb(null, true);
            }

            req.upload = multer({
                storage: storage,
                fileFilter: imageFilter
            }).any();

            next();
        };

}
