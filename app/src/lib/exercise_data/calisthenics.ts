import type { ExerciseDetails } from '../types';
import { Muscles } from '../enums';

/**
 * A collection of calisthenics exercises that can be used to generate workouts.
 * Each exercise includes the primary muscle groups it targets.
 */
export const calisthenicsExercises: ExerciseDetails[] = [
  {
    id: 'diamond-pushup',
    title: 'Diamond Push-Up (Floor Crusher)',
    muscles: [Muscles.CHEST, Muscles.TRICEPS, Muscles.SHOULDERS],
    description: 'A push-up variation where hands are placed close together forming a diamond shape, emphasizing triceps engagement.',
    metrics: {
      hasSets: true,
      hasReps: true,
      hasWeight: false,
      hasTime: false
    }
  },
  {
    id: 'tricep-extension-pushup',
    title: 'Tricep Extension Push-Up',
    muscles: [Muscles.TRICEPS, Muscles.SHOULDERS],
    description: 'A push-up variation where you keep your elbows close to your body and focus on tricep extension at the top of the movement.',
    metrics: {
      hasSets: true,
      hasReps: true,
      hasWeight: false,
      hasTime: false
    }
  },
  {
    id: 'narrow-pushup',
    title: 'Narrow Push-Up',
    muscles: [Muscles.CHEST, Muscles.TRICEPS, Muscles.SHOULDERS],
    description: 'A push-up with hands placed shoulder-width apart or slightly closer, increasing tricep engagement.',
    metrics: {
      hasSets: true,
      hasReps: true,
      hasWeight: false,
      hasTime: false
    }
  },
  {
    id: 'chair-dips',
    title: 'Chair Dips',
    muscles: [Muscles.TRICEPS, Muscles.CHEST, Muscles.SHOULDERS],
    description: 'A bodyweight exercise performed using a chair or bench, primarily targeting the triceps through dipping motion.',
    metrics: {
      hasSets: true,
      hasReps: true,
      hasWeight: false,
      hasTime: false
    }
  }
];