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
    description: 'A deep hip opener that stretches the glutes, hip flexors, and lower back.',
    metrics: {
      hasSets: false,
      hasReps: false,
      hasWeight: false,
      hasTime: true
    }
  },
  {
    id: 'childs-pose',
    title: 'Child\'s Pose (Balasana)',
    muscles: [Muscles.LowerBack, Muscles.Hips, Muscles.Shoulders],
    description: 'A resting pose that gently stretches the hips, thighs, and back while calming the mind.',
    metrics: {
      hasSets: false,
      hasReps: false,
      hasWeight: false,
      hasTime: true
    }
  },
  {
    id: 'cat-cow-pose',
    title: 'Cat-Cow Pose (Marjaryasana-Bitilasana)',
    muscles: [Muscles.LowerBack, Muscles.Abdominals, Muscles.Shoulders],
    description: 'A gentle flow between two poses that warms the spine and relieves tension in the back and neck.',
    metrics: {
      hasSets: false,
      hasReps: false,
      hasWeight: false,
      hasTime: true
    }
  },
  {
    id: 'downward-facing-dog',
    title: 'Downward Facing Dog (Adho Mukha Svanasana)',
    muscles: [Muscles.Shoulders, Muscles.Hamstrings, Muscles.Calves, Muscles.LowerBack],
    description: 'An inversion that stretches the entire body while strengthening the arms, legs, and core.',
    metrics: {
      hasSets: false,
      hasReps: false,
      hasWeight: false,
      hasTime: true
    }
  },
  {
    id: 'cobra-pose',
    title: 'Cobra Pose (Bhujangasana)',
    muscles: [Muscles.LowerBack, Muscles.Shoulders, Muscles.Chest, Muscles.Triceps],
    description: 'A gentle backbend that stretches the chest and shoulders while strengthening the spine.',
    metrics: {
      hasSets: false,
      hasReps: false,
      hasWeight: false,
      hasTime: true
    }
  },
  {
    id: 'seated-forward-bend',
    title: 'Seated Forward Bend (Paschimottanasana)',
    muscles: [Muscles.Hamstrings, Muscles.Abdominals, Muscles.LowerBack],
    description: 'A seated pose that stretches the spine, hamstrings, and lower back while calming the mind.',
    metrics: {
      hasSets: false,
      hasReps: false,
      hasWeight: false,
      hasTime: true
    }
  },
  {
    id: 'happy-baby-pose',
    title: 'Happy Baby Pose (Ananda Balasana)',
    muscles: [Muscles.Hips, Muscles.Abdominals, Muscles.LowerBack],
    description: 'A gentle hip opener that stretches the inner thighs and lower back while promoting relaxation.',
    metrics: {
      hasSets: false,
      hasReps: false,
      hasWeight: false,
      hasTime: true
    }
  },
  {
    id: 'corpse-pose',
    title: 'Corpse Pose (Savasana)',
    muscles: [Muscles.WholeBody],
    description: 'A restorative pose that promotes relaxation and mindfulness, allowing the body to absorb the benefits of the practice.',
    metrics: {
      hasSets: false,
      hasReps: false,
      hasWeight: false,
      hasTime: true
    }
  },
  {
    id: 'fish-pose',
    title: 'Fish Pose (Matsyasana)',
    muscles: [Muscles.Shoulders, Muscles.Chest, Muscles.LowerBack],
    description: 'A backbend that opens the chest and throat while stretching the spine and improving posture.',
    metrics: {
      hasSets: false,
      hasReps: false,
      hasWeight: false,
      hasTime: true
    }
  },
  {
    id: 'shoulder-bridge-pose',
    title: 'Shoulder Bridge Pose (Setu Bandhasana)',
    muscles: [Muscles.Glutes, Muscles.Hamstrings, Muscles.LowerBack],
    description: 'A backbend that strengthens the back, glutes, and hamstrings while stretching the chest and shoulders.',
    metrics: {
      hasSets: false,
      hasReps: false,
      hasWeight: false,
      hasTime: true
    }
  },
  {
    id: 'supine-spinal-twist',
    title: 'Supine Spinal Twist (Supta Matsyendrasana)',
    muscles: [Muscles.LowerBack, Muscles.Abdominals, Muscles.Hips],
    description: 'A gentle twist that stretches the spine, hips, and shoulders while promoting relaxation.',
    metrics: {
      hasSets: false,
      hasReps: false,
      hasWeight: false,
      hasTime: true
    }
  },
  {
    id: 'reclining-bound-angle-pose',
    title: 'Reclining Bound Angle Pose (Supta Baddha Konasana)',
    muscles: [Muscles.Hips, Muscles.Adductors, Muscles.LowerBack],
    description: 'A restorative pose that opens the hips and groin while promoting relaxation and mindfulness.',
    metrics: {
      hasSets: false,
      hasReps: false,
      hasWeight: false,
      hasTime: true
    }
  },
  {
    id: 'legs-up-the-wall-pose',
    title: 'Legs Up the Wall Pose (Viparita Karani)',
    muscles: [Muscles.LowerBack, Muscles.Hips],
    description: 'A restorative pose that promotes relaxation and reduces fatigue by elevating the legs against a wall.',
    metrics: {
      hasSets: false,
      hasReps: false,
      hasWeight: false,
      hasTime: true
    }
  },
  {
    id: 'sitting-forward-bend',
    title: 'Sitting Forward Bend (Paschimottanasana)',
    muscles: [Muscles.Hamstrings, Muscles.Abdominals, Muscles.LowerBack],
    description: 'A seated pose that stretches the spine, hamstrings, and lower back while calming the mind.',
    metrics: {
      hasSets: false,
      hasReps: false,
      hasWeight: false,
      hasTime: true
    }
  },
  {
    id: 'eagle-pose',
    title: 'Eagle Pose (Garudasana)',
    muscles: [Muscles.Shoulders, Muscles.Hips, Muscles.Abdominals],
    description: 'A balancing pose that strengthens the legs and core while improving focus and concentration.',
    metrics: {
      hasSets: false,
      hasReps: false,
      hasWeight: false,
      hasTime: true
    }
  },
  {
    id: 'crow-pose',
    title: 'Crow Pose (Bakasana)',
    muscles: [Muscles.Shoulders, Muscles.Abdominals, Muscles.Wrists],
    description: 'An arm balance that strengthens the arms, wrists, and core while improving focus and concentration.',
    metrics: {
      hasSets: false,
      hasReps: false,
      hasWeight: false,
      hasTime: true
    }
  },
  {
    id: 'handstand',
    title: 'Handstand (Adho Mukha Vrksasana)',
    muscles: [Muscles.Shoulders, Muscles.Abdominals, Muscles.Wrists],
    description: 'An inversion that strengthens the shoulders, arms, and core while improving balance and focus.',
    metrics: {
      hasSets: false,
      hasReps: false,
      hasWeight: false,
      hasTime: true
    }
  },
  {
    id: 'forearm-stand',
    title: 'Forearm Stand (Pincha Mayurasana)',
    muscles: [Muscles.Shoulders, Muscles.Abdominals, Muscles.Wrists],
    description: 'An inversion that strengthens the shoulders, arms, and core while improving balance and focus.',
    metrics: {
      hasSets: false,
      hasReps: false,
      hasWeight: false,
      hasTime: true
    }
  },
  {
    id: 'headstand',
    title: 'Headstand (Sirsasana)',
    muscles: [Muscles.Shoulders, Muscles.Abdominals, Muscles.Wrists],
    description: 'An inversion that strengthens the shoulders, arms, and core while improving balance and focus.',
    metrics: {
      hasSets: false,
      hasReps: false,
      hasWeight: false,
      hasTime: true
    }
  },
  {
    id: 'plow-pose',
    title: 'Plow Pose (Halasana)',
    muscles: [Muscles.Shoulders, Muscles.LowerBack, Muscles.Hamstrings],
    description: 'An inversion that stretches the shoulders, spine, and hamstrings while calming the mind.',
    metrics: {
      hasSets: false,
      hasReps: false,
      hasWeight: false,
      hasTime: true
    }
  },
  {
    id: 'shoulder-stand',
    title: 'Shoulder Stand (Sarvangasana)',
    muscles: [Muscles.Shoulders, Muscles.LowerBack, Muscles.Abdominals],
    description: 'An inversion that strengthens the shoulders, arms, and core while improving balance and focus.',
    metrics: {
      hasSets: false,
      hasReps: false,
      hasWeight: false,
      hasTime: true
    }
  },
  {
    id: 'reclining-spinal-twist',
    title: 'Reclining Spinal Twist (Supta Matsyendrasana)',
    muscles: [Muscles.LowerBack, Muscles.Abdominals, Muscles.Hips],
    description: 'A gentle twist that stretches the spine, hips, and shoulders while promoting relaxation.',
    metrics: {
      hasSets: false,
      hasReps: false,
      hasWeight: false,
      hasTime: true
    }
  },
]