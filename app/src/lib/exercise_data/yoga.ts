import type { ExerciseDetails } from '../types';
import { Muscles, Joints } from '../enums';

/**
 * A collection of common yoga poses (asanas) that can be used to generate yoga workouts.
 * Each pose includes the primary muscle groups it targets and joints it mobilizes.
 */
export const yogaPoses: ExerciseDetails[] = [
  {
    id: 'mountain-pose',
    title: 'Mountain Pose (Tadasana)',
    muscles: [Muscles.Quadriceps, Muscles.Abdominals, Muscles.Glutes],
    joints: [Joints.Ankle, Joints.Knee, Joints.Hip, Joints.Spine],
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
    joints: [Joints.Ankle, Joints.Knee, Joints.Hip, Joints.Shoulder],
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
    joints: [Joints.Ankle, Joints.Knee, Joints.Hip, Joints.Shoulder],
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
    joints: [Joints.Ankle, Joints.Knee, Joints.Hip, Joints.Spine],
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
    joints: [Joints.Ankle, Joints.Knee, Joints.Hip, Joints.Spine],
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
    joints: [Joints.Ankle, Joints.Knee, Joints.Hip, Joints.Spine],
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
    joints: [Joints.Ankle, Joints.Knee, Joints.Hip, Joints.Spine],
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
    joints: [Joints.Ankle, Joints.Knee, Joints.Hip, Joints.Spine],
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
    joints: [Joints.Hip, Joints.Spine],
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
    joints: [Joints.Spine, Joints.Shoulder],
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
    joints: [Joints.Spine, Joints.Hip],
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
    joints: [Joints.Spine, Joints.Hip],
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
    joints: [Joints.Hip, Joints.Knee, Joints.Spine],
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
    joints: [Joints.Hip, Joints.Knee],
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
    joints: [Joints.Hip, Joints.Knee, Joints.Spine],
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
    muscles: [Muscles.LowerBack, Muscles.Shoulders],
    joints: [Joints.Hip, Joints.Knee, Joints.Spine, Joints.Shoulder],
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
    muscles: [Muscles.LowerBack, Muscles.Abdominals],
    joints: [Joints.Spine, Joints.Neck, Joints.Shoulder],
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
    joints: [Joints.Ankle, Joints.Knee, Joints.Hip, Joints.Spine],
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
    joints: [Joints.Spine, Joints.Shoulder],
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
    joints: [Joints.Hip, Joints.Spine],
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
    muscles: [Muscles.Abdominals, Muscles.LowerBack],
    joints: [Joints.Hip, Joints.Spine],
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
    muscles: [],
    joints: [Joints.Spine, Joints.Hip, Joints.Shoulder],
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
    joints: [Joints.Spine, Joints.Shoulder],
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
    joints: [Joints.Spine, Joints.Hip],
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
    muscles: [Muscles.LowerBack, Muscles.Abdominals],
    joints: [Joints.Spine, Joints.Hip],
    description: 'A supine twist that stretches the spine and relieves tension in the back and hips.',
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
    muscles: [Muscles.Adductors, Muscles.LowerBack],
    joints: [Joints.Hip, Joints.Knee, Joints.Spine],
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
    muscles: [Muscles.LowerBack],
    joints: [Joints.Hip, Joints.Spine],
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
    joints: [Joints.Hip, Joints.Spine],
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
    muscles: [Muscles.Shoulders, Muscles.Abdominals],
    joints: [Joints.Shoulder, Joints.Hip, Joints.Knee, Joints.Ankle],
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
    muscles: [Muscles.Shoulders, Muscles.Abdominals],
    joints: [Joints.Wrist, Joints.Elbow, Joints.Shoulder],
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
    muscles: [Muscles.Shoulders, Muscles.Abdominals],
    joints: [Joints.Wrist, Joints.Elbow, Joints.Shoulder],
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
    muscles: [Muscles.Shoulders, Muscles.Abdominals],
    joints: [Joints.Elbow, Joints.Shoulder],
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
    muscles: [Muscles.Shoulders, Muscles.Abdominals],
    joints: [Joints.Neck, Joints.Shoulder],
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
    joints: [Joints.Neck, Joints.Spine],
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
    joints: [Joints.Neck, Joints.Shoulder, Joints.Spine],
    description: 'An inversion that strengthens the shoulders, arms, and core while improving balance and focus.',
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
    joints: [Joints.Wrist, Joints.Elbow, Joints.Shoulder, Joints.Spine],
    description: 'An arm-strengthening pose that tones the core and builds stability throughout the entire body.',
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
    joints: [Joints.Wrist, Joints.Elbow, Joints.Shoulder],
    description: 'A challenging balancing pose that strengthens the wrists, arms, shoulders, and legs while toning the abdominal muscles.',
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
    joints: [Joints.Ankle, Joints.Knee, Joints.Hip],
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
    joints: [Joints.Ankle, Joints.Knee, Joints.Hip, Joints.Shoulder, Joints.Spine],
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
    joints: [Joints.Ankle, Joints.Knee, Joints.Hip, Joints.Spine],
    description: 'A forward fold that stretches the hamstrings and back muscles while calming the mind and relieving stress.',
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
    joints: [Joints.Ankle, Joints.Knee, Joints.Hip, Joints.Spine],
    description: 'A standing twist that strengthens the legs while stretching the hamstrings and opening the chest.',
    metrics: {
      hasSets: false,
      hasReps: false,
      hasWeight: false,
      hasTime: true
    }
  },
  {
    id: 'thread-the-needle-pose',
    title: 'Thread the Needle Pose (Parsva Balasana)',
    muscles: [Muscles.Shoulders, Muscles.UpperBack],
    joints: [Joints.Shoulder, Joints.Spine, Joints.Neck],
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
    muscles: [Muscles.Hamstrings, Muscles.LowerBack],
    joints: [Joints.Hip, Joints.Spine, Joints.Shoulder],
    description: 'A standing forward bend that stretches the spine, shoulders, wrists, hamstrings, and hips.',
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
    joints: [Joints.Hip, Joints.Spine, Joints.Shoulder],
    description: 'A prone backbend that strengthens the back muscles, glutes, and hamstrings.',
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
    joints: [Joints.Knee, Joints.Hip, Joints.Spine, Joints.Shoulder],
    description: 'A kneeling backbend that stretches the entire front of the body from the thighs to the throat.',
    metrics: {
      hasSets: false,
      hasReps: false,
      hasWeight: false,
      hasTime: true
    }
  }
];