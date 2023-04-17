import config from 'config';
import Koa from 'koa';
import cors from '@koa/cors';
import viewsService from 'koa-views';
import staticService from 'koa-static';
import koaBody from 'koa-body';
import { applyMainRoute } from './router';
import { applyMiddlewares } from './middlewares';
import { notFound } from './middlewares/not-found';

const APP_PORT = config.get('app.port') || 3001;
const app = new Koa();

app.use(
    koaBody({
        formidable: {
            uploadDir: './uploads'
        },
        multipart: true
    })
);
app.use(cors());
app.use(staticService(__dirname + '/../public'));
app.use(viewsService(__dirname + '/templates', { extension: 'ejs' }));
applyMiddlewares(app);
applyMainRoute(app);
app.use(notFound);

app.listen(APP_PORT, () => {
    try {
        console.log(`Server started at port: ${APP_PORT}`);
    } catch (e) {
        console.log('Has start error', e);
    }
});
