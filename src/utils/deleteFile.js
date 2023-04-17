import fs from 'fs';

export const deleteFile = (filePath) => {
    fs.unlink(filePath, (err) => {
        if (err) {
            console.error('Error when temporary links file delete');
        }

        console.log('Temporary links file delete');
    });
};
