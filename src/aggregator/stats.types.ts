export interface IStatsEntry {
    [key: string]: {
        [k: string]: number;
    };
}

export interface IStats {
    [key: string]: IStatsEntry;
}
