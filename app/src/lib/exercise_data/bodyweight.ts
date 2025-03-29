import type { ExerciseDetails } from '../types';
import { Muscles } from '../enums';

/**
 * A collection of common bodyweight exercises that can be used to generate workouts.
 * Each exercise includes the primary muscle groups it targets.
 */
export const bodyweightExercises: ExerciseDetails[] = [
  {
    id: 'high-knee',
    title: 'High Knees',
    muscles: [Muscles.Quadriceps, Muscles.Abdominals, Muscles.Calves],
    description: 'A cardio exercise where you rapidly bring your knees up to waist level alternately, working both legs and core.',
    metrics: {
      hasSets: true,
      hasReps: true,
      hasWeight: false,
      hasTime: true
    }
  },
  {
    id: 'russian-twist',
    title: 'Russian Twist',
    muscles: [Muscles.Abdominals, Muscles.Obliques],
    description: 'A seated rotation exercise that targets the core, especially the obliques, by twisting from side to side.',
    metrics: {
      hasSets: true,
      hasReps: true,
      hasWeight: false,
      hasTime: false
    }
  },
  {
    id: 'flutter-kick',
    title: 'Flutter Kicks',
    muscles: [Muscles.Abdominals, Muscles.Quadriceps, Muscles.LowerBack],
    description: 'An exercise where you lie on your back and create a fluttering motion with your legs, working the lower abs.',
    metrics: {
      hasSets: true,
      hasReps: false,
      hasWeight: false,
      hasTime: true
    }
  },
  {
    id: 'windshield-wipers',
    title: 'Windshield Wipers',
    muscles: [Muscles.Abdominals, Muscles.Obliques, Muscles.LowerBack],
    description: 'A challenging core exercise where you lie on your back with legs raised and rotate them from side to side.',
    metrics: {
      hasSets: true,
      hasReps: true,
      hasWeight: false,
      hasTime: false
    }
  },
  {
    id: 'bicycle-crunches',
    title: 'Bicycle Crunches',
    muscles: [Muscles.Abdominals, Muscles.Obliques],
    description: 'A dynamic abdominal exercise where you alternate bringing elbow to opposite knee in a pedaling motion.',
    metrics: {
      hasSets: true,
      hasReps: true,
      hasWeight: false,
      hasTime: true
    }
  },
  {
    id: 'single-jack-knife',
    title: 'Single Leg Jack Knife',
    muscles: [Muscles.Abdominals, Muscles.Quadriceps, Muscles.Hamstrings],
    description: 'An exercise where you simultaneously lift one leg and your upper body to meet in the middle, then alternate legs.',
    metrics: {
      hasSets: true,
      hasReps: true,
      hasWeight: false,
      hasTime: false
    }
  },
  {
    id: 'plank',
    title: 'Plank',
    muscles: [Muscles.Abdominals, Muscles.Shoulders, Muscles.UpperBack, Muscles.LowerBack],
    description: 'An isometric core exercise that involves maintaining a position similar to a push-up for the maximum possible time.',
    metrics: {
      hasSets: true,
      hasReps: false,
      hasWeight: false,
      hasTime: true
    }
  },
  {
    id: 'pushup',
    title: 'Push-Up',
    muscles: [Muscles.Chest, Muscles.Shoulders, Muscles.Triceps, Muscles.Abdominals],
    description: 'A classic upper body exercise performed by raising and lowering the body using the arms while keeping the body straight.',
    metrics: {
      hasSets: true,
      hasReps: true,
      hasWeight: false,
      hasTime: false
    }
  },
  {
    id: 'bodyweight-squat',
    title: 'Bodyweight Squat',
    muscles: [Muscles.Quadriceps, Muscles.Glutes, Muscles.Hamstrings, Muscles.Calves],
    description: 'A lower body exercise where you lower your body by bending your knees as if sitting in an imaginary chair.',
    metrics: {
      hasSets: true,
      hasReps: true,
      hasWeight: false,
      hasTime: false
    }
  },
  {
    id: 'lunges',
    title: 'Lunges',
    muscles: [Muscles.Quadriceps, Muscles.Glutes, Muscles.Hamstrings],
    description: 'A unilateral exercise where you step forward, lowering your hips until both knees are bent at about 90-degree angles.',
    metrics: {
      hasSets: true,
      hasReps: true,
      hasWeight: false,
      hasTime: false
    }
  },
  {
    id: 'mountain-climbers',
    title: 'Mountain Climbers',
    muscles: [Muscles.Abdominals, Muscles.Shoulders, Muscles.Quadriceps],
    description: 'A dynamic exercise performed in a plank position, alternately bringing knees toward chest in a running motion.',
    metrics: {
      hasSets: true,
      hasReps: true,
      hasWeight: false,
      hasTime: true
    }
  },
  {
    id: 'burpees',
    title: 'Burpees',
    muscles: [Muscles.Quadriceps, Muscles.Chest, Muscles.Shoulders, Muscles.Abdominals, Muscles.Triceps],
    description: 'A full-body exercise combining a squat, push-up, and jump, great for cardiovascular fitness and strength.',
    metrics: {
      hasSets: true,
      hasReps: true,
      hasWeight: false,
      hasTime: true
    }
  },
  {
    id: 'jumping-jacks',
    title: 'Jumping Jacks',
    muscles: [Muscles.Shoulders, Muscles.Quadriceps, Muscles.Calves],
    description: 'A calisthenic exercise where you jump while spreading your legs and raising your arms overhead, then return to standing.',
    metrics: {
      hasSets: true,
      hasReps: true,
      hasWeight: false,
      hasTime: true
    }
  },
  {
    id: 'fire-hydrants',
    title: 'Fire Hydrants',
    muscles: [Muscles.Glutes, Muscles.Abductors, Muscles.Abdominals],
    description: 'A quadruped exercise where you lift one leg out to the side while maintaining a table-top position, targeting the glutes and hip stabilizers.',
    metrics: {
      hasSets: true,
      hasReps: true,
      hasWeight: false,
      hasTime: false
    }
  },
  {
    id: 'glute-bridge',
    title: 'Glute Bridge',
    muscles: [Muscles.Glutes, Muscles.Hamstrings, Muscles.LowerBack],
    description: 'A floor exercise where you lie on your back and lift your hips toward the ceiling, focusing on glute contraction at the top position.',
    metrics: {
      hasSets: true,
      hasReps: true,
      hasWeight: false,
      hasTime: true
    }
  },
  {
    id: 'side-plank',
    title: 'Side Plank',
    muscles: [Muscles.Obliques, Muscles.Abdominals, Muscles.Shoulders, Muscles.Glutes],
    description: 'An isometric core exercise where you support your body on one arm and the side of one foot, creating a straight line from head to heels.',
    metrics: {
      hasSets: true,
      hasReps: false,
      hasWeight: false,
      hasTime: true
    }
  },
  {
    id: 'donkey-kick',
    title: 'Donkey Kick',
    muscles: [Muscles.Glutes, Muscles.Hamstrings, Muscles.LowerBack],
    description: 'A quadruped exercise where you lift one leg behind you with the knee bent, focusing on glute activation and hip extension.',
    metrics: {
      hasSets: true,
      hasReps: true,
      hasWeight: false,
      hasTime: false
    }
  }
];