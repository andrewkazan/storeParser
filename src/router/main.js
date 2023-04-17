import Router from 'koa-router';
import { csvParser } from '../utils/csvParser';
import { getFoundStores } from '../utils/foundStores';
import { AppStorage } from '../storage/storageClass';

const router = new Router();

router.get('/', (ctx) => {
    return ctx.render('main');
});

router.post('/', async (ctx) => {
    try {
        const { file } = ctx.request.files;
        const resultOfParse = await csvParser(file);
        const foundStores = getFoundStores(resultOfParse);

        AppStorage.set('dataLinks', file.originalFilename, resultOfParse);

        return ctx.render('links', {
            foundStores,
            file: file.originalFilename,
            links: resultOfParse
        });
    } catch (e) {
        console.error('Error in post method get csv file', e);

        return ctx.render('error', {
            message: 'Error from csv parse',
            error: e
        });
    }
});

export { router };
