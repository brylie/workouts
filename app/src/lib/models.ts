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
 * Exercise represents a template exercise in the exercise library.
 * It contains the basic information about an exercise that doesn't change.
 */
export interface Exercise {
  id?: string;
  title: string;
  muscles: Muscles[];
  description?: string;
}

/**
 * WorkoutItem represents a specific instance of an exercise within a workout,
 * including the performance parameters like sets, reps, etc.
 */
export interface WorkoutItem {
  exercise: Exercise;
  sets: number;
  reps?: number;
  weight?: number;
  time?: string;
  notes?: string;
}

/**
 * Workout represents a collection of workout items performed in a single session.
 */
export interface Workout {
  title: string;
  date: Date;
  items: WorkoutItem[];
  notes?: string;
}
