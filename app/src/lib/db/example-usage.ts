import { db } from './index';
import type { ExerciseEntity, WorkoutEntity, WorkoutItemEntity } from './types';
import { Muscles, Equipment } from '../enums';

/**
 * Example demonstrating how to use the WorkoutDatabaseService
 */
export const setupDatabaseExample = async (): Promise<void> => {
  try {
    // Initialize the database
    await db.initialize();
    console.log('Database initialized successfully');

    // Create some exercises
    const pushups: ExerciseEntity = await db.createExercise({
      title: 'Push-ups',
      muscles: [Muscles.Chest, Muscles.Triceps, Muscles.Shoulders],
      description: 'Standard push-up exercise targeting the chest and triceps'
    });
    
    const squats: ExerciseEntity = await db.createExercise({
      title: 'Squats',
      muscles: [Muscles.Quadriceps, Muscles.Glutes, Muscles.Hamstrings],
      equipment: [Equipment.Dumbbells],
      description: 'Standard squat exercise targeting the lower body'
    });

    console.log('Created exercises:', pushups, squats);

    // Create a workout
    const todayWorkout: WorkoutEntity = await db.createWorkout({
      title: 'Monday Strength Training',
      date: new Date(),
      notes: 'Focus on form rather than weight'
    });

    console.log('Created workout:', todayWorkout);

    // Add exercises to the workout as workout items
    const workoutItems: WorkoutItemEntity[] = await db.createWorkoutItems([
      {
        workoutId: todayWorkout.id as number,
        exerciseId: pushups.id as number,
        sets: 3,
        reps: 15,
        notes: 'Keep elbows close to body'
      },
      {
        workoutId: todayWorkout.id as number,
        exerciseId: squats.id as number,
        sets: 4,
        reps: 12,
        weight: 30, // in kg or lbs
        notes: 'Focus on depth'
      }
    ]);

    console.log('Created workout items:', workoutItems);

    // Retrieve the complete workout with items
    const completeWorkout = await db.getCompleteWorkout(todayWorkout.id as number);
    console.log('Complete workout:', completeWorkout);

    // Find exercises by muscle group
    const chestExercises = await db.findExercisesByMuscle(Muscles.Chest);
    console.log('Chest exercises:', chestExercises);

    // Find exercises by equipment
    const dumbbellExercises = await db.findExercisesByEquipment(Equipment.Dumbbells);
    console.log('Dumbbell exercises:', dumbbellExercises);

    // Search for exercises
    const searchResults = await db.searchExercises('push');
    console.log('Search results for "push":', searchResults);

    // Update an exercise
    pushups.description = 'Modified description for push-ups';
    const updatedPushups = await db.updateExercise(pushups);
    console.log('Updated exercise:', updatedPushups);

    // Get recent workouts
    const recentWorkouts = await db.getRecentWorkouts(5);
    console.log('Recent workouts:', recentWorkouts);

    // Find workouts by date range
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 7); // One week ago
    const endDate = new Date();
    
    const workoutsLastWeek = await db.findWorkoutsByDateRange(startDate, endDate);
    console.log('Workouts from last week:', workoutsLastWeek);

    // Advanced usage: working with multiple entities
    // For example, to find all exercises used in recent workouts:
    const exercisesInRecentWorkouts = new Set<number>();
    
    for (const workout of recentWorkouts) {
      const items = await db.getWorkoutItemsByWorkoutId(workout.id as number);
      items.forEach(item => exercisesInRecentWorkouts.add(item.exerciseId as number));
    }
    
    const exerciseDetails = await Promise.all(
      Array.from(exercisesInRecentWorkouts).map(id => db.getExerciseById(id))
    );
    
    console.log('Exercises used in recent workouts:', exerciseDetails);

  } catch (error) {
    console.error('Error in database example:', error);
  }
};

/**
 * Example showing how to reset the database
 */
export const resetDatabaseExample = async (): Promise<void> => {
  try {
    await db.resetDatabase();
    console.log('Database has been reset');
  } catch (error) {
    console.error('Error resetting database:', error);
  }
};