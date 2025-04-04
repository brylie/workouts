export enum MuscleGroups {
  UPPER_BODY = "upper_body",
  LOWER_BODY = "lower_body",
  CORE = "core",
}

/**
 * Muscles is an enum representing the different muscle groups that can be targeted by an exercise.
 */
export enum Muscles {
  ABDOMINALS = "abdominals",
  OBLIQUES = "obliques",
  LATS = "lats",
  BICEPS = "biceps",
  CHEST = "chest",
  GLUTES = "glutes",
  HAMSTRINGS = "hamstrings",
  QUADRICEPS = "quadriceps",
  SHOULDERS = "shoulders",
  TRICEPS = "triceps",
  LOWER_BACK = "lower_back",
  CALVES = "calves",
  TRAPEZIUS = "trapezius",
  ABDUCTORS = "abductors",
  ADDUCTORS = "adductors",
  FOREARMS = "forearms",
  NECK = "neck",
  UPPER_BACK = "upper_back",
  HIP_FLEXORS = "hip_flexors",
}

/**
 * Muscles represents the different muscle groups that can be targeted by an exercise.
 */
export interface MuscleDetails {
  id: Muscles;
  name: string;
  recoveryHours: number;
  muscleGroup: MuscleGroups;
}

/**
 * A record of all available muscles, indexed by the Muscles enum.
 * This provides a type-safe way to reference muscles and their display names.
 */
export const musclesRegistry: Record<Muscles, MuscleDetails> = {
  [Muscles.ABDOMINALS]: {
    id: Muscles.ABDOMINALS,
    name: "Abdominals",
    recoveryHours: 24,
    muscleGroup: MuscleGroups.CORE,
  },
  [Muscles.OBLIQUES]: {
    id: Muscles.OBLIQUES,
    name: "Obliques",
    recoveryHours: 24,
    muscleGroup: MuscleGroups.CORE,
  },
  [Muscles.LATS]: {
    id: Muscles.LATS,
    name: "Latissimus Dorsi",
    recoveryHours: 48,
    muscleGroup: MuscleGroups.UPPER_BODY,
  },
  [Muscles.BICEPS]: {
    id: Muscles.BICEPS,
    name: "Biceps",
    recoveryHours: 48,
    muscleGroup: MuscleGroups.UPPER_BODY,
  },
  [Muscles.CHEST]: {
    id: Muscles.CHEST,
    name: "Chest",
    recoveryHours: 48,
    muscleGroup: MuscleGroups.UPPER_BODY,
  },
  [Muscles.GLUTES]: {
    id: Muscles.GLUTES,
    name: "Glutes",
    recoveryHours: 48,
    muscleGroup: MuscleGroups.LOWER_BODY,
  },
  [Muscles.HAMSTRINGS]: {
    id: Muscles.HAMSTRINGS,
    name: "Hamstrings",
    recoveryHours: 48,
    muscleGroup: MuscleGroups.LOWER_BODY,
  },
  [Muscles.QUADRICEPS]: {
    id: Muscles.QUADRICEPS,
    name: "Quadriceps",
    recoveryHours: 48,
    muscleGroup: MuscleGroups.LOWER_BODY,
  },
  [Muscles.SHOULDERS]: {
    id: Muscles.SHOULDERS,
    name: "Shoulders",
    recoveryHours: 48,
    muscleGroup: MuscleGroups.UPPER_BODY,
  },
  [Muscles.TRICEPS]: {
    id: Muscles.TRICEPS,
    name: "Triceps",
    recoveryHours: 48,
    muscleGroup: MuscleGroups.UPPER_BODY,
  },
  [Muscles.LOWER_BACK]: {
    id: Muscles.LOWER_BACK,
    name: "Lower Back",
    recoveryHours: 72,
    muscleGroup: MuscleGroups.CORE,
  },
  [Muscles.CALVES]: {
    id: Muscles.CALVES,
    name: "Calves",
    recoveryHours: 48,
    muscleGroup: MuscleGroups.LOWER_BODY,
  },
  [Muscles.TRAPEZIUS]: {
    id: Muscles.TRAPEZIUS,
    name: "Trapezius",
    recoveryHours: 48,
    muscleGroup: MuscleGroups.UPPER_BODY,
  },
  [Muscles.ABDUCTORS]: {
    id: Muscles.ABDUCTORS,
    name: "Hip Abductors",
    recoveryHours: 48,
    muscleGroup: MuscleGroups.LOWER_BODY,
  },
  [Muscles.ADDUCTORS]: {
    id: Muscles.ADDUCTORS,
    name: "Hip Adductors",
    recoveryHours: 48,
    muscleGroup: MuscleGroups.LOWER_BODY,
  },
  [Muscles.FOREARMS]: {
    id: Muscles.FOREARMS,
    name: "Forearms",
    recoveryHours: 24,
    muscleGroup: MuscleGroups.UPPER_BODY,
  },
  [Muscles.NECK]: {
    id: Muscles.NECK,
    name: "Neck",
    recoveryHours: 24,
    muscleGroup: MuscleGroups.UPPER_BODY,
  },
  [Muscles.UPPER_BACK]: {
    id: Muscles.UPPER_BACK,
    name: "Upper Back",
    recoveryHours: 48,
    muscleGroup: MuscleGroups.UPPER_BODY,
  },
  [Muscles.HIP_FLEXORS]: {
    id: Muscles.HIP_FLEXORS,
    name: "Hip Flexors",
  },
};

/**
 * Helper function to get muscle details by type.
 */
export function getMuscleDetails(muscleType: Muscles): MuscleDetails {
  return musclesRegistry[muscleType];
}

/**
 * Get multiple muscle details at once
 */
export function getMuscleDetailsForTypes(types: Muscles[]): MuscleDetails[] {
  return types.map((type) => getMuscleDetails(type));
}

/**
 * A flat array of all muscles for convenience.
 * Use this when you need a simple array of all muscles.
 */
export const musclesList: MuscleDetails[] = Object.values(musclesRegistry);
