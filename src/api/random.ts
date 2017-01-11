import {Application, Request, Response} from 'express';

export function randomEndpoint(app: Application) {
    function get(req: Request, res: Response) {
        app.locals.db
            .query(`
SELECT *
FROM images
ORDER BY RANDOM()
LIMIT 1;    
            `)
            .spread(resultSet => {
                return res.json(resultSet);
            });
    }

    return get;
}
