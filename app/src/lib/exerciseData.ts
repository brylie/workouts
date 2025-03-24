import type { ExerciseDetails, WorkoutItem } from './types';
import { Muscles, Equipment } from './enums';
import { calisthenicsExercises } from './exercise_data/calisthenics';
import { dumbbellExercises } from './exercise_data/dumbbells';
import { machineExercises } from './exercise_data/machines';
import { kettlebellExercises } from './exercise_data/kettlebell';

// Combine machine, calisthenics, dumbbell, and kettlebell exercises
export const allExercises: ExerciseDetails[] = [...machineExercises, ...calisthenicsExercises, ...dumbbellExercises, ...kettlebellExercises];

/**
 * Get a random selection of exercises for workout generation
 * @param count The number of exercises to include (defaults to 5)
 * @returns An array of randomly selected exercises
 */
export function getRandomExercises(count: number = 5): ExerciseDetails[] {
  const shuffled = [...allExercises].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

/**
 * Get a list of random workout items for workout generation
 * @param count The number of exercises to include (defaults to 5)
 * @returns An array of randomly selected WorkoutItems
 */
export function getRandomWorkoutItems(count: number = 5): WorkoutItem[] {
    const exercises = getRandomExercises(count);
    return exercises.map(exercise => ({
        exercise,
        completed: false
    }));
}

/**
 * Get exercises that target a specific muscle group
 * @param muscle The muscle group to target
 * @returns An array of exercises that target the specified muscle
 */
export function getExercisesByMuscle(muscle: Muscles): ExerciseDetails[] {
  return allExercises.filter(exercise => exercise.muscles.includes(muscle));
}

/**
 * Get exercises that use specific equipment
 * @param equipmentType The type of equipment to filter by
 * @returns An array of exercises that use the specified equipment
 */
export function getExercisesByEquipment(equipmentType: Equipment): ExerciseDetails[] {
  return allExercises.filter(exercise => 
    exercise.equipment?.includes(equipmentType)
  );
}