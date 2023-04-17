import { logger } from './logger';
import { error } from './error';

export const applyMiddlewares = (app) => {
    app.use(logger);
    app.use(error);
};
