import * as cheerio from 'cheerio';

export const parseOzonHTML = (content) => {
    if (!content) return;

    try {
        const result = {
            name: '',
            priceActual: '',
            priceCross: '',
            priceWithOzonCard: ''
        };

        const $ = cheerio.load(content);
        const elementsForName = $('h1');
        const elementsPrices = $('[slot="content"]');
        const elementsOzonCardPrice = $('.no div div');

        if (elementsForName) {
            const getName = elementsForName.html();

            if (getName) {
                result.name = getName;
            } else {
                result.name = '-';
            }
        }

        if (elementsPrices) {
            const getActualPrice =
                elementsPrices
                    .find('span')
                    .eq(1)
                    .text() || '-';

            const getCrossPrice =
                elementsPrices
                    .find('span')
                    .eq(2)
                    .text() || '-';

            result.priceActual = getActualPrice;
            result.priceCross = getCrossPrice;
        }

        if (elementsOzonCardPrice) {
            const getOzonCardPrice = elementsOzonCardPrice.text().split('₽');

            if (getOzonCardPrice.length) {
                result.priceWithOzonCard = getOzonCardPrice[0] ? getOzonCardPrice[0] + '₽' : '-';
            }
        }

        return result;
    } catch (e) {
        console.error('Error in method parsePageContent', e);
    }
};
