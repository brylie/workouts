import { describe, it, expect } from 'vitest';

import { getRandomExercises, getExercisesByMuscle, getExercisesByEquipment } from './exerciseData';
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