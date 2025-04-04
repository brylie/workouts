import { Equipment } from "$lib/equipment";
import type { ExerciseDetails } from "$lib/exercises";
import { Muscles } from "$lib/muscles";

/**
 * A collection of predefined exercises that can be used to generate workouts.
 * Each exercise includes the primary muscle groups it targets.
 */
export const machineExercises: ExerciseDetails[] = [
  {
    id: "back-extension",
    title: "Back Extension",
    muscles: [Muscles.LOWER_BACK, Muscles.GLUTES],
    equipment: [Equipment.BACK_EXTENSION_MACHINE],
    description:
      "Exercise targeting the lower back muscles and glutes by extending the back from a bent position.",
    metrics: {
      hasSets: true,
      hasReps: true,
      hasWeight: false,
      hasTime: false,
    },
  },
  {
    id: "abdominal-crunch",
    title: "Abdominal Crunch",
    muscles: [Muscles.ABDOMINALS],
    equipment: [Equipment.ABDOMINAL_CRUNCH_MACHINE],
    description:
      "A classic core exercise that targets the abdominal muscles through controlled flexion of the spine.",
    metrics: {
      hasSets: true,
      hasReps: true,
      hasWeight: false,
      hasTime: false,
    },
  },
  {
    id: "hip-abductor",
    title: "Hip Abductor",
    muscles: [Muscles.ABDUCTORS, Muscles.GLUTES],
    equipment: [Equipment.HIP_ABDUCTOR_MACHINE],
    description:
      "Exercise that works the outer thigh muscles by moving the leg away from the midline of the body.",
    metrics: {
      hasSets: true,
      hasReps: true,
      hasWeight: true,
      hasTime: false,
    },
  },
  {
    id: "hip-adductor",
    title: "Hip Adductor",
    muscles: [Muscles.ADDUCTORS],
    equipment: [Equipment.HIP_ADDUCTOR_MACHINE],
    description:
      "Exercise that strengthens the inner thigh muscles by bringing the legs toward the midline of the body.",
    metrics: {
      hasSets: true,
      hasReps: true,
      hasWeight: true,
      hasTime: false,
    },
  },
  {
    id: "shoulder-press",
    title: "Shoulder Press",
    muscles: [Muscles.SHOULDERS, Muscles.TRICEPS],
    equipment: [Equipment.SHOULDER_PRESS_MACHINE],
    description:
      "Overhead pressing movement that primarily targets the deltoid muscles with secondary activation of the triceps.",
    metrics: {
      hasSets: true,
      hasReps: true,
      hasWeight: true,
      hasTime: false,
    },
  },
  {
    id: "seated-leg-curl",
    title: "Seated Leg Curl",
    muscles: [Muscles.HAMSTRINGS],
    equipment: [Equipment.SEATED_LEG_CURL_MACHINE],
    description:
      "Exercise performed on a machine that targets the hamstrings through leg flexion.",
    metrics: {
      hasSets: true,
      hasReps: true,
      hasWeight: true,
      hasTime: false,
    },
  },
  {
    id: "leg-extensions",
    title: "Leg Extensions",
    muscles: [Muscles.QUADRICEPS],
    equipment: [Equipment.LEG_EXTENSIONS_MACHINE],
    description:
      "Isolation exercise that targets the quadriceps by extending the knee joint against resistance.",
    metrics: {
      hasSets: true,
      hasReps: true,
      hasWeight: true,
      hasTime: false,
    },
  },
  {
    id: "rotary-torso",
    title: "Rotary Torso",
    muscles: [Muscles.ABDOMINALS, Muscles.LOWER_BACK],
    equipment: [Equipment.ROTARY_TORSO_MACHINE],
    description:
      "Core exercise that focuses on rotational strength and targets the obliques and lower back muscles.",
    metrics: {
      hasSets: true,
      hasReps: true,
      hasWeight: true,
      hasTime: false,
    },
  },
  {
    id: "treadmill",
    title: "Treadmill",
    muscles: [
      Muscles.QUADRICEPS,
      Muscles.HAMSTRINGS,
      Muscles.GLUTES,
      Muscles.CALVES,
    ],
    equipment: [Equipment.TREADMILL],
    description:
      "Cardio exercise that primarily works the lower body muscles and cardiovascular system.",
    metrics: {
      hasSets: false,
      hasReps: false,
      hasWeight: false,
      hasTime: true,
      hasDistance: true,
      hasSpeed: true,
      hasIncline: true,
      hasCalories: true,
      hasHeartRate: true,
    },
  },
  {
    id: "cycle",
    title: "Cycle",
    muscles: [Muscles.QUADRICEPS, Muscles.HAMSTRINGS, Muscles.CALVES],
    equipment: [Equipment.STATIONARY_CYCLE],
    description:
      "Low-impact cardio exercise that primarily targets the leg muscles.",
    metrics: {
      hasSets: false,
      hasReps: false,
      hasWeight: false,
      hasTime: true,
      hasDistance: true,
      hasResistance: true,
      hasSpeed: true,
      hasCalories: true,
      hasHeartRate: true,
    },
  },
  {
    id: "lat-pulldown",
    title: "Lat Pulldown",
    muscles: [Muscles.LATS, Muscles.BICEPS, Muscles.SHOULDERS],
    equipment: [Equipment.LAT_PULLDOWN_MACHINE],
    description:
      "Pulling exercise that targets the latissimus dorsi muscles of the back with secondary activation of the biceps.",
    metrics: {
      hasSets: true,
      hasReps: true,
      hasWeight: true,
      hasTime: false,
    },
  },
  {
    id: "seated-row",
    title: "Seated Row",
    muscles: [Muscles.LATS, Muscles.TRAPEZIUS, Muscles.BICEPS],
    equipment: [Equipment.SEATED_ROWING_MACHINE],
    description:
      "Compound pulling exercise that works the middle back, lats, and arms by rowing a weight toward the torso.",
    metrics: {
      hasSets: true,
      hasReps: true,
      hasWeight: true,
      hasTime: false,
    },
  },
  {
    id: "leg-press",
    title: "Leg Press",
    muscles: [Muscles.QUADRICEPS, Muscles.HAMSTRINGS, Muscles.GLUTES],
    equipment: [Equipment.LEG_PRESS_MACHINE],
    description:
      "Compound lower body exercise performed on a machine where weight is pushed away from the body using the legs.",
    metrics: {
      hasSets: true,
      hasReps: true,
      hasWeight: true,
      hasTime: false,
    },
  },
];
