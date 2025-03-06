import { Muscles, EquipmentType } from './enums';

/**
 * Equipment represents the different types of equipment that can be used in an exercise.
 */
export interface Equipment {
  id: EquipmentType;
  name: string;
  description?: string;
}

/**
 * Exercise represents a template exercise in the exercise library.
 * It contains the basic information about an exercise that doesn't change.
 */
export interface Exercise {
  id?: string;
  title: string;
  muscles: Muscles[];
  equipment?: EquipmentType[]; // Simplified to just use enum values
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
