import { Equipment } from "$lib/equipment";
import type { ExerciseDetails } from "$lib/exercises";
import { Muscles } from "$lib/muscles";

/**
 * A collection of dumbbell exercises that can be used to generate workouts.
 * Each exercise includes the primary muscle groups it targets.
 */
export const dumbbellExercises: ExerciseDetails[] = [
  // Arm exercises
  {
    id: "dumbbell-bicep-curl",
    title: "Dumbbell Bicep Curl",
    muscles: [Muscles.BICEPS, Muscles.FOREARMS],
    equipment: [Equipment.DUMBBELLS],
    description:
      "Standard bicep curl performed with dumbbells, targeting the biceps brachii.",
    metrics: {
      hasSets: true,
      hasReps: true,
      hasWeight: true,
      hasTime: false,
    },
  },
  {
    id: "dumbbell-outward-curl",
    title: "Dumbbell Outward Curl",
    muscles: [Muscles.BICEPS, Muscles.FOREARMS],
    equipment: [Equipment.DUMBBELLS],
    description:
      "Bicep curl with arms at 45 degrees to target the biceps brachii and forearms.",
    metrics: {
      hasSets: true,
      hasReps: true,
      hasWeight: true,
      hasTime: false,
    },
  },
  {
    id: "dumbbell-hammer-curl",
    title: "Dumbbell Hammer Curl",
    muscles: [Muscles.BICEPS, Muscles.FOREARMS],
    equipment: [Equipment.DUMBBELLS],
    description:
      "Bicep curl variation with palms facing each other, emphasizing the brachialis and forearms.",
    metrics: {
      hasSets: true,
      hasReps: true,
      hasWeight: true,
      hasTime: false,
    },
  },
  {
    id: "dumbbell-isometric-hold",
    title: "Dumbbell Isometric Hold",
    muscles: [Muscles.BICEPS],
    equipment: [Equipment.DUMBBELLS],
    description:
      "Holding a dumbbell in a fixed position in front of you to engage the biceps.",
    metrics: {
      hasSets: true,
      hasReps: false,
      hasWeight: false,
      hasTime: true,
    },
  },
  {
    id: "dumbbell-around-the-world",
    title: "Dumbbell Around the World",
    muscles: [Muscles.BICEPS, Muscles.SHOULDERS],
    equipment: [Equipment.DUMBBELLS],
    description:
      "Circular motion with dumbbells to engage the biceps and shoulders.",
    metrics: {
      hasSets: true,
      hasReps: true,
      hasWeight: true,
      hasTime: false,
    },
  },
  {
    id: "dumbbell-concentration-curl",
    title: "Dumbbell Concentration Curl",
    muscles: [Muscles.BICEPS],
    equipment: [Equipment.DUMBBELLS],
    description:
      "Isolation exercise focusing on the biceps by curling with one arm at a time.",
    metrics: {
      hasSets: true,
      hasReps: true,
      hasWeight: true,
      hasTime: false,
    },
  },
  {
    id: "dumbbell-supinating-curl",
    title: "Dumbbell Supinating Curl",
    muscles: [Muscles.BICEPS, Muscles.FOREARMS],
    equipment: [Equipment.DUMBBELLS],
    description:
      "Bicep curl with a twist at the top to engage the biceps fully.",
    metrics: {
      hasSets: true,
      hasReps: true,
      hasWeight: true,
      hasTime: false,
    },
  },
  {
    id: "dumbbell-cross-curl",
    title: "Dumbbell Cross Curl",
    muscles: [Muscles.BICEPS, Muscles.FOREARMS],
    equipment: [Equipment.DUMBBELLS],
    description:
      "Bicep curl with a cross-body motion to target the biceps brachii.",
    metrics: {
      hasSets: true,
      hasReps: true,
      hasWeight: true,
      hasTime: false,
    },
  },
  {
    id: "dumbbell-reverse-curl",
    title: "Dumbbell Reverse Curl",
    muscles: [Muscles.BICEPS, Muscles.FOREARMS],
    equipment: [Equipment.DUMBBELLS],
    description:
      "Curl performed with palms facing down, emphasizing forearm development.",
    metrics: {
      hasSets: true,
      hasReps: true,
      hasWeight: true,
      hasTime: false,
    },
    tips: [
      "Keep your elbows close to your body.",
      "Control the weight on the way down.",
      "Avoid swinging the weights.",
    ],
  },
  {
    id: "dumbbell-wrist-curl",
    title: "Dumbbell Wrist Curl",
    muscles: [Muscles.FOREARMS],
    equipment: [Equipment.DUMBBELLS],
    description: "Wrist flexion exercise targeting the forearm muscles.",
    metrics: {
      hasSets: true,
      hasReps: true,
      hasWeight: true,
      hasTime: false,
    },
  },
  {
    id: "dumbbell-wrist-extension",
    title: "Dumbbell Wrist Extension",
    muscles: [Muscles.FOREARMS],
    equipment: [Equipment.DUMBBELLS],
    description: "Wrist extension exercise targeting the forearm extensors.",
    metrics: {
      hasSets: true,
      hasReps: true,
      hasWeight: true,
      hasTime: false,
    },
  },
  {
    id: "dumbbell-skull-crusher",
    title: "Dumbbell Skull Crusher",
    muscles: [Muscles.TRICEPS],
    equipment: [Equipment.DUMBBELLS, Equipment.BENCH],
    description: "Lying tricep extension with dumbbells to target the triceps.",
    metrics: {
      hasSets: true,
      hasReps: true,
      hasWeight: true,
      hasTime: false,
    },
  },
  {
    id: "dumbbell-overhead-tricep-extension",
    title: "Dumbbell Tricep Extension",
    muscles: [Muscles.TRICEPS],
    equipment: [Equipment.DUMBBELLS],
    description: "Overhead extension targeting all three heads of the triceps.",
    metrics: {
      hasSets: true,
      hasReps: true,
      hasWeight: true,
      hasTime: false,
    },
  },
  {
    id: "dumbbell-kickback",
    title: "Dumbbell Kickback",
    muscles: [Muscles.TRICEPS],
    equipment: [Equipment.DUMBBELLS],
    description: "Tricep isolation exercise performed in a bent-over position.",
    metrics: {
      hasSets: true,
      hasReps: true,
      hasWeight: true,
      hasTime: false,
    },
  },
  {
    id: "dumbbell-waiter-curl",
    title: "Dumbbell Waiter Curl",
    muscles: [Muscles.BICEPS, Muscles.TRICEPS],
    equipment: [Equipment.DUMBBELLS],
    description:
      "Curl with both hands holding a dumbbell in a waiter position, engaging both biceps and triceps.",
    metrics: {
      hasSets: true,
      hasReps: true,
      hasWeight: true,
      hasTime: false,
    },
  },
  {
    id: "dumbbell-zottman-curl",
    title: "Dumbbell Zottman Curl",
    muscles: [Muscles.BICEPS, Muscles.TRICEPS, Muscles.FOREARMS],
    equipment: [Equipment.DUMBBELLS],
    description:
      "Bicep curl palm up on the way up with a twist to palm down on the way down to target both biceps and forearms.",
    metrics: {
      hasSets: true,
      hasReps: true,
      hasWeight: true,
      hasTime: false,
    },
  },
  {
    id: "dumbbell-forearm-rotations",
    title: "Dumbbell Forearm Rotations",
    muscles: [Muscles.FOREARMS],
    equipment: [Equipment.DUMBBELLS],
    description:
      "Rotational movement of the forearms holding dumbbells horizontally in front of you to improve wrist and forearm strength.",
    metrics: {
      hasSets: true,
      hasReps: true,
      hasWeight: true,
      hasTime: false,
    },
  },
  {
    id: "dumbbell-rotational-curl",
    title: "Dumbbell Rotational Curl",
    muscles: [Muscles.BICEPS, Muscles.FOREARMS],
    equipment: [Equipment.DUMBBELLS],
    description:
      "Bicep curl with a rotational motion to engage both biceps and forearms.",
    metrics: {
      hasSets: true,
      hasReps: true,
      hasWeight: true,
      hasTime: false,
    },
  },
  // Shoulder exercises
  {
    id: "dumbbell-shoulder-press",
    title: "Dumbbell Shoulder Press",
    muscles: [Muscles.SHOULDERS, Muscles.TRICEPS],
    equipment: [Equipment.DUMBBELLS],
    description:
      "Overhead pressing movement targeting the deltoids and triceps.",
    metrics: {
      hasSets: true,
      hasReps: true,
      hasWeight: true,
      hasTime: false,
    },
  },
  {
    id: "dumbbell-lateral-raise",
    title: "Dumbbell Lateral Raise",
    muscles: [Muscles.SHOULDERS],
    equipment: [Equipment.DUMBBELLS],
    description:
      "Isolation exercise targeting the lateral deltoids through sideways arm raises.",
    metrics: {
      hasSets: true,
      hasReps: true,
      hasWeight: true,
      hasTime: false,
    },
  },
  {
    id: "dumbbell-front-raise",
    title: "Dumbbell Front Raise",
    muscles: [Muscles.SHOULDERS],
    equipment: [Equipment.DUMBBELLS],
    description:
      "Isolation exercise targeting the front deltoids through forward arm raises.",
    metrics: {
      hasSets: true,
      hasReps: true,
      hasWeight: true,
      hasTime: false,
    },
  },
  // Chest exercises
  {
    id: "dumbbell-bench-press",
    title: "Dumbbell Bench Press",
    muscles: [Muscles.CHEST, Muscles.SHOULDERS, Muscles.TRICEPS],
    equipment: [Equipment.DUMBBELLS, Equipment.BENCH],
    description:
      "Compound pressing movement targeting the chest, front deltoids, and triceps.",
    metrics: {
      hasSets: true,
      hasReps: true,
      hasWeight: true,
      hasTime: false,
    },
  },
  {
    id: "dumbbell-fly",
    title: "Dumbbell Fly",
    muscles: [Muscles.CHEST],
    equipment: [Equipment.DUMBBELLS, Equipment.BENCH],
    description:
      "Isolation exercise targeting chest through a wide arc movement.",
    metrics: {
      hasSets: true,
      hasReps: true,
      hasWeight: true,
      hasTime: false,
    },
  },
  // Back exercises
  {
    id: "dumbbell-row",
    title: "Dumbbell Row",
    muscles: [Muscles.LATS, Muscles.TRAPEZIUS, Muscles.BICEPS],
    equipment: [Equipment.DUMBBELLS, Equipment.BENCH],
    description: "Single-arm rowing movement targeting the back muscles.",
    metrics: {
      hasSets: true,
      hasReps: true,
      hasWeight: true,
      hasTime: false,
    },
  },
  {
    id: "dumbbell-pullover",
    title: "Dumbbell Pullover",
    muscles: [Muscles.LATS, Muscles.CHEST],
    equipment: [Equipment.DUMBBELLS, Equipment.BENCH],
    description:
      "Exercise targeting both back and chest through an arc movement over the head.",
    metrics: {
      hasSets: true,
      hasReps: true,
      hasWeight: true,
      hasTime: false,
    },
  },
  // Leg exercises
  {
    id: "dumbbell-squat",
    title: "Dumbbell Squat",
    muscles: [Muscles.QUADRICEPS, Muscles.HAMSTRINGS, Muscles.GLUTES],
    equipment: [Equipment.DUMBBELLS],
    description: "Compound lower body exercise holding dumbbells at sides.",
    metrics: {
      hasSets: true,
      hasReps: true,
      hasWeight: true,
      hasTime: false,
    },
  },
  {
    id: "dumbbell-goblet-squat",
    title: "Dumbbell Goblet Squat",
    muscles: [Muscles.QUADRICEPS, Muscles.HAMSTRINGS, Muscles.GLUTES],
    equipment: [Equipment.DUMBBELLS],
    description: "Squat variation holding a dumbbell close to the chest.",
    metrics: {
      hasSets: true,
      hasReps: true,
      hasWeight: true,
      hasTime: false,
    },
  },
  {
    id: "dumbbell-lunge",
    title: "Dumbbell Lunge",
    muscles: [Muscles.QUADRICEPS, Muscles.HAMSTRINGS, Muscles.GLUTES],
    equipment: [Equipment.DUMBBELLS],
    description:
      "Unilateral lower body exercise stepping forward with dumbbells.",
    metrics: {
      hasSets: true,
      hasReps: true,
      hasWeight: true,
      hasTime: false,
    },
  },
  {
    id: "dumbbell-romanian-deadlift",
    title: "Dumbbell Romanian Deadlift",
    muscles: [Muscles.HAMSTRINGS, Muscles.GLUTES, Muscles.LOWER_BACK],
    equipment: [Equipment.DUMBBELLS],
    description: "Hip-hinge movement targeting posterior chain muscles.",
    metrics: {
      hasSets: true,
      hasReps: true,
      hasWeight: true,
      hasTime: false,
    },
  },
  {
    id: "dumbbell-calf-raise",
    title: "Dumbbell Calf Raise",
    muscles: [Muscles.CALVES],
    equipment: [Equipment.DUMBBELLS],
    description:
      "Standing calf raise while holding dumbbells for added resistance.",
    metrics: {
      hasSets: true,
      hasReps: true,
      hasWeight: true,
      hasTime: false,
    },
  },
  // Core exercises
  {
    id: "dumbbell-side-bend",
    title: "Dumbbell Side Bend",
    muscles: [Muscles.OBLIQUES],
    equipment: [Equipment.DUMBBELLS],
    description:
      "Core exercise targeting the obliques through lateral bending.",
    metrics: {
      hasSets: true,
      hasReps: true,
      hasWeight: true,
      hasTime: false,
    },
  },
  {
    id: "dumbbell-woodchopper",
    title: "Dumbbell Woodchopper",
    muscles: [Muscles.OBLIQUES, Muscles.LATS],
    equipment: [Equipment.DUMBBELLS],
    description: "Rotational core exercise mimicking a chopping motion.",
    metrics: {
      hasSets: true,
      hasReps: true,
      hasWeight: true,
      hasTime: false,
    },
  },
  {
    id: "dumbbell-russian-twist",
    title: "Dumbbell Russian Twist",
    muscles: [Muscles.OBLIQUES, Muscles.ABDOMINALS],
    equipment: [Equipment.DUMBBELLS],
    description:
      "Core exercise targeting the obliques through rotational movement.",
    metrics: {
      hasSets: true,
      hasReps: true,
      hasWeight: true,
      hasTime: false,
    },
  },
];
