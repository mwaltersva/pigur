import {Application, Request, Response, NextFunction} from 'express';
import * as Promise from 'bluebird';
import * as fs from 'fs';
import * as jimp from 'jimp';

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
        let resultSetCache = null;

        rn(`static/images/${req.file.filename}`, `static/images/${newName}`)
            .then(() => {
                return images
                    .create({
                        fileName: newName,
                        description: req.body.description
                    })
            })
            .then(resultSet => {
                resultSetCache = resultSet;
            })
            .then(() => {
                return jimp
                    .read(`static/images/${newName}`)
            })
            .then(img => {
                img
                    .resize(150, jimp.AUTO)
                    .quality(60)
                    .write(`static/images/thumbs/${newName}`);
            })
            .then(() => {
                return res.json(resultSetCache);
            });
    }

    return post;
}
