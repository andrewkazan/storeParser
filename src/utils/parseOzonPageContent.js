import * as cheerio from 'cheerio';

export const parseOzonPageContent = (content) => {
    if (!content) return;

    try {
        const result = {
            name: '',
            price: ''
        };

        const $ = cheerio.load(content);
        const elementsForName = $('h1');
        const elementsForPrice = $('[slot="content"]');

        if (elementsForName) {
            const getName = elementsForName.html();

            if (getName) result.name = getName;
        }

        if (elementsForPrice) {
            const getPrice = elementsForPrice
                .find('span')
                .eq(1)
                .text();

            if (getPrice) result.price = getPrice;
        }

        return result;
    } catch (e) {
        console.error('Error in method parsePageContent', e);
    }
};
