import type { ExerciseDetails, WorkoutItem } from './types';
import { Muscles, Equipment } from './enums';

/**
 * A collection of predefined exercises that can be used to generate workouts.
 * Each exercise includes the primary muscle groups it targets.
 */
export const exercises: ExerciseDetails[] = [
  {
    id: 'back-extension',
    title: 'Back Extension',
    muscles: [Muscles.LowerBack, Muscles.Glutes],
    equipment: [Equipment.BackExtensionMachine],
    description: 'Exercise targeting the lower back muscles and glutes by extending the back from a bent position.',
    hasSets: true,
    hasReps: true,
    hasWeight: true,
    hasTime: false
  },
  {
    id: 'abdominal-crunch',
    title: 'Abdominal Crunch',
    muscles: [Muscles.Abdominals],
    equipment: [Equipment.AbdominalCrunchMachine],
    description: 'A classic core exercise that targets the abdominal muscles through controlled flexion of the spine.',
    hasSets: true,
    hasReps: true,
    hasWeight: true,
    hasTime: false
  },
  {
    id: 'hip-abductor',
    title: 'Hip Abductor',
    muscles: [Muscles.Abductors, Muscles.Glutes],
    equipment: [Equipment.HipAbductorMachine],
    description: 'Exercise that works the outer thigh muscles by moving the leg away from the midline of the body.',
    hasSets: true,
    hasReps: true,
    hasWeight: true,
    hasTime: false
  },
  {
    id: 'hip-adductor',
    title: 'Hip Adductor',
    muscles: [Muscles.Adductors],
    equipment: [Equipment.HipAdductorMachine],
    description: 'Exercise that strengthens the inner thigh muscles by bringing the legs toward the midline of the body.',
    hasSets: true,
    hasReps: true,
    hasWeight: true,
    hasTime: false
  },
  {
    id: 'shoulder-press',
    title: 'Shoulder Press',
    muscles: [Muscles.Shoulders, Muscles.Triceps],
    equipment: [Equipment.ShoulderPressMachine],
    description: 'Overhead pressing movement that primarily targets the deltoid muscles with secondary activation of the triceps.',
    hasSets: true,
    hasReps: true,
    hasWeight: true,
    hasTime: false
  },
  {
    id: 'seated-leg-curl',
    title: 'Seated Leg Curl',
    muscles: [Muscles.Hamstrings],
    equipment: [Equipment.SeatedLegCurlMachine],
    description: 'Exercise performed on a machine that targets the hamstrings through leg flexion.',
    hasSets: true,
    hasReps: true,
    hasWeight: true,
    hasTime: false
  },
  {
    id: 'leg-extensions',
    title: 'Leg Extensions',
    muscles: [Muscles.Quadriceps],
    equipment: [Equipment.LegExtensionsMachine],
    description: 'Isolation exercise that targets the quadriceps by extending the knee joint against resistance.',
    hasSets: true,
    hasReps: true,
    hasWeight: true,
    hasTime: false
  },
  {
    id: 'rotary-torso',
    title: 'Rotary Torso',
    muscles: [Muscles.Abdominals, Muscles.LowerBack],
    equipment: [Equipment.RotaryTorsoMachine],
    description: 'Core exercise that focuses on rotational strength and targets the obliques and lower back muscles.',
    hasSets: true,
    hasReps: true,
    hasWeight: true,
    hasTime: false
  },
  {
    id: 'treadmill',
    title: 'Treadmill',
    muscles: [Muscles.Quadriceps, Muscles.Hamstrings, Muscles.Glutes, Muscles.Calves],
    equipment: [Equipment.Treadmill],
    description: 'Cardio exercise that primarily works the lower body muscles and cardiovascular system.',
    hasSets: false,
    hasReps: false,
    hasWeight: false,
    hasTime: true
  },
  {
    id: 'cycle',
    title: 'Cycle',
    muscles: [Muscles.Quadriceps, Muscles.Hamstrings, Muscles.Calves],
    equipment: [Equipment.StationaryCycle],
    description: 'Low-impact cardio exercise that primarily targets the leg muscles.',
    hasSets: false,
    hasReps: false,
    hasWeight: false,
    hasTime: true
  },
  {
    id: 'lat-pulldown',
    title: 'Lat Pulldown',
    muscles: [Muscles.Lats, Muscles.Biceps, Muscles.Shoulders],
    equipment: [Equipment.LatPulldownMachine],
    description: 'Pulling exercise that targets the latissimus dorsi muscles of the back with secondary activation of the biceps.',
    hasSets: true,
    hasReps: true,
    hasWeight: true,
    hasTime: false
  },
  {
    id: 'seated-row',
    title: 'Seated Row',
    muscles: [Muscles.Lats, Muscles.Trapezius, Muscles.Biceps],
    equipment: [Equipment.SeatedRowingMachine],
    description: 'Compound pulling exercise that works the middle back, lats, and arms by rowing a weight toward the torso.',
    hasSets: true,
    hasReps: true,
    hasWeight: true,
    hasTime: false
  },
  {
    id: 'leg-press',
    title: 'Leg Press',
    muscles: [Muscles.Quadriceps, Muscles.Hamstrings, Muscles.Glutes],
    equipment: [Equipment.LegPressMachine],
    description: 'Compound lower body exercise performed on a machine where weight is pushed away from the body using the legs.',
    hasSets: true,
    hasReps: true,
    hasWeight: true,
    hasTime: false
  }
];

/**
 * Get a random selection of exercises for workout generation
 * @param count The number of exercises to include (defaults to 5)
 * @returns An array of randomly selected exercises
 */
export function getRandomExercises(count: number = 5): ExerciseDetails[] {
  const shuffled = [...exercises].sort(() => 0.5 - Math.random());
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
        sets: 3, // These default values will be overridden by the UI
        reps: 12,
        completed: false
    }));
}

/**
 * Get exercises that target a specific muscle group
 * @param muscle The muscle group to target
 * @returns An array of exercises that target the specified muscle
 */
export function getExercisesByMuscle(muscle: Muscles): ExerciseDetails[] {
  return exercises.filter(exercise => exercise.muscles.includes(muscle));
}

/**
 * Get exercises that use specific equipment
 * @param equipmentType The type of equipment to filter by
 * @returns An array of exercises that use the specified equipment
 */
export function getExercisesByEquipment(equipmentType: Equipment): ExerciseDetails[] {
  return exercises.filter(exercise => 
    exercise.equipment?.includes(equipmentType)
  );
}