import { parseOzonHTML } from './parse/HTMLMode/parseOzonHTML';
import { parseOzonNonHTML } from './parse/NonHTMLMode/parseOzonNonHTML';

export const selectShop = (shopInfo, useHTMLMode) => {
    switch (shopInfo.shop.toLowerCase()) {
        case 'ozon':
            return useHTMLMode ? parseOzonHTML : parseOzonNonHTML;
        default:
            return null;
    }
};
