export const getFoundStores = (parsedData) => {
    const result = {};

    parsedData.forEach((store) => {
        if (!result[store.shop]) {
            result[store.shop] = 1;
        } else {
            result[store.shop] += 1;
        }
    });

    return result;
};
