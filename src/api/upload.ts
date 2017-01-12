import {Application, Request, Response, NextFunction} from 'express';
import * as Promise from 'bluebird';
import * as gm from 'gm';
import * as fs from 'fs';

let rn = Promise.promisify(fs.rename);

export function uploadEndpoint(app) {
    const images = app.locals.models.images;

    function post(req: Request, res: Response, next: NextFunction) {
        if (!req.file) {
            res.status(500);
            return res.json({
                success: false,
                message: 'No file sent'
            });
        }

        const newName = req.file.filename + '.' + req.file.originalname.split('.').pop().toLowerCase();

        rn(`static/images/${req.file.filename}`, `static/images/${newName}`)
            .then(() => {
                return images
                    .create({
                        fileName: newName,
                        description: req.body.description
                    })
            })
            .then(resultSet => {
                gm(`static/images/${newName}`)
                    .resize(150, null)
                    .write(`static/images/thumbs/${newName}`, (err) => {
                        if (err) {
                            return resizeErrorHandler(res, err);
                        } else {
                            return res.json(resultSet);
                        }
                    });
            });
    }

    return post;
}

function resizeErrorHandler(res, err) {
    return res.send({
        success: false,
        message: 'There was an error resizing the image: ' + err
    });
}
