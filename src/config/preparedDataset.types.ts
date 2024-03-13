import {FORMAT} from '#src/commons/file.utils.js';

export interface IGenericDimension {
    label: string;
    filename: string;
    extension: FORMAT;
    aggregators: string[];
    indicators: {
        [key: string]: IQoLIIndicator
    }
}

export interface IQoLIIndicator {
    label: string;
    filename: string;
    extension: FORMAT;
    reversed?: boolean | null;
}

export interface IQoLI {
    label: string;
    filename: string;
    extension: FORMAT;
    aggregators: string[];
    dimensions: {
        auxiliary: IAuxiliary,
        education: IEducation,
        environment: IEnvironment,
        governance: IGovernance,
        health: IHealth,
        leisureInteractions: ILeisureInteract,
        mainActivity: IMainActivity,
        livingConditions: ILivingConditions,
        overallExperience: IOverallExperience,
        safety: ISafety
    }
}

export interface IAuxiliary {
    aggregators: string[];
    indicators: {
        population: IQoLIIndicator
    }
}

export interface IEducation extends IGenericDimension {
    indicators: {
        digitalSkillsRatio: IQoLIIndicator;
        dropoutRatio: IQoLIIndicator;
        earlyEducationRatio: IQoLIIndicator;
        educationRatio: IQoLIIndicator;
        inactiveYoungRatio: IQoLIIndicator;
        pupilsRatio: IQoLIIndicator;
        trainingRatio: IQoLIIndicator;
        zeroForeignLangRatio: IQoLIIndicator;
    }
}

export interface IEnvironment extends IGenericDimension {
    indicators: {
        noisePollutionRatio: IQoLIIndicator;
        pm2_5PollutionRatio: IQoLIIndicator;
        pm10PollutionRatio: IQoLIIndicator;
        pollutionRatio: IQoLIIndicator;
        waterSupplyRatio: IQoLIIndicator;
    }
}

export interface IGovernance extends IGenericDimension {
    indicators: {
        citizenshipRatio: IQoLIIndicator;
        genderEmploymentGap: IQoLIIndicator;
        genderPayGap: IQoLIIndicator;
        populationTrustRatio: IQoLIIndicator;
        voterTurnout: IQoLIIndicator;
    }
}

export interface IHealth extends IGenericDimension {
    indicators: {
        alcoholicRatio: IQoLIIndicator;
        bmiObeseRatio: IQoLIIndicator;
        bmiOverweightRatio: IQoLIIndicator;
        fruitsVegetablesRatio: IQoLIIndicator;
        healthPersonnel: IQoLIIndicator;
        healthyLifeRatio: IQoLIIndicator;
        healthyLifeYears: IQoLIIndicator;
        hospitalBeds: IQoLIIndicator;
        lifeExpectancy: IQoLIIndicator;
        longHealthIssuesRatio: IQoLIIndicator;
        physicalActivitiesRatio: IQoLIIndicator;
        smokersRatio: IQoLIIndicator;
        unmetDentalRatio: IQoLIIndicator;
        unmetMedicalRatio: IQoLIIndicator;
        workAccidents: IQoLIIndicator;
    }
}

export interface ILeisureInteract extends IGenericDimension {
    indicators: {
        askingRatio: IQoLIIndicator;
        discussionRatio: IQoLIIndicator;
        gettingTogetherFamRatio: IQoLIIndicator;
        gettingTogetherFrdRatio: IQoLIIndicator;
        formalVoluntaryRatio: IQoLIIndicator;
        informalVoluntaryRatio: IQoLIIndicator;
        nonParticipationRatio: IQoLIIndicator;
        relationshipsSatisfactionRatio: IQoLIIndicator;
        socialActivitiesRatio: IQoLIIndicator;
        timeSatisfactionRatio: IQoLIIndicator;
    }
}

export interface IMainActivity extends IGenericDimension {
    indicators: {
        avgRemainedWorkHours: IQoLIIndicator;
        employmentRatio: IQoLIIndicator;
        inactivePopulationRatio: IQoLIIndicator;
        involuntaryPartTimeRatio: IQoLIIndicator;
        jobSatisfaction: IQoLIIndicator;
        longTermUnemploymentRatio: IQoLIIndicator;
        lowWageEarningsRatio: IQoLIIndicator;
        overQualifiedRatio: IQoLIIndicator;
        researchersRatio: IQoLIIndicator;
        temporaryEmploymentRatio: IQoLIIndicator;
        unemploymentRatio: IQoLIIndicator;
        workingNightsRatio: IQoLIIndicator;
    }
}

export interface ILivingConditions extends IGenericDimension {
    indicators: {
        dwellingIssuesRatio: IQoLIIndicator;
        endMeetInabilityRatio: IQoLIIndicator;
        financialSatisfactionRatio: IQoLIIndicator;
        highIncomeRatio: IQoLIIndicator;
        incomeQuintileRatio: IQoLIIndicator;
        lackOfBathsRatio: IQoLIIndicator;
        lowWorkIntensityRatio: IQoLIIndicator;
        materialDeprivationRatio: IQoLIIndicator;
        medianIncomePpsRatio: IQoLIIndicator;
        overOccupiedRatio: IQoLIIndicator;
        povertyRiskRatio: IQoLIIndicator;
        underOccupiedRatio: IQoLIIndicator;
    }
}

export interface IOverallExperience extends IGenericDimension {
    indicators: {
        happinessRatio: IQoLIIndicator;
        highSatisfactionRatio: IQoLIIndicator;
    }
}

export interface ISafety extends IGenericDimension {
    indicators: {
        crimeRatio: IQoLIIndicator;
        nonPaymentRatio: IQoLIIndicator;
        pensionPpsRatio: IQoLIIndicator;
        socialProtectionPpsRatio: IQoLIIndicator;
        totalOffencesRatio: IQoLIIndicator;
        unexpectedRatio: IQoLIIndicator;
    }
}

export type IQoLIDimension = IEducation | IEnvironment | IGovernance | IHealth | ILeisureInteract | IMainActivity | ILivingConditions | IOverallExperience | ISafety;
