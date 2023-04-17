class StorageClass {
    constructor() {
        this.dataLinks = {};
        this.dataPrices = {};
    }

    get(variable, key) {
        if (!this[variable][key]) {
            console.warn('Not such data in StorageClass');
        } else {
            return this[variable][key];
        }
    }

    set(variable, key, value) {
        if (!variable || !key) {
            console.warn('Need variable and key for save data');
        } else {
            this[variable][key] = value;
        }
    }
}

export const AppStorage = new StorageClass();
