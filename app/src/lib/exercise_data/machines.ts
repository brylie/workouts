import { Equipment, Muscles } from "$lib/enums";
import type { ExerciseDetails } from "$lib/types";


/**
 * A collection of predefined exercises that can be used to generate workouts.
 * Each exercise includes the primary muscle groups it targets.
 */
export const machineExercises: ExerciseDetails[] = [
    {
      id: 'back-extension',
      title: 'Back Extension',
      muscles: [Muscles.LowerBack, Muscles.Glutes],
      equipment: [Equipment.BackExtensionMachine],
      description: 'Exercise targeting the lower back muscles and glutes by extending the back from a bent position.',
      metrics: {
        hasSets: true,
        hasReps: true,
        hasWeight: false,
        hasTime: false
      }
    },
    {
      id: 'abdominal-crunch',
      title: 'Abdominal Crunch',
      muscles: [Muscles.Abdominals],
      equipment: [Equipment.AbdominalCrunchMachine],
      description: 'A classic core exercise that targets the abdominal muscles through controlled flexion of the spine.',
      metrics: {
        hasSets: true,
        hasReps: true,
        hasWeight: false,
        hasTime: false
      }
    },
    {
      id: 'hip-abductor',
      title: 'Hip Abductor',
      muscles: [Muscles.Abductors, Muscles.Glutes],
      equipment: [Equipment.HipAbductorMachine],
      description: 'Exercise that works the outer thigh muscles by moving the leg away from the midline of the body.',
      metrics: {
        hasSets: true,
        hasReps: true,
        hasWeight: true,
        hasTime: false
      }
    },
    {
      id: 'hip-adductor',
      title: 'Hip Adductor',
      muscles: [Muscles.Adductors],
      equipment: [Equipment.HipAdductorMachine],
      description: 'Exercise that strengthens the inner thigh muscles by bringing the legs toward the midline of the body.',
      metrics: {
        hasSets: true,
        hasReps: true,
        hasWeight: true,
        hasTime: false
      }
    },
    {
      id: 'shoulder-press',
      title: 'Shoulder Press',
      muscles: [Muscles.Shoulders, Muscles.Triceps],
      equipment: [Equipment.ShoulderPressMachine],
      description: 'Overhead pressing movement that primarily targets the deltoid muscles with secondary activation of the triceps.',
      metrics: {
        hasSets: true,
        hasReps: true,
        hasWeight: true,
        hasTime: false
      }
    },
    {
      id: 'seated-leg-curl',
      title: 'Seated Leg Curl',
      muscles: [Muscles.Hamstrings],
      equipment: [Equipment.SeatedLegCurlMachine],
      description: 'Exercise performed on a machine that targets the hamstrings through leg flexion.',
      metrics: {
        hasSets: true,
        hasReps: true,
        hasWeight: true,
        hasTime: false
      }
    },
    {
      id: 'leg-extensions',
      title: 'Leg Extensions',
      muscles: [Muscles.Quadriceps],
      equipment: [Equipment.LegExtensionsMachine],
      description: 'Isolation exercise that targets the quadriceps by extending the knee joint against resistance.',
      metrics: {
        hasSets: true,
        hasReps: true,
        hasWeight: true,
        hasTime: false
      }
    },
    {
      id: 'rotary-torso',
      title: 'Rotary Torso',
      muscles: [Muscles.Abdominals, Muscles.LowerBack],
      equipment: [Equipment.RotaryTorsoMachine],
      description: 'Core exercise that focuses on rotational strength and targets the obliques and lower back muscles.',
      metrics: {
        hasSets: true,
        hasReps: true,
        hasWeight: true,
        hasTime: false
      }
    },
    {
      id: 'treadmill',
      title: 'Treadmill',
      muscles: [Muscles.Quadriceps, Muscles.Hamstrings, Muscles.Glutes, Muscles.Calves],
      equipment: [Equipment.Treadmill],
      description: 'Cardio exercise that primarily works the lower body muscles and cardiovascular system.',
      metrics: {
        hasSets: false,
        hasReps: false,
        hasWeight: false,
        hasTime: true,
        hasDistance: true,
        hasSpeed: true,
        hasIncline: true,
        hasCalories: true,
        hasHeartRate: true
      }
    },
    {
      id: 'cycle',
      title: 'Cycle',
      muscles: [Muscles.Quadriceps, Muscles.Hamstrings, Muscles.Calves],
      equipment: [Equipment.StationaryCycle],
      description: 'Low-impact cardio exercise that primarily targets the leg muscles.',
      metrics: {
        hasSets: false,
        hasReps: false,
        hasWeight: false,
        hasTime: true,
        hasDistance: true,
        hasResistance: true,
        hasSpeed: true,
        hasCalories: true,
        hasHeartRate: true
      }
    },
    {
      id: 'lat-pulldown',
      title: 'Lat Pulldown',
      muscles: [Muscles.Lats, Muscles.Biceps, Muscles.Shoulders],
      equipment: [Equipment.LatPulldownMachine],
      description: 'Pulling exercise that targets the latissimus dorsi muscles of the back with secondary activation of the biceps.',
      metrics: {
        hasSets: true,
        hasReps: true,
        hasWeight: true,
        hasTime: false
      }
    },
    {
      id: 'seated-row',
      title: 'Seated Row',
      muscles: [Muscles.Lats, Muscles.Trapezius, Muscles.Biceps],
      equipment: [Equipment.SeatedRowingMachine],
      description: 'Compound pulling exercise that works the middle back, lats, and arms by rowing a weight toward the torso.',
      metrics: {
        hasSets: true,
        hasReps: true,
        hasWeight: true,
        hasTime: false
      }
    },
    {
      id: 'leg-press',
      title: 'Leg Press',
      muscles: [Muscles.Quadriceps, Muscles.Hamstrings, Muscles.Glutes],
      equipment: [Equipment.LegPressMachine],
      description: 'Compound lower body exercise performed on a machine where weight is pushed away from the body using the legs.',
      metrics: {
        hasSets: true,
        hasReps: true,
        hasWeight: true,
        hasTime: false
      }
    }
  ];