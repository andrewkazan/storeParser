import Router from 'koa-router';
import { csvParser } from '../utils/csvParser';
import { getFoundStores } from '../utils/foundStores';
import { deleteFile } from '../utils/deleteFile';
import { AppStorage } from '../storage/storageClass';

const router = new Router();

router.get('/', (ctx) => {
    return ctx.render('main');
});

router.post('/', async (ctx) => {
    try {
        const { file } = ctx.request.files;
        const useHTML = Boolean(ctx.request.body.useHTML);
        const resultOfParse = await csvParser(file);
        const foundStores = getFoundStores(resultOfParse);

        AppStorage.setData('dataLinks', file.originalFilename, resultOfParse);
        AppStorage.setHTMLMode(useHTML);

        deleteFile(file.filepath);

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
