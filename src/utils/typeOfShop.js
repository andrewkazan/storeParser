export const typeOfShop = (link) => {
    if (link.includes('ozon')) {
        return 'Ozon';
    } else if (link.includes('wildberries')) {
        return 'Wildberries';
    } else {
        return 'Undefined';
    }
};
