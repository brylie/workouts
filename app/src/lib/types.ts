import { Muscles, Equipment, Joints } from './enums';

/**
 * Equipment represents the different types of equipment that can be used in an exercise.
 */
export interface EquipmentDetails {
  id: Equipment;
  name: string;
  description?: string;
}

/**
 * Defines what metrics can be tracked for an exercise
 */
export interface ExerciseMetrics {
  hasSets: boolean;
  hasReps: boolean;
  hasWeight: boolean;
  hasTime: boolean;
  hasDistance?: boolean;
  hasResistance?: boolean;
  hasSpeed?: boolean;
  hasIncline?: boolean;
  hasResistanceType?: boolean;
  hasCalories?: boolean;
  hasHeartRate?: boolean;
  hasRPE?: boolean;
}

/**
 * Exercise represents a template exercise in the exercise library.
 * It contains the basic information about an exercise that doesn't change.
 */
export interface ExerciseDetails {
  id?: string;
  title: string;
  muscles: Muscles[];
  joints?: Joints[]; // Joints targeted/mobilized by the exercise
  equipment?: Equipment[];
  description?: string;
  tips?: string[];
  variants?: string[];
  metrics: ExerciseMetrics;
}

/**
 * Metrics values recorded for a completed exercise
 */
export interface CompletedExerciseMetrics {
  sets?: number;
  reps?: number;
  weight?: number;
  time?: string;
  distance?: number;
  resistance?: number;
  speed?: number;
  incline?: number;
  resistanceType?: string;
  calories?: number;
  heartRate?: number;
  rpe?: number;
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
 * DEPRECATED: CompletedExercise represents a record of a completed exercise.
 * It stores metadata about the exercise without duplicating exercise data.
 */
export interface CompletedExerciseV1 {
  id?: number; // Database auto-increment ID
  exercise_id: string; // Reference to the exercise
  completed_at: Date; // When the exercise was completed
  sets?: number; // Number of sets performed
  reps?: number; // Number of reps per set
  weight?: number; // Weight lifted in kg
  time?: string; // Time taken to complete the exercise
}

/**
 * CompletedExercise represents a record of a completed exercise.
 * It stores metadata about the exercise without duplicating exercise data.
 */
export interface CompletedExerciseV2 {
  id?: number; // Database auto-increment ID
  exercise_id: string; // Reference to the exercise
  completed_at: Date; // When the exercise was completed
  metrics: CompletedExerciseMetrics;
}

/**
 * Filter criteria for exercises
 */
export interface ExerciseFilters {
  muscles?: Muscles[];
  equipment?: Equipment[];
}
