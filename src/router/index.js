import { router as MainRoute } from './main';
import { router as Parsed } from './parse';
import { router as Save } from './save';

export const applyMainRoute = (app) => {
    app.use(MainRoute.routes());
    app.use(Parsed.routes());
    app.use(Save.routes());
};
