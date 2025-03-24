import type { ExerciseDetails } from '../types';
import { Muscles, Equipment } from '../enums';

/**
 * A collection of dumbbell exercises that can be used to generate workouts.
 * Each exercise includes the primary muscle groups it targets.
 */
export const dumbbellExercises: ExerciseDetails[] = [
  // Arm exercises
  {
    id: 'dumbbell-bicep-curl',
    title: 'Dumbbell Bicep Curl',
    muscles: [Muscles.Biceps, Muscles.Forearms],
    equipment: [Equipment.Dumbbells],
    description: 'Standard bicep curl performed with dumbbells, targeting the biceps brachii.',
    metrics: {
      hasSets: true,
      hasReps: true,
      hasWeight: true,
      hasTime: false
    }
  },
  // outward curl
  {
    id: 'dumbbell-outward-curl',
    title: 'Dumbbell Outward Curl',
    muscles: [Muscles.Biceps, Muscles.Forearms],
    equipment: [Equipment.Dumbbells],
    description: 'Bicep curl with arms at 45 degrees to target the biceps brachii and forearms.',
    metrics: {
      hasSets: true,
      hasReps: true,
      hasWeight: true,
      hasTime: false
    }
  },
  {
    id: 'dumbbell-hammer-curl',
    title: 'Dumbbell Hammer Curl',
    muscles: [Muscles.Biceps, Muscles.Forearms],
    equipment: [Equipment.Dumbbells],
    description: 'Bicep curl variation with palms facing each other, emphasizing the brachialis and forearms.',
    metrics: {
      hasSets: true,
      hasReps: true,
      hasWeight: true,
      hasTime: false
    }
  },
  {
    id: 'dumbbell-isometric-hold',
    title: 'Dumbbell Isometric Hold',
    muscles: [Muscles.Biceps],
    equipment: [Equipment.Dumbbells],
    description: 'Holding a dumbbell in a fixed position in front of you to engage the biceps.',
    metrics: {
      hasSets: true,
      hasReps: false,
      hasWeight: false,
      hasTime: true
    }
  },
  {
    id: 'dumbbell-around-the-world',
    title: 'Dumbbell Around the World',
    muscles: [Muscles.Biceps, Muscles.Shoulders],
    equipment: [Equipment.Dumbbells],
    description: 'Circular motion with dumbbells to engage the biceps and shoulders.',
    metrics: {
      hasSets: true,
      hasReps: true,
      hasWeight: true,
      hasTime: false
    }
  },
  {
    id: 'dumbbell-preacher-curl',
    title: 'Dumbbell Preacher Curl',
    muscles: [Muscles.Biceps],
    equipment: [Equipment.Dumbbells],
    description: 'Bicep curl performed on a preacher bench to isolate the biceps.',
    metrics: {
      hasSets: true,
      hasReps: true,
      hasWeight: true,
      hasTime: false
    }
  },
  {
    id: 'dumbbell-concentration-curl',
    title: 'Dumbbell Concentration Curl',
    muscles: [Muscles.Biceps],
    equipment: [Equipment.Dumbbells],
    description: 'Isolation exercise focusing on the biceps by curling with one arm at a time.',
    metrics: {
      hasSets: true,
      hasReps: true,
      hasWeight: true,
      hasTime: false
    }
  },
  {
    id: 'dumbbell-supinating-curl',
    title: 'Dumbbell Supinating Curl',
    muscles: [Muscles.Biceps, Muscles.Forearms],
    equipment: [Equipment.Dumbbells],
    description: 'Bicep curl with a twist at the top to engage the biceps fully.',
    metrics: {
      hasSets: true,
      hasReps: true,
      hasWeight: true,
      hasTime: false
    }
  },
  {
    id: 'dumbbell-cross-curl',
    title: 'Dumbbell Cross Curl',
    muscles: [Muscles.Biceps, Muscles.Forearms],
    equipment: [Equipment.Dumbbells],
    description: 'Bicep curl with a cross-body motion to target the biceps brachii.',
    metrics: {
      hasSets: true,
      hasReps: true,
      hasWeight: true,
      hasTime: false
    }
  },
  {
    id: 'dumbbell-reverse-curl',
    title: 'Dumbbell Reverse Curl',
    muscles: [Muscles.Biceps, Muscles.Forearms],
    equipment: [Equipment.Dumbbells],
    description: 'Curl performed with palms facing down, emphasizing forearm development.',
    metrics: {
      hasSets: true,
      hasReps: true,
      hasWeight: true,
      hasTime: false
    }
  },
  {
    id: 'dumbbell-skull-crusher',
    title: 'Dumbbell Skull Crusher',
    muscles: [Muscles.Triceps],
    equipment: [Equipment.Dumbbells, Equipment.Bench],
    description: 'Lying tricep extension with dumbbells to target the triceps.',
    metrics: {
      hasSets: true,
      hasReps: true,
      hasWeight: true,
      hasTime: false
    }
  },
  {
    id: 'dumbbell-overhead-tricep-extension',
    title: 'Dumbbell Tricep Extension',
    muscles: [Muscles.Triceps],
    equipment: [Equipment.Dumbbells],
    description: 'Overhead extension targeting all three heads of the triceps.',
    metrics: {
      hasSets: true,
      hasReps: true,
      hasWeight: true,
      hasTime: false
    }
  },
  {
      id: 'dumbbell-kickback',
      title: 'Dumbbell Kickback',
      muscles: [Muscles.Triceps],
      equipment: [Equipment.Dumbbells],
      description: 'Tricep isolation exercise performed in a bent-over position.',
      metrics: {
      hasSets: true,
      hasReps: true,
      hasWeight: true,
      hasTime: false
      }
  },
  {
    id: 'dumbbell-waiter-curl',
    title: 'Dumbbell Waiter Curl',
    muscles: [Muscles.Biceps, Muscles.Triceps],
    equipment: [Equipment.Dumbbells],
    description: 'Curl with both hands holding a dumbbell in a waiter position, engaging both biceps and triceps.',
    metrics: {
      hasSets: true,
      hasReps: true,
      hasWeight: true,
      hasTime: false
    }
  },
  {
    id: 'dumbbell-zottman-curl',
    title: 'Dumbbell Zottman Curl',
    muscles: [Muscles.Biceps, Muscles.Triceps, Muscles.Forearms],
    equipment: [Equipment.Dumbbells],
    description: 'Bicep curl with a twist to target both biceps and forearms.',
    metrics: {
      hasSets: true,
      hasReps: true,
      hasWeight: true,
      hasTime: false
    }
  },
  // Shoulder exercises
  {
    id: 'dumbbell-shoulder-press',
    title: 'Dumbbell Shoulder Press',
    muscles: [Muscles.Shoulders, Muscles.Triceps],
    equipment: [Equipment.Dumbbells],
    description: 'Overhead pressing movement targeting the deltoids and triceps.',
    metrics: {
      hasSets: true,
      hasReps: true,
      hasWeight: true,
      hasTime: false
    }
  },
  {
    id: 'dumbbell-lateral-raise',
    title: 'Dumbbell Lateral Raise',
    muscles: [Muscles.Shoulders],
    equipment: [Equipment.Dumbbells],
    description: 'Isolation exercise targeting the lateral deltoids through sideways arm raises.',
    metrics: {
      hasSets: true,
      hasReps: true,
      hasWeight: true,
      hasTime: false
    }
  },
  {
    id: 'dumbbell-front-raise',
    title: 'Dumbbell Front Raise',
    muscles: [Muscles.Shoulders],
    equipment: [Equipment.Dumbbells],
    description: 'Isolation exercise targeting the front deltoids through forward arm raises.',
    metrics: {
      hasSets: true,
      hasReps: true,
      hasWeight: true,
      hasTime: false
    }
  },
  // Chest exercises
  {
    id: 'dumbbell-bench-press',
    title: 'Dumbbell Bench Press',
    muscles: [Muscles.Chest, Muscles.Shoulders, Muscles.Triceps],
    equipment: [Equipment.Dumbbells, Equipment.Bench],
    description: 'Compound pressing movement targeting the chest, front deltoids, and triceps.',
    metrics: {
      hasSets: true,
      hasReps: true,
      hasWeight: true,
      hasTime: false
    }
  },
  {
    id: 'dumbbell-fly',
    title: 'Dumbbell Fly',
    muscles: [Muscles.Chest],
    equipment: [Equipment.Dumbbells, Equipment.Bench],
    description: 'Isolation exercise targeting chest through a wide arc movement.',
    metrics: {
      hasSets: true,
      hasReps: true,
      hasWeight: true,
      hasTime: false
    }
  },
  // Back exercises
  {
    id: 'dumbbell-row',
    title: 'Dumbbell Row',
    muscles: [Muscles.Lats, Muscles.Trapezius, Muscles.Biceps],
    equipment: [Equipment.Dumbbells, Equipment.Bench],
    description: 'Single-arm rowing movement targeting the back muscles.',
    metrics: {
      hasSets: true,
      hasReps: true,
      hasWeight: true,
      hasTime: false
    }
  },
  {
    id: 'dumbbell-pullover',
    title: 'Dumbbell Pullover',
    muscles: [Muscles.Lats, Muscles.Chest],
    equipment: [Equipment.Dumbbells, Equipment.Bench],
    description: 'Exercise targeting both back and chest through an arc movement over the head.',
    metrics: {
      hasSets: true,
      hasReps: true,
      hasWeight: true,
      hasTime: false
    }
  },
  // Leg exercises
  {
    id: 'dumbbell-squat',
    title: 'Dumbbell Squat',
    muscles: [Muscles.Quadriceps, Muscles.Hamstrings, Muscles.Glutes],
    equipment: [Equipment.Dumbbells],
    description: 'Compound lower body exercise holding dumbbells at sides.',
    metrics: {
      hasSets: true,
      hasReps: true,
      hasWeight: true,
      hasTime: false
    }
  },
  {
    id: 'dumbbell-goblet-squat',
    title: 'Dumbbell Goblet Squat',
    muscles: [Muscles.Quadriceps, Muscles.Hamstrings, Muscles.Glutes],
    equipment: [Equipment.Dumbbells],
    description: 'Squat variation holding a dumbbell close to the chest.',
    metrics: {
      hasSets: true,
      hasReps: true,
      hasWeight: true,
      hasTime: false
    }
  },
  {
    id: 'dumbbell-lunge',
    title: 'Dumbbell Lunge',
    muscles: [Muscles.Quadriceps, Muscles.Hamstrings, Muscles.Glutes],
    equipment: [Equipment.Dumbbells],
    description: 'Unilateral lower body exercise stepping forward with dumbbells.',
    metrics: {
      hasSets: true,
      hasReps: true,
      hasWeight: true,
      hasTime: false
    }
  },
  {
    id: 'dumbbell-romanian-deadlift',
    title: 'Dumbbell Romanian Deadlift',
    muscles: [Muscles.Hamstrings, Muscles.Glutes, Muscles.LowerBack],
    equipment: [Equipment.Dumbbells],
    description: 'Hip-hinge movement targeting posterior chain muscles.',
    metrics: {
      hasSets: true,
      hasReps: true,
      hasWeight: true,
      hasTime: false
    }
  },
  {
    id: 'dumbbell-calf-raise',
    title: 'Dumbbell Calf Raise',
    muscles: [Muscles.Calves],
    equipment: [Equipment.Dumbbells],
    description: 'Standing calf raise while holding dumbbells for added resistance.',
    metrics: {
      hasSets: true,
      hasReps: true,
      hasWeight: true,
      hasTime: false
    }
  },
  // Core exercises
  {
    id: 'dumbbell-side-bend',
    title: 'Dumbbell Side Bend',
    muscles: [Muscles.Obliques],
    equipment: [Equipment.Dumbbells],
    description: 'Core exercise targeting the obliques through lateral bending.',
    metrics: {
      hasSets: true,
      hasReps: true,
      hasWeight: true,
      hasTime: false
    }
  },
  {
    id: 'dumbbell-woodchopper',
    title: 'Dumbbell Woodchopper',
    muscles: [Muscles.Obliques, Muscles.Lats],
    equipment: [Equipment.Dumbbells],
    description: 'Rotational core exercise mimicking a chopping motion.',
    metrics: {
      hasSets: true,
      hasReps: true,
      hasWeight: true,
      hasTime: false
    }
  },
  {
    id: 'dumbbell-russian-twist',
    title: 'Dumbbell Russian Twist',
    muscles: [Muscles.Obliques, Muscles.Abdominals],
    equipment: [Equipment.Dumbbells],
    description: 'Core exercise targeting the obliques through rotational movement.',
    metrics: {
      hasSets: true,
      hasReps: true,
      hasWeight: true,
      hasTime: false
    }
  }
];