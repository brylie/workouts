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
}

/**
 * A record of all available muscles, indexed by the Muscles enum.
 * This provides a type-safe way to reference muscles and their display names.
 */
export const musclesRegistry: Record<Muscles, MuscleDetails> = {
  [Muscles.ABDOMINALS]: {
    id: Muscles.ABDOMINALS,
    name: "Abdominals",
  },
  [Muscles.OBLIQUES]: {
    id: Muscles.OBLIQUES,
    name: "Obliques",
  },
  [Muscles.LATS]: {
    id: Muscles.LATS,
    name: "Latissimus Dorsi",
  },
  [Muscles.BICEPS]: {
    id: Muscles.BICEPS,
    name: "Biceps",
  },
  [Muscles.CHEST]: {
    id: Muscles.CHEST,
    name: "Chest",
  },
  [Muscles.GLUTES]: {
    id: Muscles.GLUTES,
    name: "Glutes",
  },
  [Muscles.HAMSTRINGS]: {
    id: Muscles.HAMSTRINGS,
    name: "Hamstrings",
  },
  [Muscles.QUADRICEPS]: {
    id: Muscles.QUADRICEPS,
    name: "Quadriceps",
  },
  [Muscles.SHOULDERS]: {
    id: Muscles.SHOULDERS,
    name: "Shoulders",
  },
  [Muscles.TRICEPS]: {
    id: Muscles.TRICEPS,
    name: "Triceps",
  },
  [Muscles.LOWER_BACK]: {
    id: Muscles.LOWER_BACK,
    name: "Lower Back",
  },
  [Muscles.CALVES]: {
    id: Muscles.CALVES,
    name: "Calves",
  },
  [Muscles.TRAPEZIUS]: {
    id: Muscles.TRAPEZIUS,
    name: "Trapezius",
  },
  [Muscles.ABDUCTORS]: {
    id: Muscles.ABDUCTORS,
    name: "Hip Abductors",
  },
  [Muscles.ADDUCTORS]: {
    id: Muscles.ADDUCTORS,
    name: "Hip Adductors",
  },
  [Muscles.FOREARMS]: {
    id: Muscles.FOREARMS,
    name: "Forearms",
  },
  [Muscles.NECK]: {
    id: Muscles.NECK,
    name: "Neck",
  },
  [Muscles.UPPER_BACK]: {
    id: Muscles.UPPER_BACK,
    name: "Upper Back",
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
  return types.map((type) => musclesRegistry[type]);
}

/**
 * A flat array of all muscles for convenience.
 * Use this when you need a simple array of all muscles.
 */
export const musclesList: MuscleDetails[] = Object.values(musclesRegistry);
