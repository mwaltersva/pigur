import {Application, Request, Response} from 'express';

export function allEndpoint(app: Application) {
    let images = app.locals.models.images;

    function get(req: Request, res: Response) {
        images
            .findAll({
                order: [
                    ['id', 'DESC']
                ]
            })
            .then(resultSet => {
                return res.json(resultSet)
            });
    }

    return get;
}
