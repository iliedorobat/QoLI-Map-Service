import {DIMENSIONS, INDICATORS} from './preparedDataset.const.js';
import {IQoLI} from './preparedDataset.types.js';

export default {
    qoli: {
        label: "QoLI",
        filename: "qoli",
        extension: "json",
        aggregators: Object.values(DIMENSIONS),
        dimensions: {
            auxiliary: {
                aggregators: [],
                indicators: {
                    population: {
                        label: "Population",
                        filename: "population",
                        extension: "json"
                    }
                }
            },
            education: {
                label: "Education",
                filename: "education",
                extension: "json",
                aggregators: Object.values(INDICATORS[DIMENSIONS.EDUCATION]),
                indicators: {
                    digitalSkillsRatio: {
                        label: "Digital Skills Ratio",
                        filename: "digitalSkillsRatio",
                        extension: "json"
                    },
                    dropoutRatio: {
                        label: "Dropout Ratio",
                        filename: "dropoutRatio",
                        extension: "json",
                        reversed: true
                    },
                    earlyEducationRatio: {
                        label: "Early Education Ratio",
                        filename: "earlyEducationRatio",
                        extension: "json"
                    },
                    educationRatio: {
                        label: "Education Ratio",
                        filename: "educationRatio",
                        extension: "json"
                    },
                    inactiveYoungRatio: {
                        label: "Inactive Young Ratio",
                        filename: "inactiveYoungRatio",
                        extension: "json",
                        reversed: true
                    },
                    pupilsRatio: {
                        label: "Pupils Ratio",
                        filename: "pupilsRatio",
                        extension: "json"
                    },
                    trainingRatio: {
                        label: "Training Ratio",
                        filename: "trainingRatio",
                        extension: "json"
                    },
                    zeroForeignLangRatio: {
                        label: "Zero Foreign Lang Ratio",
                        filename: "zeroForeignLangRatio",
                        extension: "json",
                        reversed: true
                    }
                }
            },
            environment: {
                label: "Environment",
                filename: "environment",
                extension: "json",
                aggregators: Object.values(INDICATORS[DIMENSIONS.ENVIRONMENT]),
                indicators: {
                    noisePollutionRatio: {
                        label: "Noise Pollution Ratio",
                        filename: "noisePollutionRatio",
                        extension: "json",
                        reversed: true
                    },
                    pm2_5PollutionRatio: {
                        label: "PM2.5 Pollution Ratio",
                        filename: "pm2_5PollutionRatio",
                        extension: "json",
                        reversed: true
                    },
                    pm10PollutionRatio: {
                        label: "PM10 Pollution Ratio",
                        filename: "pm10PollutionRatio",
                        extension: "json",
                        reversed: true
                    },
                    pollutionRatio: {
                        label: "Pollution Ratio",
                        filename: "pollutionRatio",
                        extension: "json",
                        reversed: true
                    },
                    waterSupplyRatio: {
                        label: "Water Supply Ratio",
                        filename: "waterSupplyRatio",
                        extension: "json"
                    }
                }
            },
            governance: {
                label: "Governance and Basic Rights",
                filename: "governance",
                extension: "json",
                aggregators: Object.values(INDICATORS[DIMENSIONS.GOVERNANCE]),
                indicators: {
                    citizenshipRatio: {
                        label: "Citizenship Ratio",
                        filename: "citizenshipRatio",
                        extension: "json"
                    },
                    genderEmploymentGap: {
                        label: "Gender Employment Gap",
                        filename: "genderEmploymentGap",
                        extension: "json",
                        reversed: null
                    },
                    genderPayGap: {
                        label: "Gender Pay Gap",
                        filename: "genderPayGap",
                        extension: "json",
                        reversed: null
                    },
                    populationTrustRatio: {
                        label: "Population Trust Ratio",
                        filename: "populationTrustRatio",
                        extension: "json"
                    },
                    voterTurnout: {
                        label: "Voter Turnout",
                        filename: "voterTurnout",
                        extension: "csv"
                    }
                }
            },
            health: {
                label: "Health",
                filename: "health",
                extension: "json",
                aggregators: Object.values(INDICATORS[DIMENSIONS.HEALTH]),
                indicators: {
                    alcoholicRatio: {
                        label: "Alcoholic Ratio",
                        filename: "alcoholicRatio",
                        extension: "json",
                        reversed: true
                    },
                    bmiObeseRatio: {
                        label: "BMI Obese Ratio",
                        filename: "bmiObeseRatio",
                        extension: "json",
                        reversed: true
                    },
                    bmiOverweightRatio: {
                        label: "BMI Overweight Ratio",
                        filename: "bmiOverweightRatio",
                        extension: "json",
                        reversed: true
                    },
                    fruitsVegetablesRatio: {
                        label: "Fruits Vegetables Ratio",
                        filename: "fruitsVegetablesRatio",
                        extension: "json"
                    },
                    healthPersonnel: {
                        label: "Health Personnel",
                        filename: "healthPersonnel",
                        extension: "json"
                    },
                    healthyLifeRatio: {
                        label: "Healthy Life Ratio",
                        filename: "healthyLifeRatio",
                        extension: "json"
                    },
                    healthyLifeYears: {
                        label: "Healthy Life Years",
                        filename: "healthyLifeYears",
                        extension: "json"
                    },
                    hospitalBeds: {
                        label: "Hospital Beds",
                        filename: "hospitalBeds",
                        extension: "json"
                    },
                    lifeExpectancy: {
                        label: "Life Expectancy at Birth",
                        filename: "lifeExpectancy",
                        extension: "json"
                    },
                    longHealthIssuesRatio: {
                        label: "Long Health Issues Ratio",
                        filename: "longHealthIssuesRatio",
                        extension: "json",
                        reversed: true
                    },
                    physicalActivitiesRatio: {
                        label: "Physical Activities Ratio",
                        filename: "physicalActivitiesRatio",
                        extension: "json"
                    },
                    smokersRatio: {
                        label: "Smokers Ratio",
                        filename: "smokersRatio",
                        extension: "json",
                        reversed: true
                    },
                    unmetDentalRatio: {
                        label: "Unmet Dental Ratio",
                        filename: "unmetDentalRatio",
                        extension: "json",
                        reversed: true
                    },
                    unmetMedicalRatio: {
                        label: "Unmet Medical Ratio",
                        filename: "unmetMedicalRatio",
                        extension: "json",
                        reversed: true
                    },
                    workAccidents: {
                        label: "Work Accidents",
                        filename: "workAccidents",
                        extension: "json",
                        reversed: true
                    }
                }
            },
            leisureInteract: {
                label: "Leisure and Social Interactions",
                filename: "leisureInteract",
                extension: "json",
                aggregators: Object.values(INDICATORS[DIMENSIONS.LEISURE_INTERACT]),
                indicators: {
                    askingRatio: {
                        label: "Asking Ratio",
                        filename: "askingRatio",
                        extension: "json"
                    },
                    discussionRatio: {
                        label: "Discussion Ratio",
                        filename: "discussionRatio",
                        extension: "json"
                    },
                    gettingTogetherFamRatio: {
                        label: "Getting Together Fam Ratio",
                        filename: "gettingTogetherFamRatio",
                        extension: "json"
                    },
                    gettingTogetherFrdRatio: {
                        label: "Getting Together Frd Ratio",
                        filename: "gettingTogetherFrdRatio",
                        extension: "json"
                    },
                    formalVoluntaryRatio: {
                        label: "Formal Voluntary Ratio",
                        filename: "formalVoluntaryRatio",
                        extension: "json"
                    },
                    informalVoluntaryRatio: {
                        label: "Informal Voluntary Ratio",
                        filename: "informalVoluntaryRatio",
                        extension: "json"
                    },
                    nonParticipationRatio: {
                        label: "Non Participation Ratio",
                        filename: "nonParticipationRatio",
                        extension: "json",
                        reversed: true
                    },
                    relationshipsSatisfactionRatio: {
                        label: "Relationship Satisfaction Ratio",
                        filename: "relationshipsSatisfactionRatio",
                        extension: "json"
                    },
                    socialActivitiesRatio: {
                        label: "Social Activities Ratio",
                        filename: "socialActivitiesRatio",
                        extension: "json"
                    },
                    timeSatisfactionRatio: {
                        label: "Time Satisfaction Ratio",
                        filename: "timeSatisfactionRatio",
                        extension: "json"
                    }
                }
            },
            mainActivity: {
                label: "Productive or Main Activity",
                filename: "mainActivity",
                extension: "json",
                aggregators: Object.values(INDICATORS[DIMENSIONS.MAIN_ACTIVITY]),
                indicators: {
                    avgRemainedWorkHours: {
                        label: "Avg Remained Work Hours",
                        filename: "avgRemainedWorkHours",
                        extension: "json"
                    },
                    employmentRatio: {
                        label: "Employment Ratio",
                        filename: "employmentRatio",
                        extension: "json"
                    },
                    inactivePopulationRatio: {
                        label: "Inactive Population Ratio",
                        filename: "inactivePopulationRatio",
                        extension: "json",
                        reversed: true
                    },
                    involuntaryPartTimeRatio: {
                        label: "Involuntary Part-Time Ratio",
                        filename: "involuntaryPartTimeRatio",
                        extension: "json",
                        reversed: true
                    },
                    jobSatisfaction: {
                        label: "Job Satisfaction",
                        filename: "jobSatisfaction",
                        extension: "json"
                    },
                    longTermUnemploymentRatio: {
                        label: "Long Term Unemployment Ratio",
                        filename: "longTermUnemploymentRatio",
                        extension: "json",
                        reversed: true
                    },
                    lowWageEarningsRatio: {
                        label: "Low Wage Earnings Ratio",
                        filename: "lowWageEarningsRatio",
                        extension: "json",
                        reversed: true
                    },
                    overQualifiedRatio: {
                        label: "Overqualified Ratio",
                        filename: "overQualifiedRatio",
                        extension: "json",
                        reversed: true
                    },
                    researchersRatio: {
                        label: "Researchers Ratio",
                        filename: "researchersRatio",
                        extension: "json"
                    },
                    temporaryEmploymentRatio: {
                        label: "Temporary Employment Ratio",
                        filename: "temporaryEmploymentRatio",
                        extension: "json",
                        reversed: true
                    },
                    unemploymentRatio: {
                        label: "Unemployment Ratio",
                        filename: "unemploymentRatio",
                        extension: "json",
                        reversed: true
                    },
                    workingNightsRatio: {
                        label: "Working Nights Ratio",
                        filename: "workingNightsRatio",
                        extension: "json",
                        reversed: true
                    }
                }
            },
            livingConditions: {
                label: "Material and Living Conditions",
                filename: "livingConditions",
                extension: "json",
                aggregators: Object.values(INDICATORS[DIMENSIONS.LIVING_CONDITIONS]),
                indicators: {
                    dwellingIssuesRatio: {
                        label: "Dwelling Issues Ratio",
                        filename: "dwellingIssuesRatio",
                        extension: "json",
                        reversed: true
                    },
                    endMeetInabilityRatio: {
                        label: "End Meet Inability Ratio",
                        filename: "endMeetInabilityRatio",
                        extension: "json",
                        reversed: true
                    },
                    financialSatisfactionRatio: {
                        label: "Financial Satisfaction Ratio",
                        filename: "financialSatisfactionRatio",
                        extension: "json"
                    },
                    highIncomeRatio: {
                        label: "High Income Ratio",
                        filename: "highIncomeRatio",
                        extension: "json"
                    },
                    incomeQuintileRatio: {
                        label: "Income Quintile Ratio",
                        filename: "incomeQuintileRatio",
                        extension: "json",
                        reversed: true
                    },
                    lackOfBathsRatio: {
                        label: "Lack of Baths Ratio",
                        filename: "lackOfBathsRatio",
                        extension: "json",
                        reversed: true
                    },
                    lowWorkIntensityRatio: {
                        label: "Low Work Intensity Ratio",
                        filename: "lowWorkIntensityRatio",
                        extension: "json",
                        reversed: true
                    },
                    materialDeprivationRatio: {
                        label: "Material Deprivation Ratio",
                        filename: "materialDeprivationRatio",
                        extension: "json",
                        reversed: true
                    },
                    medianIncomePpsRatio: {
                        label: "Median Income PPS Ratio",
                        filename: "medianIncomePpsRatio",
                        extension: "json"
                    },
                    overOccupiedRatio: {
                        label: "Over Occupied Ratio",
                        filename: "overOccupiedRatio",
                        extension: "json",
                        reversed: true
                    },
                    povertyRiskRatio: {
                        label: "Poverty Risk Ratio",
                        filename: "povertyRiskRatio",
                        extension: "json",
                        reversed: true
                    },
                    underOccupiedRatio: {
                        label: "Under Occupied Ratio",
                        filename: "underOccupiedRatio",
                        extension: "json"
                    }
                }
            },
            overallExperience: {
                label: "Overal Experience",
                filename: "overallExperience",
                extension: "json",
                aggregators: Object.values(INDICATORS[DIMENSIONS.OVERALL_EXPERIENCE]),
                indicators: {
                    happinessRatio: {
                        label: "Happiness Ratio",
                        filename: "happinessRatio",
                        extension: "json"
                    },
                    highSatisfactionRatio: {
                        label: "High Satisfaction Ratio",
                        filename: "highSatisfactionRatio",
                        extension: "json"
                    }
                }
            },
            safety: {
                label: "Safety",
                filename: "safety",
                extension: "json",
                aggregators: Object.values(INDICATORS[DIMENSIONS.SAFETY]),
                indicators: {
                    crimeRatio: {
                        label: "Crime Ratio",
                        filename: "crimeRatio",
                        extension: "json",
                        reversed: true
                    },
                    nonPaymentRatio: {
                        label: "Non Payment Ratio",
                        filename: "nonPaymentRatio",
                        extension: "json",
                        reversed: true
                    },
                    pensionPpsRatio: {
                        label: "Pension PPS Ratio",
                        filename: "pensionPpsRatio",
                        extension: "json"
                    },
                    socialProtectionPpsRatio: {
                        label: "Social Protection PPS Ratio",
                        filename: "socialProtectionPpsRatio",
                        extension: "json"
                    },
                    totalOffencesRatio: {
                        label: "Total Offences Ratio",
                        filename: "totalOffencesRatio",
                        extension: "json",
                        reversed: true
                    },
                    unexpectedRatio: {
                        label: "Unexpected Ratio",
                        filename: "unexpectedRatio",
                        extension: "json",
                        reversed: true
                    }
                }
            }
        }
    } as IQoLI
} as const;
