import DATASET_CONFIG from '#src/config/preparedDataset.config.ts';
import {IQoLI, IQoLIDimension} from '#src/config/preparedDataset.types.js';

/**
 * Get a client-specific configuration for the prepared dataset
 */
const getClientConfig = () => {
    const {qoli} = DATASET_CONFIG;

    return {
        checked: true,
        filename: qoli.filename,
        label: qoli.label,
        aggregators: getDimensionsConfig(qoli)
    };
};

const getDimensionsConfig = (qoli: IQoLI) => {
    return qoli.aggregators.map((dimKey: string) => {
        const dimension = qoli.dimensions[dimKey as keyof typeof qoli.dimensions] as IQoLIDimension;

        return {
            checked: true,
            filename: dimension.filename,
            label: dimension.label,
            aggregators: getIndicatorsConfig(dimension)
        };
    });
};

const getIndicatorsConfig = (dimension: IQoLIDimension) => {
    return dimension.aggregators.map((indKey: string) => {
        const {filename, label} = dimension.indicators[indKey as keyof typeof dimension.indicators];

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
