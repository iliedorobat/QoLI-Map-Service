import path from 'path';
import fs from 'fs';

const writeFileSync = async (destination: string, content: string) => {
    try {
        const dirPath = path.dirname(destination);

        // Create the directory if not exists
        if (!fs.existsSync(dirPath)) {
            await fs.mkdirSync(dirPath, { recursive: true });
        }

        await fs.writeFileSync(destination, content);
        console.log('Raw data has been successfully downloaded to', destination);
    } catch (error) {
        console.error(error);
    }
};

export {
    writeFileSync
};
