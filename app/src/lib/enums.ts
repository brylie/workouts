/**
 * Muscle groups that can be targeted by exercises
 */
export enum Muscles {
  // Upper body
  Chest = 'chest',
  Shoulders = 'shoulders', 
  Triceps = 'triceps',
  Biceps = 'biceps',
  Back = 'back',
  Lats = 'lats',
  Forearms = 'forearms',
  
  // Core
  Abs = 'abs',
  Obliques = 'obliques',
  LowerBack = 'lower_back',
  
  // Lower body
  Glutes = 'glutes',
  Hamstrings = 'hamstrings',
  Quadriceps = 'quadriceps',
  Calves = 'calves'
}

/**
 * Equipment that can be used for exercises
 */
export enum Equipment {
  None = 'none',
  Bodyweight = 'bodyweight',
  Dumbbells = 'dumbbells',
  Barbell = 'barbell',
  Kettlebell = 'kettlebell',
  ResistanceBand = 'resistance_band',
  Machine = 'machine',
  Cable = 'cable',
  PullupBar = 'pullup_bar',
  DipBars = 'dip_bars',
  Bench = 'bench',
  Medicine = 'medicine_ball',
  StabilityBall = 'stability_ball',
  FoamRoller = 'foam_roller'
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
  HIIT = 'hiit'
}

/**
 * Units for measurements
 */
export enum Units {
  Kilograms = 'kg',
  Pounds = 'lbs',
  Seconds = 'sec',
  Minutes = 'min'
}
