import Router from 'koa-router';
import { AppStorage } from '../storage/storageClass';

const router = new Router();

router.get('/reset', async (ctx, next) => {
    try {
        AppStorage.reset();
        return next();
    } catch (e) {
        console.error('Error in reset method', e);
    }
});

export { router };
