import { describe, it, expect } from 'vitest';
import { getRandomExercises, getExercisesByMuscle, getExercisesByEquipment } from './exerciseData';
import { getEquipmentDetails, getEquipmentDetailsForTypes } from './equipmentData';
import { Muscles, Equipment } from './enums';
import * as lib from './index';
import type { EquipmentDetails, ExerciseDetails, WorkoutItem, Workout } from './types';

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

// Test getEquipmentDetails function
describe('getEquipmentDetails', () => {
  it('should return the correct equipment details for the specified type', () => {
    const equipment = getEquipmentDetails(Equipment.Treadmill);
    expect(equipment).toEqual({
      id: Equipment.Treadmill,
      name: 'Treadmill',
      description: 'A machine for walking or running while staying in one place.'
    });
  });

  // Test getEquipmentDetails with invalid equipment type
  it('should return undefined for an invalid equipment type', () => {
    const equipment = getEquipmentDetails('invalid' as Equipment);
    expect(equipment).toBeUndefined();
  });
});

// Test getEquipmentDetailsForTypes function
describe('getEquipmentDetailsForTypes', () => {
  it('should return the correct equipment details for multiple types', () => {
    const equipment = getEquipmentDetailsForTypes([Equipment.Treadmill, Equipment.Dumbbells]);
    expect(equipment).toEqual([
      {
        id: Equipment.Treadmill,
        name: 'Treadmill',
        description: 'A machine for walking or running while staying in one place.'
      },
      {
        id: Equipment.Dumbbells,
        name: 'Dumbbells',
        description: 'A pair of handheld weights used for various exercises.'
      }
    ]);
  });

  // Test getEquipmentDetailsForTypes with empty array
  it('should return an empty array when no equipment types are provided', () => {
    const equipment = getEquipmentDetailsForTypes([]);
    expect(equipment).toHaveLength(0);
  });
});

// Test index.ts exports
describe('index.ts', () => {
  it('should export enums', () => {
    expect(lib.Muscles).toBeDefined();
    expect(lib.Equipment).toBeDefined();
  });

  it('should export exerciseData functions', () => {
    expect(lib.getRandomExercises).toBeDefined();
    expect(lib.getExercisesByMuscle).toBeDefined();
    expect(lib.getExercisesByEquipment).toBeDefined();
  });
});

// Test models.ts types and interfaces

describe('models.ts', () => {
  it('should define Equipment interface', () => {
    const equipment: EquipmentDetails = {
      id: Equipment.Dumbbells,
      name: 'Dumbbells',
      description: 'A pair of handheld weights used for various exercises.'
    };
    expect(equipment).toBeDefined();
    expect(equipment.id).toBe(Equipment.Dumbbells);
    expect(equipment.name).toBe('Dumbbells');
    expect(equipment.description).toBe('A pair of handheld weights used for various exercises.');
  });

  it('should define Exercise interface', () => {
    const exercise: ExerciseDetails = {
      id: 'push-up',
      title: 'Push-Up',
      muscles: [Muscles.Chest, Muscles.Triceps],
      equipment: [],
      description: 'A bodyweight exercise that targets the chest and triceps.'
    };
    expect(exercise).toBeDefined();
    expect(exercise.id).toBe('push-up');
    expect(exercise.title).toBe('Push-Up');
    expect(exercise.muscles).toEqual(['chest', 'triceps']);
    expect(exercise.equipment).toEqual([]);
    expect(exercise.description).toBe('A bodyweight exercise that targets the chest and triceps.');
  });

  it('should define WorkoutItem interface', () => {
    const workoutItem: WorkoutItem = {
      exercise: {
        id: 'push-up',
        title: 'Push-Up',
        muscles: [Muscles.Chest, Muscles.Triceps],
        equipment: [],
        description: 'A bodyweight exercise that targets the chest and triceps.'
      },
      sets: 3,
      reps: 10,
      weight: 0,
      time: '30s',
      notes: 'Keep your back straight.'
    };
    expect(workoutItem).toBeDefined();
    expect(workoutItem.exercise.id).toBe('push-up');
    expect(workoutItem.sets).toBe(3);
    expect(workoutItem.reps).toBe(10);
    expect(workoutItem.weight).toBe(0);
    expect(workoutItem.time).toBe('30s');
    expect(workoutItem.notes).toBe('Keep your back straight.');
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
            muscles: [Muscles.Chest, Muscles.Triceps],
            equipment: [],
            description: 'A bodyweight exercise that targets the chest and triceps.'
          },
          sets: 3,
          reps: 10,
          weight: 0,
          time: '30s',
          notes: 'Keep your back straight.'
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

// Test types.ts types and interfaces

describe('types.ts', () => {
  it('should define EquipmentDetails interface', () => {
    const equipment: EquipmentDetails = {
      id: Equipment.Dumbbells,
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
      muscles: [Muscles.Chest, Muscles.Triceps],
      equipment: [],
      description: 'A bodyweight exercise that targets the chest and triceps.'
    };
    expect(exercise).toBeDefined();
    expect(exercise.id).toBe('push-up');
    expect(exercise.title).toBe('Push-Up');
    expect(exercise.muscles).toEqual(['chest', 'triceps']);
    expect(exercise.equipment).toEqual([]);
    expect(exercise.description).toBe('A bodyweight exercise that targets the chest and triceps.');
  });

  it('should define WorkoutItem interface', () => {
    const workoutItem: WorkoutItem = {
      exercise: {
        id: 'push-up',
        title: 'Push-Up',
        muscles: [Muscles.Chest, Muscles.Triceps],
        equipment: [],
        description: 'A bodyweight exercise that targets the chest and triceps.'
      },
      sets: 3,
      reps: 10,
      weight: 0,
      time: '30s',
      notes: 'Keep your back straight.'
    };
    expect(workoutItem).toBeDefined();
    expect(workoutItem.exercise.id).toBe('push-up');
    expect(workoutItem.sets).toBe(3);
    expect(workoutItem.reps).toBe(10);
    expect(workoutItem.weight).toBe(0);
    expect(workoutItem.time).toBe('30s');
    expect(workoutItem.notes).toBe('Keep your back straight.');
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
            muscles: [Muscles.Chest, Muscles.Triceps],
            equipment: [],
            description: 'A bodyweight exercise that targets the chest and triceps.'
          },
          sets: 3,
          reps: 10,
          weight: 0,
          time: '30s',
          notes: 'Keep your back straight.'
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

// Test enums.ts

describe('Muscles enum', () => {
  it('should contain the expected muscle groups', () => {
    expect(Muscles.Abdominals).toBe('abdominals');
    expect(Muscles.Lats).toBe('lats');
    expect(Muscles.Biceps).toBe('biceps');
    expect(Muscles.Chest).toBe('chest');
    expect(Muscles.Glutes).toBe('glutes');
    expect(Muscles.Hamstrings).toBe('hamstrings');
    expect(Muscles.Quadriceps).toBe('quadriceps');
    expect(Muscles.Shoulders).toBe('shoulders');
    expect(Muscles.Triceps).toBe('triceps');
    expect(Muscles.LowerBack).toBe('lower_back');
    expect(Muscles.Calves).toBe('calves');
    expect(Muscles.Trapezius).toBe('trapezius');
    expect(Muscles.Abductors).toBe('abductors');
    expect(Muscles.Adductors).toBe('adductors');
    expect(Muscles.Forearms).toBe('forearms');
    expect(Muscles.Neck).toBe('neck');
  });
});

describe('Equipment enum', () => {
  it('should contain the expected equipment types', () => {
    expect(Equipment.BackExtensionMachine).toBe('back-extension-machine');
    expect(Equipment.AbdominalCrunchMachine).toBe('abdominal-crunch-machine');
    expect(Equipment.HipAbductorMachine).toBe('hip-abductor-machine');
    expect(Equipment.HipAdductorMachine).toBe('hip-adductor-machine');
    expect(Equipment.ShoulderPressMachine).toBe('shoulder-press-machine');
    expect(Equipment.SeatedLegCurlMachine).toBe('seated-leg-curl-machine');
    expect(Equipment.LegExtensionsMachine).toBe('leg-extensions-machine');
    expect(Equipment.RotaryTorsoMachine).toBe('rotary-torso-machine');
    expect(Equipment.Treadmill).toBe('treadmill');
    expect(Equipment.StationaryCycle).toBe('stationary-cycle');
    expect(Equipment.Dumbbells).toBe('dumbbells');
    expect(Equipment.Bench).toBe('bench');
    expect(Equipment.LatPulldownMachine).toBe('lat-pulldown-machine');
    expect(Equipment.CableMachine).toBe('cable-machine');
    expect(Equipment.SeatedRowingMachine).toBe('seated-rowing-machine');
    expect(Equipment.LegPressMachine).toBe('leg-press-machine');
  });
});