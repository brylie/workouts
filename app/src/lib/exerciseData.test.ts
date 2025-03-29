import { describe, it, expect } from 'vitest';

import { getRandomExercises, getExercisesByMuscle, getExercisesByEquipment, getRandomWorkoutItems, allExercises } from './exerciseData';
import { Muscles, Equipment } from './enums';

// Test getRandomExercises function
describe('getRandomExercises', () => {
    it('should return the specified number of random exercises', () => {
      const exercises = getRandomExercises(3);
      expect(exercises).toHaveLength(3);
    });
  
    it('should return different exercises on subsequent calls', () => {
      const exercises1 = getRandomExercises(3);
      const exercises2 = getRandomExercises(3);
      expect(exercises1).not.toEqual(exercises2);
    });
  
    // Additional tests for edge cases and boundary conditions
  
    // Test getRandomExercises with count 0
    it('should return an empty array when count is 0', () => {
      const exercises = getRandomExercises(0);
      expect(exercises).toHaveLength(0);
    });
  
    // Test getRandomExercises with count greater than available exercises
    it('should return all available exercises when count is greater than available exercises', () => {
      const exercises = getRandomExercises(100);
      expect(exercises).toHaveLength(exercises.length);
    });
  });
  
  // Test getExercisesByMuscle function
  describe('getExercisesByMuscle', () => {
    it('should return exercises that target the specified muscle group', () => {
      const exercises = getExercisesByMuscle(Muscles.Abdominals);
      expect(exercises.every(exercise => exercise.muscles.includes(Muscles.Abdominals))).toBe(true);
    });
  
    // Test getExercisesByMuscle with invalid muscle group
    it('should return an empty array for an invalid muscle group', () => {
      const exercises = getExercisesByMuscle('invalid' as Muscles);
      expect(exercises).toHaveLength(0);
    });
  });
  
  // Test getExercisesByEquipment function
  describe('getExercisesByEquipment', () => {
    it('should return exercises that use the specified equipment', () => {
      const exercises = getExercisesByEquipment(Equipment.Treadmill);
      expect(exercises.every(exercise => exercise.equipment?.includes(Equipment.Treadmill))).toBe(true);
    });
  
    // Test getExercisesByEquipment with invalid equipment type
    it('should return an empty array for an invalid equipment type', () => {
      const exercises = getExercisesByEquipment('invalid' as Equipment);
      expect(exercises).toHaveLength(0);
    });
  });

  // Test getRandomWorkoutItems function
  describe('getRandomWorkoutItems', () => {
    it('should return the specified number of workout items', () => {
        const workoutItems = getRandomWorkoutItems(3);
        expect(workoutItems).toHaveLength(3);
    });

    it('should return workout items with default not completed value', () => {
        const workoutItems = getRandomWorkoutItems(1);
        const item = workoutItems[0];
        
        expect(item).toHaveProperty('exercise');
        expect(item).toHaveProperty('completed', false);
    });

    it('should return different workout items on subsequent calls', () => {
        const workoutItems1 = getRandomWorkoutItems(3);
        const workoutItems2 = getRandomWorkoutItems(3);
        
        // Compare the exercise IDs to check if they're different
        const ids1 = workoutItems1.map(item => item.exercise.id);
        const ids2 = workoutItems2.map(item => item.exercise.id);
        expect(ids1).not.toEqual(ids2);
    });

    it('should return an empty array when count is 0', () => {
        const workoutItems = getRandomWorkoutItems(0);
        expect(workoutItems).toHaveLength(0);
    });
});

// Test for unique exercise IDs
describe('Exercise ID uniqueness', () => {
  it('should have unique IDs for all exercises across all collections', () => {
    const ids = allExercises.map(exercise => exercise.id);
    const uniqueIds = new Set(ids);
    
    // Check if any IDs are undefined or null
    expect(ids.every(id => id !== undefined && id !== null), 
      'Some exercises are missing IDs').toBe(true);
    
    // Check if the number of unique IDs matches the total number of exercises
    expect(uniqueIds.size, 
      `Duplicate IDs found. Total exercises: ${allExercises.length}, Unique IDs: ${uniqueIds.size}`
    ).toBe(allExercises.length);
    
    // If there are duplicates, find and report them for easier debugging
    if (uniqueIds.size !== allExercises.length) {
      const duplicates = ids.filter((id, index) => ids.indexOf(id) !== index);
      const uniqueDuplicates = [...new Set(duplicates)];
      console.error('Duplicate IDs:', uniqueDuplicates);
      
      // For each duplicate ID, find the exercises that use it
      uniqueDuplicates.forEach(dupId => {
        const exercisesWithDupId = allExercises.filter(ex => ex.id === dupId);
        console.error(`Exercises with ID "${dupId}":`, 
          exercisesWithDupId.map(ex => ex.title));
      });
    }
  });
});