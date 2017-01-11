import {Application, Request, Response} from 'express';

export function imgEndpoint(app: Application) {
    let images = app.locals.models.images;

    function get(req: Request, res: Response) {
        if (!req.params.id) {
            res.status(500);
            return res.json({
                success: false,
                message: 'You must provide an id: /img/<id>'
            });
        }

        images
            .findById(req.params.id)
            .then(resultSet => {
                return res.json(resultSet);
            });
    }

    return get;
}
