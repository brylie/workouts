/**
 * Muscles is an enum representing the different muscle groups that can be targeted by an exercise.
 */
export enum Muscles {
  Abdominals = 'abdominals',
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
  Neck = 'neck'
}

/**
 * EquipmentType is an enum representing the different types of equipment available.
 * This provides type safety and autocompletion when referring to equipment.
 */
export enum EquipmentType {
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
  LegPressMachine = 'leg-press-machine'
}
