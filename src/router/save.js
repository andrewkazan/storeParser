import Router from 'koa-router';
import { Parser } from '@json2csv/plainjs';
import { AppStorage } from '../storage/storageClass';

const router = new Router();

router.post('/save', async (ctx) => {
    try {
        const { fileName = '' } = JSON.parse(ctx.request.body);
        const dataLinks = AppStorage.get('dataPrices', fileName);

        const parser = new Parser();
        const csv = parser.parse(dataLinks);

        ctx.response.set('Content-Type', 'text/csv');
        ctx.response.set('Content-Disposition', 'attachment; filename="prices.csv"');
        ctx.body = csv;
    } catch (e) {
        console.error('Error in post method get price cvs', e);
    }
});

export { router };
