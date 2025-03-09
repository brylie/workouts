import { Muscles, Equipment } from './enums';

/**
 * Equipment represents the different types of equipment that can be used in an exercise.
 */
export interface EquipmentDetails {
  id: Equipment;
  name: string;
  description?: string;
}

/**
 * Exercise represents a template exercise in the exercise library.
 * It contains the basic information about an exercise that doesn't change.
 */
export interface ExerciseDetails {
  id?: string;
  title: string;
  muscles: Muscles[];
  equipment?: Equipment[]; // Simplified to just use enum values
  description?: string;
}

/**
 * WorkoutItem represents a specific instance of an exercise within a workout,
 * including the performance parameters like sets, reps, etc.
 */
export interface WorkoutItem {
  exercise: ExerciseDetails;
  sets?: number;
  reps?: number;
  weight?: number;
  time?: string;
  completed?: boolean;
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

/**
 * CompletedExercise represents a record of a completed exercise.
 * It stores metadata about the exercise without duplicating exercise data.
 */
export interface CompletedExercise {
  id?: number; // Database auto-increment ID
  exercise_id: string; // Reference to the exercise
  completed_at: Date; // When the exercise was completed
  sets: number; // Number of sets completed
  reps?: number; // Number of reps per set (optional)
  weight?: number; // Weight used (optional)
  time?: string; // Duration (optional, for timed exercises)
}
