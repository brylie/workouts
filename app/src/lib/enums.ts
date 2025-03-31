/**
 * Muscles is an enum representing the different muscle groups that can be targeted by an exercise.
 */
export enum Muscles {
  ABDOMINALS = 'abdominals',
  OBLIQUES = 'obliques',
  LATS = 'lats',
  BICEPS = 'biceps',
  CHEST = 'chest',
  GLUTES = 'glutes',
  HAMSTRINGS = 'hamstrings',
  QUADRICEPS = 'quadriceps',
  SHOULDERS = 'shoulders',
  TRICEPS = 'triceps',
  LOWER_BACK = 'lower_back',
  CALVES = 'calves',
  TRAPEZIUS = 'trapezius',
  ABDUCTORS = 'abductors',
  ADDUCTORS = 'adductors',
  FOREARMS = 'forearms',
  NECK = 'neck',
  UPPER_BACK = 'upper_back',
}

/**
 * Joints is an enum representing the common joints that are typically targeted in stretches, 
 * yoga poses, and mobility exercises. This simplified list focuses on joints that casual 
 * fitness enthusiasts would recognize and consciously work on.
 */
export enum Joints {
  ANKLE = 'ankle',
  ELBOW = 'elbow',
  HIP = 'hip',
  KNEE = 'knee',
  NECK = 'neck',
  SHOULDER = 'shoulder',
  SPINE = 'spine',
  WRIST = 'wrist',
}

/**
 * EquipmentType is an enum representing the different types of equipment available.
 * This provides type safety and autocompletion when referring to equipment.
 */
export enum Equipment {
  BACK_EXTENSION_MACHINE = 'back-extension-machine',
  ABDOMINAL_CRUNCH_MACHINE = 'abdominal-crunch-machine',
  HIP_ABDUCTOR_MACHINE = 'hip-abductor-machine',
  HIP_ADDUCTOR_MACHINE = 'hip-adductor-machine',
  SHOULDER_PRESS_MACHINE = 'shoulder-press-machine',
  SEATED_LEG_CURL_MACHINE = 'seated-leg-curl-machine',
  LEG_EXTENSIONS_MACHINE = 'leg-extensions-machine',
  ROTARY_TORSO_MACHINE = 'rotary-torso-machine',
  TREADMILL = 'treadmill',
  STATIONARY_CYCLE = 'stationary-cycle',
  DUMBBELLS = 'dumbbells',
  BENCH = 'bench',
  LAT_PULLDOWN_MACHINE = 'lat-pulldown-machine',
  CABLE_MACHINE = 'cable-machine',
  SEATED_ROWING_MACHINE = 'seated-rowing-machine',
  LEG_PRESS_MACHINE = 'leg-press-machine',
  KETTLEBELL = 'kettlebell',
}
