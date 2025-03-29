/**
 * Muscles is an enum representing the different muscle groups that can be targeted by an exercise.
 */
export enum Muscles {
  Abdominals = 'abdominals',
  Obliques = 'obliques',
  Lats = 'lats',
  Biceps = 'biceps',
  Chest = 'chest',
  Glutes = 'glutes',
  Hamstrings = 'hamstrings',
  Quadriceps = 'quadriceps',
  Shoulders = 'shoulders',
  Triceps = 'triceps',
  LowerBack = 'lower_back',
  Calves = 'calves',
  Trapezius = 'trapezius',
  Abductors = 'abductors',
  Adductors = 'adductors',
  Forearms = 'forearms',
  Neck = 'neck',
  UpperBack = 'upper_back',
}

/**
 * Joints is an enum representing the common joints that are typically targeted in stretches, 
 * yoga poses, and mobility exercises. This simplified list focuses on joints that casual 
 * fitness enthusiasts would recognize and consciously work on.
 */
export enum Joints {
  Ankle = 'ankle',
  Elbow = 'elbow',
  Hip = 'hip',
  Knee = 'knee',
  Neck = 'neck',
  Shoulder = 'shoulder',
  Spine = 'spine',
  Wrist = 'wrist',
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
  Kettlebell = 'kettlebell',
}
