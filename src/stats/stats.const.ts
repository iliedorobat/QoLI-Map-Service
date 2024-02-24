const CRR_YEAR = (new Date()).getFullYear();
const MIN_YEAR = 2004;
const MAX_YEAR = CRR_YEAR - 1;
const AVAILABLE_INTERVAL = (() => {
    const values = [];

    for (let year = MAX_YEAR; year >= MIN_YEAR; year--) {
        values.push(year);
    }

    return values;
})();

const EU_EASTERN_MEMBERS = ['BG', 'CZ', 'HU', 'PL', 'RO', 'SK'] as const;
const EU_NORTHERN_MEMBERS = ['DK', 'EE', 'FI', 'IE', 'LV', 'LT', 'SE', 'UK'] as const;
const EU_SOUTHERN_MEMBERS = ['HR', 'EL', 'IT', 'MT', 'PT', 'SI', 'ES', 'CY'] as const;
const EU_WESTERN_MEMBERS = ['AT', 'BE', 'FR', 'DE', 'LU', 'NL'] as const;
const EU28_REGIONS = ['EU_EASTERN', 'EU_NORTHERN', 'EU_SOUTHERN', 'EU_WESTERN'] as const;

const EU28_MEMBERS = {
    // EU: 'European Union', // (EU6-1958, EU9-1973, EU10-1981, EU12-1986, EU15-1995, EU25-2004, EU27-2007, EU28-2013, EU27-2020)
    // EU27_2020: 'European Union - 27 countries', // (from 2020)
    // EU28: 'European Union - 28 countries', // (2013-2020)
    AT: 'Austria',
    BE: 'Belgium',
    BG: 'Bulgaria',
    CY: 'Cyprus',
    CZ: 'Czech Republic',
    DE: 'Germany', // Germany (until 1990 former territory of the FRG)
    DK: 'Denmark',
    EE: 'Estonia',
    EL: 'Greece',
    ES: 'Spain',
    FI: 'Finland',
    FR: 'France',
    HR: 'Croatia',
    HU: 'Hungary',
    IE: 'Ireland',
    IT: 'Italy',
    LT: 'Lithuania',
    LU: 'Luxembourg',
    LV: 'Latvia',
    MT: 'Malta',
    NL: 'Netherlands',
    PL: 'Poland',
    PT: 'Portugal',
    RO: 'Romania',
    SE: 'Sweden',
    SI: 'Slovenia',
    SK: 'Slovakia',
    UK: 'United Kingdom',
} as const;

const EU28_MEMBER_CODES = Object.keys(EU28_MEMBERS);

const EU28_MEMBERS_EXTENDED = {
    // EU28: 'European Union - 28 countries', // (2013-2020)
    AT: 'Austria',
    BE: 'Belgium',
    BG: 'Bulgaria',
    CY: 'Cyprus',
    CZ: 'Czech Republic',
    DE: 'Germany', // Germany (until 1990 former territory of the FRG)
    DK: 'Denmark',
    EE: 'Estonia',
    EL: 'Greece',
    ES: 'Spain',
    FI: 'Finland',
    FR: 'France',
    HR: 'Croatia',
    HU: 'Hungary',
    IE: 'Ireland',
    IT: 'Italy',
    LT: 'Lithuania',
    LU: 'Luxembourg',
    LV: 'Latvia',
    MT: 'Malta',
    NL: 'Netherlands',
    PL: 'Poland',
    PT: 'Portugal',
    RO: 'Romania',
    SE: 'Sweden',
    SI: 'Slovenia',
    SK: 'Slovakia',
    // The offence ratio of the UK is split in 3 entries: England and Wales, Scotland and Northern Ireland
    'UKC-L': 'England and Wales',
    UKM: 'Scotland',
    UKN: 'Northern Ireland (UK)'
} as const;

export {
    AVAILABLE_INTERVAL,
    EU_EASTERN_MEMBERS,
    EU_NORTHERN_MEMBERS,
    EU_SOUTHERN_MEMBERS,
    EU_WESTERN_MEMBERS,
    EU28_MEMBER_CODES,
    EU28_MEMBERS,
    EU28_MEMBERS_EXTENDED,
    EU28_REGIONS,
    MIN_YEAR,
    MAX_YEAR,
};
