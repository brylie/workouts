import { Muscles } from "$lib/muscles";
import type { ExerciseDetails } from "$lib/types";

/**
 * A collection of common Pilates exercises that can be used to generate workouts.
 * Each exercise includes the primary muscle groups it targets.
 */
export const pilatesExercises: ExerciseDetails[] = [
  {
    id: "the-hundred",
    title: "The Hundred",
    muscles: [Muscles.ABDOMINALS, Muscles.SHOULDERS, Muscles.NECK],
    description:
      "A core-focused exercise where you lift your head and shoulders off the mat, extend your arms, and pump them up and down while holding legs in a tabletop or extended position.",
    metrics: {
      hasSets: true,
      hasReps: false,
      hasWeight: false,
      hasTime: true,
    },
  },
  {
    id: "roll-up",
    title: "Roll Up",
    muscles: [Muscles.ABDOMINALS, Muscles.LOWER_BACK],
    description:
      "A controlled movement starting on your back, then rolling up to a seated position with arms extended forward, engaging the core deeply.",
    metrics: {
      hasSets: true,
      hasReps: true,
      hasWeight: false,
      hasTime: false,
    },
  },
  {
    id: "single-leg-circle",
    title: "Single Leg Circle",
    muscles: [
      Muscles.ABDOMINALS,
      Muscles.HAMSTRINGS,
      Muscles.QUADRICEPS,
      Muscles.GLUTES,
    ],
    description:
      "While lying on your back, draw circles with one extended leg while keeping your hips stable and core engaged.",
    metrics: {
      hasSets: true,
      hasReps: true,
      hasWeight: false,
      hasTime: false,
    },
  },
  {
    id: "rolling-like-a-ball",
    title: "Rolling Like a Ball",
    muscles: [Muscles.ABDOMINALS, Muscles.LOWER_BACK],
    description:
      "A massage for the spine where you balance in a rounded seated position and roll back and forth with control, maintaining the shape.",
    metrics: {
      hasSets: true,
      hasReps: true,
      hasWeight: false,
      hasTime: false,
    },
  },
  {
    id: "single-leg-stretch",
    title: "Single Leg Stretch",
    muscles: [Muscles.ABDOMINALS, Muscles.HAMSTRINGS, Muscles.QUADRICEPS],
    description:
      "A core exercise where you alternately extend one leg while holding the other knee, keeping shoulders lifted off the mat.",
    metrics: {
      hasSets: true,
      hasReps: true,
      hasWeight: false,
      hasTime: false,
    },
  },
  {
    id: "double-leg-stretch",
    title: "Double Leg Stretch",
    muscles: [Muscles.ABDOMINALS, Muscles.SHOULDERS, Muscles.HAMSTRINGS],
    description:
      "An exercise where you simultaneously extend your arms and legs away from your center, then circle arms around to hug your knees back in.",
    metrics: {
      hasSets: true,
      hasReps: true,
      hasWeight: false,
      hasTime: false,
    },
  },
  {
    id: "spine-stretch-forward",
    title: "Spine Stretch Forward",
    muscles: [Muscles.LOWER_BACK, Muscles.UPPER_BACK, Muscles.HAMSTRINGS],
    description:
      "A seated forward stretch that articulates through the spine, stretching the back muscles sequentially.",
    metrics: {
      hasSets: true,
      hasReps: true,
      hasWeight: false,
      hasTime: false,
    },
  },
  {
    id: "saw",
    title: "Saw",
    muscles: [Muscles.OBLIQUES, Muscles.HAMSTRINGS, Muscles.LOWER_BACK],
    description:
      'A seated exercise where you twist and reach past the opposite foot, "sawing" with the little finger of the reaching hand.',
    metrics: {
      hasSets: true,
      hasReps: true,
      hasWeight: false,
      hasTime: false,
    },
  },
  {
    id: "side-kicks",
    title: "Side Kicks",
    muscles: [
      Muscles.GLUTES,
      Muscles.OBLIQUES,
      Muscles.ABDUCTORS,
      Muscles.ADDUCTORS,
    ],
    description:
      "Lying on your side, perform controlled kicks forward and backward with the top leg while maintaining core stability.",
    metrics: {
      hasSets: true,
      hasReps: true,
      hasWeight: false,
      hasTime: false,
    },
  },
  {
    id: "seal",
    title: "Seal",
    muscles: [Muscles.ABDOMINALS, Muscles.LOWER_BACK],
    description:
      "A playful exercise where you balance on your sit bones, clasp your ankles, and roll back and forth on your spine.",
    metrics: {
      hasSets: true,
      hasReps: true,
      hasWeight: false,
      hasTime: false,
    },
  },
  {
    id: "neck-pull",
    title: "Neck Pull",
    muscles: [Muscles.ABDOMINALS, Muscles.NECK, Muscles.UPPER_BACK],
    description:
      "An advanced roll-up variation with hands behind the head, requiring greater core control and spinal articulation.",
    metrics: {
      hasSets: true,
      hasReps: true,
      hasWeight: false,
      hasTime: false,
    },
  },
  {
    id: "pilates-bridge-pose",
    title: "Bridge Pose",
    muscles: [Muscles.GLUTES, Muscles.HAMSTRINGS, Muscles.LOWER_BACK],
    description:
      "Lying on your back, lift your hips toward the ceiling to create a straight line from shoulders to knees, strengthening the posterior chain.",
    metrics: {
      hasSets: true,
      hasReps: true,
      hasWeight: false,
      hasTime: true,
    },
  },
  {
    id: "leg-pull-down",
    title: "Leg Pull Down",
    muscles: [Muscles.ABDOMINALS, Muscles.GLUTES, Muscles.SHOULDERS],
    description:
      "A plank-based exercise where you alternately lift and lower one leg while maintaining a stable core and straight alignment.",
    metrics: {
      hasSets: true,
      hasReps: true,
      hasWeight: false,
      hasTime: false,
    },
  },
  {
    id: "leg-pull-up",
    title: "Leg Pull Up",
    muscles: [
      Muscles.ABDOMINALS,
      Muscles.GLUTES,
      Muscles.SHOULDERS,
      Muscles.TRICEPS,
    ],
    description:
      "A reverse plank variation where you lift and lower one leg while supporting your body weight on your hands and heels.",
    metrics: {
      hasSets: true,
      hasReps: true,
      hasWeight: false,
      hasTime: false,
    },
  },
  {
    id: "pilates-push-ups",
    title: "Pilates Push-Ups",
    muscles: [
      Muscles.CHEST,
      Muscles.TRICEPS,
      Muscles.SHOULDERS,
      Muscles.ABDOMINALS,
    ],
    description:
      "A push-up with Pilates principles - flowing between plank, push-up, and an upward-facing dog-like position with precise control.",
    metrics: {
      hasSets: true,
      hasReps: true,
      hasWeight: false,
      hasTime: false,
    },
  },
  {
    id: "swan-dive",
    title: "Swan Dive",
    muscles: [Muscles.LOWER_BACK, Muscles.UPPER_BACK, Muscles.GLUTES],
    description:
      "From a prone position, lift the upper body into extension, then rock forward and backward using the strength of the back muscles.",
    metrics: {
      hasSets: true,
      hasReps: true,
      hasWeight: false,
      hasTime: false,
    },
  },
  {
    id: "open-leg-rocker",
    title: "Open Leg Rocker",
    muscles: [Muscles.ABDOMINALS, Muscles.HAMSTRINGS, Muscles.LOWER_BACK],
    description:
      "Balancing on your sit bones with legs extended in a V-shape, roll back and return to the starting position with control.",
    metrics: {
      hasSets: true,
      hasReps: true,
      hasWeight: false,
      hasTime: false,
    },
  },
  {
    id: "corkscrew",
    title: "Corkscrew",
    muscles: [Muscles.ABDOMINALS, Muscles.OBLIQUES, Muscles.LOWER_BACK],
    description:
      "Lying on your back with legs extended toward the ceiling, circle your legs together in a corkscrew motion while keeping your torso stable.",
    metrics: {
      hasSets: true,
      hasReps: true,
      hasWeight: false,
      hasTime: false,
    },
  },
  {
    id: "teaser",
    title: "Teaser",
    muscles: [Muscles.ABDOMINALS, Muscles.HAMSTRINGS, Muscles.QUADRICEPS],
    description:
      "A challenging exercise where you simultaneously lift your legs and torso into a V-shape, balancing on your sit bones.",
    metrics: {
      hasSets: true,
      hasReps: true,
      hasWeight: false,
      hasTime: true,
    },
  },
  {
    id: "boomerang",
    title: "Boomerang",
    muscles: [
      Muscles.ABDOMINALS,
      Muscles.HAMSTRINGS,
      Muscles.LOWER_BACK,
      Muscles.SHOULDERS,
    ],
    description:
      "A complex combination movement including a roll-up, a seated forward stretch, and a backward roll with a cross of the legs.",
    metrics: {
      hasSets: true,
      hasReps: true,
      hasWeight: false,
      hasTime: false,
    },
  },
  {
    id: "swimming",
    title: "Swimming",
    muscles: [
      Muscles.LOWER_BACK,
      Muscles.UPPER_BACK,
      Muscles.GLUTES,
      Muscles.SHOULDERS,
    ],
    description:
      "Lying on your stomach, lift arms and legs off the mat and flutter them in an alternating pattern, as if swimming.",
    metrics: {
      hasSets: true,
      hasReps: false,
      hasWeight: false,
      hasTime: true,
    },
  },
];
