import {Application, Request, Response} from 'express';

export function allEndpoint(app: Application) {
    let images = app.locals.models.images;

    function get(req: Request, res: Response) {
        images
            .findAll({
                limit: req.query.limit || undefined,
                offset: req.query.offset || undefined,
                order: [
                    ['id', 'DESC']
                ]
            })
            .then(resultSet => {
                images
                    .count()
                    .then(total => {
                        return res.json({
                            images: resultSet,
                            totalRecords: total
                        });
                    });
            });
    }

    return get;
}
