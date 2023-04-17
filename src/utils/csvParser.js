import { parse } from 'csv';
import fs from 'fs';
import { typeOfShop } from './typeOfShop';

export const csvParser = (file) => {
    if (!file) {
        console.warn('Not got file for parse');
    }

    const result = [];

    return new Promise((resolve, reject) => {
        fs.createReadStream(file.filepath)
            .pipe(parse({ columns: false }))
            .on('data', (row) => {
                const [link] = row || [];
                const clearLink = link.replaceAll(';', '');

                const formatLink = {
                    shop: typeOfShop(clearLink),
                    link: clearLink
                };

                result.push(formatLink);
            })
            .on('end', () => {
                console.log('Parsing finished');
                result.splice(0, 1);
                resolve(result);
            })
            .on('error', () => {
                console.error('Error when csv parse');
                reject();
            });
    });
};
