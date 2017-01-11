import * as Sequelize from 'sequelize';
import {config} from '../../config';

export const db = new Sequelize('main', undefined, undefined, config.dbConfig);
