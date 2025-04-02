import { Equipment } from "$lib/equipment";
import { Muscles } from "$lib/muscles";
import type { ExerciseDetails } from "$lib/types";

/**
 * Collection of kettlebell exercises
 */
export const kettlebellExercises: ExerciseDetails[] = [
  {
    id: "kettlebell-swing",
    title: "Kettlebell Swing",
    description:
      "A dynamic hip-hinge exercise that targets the posterior chain while building explosive power.",
    muscles: [Muscles.GLUTES, Muscles.HAMSTRINGS, Muscles.LOWER_BACK],
    equipment: [Equipment.KETTLEBELL],
    metrics: {
      hasSets: true,
      hasReps: true,
      hasWeight: true,
      hasTime: false,
    },
    tips: [
      "Keep your back flat throughout the movement",
      "Drive the power from your hips, not your arms",
      "Let the kettlebell float at the top position",
      "Maintain a neutral spine position",
    ],
    variants: [
      "American Swing (overhead)",
      "One-handed Swing",
      "Dead-stop Swing",
    ],
  },
  {
    id: "kettlebell-goblet-squat",
    title: "Kettlebell Goblet Squat",
    description:
      "A front-loaded squat holding a kettlebell close to your chest, great for building leg strength and mobility.",
    muscles: [Muscles.QUADRICEPS, Muscles.GLUTES],
    equipment: [Equipment.KETTLEBELL],
    metrics: {
      hasSets: true,
      hasReps: true,
      hasWeight: true,
      hasTime: false,
    },
    tips: [
      "Hold the kettlebell close to your chest",
      "Keep your elbows tucked in",
      "Descend until your thighs are at least parallel to the ground",
      "Keep your chest up and back straight",
    ],
    variants: ["Pause Goblet Squat", "Goblet Squat with Heel Elevation"],
  },
  {
    id: "kettlebell-single-arm-row",
    title: "Kettlebell Single-Arm Row",
    description:
      "A unilateral back exercise that builds strength and corrects imbalances.",
    muscles: [Muscles.UPPER_BACK, Muscles.LATS],
    equipment: [Equipment.KETTLEBELL],
    metrics: {
      hasSets: true,
      hasReps: true,
      hasWeight: true,
      hasTime: false,
    },
    tips: [
      "Keep your supporting hand and knee on a bench or stable surface",
      "Pull the kettlebell along your side, keeping the elbow close to your body",
      "Squeeze your shoulder blade at the top of the movement",
      "Maintain a neutral spine throughout",
    ],
    variants: ["Renegade Row", "Meadows Row"],
  },
  {
    id: "kettlebell-turkish-getup",
    title: "Turkish Get-up",
    description:
      "A complex full-body movement that builds strength, stability, and mobility from lying to standing position.",
    muscles: [Muscles.SHOULDERS, Muscles.ABDOMINALS],
    equipment: [Equipment.KETTLEBELL],
    metrics: {
      hasSets: true,
      hasReps: true,
      hasWeight: true,
      hasTime: false,
    },
    tips: [
      "Start with a light weight until you master the movement pattern",
      "Keep your eyes on the kettlebell throughout the movement",
      "Move slowly and deliberately through each phase",
      "Maintain a packed shoulder position with the kettlebell arm",
    ],
    variants: ["Half Get-up", "Tactical Get-up"],
  },
  {
    id: "kettlebell-clean",
    title: "Kettlebell Clean",
    description:
      "An explosive exercise to bring the kettlebell from the floor to the rack position.",
    muscles: [Muscles.SHOULDERS, Muscles.FOREARMS],
    equipment: [Equipment.KETTLEBELL],
    metrics: {
      hasSets: true,
      hasReps: true,
      hasWeight: true,
      hasTime: false,
    },
    tips: [
      "Pull the kettlebell in a straight path close to your body",
      "Avoid banging the kettlebell on your wrist or forearm",
      "Use your hips to generate power, not your arms",
      "Allow the kettlebell to roll around your hand into the rack position",
    ],
    variants: ["Double Clean", "Clean and Press"],
  },
  {
    id: "kettlebell-farmers-carry",
    title: "Kettlebell Farmers Carry",
    description:
      "A simple but effective exercise for grip strength, core stability, and overall conditioning.",
    muscles: [Muscles.FOREARMS, Muscles.TRAPEZIUS],
    equipment: [Equipment.KETTLEBELL],
    metrics: {
      hasSets: true,
      hasReps: true,
      hasWeight: true,
      hasTime: false,
    },
    tips: [
      "Stand tall with shoulders back",
      "Engage your core throughout the movement",
      "Take short, controlled steps",
      "Equal weight distribution between both sides",
    ],
    variants: ["Single-arm Carry", "Suitcase Carry", "Overhead Carry"],
  },
  {
    id: "kettlebell-press",
    title: "Kettlebell Press",
    description:
      "An overhead pressing movement that builds shoulder strength and stability.",
    muscles: [Muscles.SHOULDERS],
    equipment: [Equipment.KETTLEBELL],
    metrics: {
      hasSets: true,
      hasReps: true,
      hasWeight: true,
      hasTime: false,
    },
    tips: [
      "Start in the rack position with a tight grip",
      "Engage your lats and core before pressing",
      "Press straight up, allowing the kettlebell to rotate naturally",
      "Keep your elbow tucked on the way down",
    ],
    variants: ["Double Press", "See-saw Press", "Push Press"],
  },
  {
    id: "kettlebell-windmill",
    title: "Kettlebell Windmill",
    description:
      "A mobility exercise that challenges flexibility while building oblique and shoulder stability.",
    muscles: [Muscles.OBLIQUES, Muscles.SHOULDERS],
    equipment: [Equipment.KETTLEBELL],
    metrics: {
      hasSets: true,
      hasReps: true,
      hasWeight: true,
      hasTime: false,
    },
    tips: [
      "Keep the kettlebell-side leg straight",
      "Maintain eye contact with the kettlebell throughout",
      "Push your hip out to the side as you bend",
      "Keep both shoulders stacked vertically when possible",
    ],
    variants: ["Double Windmill", "Bent Knee Windmill"],
  },
  {
    id: "kettlebell-around-the-worlds",
    title: "Kettlebell Around the Worlds",
    description:
      "A core and shoulder stability exercise where the kettlebell is passed around the body in a controlled manner.",
    muscles: [Muscles.OBLIQUES, Muscles.SHOULDERS],
    equipment: [Equipment.KETTLEBELL],
    metrics: {
      hasSets: true,
      hasReps: true,
      hasWeight: true,
      hasTime: false,
    },
    tips: [
      "Keep your core engaged to prevent excessive twisting",
      "Move the kettlebell in a smooth, controlled motion",
      "Maintain a neutral spine throughout",
    ],
    variants: ["Single Direction", "Alternating Directions"],
  },
  {
    id: "kettlebell-plank-drags",
    title: "Kettlebell Plank Drags",
    description:
      "A core and shoulder stability exercise where the kettlebell is dragged from front (in front of hand position) to back (hips) while maintaining a plank position.",
    muscles: [Muscles.ABDOMINALS, Muscles.SHOULDERS],
    equipment: [Equipment.KETTLEBELL],
    metrics: {
      hasSets: true,
      hasReps: true,
      hasWeight: true,
      hasTime: false,
    },
    tips: [
      "Keep your hips level to avoid rotation",
      "Engage your core to maintain stability",
      "Drag the kettlebell in a controlled manner",
    ],
    variants: ["Single-arm Drag", "Alternating Drags"],
  },
  {
    id: "kettlebell-half-kneel-wood-chops",
    title: "Kettlebell Half Kneel Wood Chops",
    description:
      "A rotational core exercise performed in a half-kneeling position, moving the kettlebell diagonally across the body.",
    muscles: [Muscles.OBLIQUES, Muscles.SHOULDERS],
    equipment: [Equipment.KETTLEBELL],
    metrics: {
      hasSets: true,
      hasReps: true,
      hasWeight: true,
      hasTime: false,
    },
    tips: [
      "Engage your core to control the movement",
      "Keep your back straight and avoid leaning forward",
      "Move the kettlebell in a smooth, diagonal path",
    ],
    variants: ["Standing Wood Chops", "Seated Wood Chops"],
  },
  {
    id: "kettlebell-hollow-holds",
    title: "Kettlebell Hollow Holds",
    description:
      "A core stability exercise where the kettlebell is held overhead while legs are lifted (optionally rocking along back) maintaining a hollow body position.",
    muscles: [Muscles.ABDOMINALS, Muscles.SHOULDERS],
    equipment: [Equipment.KETTLEBELL],
    metrics: {
      hasSets: true,
      hasReps: false,
      hasWeight: true,
      hasTime: true,
    },
    tips: [
      "Keep your lower back pressed into the floor",
      "Engage your core to maintain the hollow position",
      "Hold the kettlebell steady overhead",
    ],
    variants: ["Single-arm Hold", "Alternating Holds"],
  },
  {
    id: "kettlebell-alternating-knee-tucks",
    title: "Kettlebell Alternating Knee Tucks",
    description:
      "A dynamic core exercise where the kettlebell is held overhead while alternately tucking the knees towards the chest.",
    muscles: [Muscles.ABDOMINALS, Muscles.HIP_FLEXORS],
    equipment: [Equipment.KETTLEBELL],
    metrics: {
      hasSets: true,
      hasReps: true,
      hasWeight: true,
      hasTime: false,
    },
    tips: [
      "Keep the kettlebell steady overhead",
      "Engage your core to control the movement",
      "Move your legs in a smooth, alternating motion",
    ],
    variants: ["Double Knee Tucks", "Seated Knee Tucks"],
  },
  {
    id: "kettlebell-overhead-flutter-kicks",
    title: "Kettlebell Overhead Flutter Kicks",
    description:
      "A core exercise where the kettlebell is held overhead while performing flutter kicks with the legs.",
    muscles: [Muscles.ABDOMINALS, Muscles.HIP_FLEXORS],
    equipment: [Equipment.KETTLEBELL],
    metrics: {
      hasSets: true,
      hasReps: false,
      hasWeight: true,
      hasTime: true,
    },
    tips: [
      "Keep your lower back pressed into the floor",
      "Engage your core to maintain stability",
      "Move your legs in a controlled, fluttering motion",
    ],
    variants: ["Single-leg Flutter Kicks", "Double-leg Flutter Kicks"],
  },
];
