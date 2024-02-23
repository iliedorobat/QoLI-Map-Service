import datasetConfig from '#src/config/preparedDataset.config.ts';

const getClientConfig = () => {
    const {qoli} = datasetConfig;

    return {
        checked: true,
        filename: qoli.filename,
        label: qoli.label,
        aggregators: getDimensions(qoli)
    };
};

// TODO: any to type
const getDimensions = (qoli: any) => {
    return qoli.aggregators.map((dimKey: string) => {
        const dimension = qoli.dimensions[dimKey];

        return {
            checked: true,
            filename: dimension.filename,
            label: dimension.label,
            aggregators: getIndicators(dimension)
        };
    });
};

// TODO: any to type
const getIndicators = (dimension: any) => {
    return dimension.aggregators.map((key: string) => {
        const {filename, label} = dimension.indicators[key];

        return {
            checked: true,
            filename,
            label
        };
    })
};

export {
    getClientConfig
};
