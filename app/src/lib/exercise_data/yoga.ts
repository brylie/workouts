import type { ExerciseDetails } from '../types';
import { Muscles } from '../enums';

/**
 * A collection of common yoga poses (asanas) that can be used to generate yoga workouts.
 * Each pose includes the primary muscle groups it targets.
 */
export const yogaPoses: ExerciseDetails[] = [
  {
    id: 'mountain-pose',
    title: 'Mountain Pose (Tadasana)',
    muscles: [Muscles.Quadriceps, Muscles.Abdominals, Muscles.Glutes],
    description: 'A foundational standing pose that improves posture, balance, and body awareness.',
    metrics: {
      hasSets: false,
      hasReps: false,
      hasWeight: false,
      hasTime: true
    }
  },
  {
    id: 'warrior-i',
    title: 'Warrior I (Virabhadrasana I)',
    muscles: [Muscles.Quadriceps, Muscles.Shoulders, Muscles.Glutes, Muscles.Abdominals],
    description: 'A standing pose that strengthens the legs and opens the hips and chest.',
    metrics: {
      hasSets: false,
      hasReps: false,
      hasWeight: false,
      hasTime: true
    }
  },
  {
    id: 'warrior-ii',
    title: 'Warrior II (Virabhadrasana II)',
    muscles: [Muscles.Quadriceps, Muscles.Shoulders, Muscles.Abductors, Muscles.Abdominals],
    description: 'A standing pose that builds stamina and leg strength while opening the hips and shoulders.',
    metrics: {
      hasSets: false,
      hasReps: false,
      hasWeight: false,
      hasTime: true
    }
  },
  {
    id: 'warrior-iii',
    title: 'Warrior III (Virabhadrasana III)',
    muscles: [Muscles.Hamstrings, Muscles.Glutes, Muscles.Abdominals, Muscles.UpperBack],
    description: 'A standing balancing pose that strengthens the legs and core while improving focus and concentration.',
    metrics: {
      hasSets: false,
      hasReps: false,
      hasWeight: false,
      hasTime: true
    }
  },
  {
    id: 'extended-side-angle',
    title: 'Extended Side Angle (Utthita Parsvakonasana)',
    muscles: [Muscles.Quadriceps, Muscles.Obliques, Muscles.Abductors, Muscles.Hamstrings],
    description: 'A standing pose that stretches the sides of the torso, strengthens the legs, and opens the hips.',
    metrics: {
      hasSets: false,
      hasReps: false,
      hasWeight: false,
      hasTime: true
    }
  },
  {
    id: 'triangle-pose',
    title: 'Triangle Pose (Trikonasana)',
    muscles: [Muscles.Hamstrings, Muscles.Obliques, Muscles.Shoulders, Muscles.Adductors],
    description: 'A standing pose that stretches and strengthens the thighs, hips, and spine while relieving stress.',
    metrics: {
      hasSets: false,
      hasReps: false,
      hasWeight: false,
      hasTime: true
    }
  },
  {
    id: 'half-moon-pose',
    title: 'Half Moon Pose (Ardha Chandrasana)',
    muscles: [Muscles.Hamstrings, Muscles.Abdominals, Muscles.Glutes, Muscles.Obliques],
    description: 'A balancing pose that strengthens the legs and core while improving coordination and focus.',
    metrics: {
      hasSets: false,
      hasReps: false,
      hasWeight: false,
      hasTime: true
    }
  },
  {
    id: 'chair-pose',
    title: 'Chair Pose (Utkatasana)',
    muscles: [Muscles.Quadriceps, Muscles.Glutes, Muscles.Shoulders, Muscles.Abdominals],
    description: 'A standing pose that strengthens the thighs, ankles, and spine while stimulating the heart and diaphragm.',
    metrics: {
      hasSets: false,
      hasReps: false,
      hasWeight: false,
      hasTime: true
    }
  },
  {
    id: 'boat-pose',
    title: 'Boat Pose (Navasana)',
    muscles: [Muscles.Abdominals, Muscles.Quadriceps, Muscles.LowerBack, Muscles.Hamstrings],
    description: 'A seated balancing pose that strengthens the abdominal and hip flexor muscles.',
    metrics: {
      hasSets: false,
      hasReps: false,
      hasWeight: false,
      hasTime: true
    }
  },
  {
    id: 'upward-facing-dog',
    title: 'Upward Facing Dog (Urdhva Mukha Svanasana)',
    muscles: [Muscles.Shoulders, Muscles.UpperBack, Muscles.LowerBack, Muscles.Triceps],
    description: 'A backbend that strengthens the spine, arms, and shoulders while stretching the chest and abdomen.',
    metrics: {
      hasSets: false,
      hasReps: false,
      hasWeight: false,
      hasTime: true
    }
  },
  {
    id: 'bow-pose',
    title: 'Bow Pose (Dhanurasana)',
    muscles: [Muscles.LowerBack, Muscles.Shoulders, Muscles.Chest, Muscles.Quadriceps],
    description: 'A prone backbend that stretches the entire front of the body while strengthening the back muscles.',
    metrics: {
      hasSets: false,
      hasReps: false,
      hasWeight: false,
      hasTime: true
    }
  },
  {
    id: 'yoga-bridge-pose',
    title: 'Bridge Pose (Setu Bandha Sarvangasana)',
    muscles: [Muscles.Glutes, Muscles.Hamstrings, Muscles.LowerBack, Muscles.Shoulders],
    description: 'A supine backbend that strengthens the spine, glutes, and hamstrings while stretching the chest and shoulders.',
    metrics: {
      hasSets: false,
      hasReps: false,
      hasWeight: false,
      hasTime: true
    }
  },
  {
    id: 'lizard-pose',
    title: 'Lizard Pose (Utthan Pristhasana)',
    muscles: [Muscles.Hamstrings, Muscles.Quadriceps, Muscles.Glutes, Muscles.Shoulders],
    description: 'A deep hip opener that stretches the hip flexors, hamstrings, and quadriceps.',
    metrics: {
      hasSets: false,
      hasReps: false,
      hasWeight: false,
      hasTime: true
    }
  },
  {
    id: 'bound-angle-pose',
    title: 'Bound Angle Pose (Baddha Konasana)',
    muscles: [Muscles.Adductors, Muscles.Hamstrings, Muscles.LowerBack],
    description: 'A seated pose that opens the hips and stretches the inner thighs, groins, and knees.',
    metrics: {
      hasSets: false,
      hasReps: false,
      hasWeight: false,
      hasTime: true
    }
  },
  {
    id: 'pigeon-pose',
    title: 'Pigeon Pose (Eka Pada Rajakapotasana)',
    muscles: [Muscles.Glutes, Muscles.Abductors, Muscles.LowerBack, Muscles.Quadriceps],
    description: 'A hip opener that stretches the thighs, groins, psoas, and