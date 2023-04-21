const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
import { selectShop } from './selectShop';

puppeteer.use(StealthPlugin());

const options = {
    headless: false
};

export const getPageContent = async (linksFromFile, useHTMLMode) => {
    const browser = await puppeteer.launch(options);

    try {
        const result = [];

        const requests = linksFromFile.map(async (shopInfo) => {
            const page = await browser.newPage();
            const { link } = shopInfo;

            await page.goto(link);
            const content = await page.content();

            const getParseShopHelper = selectShop(shopInfo, useHTMLMode);

            if (getParseShopHelper) {
                const getRowDataFromPage = getParseShopHelper(content);

                if (getRowDataFromPage) {
                    result.push(getRowDataFromPage);
                    return getRowDataFromPage;
                }
            }
        });

        await Promise.all(requests);
        browser.close();
        return result;
    } catch (e) {
        console.error('Error in method getPageContent');
        browser.close();
    }
};
