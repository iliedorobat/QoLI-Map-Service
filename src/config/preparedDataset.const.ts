const DIMENSIONS = {
    EDUCATION: 'education',
    ENVIRONMENT: 'environment',
    GOVERNANCE: 'governance',
    HEALTH: 'health',
    INTERACTIONS: 'interactions',
    LEISURE: 'leisure',
    MAIN_ACTIVITY: 'mainActivity',
    LIVING_CONDITIONS: 'livingConditions',
    OVERALL_EXPERIENCE: 'overallExperience',
    SAFETY: 'safety'
} as const;

const INDICATORS = {
    [DIMENSIONS.EDUCATION]: {
        DIGITAL_SKILLS_RATIO: 'digitalSkillsRatio',
        DROPOUT_RATIO: 'dropoutRatio',
        EARLY_EDUCATION_RATIO: 'earlyEducationRatio',
        EDUCATION_RATIO: 'educationRatio',
        INACTIVE_YOUNG_RATIO: 'inactiveYoungRatio',
        PUPILS_RATIO: 'pupilsRatio',
        TRAINING_RATIO: 'trainingRatio',
        ZERO_FOREIGN_LANG_RATIO: 'zeroForeignLangRatio'
    },
    [DIMENSIONS.ENVIRONMENT]: {
        NOISE_POLLUTION_RATIO: 'noisePollutionRatio',
        PM_2_5_POLLUTION_RATIO: 'pm2_5PollutionRatio',
        PM_10_POLLUTION_RATIO: 'pm10PollutionRatio',
        POLLUTION_RATIO: 'pollutionRatio',
        WATER_SUPPLY_RATIO: 'waterSupplyRatio'
    },
    [DIMENSIONS.GOVERNANCE]: {
        CITIZENSHIP_RATIO: 'citizenshipRatio',
        GENDER_EMPLOYMENT_GAP: 'genderEmploymentGap',
        GENDER_PAY_GAP: 'genderPayGap',
        POPULATION_TRUST_RATIO: 'populationTrustRatio',
        VOTER_TURNOUT: 'voterTurnout'
    },
    [DIMENSIONS.HEALTH]: {
        ALCOHOLIC_RATIO: 'alcoholicRatio',
        BMI_OBESE_RATIO: 'bmiObeseRatio',
        BMI_OVERWEIGHT_RATIO: 'bmiOverweightRatio',
        FRUITS_VEGETABLES_RATIO: 'fruitsVegetablesRatio',
        HEALTH_PERSONNEL: 'healthPersonnel',
        HEALTHY_LIFE_RATIO: 'healthyLifeRatio',
        HEALTHY_LIFE_YEARS: 'healthyLifeYears',
        HOSPITAL_BEDS: 'hospitalBeds',
        LIFE_EXPECTANCY: 'lifeExpectancy',
        LONG_HEALTH_ISSUES_RATIO: 'longHealthIssuesRatio',
        PHYSICAL_ACTIVITIES_RATIO: 'physicalActivitiesRatio',
        SMOKERS_RATIO: 'smokersRatio',
        UNMET_DENTAL_RATIO: 'unmetDentalRatio',
        UNMET_MEDICAL_RATIO: 'unmetMedicalRatio',
        WORK_ACCIDENTS: 'workAccidents'
    },
    [DIMENSIONS.INTERACTIONS]: {
        ASKING_RATIO: 'askingRatio',
        DISCUSSION_RATIO: 'discussionRatio',
        GETTING_TOGETHER_FAM_RATIO: 'gettingTogetherFamRatio',
        GETTING_TOGETHER_FRD_RATIO: 'gettingTogetherFrdRatio',
        SATISFACTION_RATIO: 'satisfactionRatio'
    },
    [DIMENSIONS.LEISURE]: {
        FORMAL_VOLUNTARY_RATIO: 'formalVoluntaryRatio',
        INFORMAL_VOLUNTARY_RATIO: 'informalVoluntaryRatio',
        NON_PARTICIPATION_RATIO: 'nonParticipationRatio',
        SATISFACTION_RATIO: 'satisfactionRatio',
        SOCIAL_ACTIVITIES_RATIO: 'socialActivitiesRatio'
    },
    [DIMENSIONS.MAIN_ACTIVITY]: {
        AVG_REMAINED_WORK_HOURS: 'avgRemainedWorkHours',
        EMPLOYMENT_RATIO: 'employmentRatio',
        INACTIVE_POPULATION_RATIO: 'inactivePopulationRatio',
        INVOLUNTARY_PART_TIME_RATIO: 'involuntaryPartTimeRatio',
        JOB_SATISFACTION: 'jobSatisfaction',
        LONG_TERM_UNEMPLOYMENT_RATIO: 'longTermUnemploymentRatio',
        LOW_WAGE_EARNINGS_RATIO: 'lowWageEarningsRatio',
        OVER_QUALIFIED_RATIO: 'overQualifiedRatio',
        RESEARCHERS_RATIO: 'researchersRatio',
        TEMPORARY_EMPLOYMENT_RATIO: 'temporaryEmploymentRatio',
        UNEMPLOYMENT_RATIO: 'unemploymentRatio',
        WORKING_NIGHTS_RATIO: 'workingNightsRatio'
    },
    [DIMENSIONS.LIVING_CONDITIONS]: {
        DWELLING_ISSUES_RATIO: 'dwellingIssuesRatio',
        ENDMEET_INABILITY_RATIO: 'endMeetInabilityRatio',
        FINANCIAL_SATISFACTION_RATIO: 'financialSatisfactionRatio',
        HIGH_INCOME_RATIO: 'highIncomeRatio',
        INCOME_QUINTILE_RATIO: 'incomeQuintileRatio',
        LACK_OF_BATHS_RATIO: 'lackOfBathsRatio',
        LOW_WORK_INTENSITY_RATIO: 'lowWorkIntensityRatio',
        MATERIAL_DEPRIVATION_RATIO: 'materialDeprivationRatio',
        MEDIAN_INCOME_PPS_RATIO: 'medianIncomePpsRatio',
        OVER_OCCUPIED_RATIO: 'overOccupiedRatio',
        POVERTY_RISK_RATIO: 'povertyRiskRatio',
        UNDER_OCCUPIED_RATIO: 'underOccupiedRatio'
    },
    [DIMENSIONS.OVERALL_EXPERIENCE]: {
        HAPPINESS_RATIO: 'happinessRatio',
        HIGH_SATISFACTION_RATIO: 'highSatisfactionRatio'
    },
    [DIMENSIONS.SAFETY]: {
        CRIME_RATIO: 'crimeRatio',
        NON_PAYMENT_RATIO: 'nonPaymentRatio',
        PENSION_PPS_RATIO: 'pensionPpsRatio',
        SOCIAL_PROTECTION_PPS_RATIO: 'socialProtectionPpsRatio',
        TOTAL_OFFENCES_RATIO: 'totalOffencesRatio',
        UNEXPECTED_RATIO: 'unexpectedRatio'
    },
} as const;

export {
    DIMENSIONS,
    INDICATORS
};
