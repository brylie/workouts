/**
 * Muscle groups that can be targeted by exercises
 */
export enum Muscles {
  // Upper body
  Chest = 'chest',
  Shoulders = 'shoulders', 
  Triceps = 'triceps',
  Biceps = 'biceps',
  Lats = 'lats',
  Forearms = 'forearms',
  Trapezius = 'trapezius',
  Neck = 'neck',
  
  // Core
  Abdominals = 'abdominals',
  Obliques = 'obliques',
  LowerBack = 'lower_back',
  
  // Lower body
  Abductors = 'abductors',
  Adductors = 'adductors',
  Glutes = 'glutes',
  Hamstrings = 'hamstrings',
  Quadriceps = 'quadriceps',
  Calves = 'calves',
}

/**
 * EquipmentType is an enum representing the different types of equipment available.
 * This provides type safety and autocompletion when referring to equipment.
 */
export enum Equipment {
  BackExtensionMachine = 'back-extension-machine',
  AbdominalCrunchMachine = 'abdominal-crunch-machine',
  HipAbductorMachine = 'hip-abductor-machine',
  HipAdductorMachine = 'hip-adductor-machine',
  ShoulderPressMachine = 'shoulder-press-machine',
  SeatedLegCurlMachine = 'seated-leg-curl-machine',
  LegExtensionsMachine = 'leg-extensions-machine',
  RotaryTorsoMachine = 'rotary-torso-machine',
  Treadmill = 'treadmill',
  StationaryCycle = 'stationary-cycle',
  Dumbbells = 'dumbbells',
  Bench = 'bench',
  LatPulldownMachine = 'lat-pulldown-machine',
  CableMachine = 'cable-machine',
  SeatedRowingMachine = 'seated-rowing-machine',
  LegPressMachine = 'leg-press-machine',
}

/**
 * Different types of workout routines
 */
export enum WorkoutType {
  Strength = 'strength',
  Hypertrophy = 'hypertrophy',
  Endurance = 'endurance',
  Power = 'power',
  Circuit = 'circuit',
  Cardio = 'cardio',
  Flexibility = 'flexibility',
  Recovery = 'recovery',
  HIIT = 'hiit',
}

/**
 * Units for measurements
 */
export enum Units {
  Kilograms = 'kg',
  Pounds = 'lbs',
  Seconds = 'sec',
  Minutes = 'min',
}
