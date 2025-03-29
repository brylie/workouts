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
    id: 'bridge-pose-yoga',
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
    description: 'A hip opener that stretches the thighs, groins, psoas, and back while opening the chest and shoulders.',
    metrics: {
      hasSets: false,
      hasReps: false,
      hasWeight: false,
      hasTime: true
    }
  },
  {
    id: 'plank-pose',
    title: 'Plank Pose (Phalakasana)',
    muscles: [Muscles.Abdominals, Muscles.Shoulders, Muscles.Triceps, Muscles.UpperBack],
    description: 'A push-up position pose that strengthens the arms, wrists, and spine while toning the abdomen.',
    metrics: {
      hasSets: false,
      hasReps: false,
      hasWeight: false,
      hasTime: true
    }
  },
  {
    id: 'side-plank-pose',
    title: 'Side Plank Pose (Vasisthasana)',
    muscles: [Muscles.Obliques, Muscles.Shoulders, Muscles.Abductors, Muscles.Abdominals],
    description: 'A balancing pose that strengthens the wrists, arms, shoulders, and legs while toning the abdominal muscles.',
    metrics: {
      hasSets: false,
      hasReps: false,
      hasWeight: false,
      hasTime: true
    }
  },
  {
    id: 'tree-pose',
    title: 'Tree Pose (Vrksasana)',
    muscles: [Muscles.Quadriceps, Muscles.Calves, Muscles.Abdominals, Muscles.Glutes],
    description: 'A standing balance pose that improves focus, balance, and posture while strengthening the legs and ankles.',
    metrics: {
      hasSets: false,
      hasReps: false,
      hasWeight: false,
      hasTime: true
    }
  },
  {
    id: 'dancers-pose',
    title: 'Dancer\'s Pose (Natarajasana)',
    muscles: [Muscles.Quadriceps, Muscles.Hamstrings, Muscles.Shoulders, Muscles.Chest],
    description: 'A standing balancing pose that strengthens the legs and improves focus while stretching the shoulders, chest, and thighs.',
    metrics: {
      hasSets: false,
      hasReps: false,
      hasWeight: false,
      hasTime: true
    }
  },
  {
    id: 'standing-forward-bend',
    title: 'Standing Forward Bend (Uttanasana)',
    muscles: [Muscles.Hamstrings, Muscles.LowerBack, Muscles.Calves],
    description: 'A forward fold that stretches the hamstrings and back muscles while calming the mind and relieving stress.',
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
    muscles: [Muscles.Hamstrings, Muscles.LowerBack, Muscles.UpperBack],
    description: 'A seated forward fold that stretches the entire back of the body from the heels to the head.',
    metrics: {
      hasSets: false,
      hasReps: false,
      hasWeight: false,
      hasTime: true
    }
  },
  {
    id: 'revolved-triangle-pose',
    title: 'Revolved Triangle Pose (Parivrtta Trikonasana)',
    muscles: [Muscles.Hamstrings, Muscles.Obliques, Muscles.Shoulders, Muscles.Abdominals],
    description: 'A standing twist that strengthens the legs while stretching the hamstrings and opening the chest.',
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
    muscles: [Muscles.Obliques, Muscles.LowerBack, Muscles.Glutes, Muscles.Shoulders],
    description: 'A reclined twist that stretches the back, glutes, and shoulders while relaxing the spine.',
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
    muscles: [Muscles.LowerBack, Muscles.Shoulders, Muscles.Hamstrings],
    description: 'A resting pose that gently stretches the back, shoulders, and arms while calming the mind and relieving stress.',
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
    muscles: [],
    description: 'A relaxation pose typically done at the end of a yoga practice to integrate the benefits of the practice and promote deep relaxation.',
    metrics: {
      hasSets: false,
      hasReps: false,
      hasWeight: false,
      hasTime: true
    }
  },
  {
    id: 'cat-cow-stretch',
    title: 'Cat-Cow Stretch (Marjaryasana-Bitilasana)',
    muscles: [Muscles.LowerBack, Muscles.Abdominals, Muscles.Neck],
    description: 'A flowing movement between two poses that stretches the spine and promotes mobility in the back.',
    metrics: {
      hasSets: false,
      hasReps: true,
      hasWeight: false,
      hasTime: true
    }
  },
  {
    id: 'thread-the-needle',
    title: 'Thread the Needle Pose (Parsva Balasana)',
    muscles: [Muscles.Shoulders, Muscles.UpperBack, Muscles.Neck],
    description: 'A gentle twist that stretches the shoulders, upper back, and neck while releasing tension in the upper body.',
    metrics: {
      hasSets: false,
      hasReps: false,
      hasWeight: false,
      hasTime: true
    }
  },
  {
    id: 'pyramid-pose',
    title: 'Pyramid Pose (Parsvottanasana)',
    muscles: [Muscles.Hamstrings, Muscles.LowerBack, Muscles.Shoulders],
    description: 'A standing forward bend that stretches the spine, shoulders, wrists, hamstrings, and hips.',
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
    muscles: [Muscles.Shoulders, Muscles.Hamstrings, Muscles.Calves, Muscles.UpperBack],
    description: 'An inversion that strengthens the arms and shoulders while stretching the hamstrings, calves, and entire back.',
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
    muscles: [Muscles.LowerBack, Muscles.Shoulders, Muscles.Chest],
    description: 'A prone backbend that strengthens the spine while opening the chest and shoulders.',
    metrics: {
      hasSets: false,
      hasReps: false,
      hasWeight: false,
      hasTime: true
    }
  },
  {
    id: 'locust-pose',
    title: 'Locust Pose (Salabhasana)',
    muscles: [Muscles.LowerBack, Muscles.Glutes, Muscles.Hamstrings, Muscles.UpperBack],
    description: 'A prone backbend that strengthens the back muscles, glutes, and hamstrings.',
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
    muscles: [Muscles.Shoulders, Muscles.Quadriceps, Muscles.Calves, Muscles.UpperBack],
    description: 'A standing balancing pose that strengthens the legs and improves focus while stretching the upper back and shoulders.',
    metrics: {
      hasSets: false,
      hasReps: false,
      hasWeight: false,
      hasTime: true
    }
  },
  {
    id: 'camel-pose',
    title: 'Camel Pose (Ustrasana)',
    muscles: [Muscles.Quadriceps, Muscles.Shoulders, Muscles.Chest, Muscles.Abdominals],
    description: 'A kneeling backbend that stretches the entire front of the body from the thighs to the throat.',
    metrics: {
      hasSets: false,
      hasReps: false,
      hasWeight: false,
      hasTime: true
    }
  }
];