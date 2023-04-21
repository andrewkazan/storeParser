import * as cheerio from 'cheerio';
import { deepSearchValues } from '../../deepSearchValues';

export const parseOzonNonHTML = (content) => {
    if (!content) return;

    try {
        const result = {
            name: '',
            priceActual: '',
            priceCross: '',
            priceWithOzonCard: ''
        };

        const $ = cheerio.load(content);

        $('script').each((index, script) => {
            const scriptContent = $(script).html();

            if (/window.__NUXT__={};window.__NUXT__.state='{/.test(scriptContent)) {
                const regexForFindJSON = /state='(.*?)'/g;
                const [findInfoJSON] = scriptContent.match(regexForFindJSON);
                const cutJSON = findInfoJSON.slice(7, findInfoJSON.length - 1);

                const removeFourBackSlash = cutJSON.replace(/\\\\/g, '');
                const removeDoubleBackSlash = removeFourBackSlash.replace(/\\/g, '');
                const removeLeftQuoteCoveredObject = removeDoubleBackSlash.replace(/"{/g, '{');
                const removeRightQuoteCoveredObject = removeLeftQuoteCoveredObject.replace(/}"/g, '}');
                const removeNSymbolAfterObject = removeRightQuoteCoveredObject.replace(/}n/g, '}');
                const removeNSymbolAfterArray = removeNSymbolAfterObject.replace(/]n/g, ']');
                const removeUNumbers = removeNSymbolAfterArray.replace(/u\d{4}/g, '');

                const parsedData = JSON.parse(removeUNumbers);

                const {
                    seo: { script: [{ innerHTML: { name, offers: { price } = {} } = {} } = {}] = [] } = {},
                    trackingPayloads
                } = parsedData || {};

                const findAccountPrice = deepSearchValues(trackingPayloads, 'finAccountPrice');
                const findCrossPrice = deepSearchValues(trackingPayloads, 'price');

                var proc = require('child_process').spawn('pbcopy');
                proc.stdin.write(removeUNumbers);
                proc.stdin.end();

                result.name = name || '-';
                result.priceActual = price || '-';
                result.priceWithOzonCard = findAccountPrice[0] || '-';
                result.priceCross = findCrossPrice[0] || '-';
            }
        });

        return result;
    } catch (e) {
        console.error('Error in method parsePageContent', e);
    }
};
