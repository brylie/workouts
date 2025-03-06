import type { Exercise } from './types';
import { Muscles, EquipmentType } from './enums';

/**
 * A collection of predefined exercises that can be used to generate workouts.
 * Each exercise includes the primary muscle groups it targets.
 */
export const exercises: Exercise[] = [
  {
    id: 'back-extension',
    title: 'Back Extension',
    muscles: [Muscles.LowerBack, Muscles.Glutes],
    equipment: [EquipmentType.BackExtensionMachine],
    description: 'Exercise targeting the lower back muscles and glutes by extending the back from a bent position.'
  },
  {
    id: 'abdominal-crunch',
    title: 'Abdominal Crunch',
    muscles: [Muscles.Abdominals],
    equipment: [EquipmentType.AbdominalCrunchMachine],
    description: 'A classic core exercise that targets the abdominal muscles through controlled flexion of the spine.'
  },
  {
    id: 'hip-abductor',
    title: 'Hip Abductor',
    muscles: [Muscles.Abductors, Muscles.Glutes],
    equipment: [EquipmentType.HipAbductorMachine],
    description: 'Exercise that works the outer thigh muscles by moving the leg away from the midline of the body.'
  },
  {
    id: 'hip-adductor',
    title: 'Hip Adductor',
    muscles: [Muscles.Adductors],
    equipment: [EquipmentType.HipAdductorMachine],
    description: 'Exercise that strengthens the inner thigh muscles by bringing the legs toward the midline of the body.'
  },
  {
    id: 'shoulder-press',
    title: 'Shoulder Press',
    muscles: [Muscles.Shoulders, Muscles.Triceps],
    equipment: [EquipmentType.ShoulderPressMachine],
    description: 'Overhead pressing movement that primarily targets the deltoid muscles with secondary activation of the triceps.'
  },
  {
    id: 'seated-leg-curl',
    title: 'Seated Leg Curl',
    muscles: [Muscles.Hamstrings],
    equipment: [EquipmentType.SeatedLegCurlMachine],
    description: 'Exercise performed on a machine that targets the hamstrings through leg flexion.'
  },
  {
    id: 'leg-extensions',
    title: 'Leg Extensions',
    muscles: [Muscles.Quadriceps],
    equipment: [EquipmentType.LegExtensionsMachine],
    description: 'Isolation exercise that targets the quadriceps by extending the knee joint against resistance.'
  },
  {
    id: 'rotary-torso',
    title: 'Rotary Torso',
    muscles: [Muscles.Abdominals, Muscles.LowerBack],
    equipment: [EquipmentType.RotaryTorsoMachine],
    description: 'Core exercise that focuses on rotational strength and targets the obliques and lower back muscles.'
  },
  {
    id: 'treadmill',
    title: 'Treadmill',
    muscles: [Muscles.Quadriceps, Muscles.Hamstrings, Muscles.Glutes, Muscles.Calves],
    equipment: [EquipmentType.Treadmill],
    description: 'Cardio exercise that primarily works the lower body muscles and cardiovascular system.'
  },
  {
    id: 'cycle',
    title: 'Cycle',
    muscles: [Muscles.Quadriceps, Muscles.Hamstrings, Muscles.Calves],
    equipment: [EquipmentType.StationaryCycle],
    description: 'Low-impact cardio exercise that primarily targets the leg muscles.'
  },
  {
    id: 'lat-pulldown',
    title: 'Lat Pulldown',
    muscles: [Muscles.Lats, Muscles.Biceps, Muscles.Shoulders],
    equipment: [EquipmentType.LatPulldownMachine],
    description: 'Pulling exercise that targets the latissimus dorsi muscles of the back with secondary activation of the biceps.'
  },
  {
    id: 'seated-row',
    title: 'Seated Row',
    muscles: [Muscles.Lats, Muscles.Trapezius, Muscles.Biceps],
    equipment: [EquipmentType.SeatedRowingMachine],
    description: 'Compound pulling exercise that works the middle back, lats, and arms by rowing a weight toward the torso.'
  },
  {
    id: 'leg-press',
    title: 'Leg Press',
    muscles: [Muscles.Quadriceps, Muscles.Hamstrings, Muscles.Glutes],
    equipment: [EquipmentType.LegPressMachine],
    description: 'Compound lower body exercise performed on a machine where weight is pushed away from the body using the legs.'
  }
];

/**
 * Get a random selection of exercises for workout generation
 * @param count The number of exercises to include (defaults to 5)
 * @returns An array of randomly selected exercises
 */
export function getRandomExercises(count: number = 5): Exercise[] {
  const shuffled = [...exercises].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

/**
 * Get exercises that target a specific muscle group
 * @param muscle The muscle group to target
 * @returns An array of exercises that target the specified muscle
 */
export function getExercisesByMuscle(muscle: Muscles): Exercise[] {
  return exercises.filter(exercise => exercise.muscles.includes(muscle));
}

/**
 * Get exercises that use specific equipment
 * @param equipmentType The type of equipment to filter by
 * @returns An array of exercises that use the specified equipment
 */
export function getExercisesByEquipment(equipmentType: EquipmentType): Exercise[] {
  return exercises.filter(exercise => 
    exercise.equipment?.includes(equipmentType)
  );
}