class StorageClass {
    constructor() {
        this.useHTMLMode = true;
        this.dataLinks = {};
        this.dataPrices = {};
    }

    getData(variable, key) {
        if (!this[variable][key]) {
            console.warn('Not such data in StorageClass');
        } else {
            return this[variable][key];
        }
    }

    setData(variable, key, value) {
        if (!variable || !key) {
            console.warn('Need variable and key for save data');
        } else {
            this[variable][key] = value;
        }
    }

    getHtmlMode() {
        return this.useHTMLMode;
    }

    setHTMLMode(value) {
        this.useHTMLMode = value;
    }

    reset() {
        this.useHTMLMode = true;
        this.dataLinks = {};
        this.dataPrices = {};
    }
}

export const AppStorage = new StorageClass();
