import * as express from 'express';
import {Request, Response} from 'express';
import * as helmet from 'helmet';
import * as bodyParser from 'body-parser';
import * as Sequelize from 'sequelize';
import {db} from './lib/db';
import * as endpoints from './api';
import * as multer from 'multer';

const app = express();
const upload = multer({dest: 'static/images/'});

app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(bodyParser.urlencoded({extended: true}));

app.locals.db = db;

app.locals.models = {
    images: db.define('images', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        fileName: Sequelize.STRING(100),
        description: Sequelize.TEXT
    }, {
        tableName: 'images',
        timestamps: false
    })
};

app
    .get('/all', endpoints.allEndpoint(app));

app
    .get('/img/:id', endpoints.imgEndpoint(app));

app
    .get('/random', endpoints.randomEndpoint(app));

app
    .post('/upload', upload.single('file'), endpoints.uploadEndpoint(app));

app
    .use('/app', express.static('static/fe-app'));

app
    .use('/images', express.static('static/images'));

app
    .use('/', (req: Request, res: Response) => {
        res.redirect(301, '/app');
    });

app.listen(3000);

export default app;
