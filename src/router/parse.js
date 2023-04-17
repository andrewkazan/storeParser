import Router from 'koa-router';
import { AppStorage } from '../storage/storageClass';
import { getPageContent } from '../utils/getPageContent';

const router = new Router();

router.post('/parsed', async (ctx) => {
    try {
        const { filename = '' } = ctx.request.body;
        const linksFromFile = AppStorage.get('dataLinks', filename);

        const pagesInfo = await getPageContent(linksFromFile);
        AppStorage.set('dataPrices', filename, pagesInfo);

        return ctx.render('parsedLinks', {
            file: filename,
            prices: pagesInfo
        });
    } catch (e) {
        console.error('Error in post method start parse file', e);
    }
});

export { router };
