import { parseOzonPageContent } from './parseOzonPageContent';

export const selectShop = (shopInfo) => {
    switch (shopInfo.shop.toLowerCase()) {
        case 'ozon':
            return parseOzonPageContent;
        default:
            return null;
    }
};
