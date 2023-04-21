export const deepSearchValues = (obj, searchKey) => {
    let values = [];

    for (let key in obj) {
        if (key === searchKey) {
            values.push(obj[key]);
        }

        if (typeof obj[key] === 'object') {
            values = values.concat(deepSearchValues(obj[key], searchKey));
        }
    }

    return values;
};
