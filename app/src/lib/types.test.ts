import { describe, expect, it } from "vitest";
import { Equipment, Muscles } from "./enums";
import type { EquipmentDetails, ExerciseDetails, Workout, WorkoutItem } from "./types";



describe('types.ts', () => {
    it('should define EquipmentDetails interface', () => {
      const equipment: EquipmentDetails = {
        id: Equipment.DUMBBELLS,
        name: 'Dumbbells',
        description: 'A pair of handheld weights used for various exercises.'
      };
      expect(equipment).toBeDefined();
      expect(equipment.id).toBe('dumbbells');
      expect(equipment.name).toBe('Dumbbells');
      expect(equipment.description).toBe('A pair of handheld weights used for various exercises.');
    });
  
    it('should define ExerciseDetails interface', () => {
      const exercise: ExerciseDetails = {
        id: 'push-up',
        title: 'Push-Up',
        muscles: [Muscles.CHEST, Muscles.TRICEPS],
        equipment: [],
        description: 'A bodyweight exercise that targets the chest and triceps.',
        metrics: {
          hasSets: true,
          hasReps: true,
          hasWeight: false,
          hasTime: true,
          hasDistance: false,
          hasResistance: false,
        },
      };
      expect(exercise).toBeDefined();
      expect(exercise.id).toBe('push-up');
      expect(exercise.title).toBe('Push-Up');
      expect(exercise.muscles).toEqual([Muscles.CHEST, Muscles.TRICEPS]);
      expect(exercise.equipment).toEqual([]);
      expect(exercise.description).toBe('A bodyweight exercise that targets the chest and triceps.');
    });
  
    it('should define WorkoutItem interface', () => {
      const workoutItem: WorkoutItem = {
        exercise: {
          id: 'push-up',
          title: 'Push-Up',
          muscles: [Muscles.CHEST, Muscles.TRICEPS],
          equipment: [],
          description: 'A bodyweight exercise that targets the chest and triceps.'
        },
        sets: 3,
        reps: 10,
        weight: 0,
        time: '30s',
      };
      expect(workoutItem).toBeDefined();
      expect(workoutItem.exercise.id).toBe('push-up');
      expect(workoutItem.sets).toBe(3);
      expect(workoutItem.reps).toBe(10);
      expect(workoutItem.weight).toBe(0);
      expect(workoutItem.time).toBe('30s');
    });
  
    it('should define Workout interface', () => {
      const workout: Workout = {
        title: 'Morning Workout',
        date: new Date('2023-01-01'),
        items: [
          {
            exercise: {
              id: 'push-up',
              title: 'Push-Up',
              muscles: [Muscles.CHEST, Muscles.TRICEPS],
              equipment: [],
              description: 'A bodyweight exercise that targets the chest and triceps.'
            },
            sets: 3,
            reps: 10,
            weight: 0,
            time: '30s',
          }
        ],
        notes: 'Great workout!'
      };
      expect(workout).toBeDefined();
      expect(workout.title).toBe('Morning Workout');
      expect(workout.date).toEqual(new Date('2023-01-01'));
      expect(workout.items).toHaveLength(1);
      expect(workout.items[0].exercise.id).toBe('push-up');
      expect(workout.notes).toBe('Great workout!');
    });
  });