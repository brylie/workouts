/**
 * Joints is an enum representing the common joints that are typically targeted in stretches,
 * yoga poses, and mobility exercises. This simplified list focuses on joints that casual
 * fitness enthusiasts would recognize and consciously work on.
 */
export enum Joints {
  ANKLE = "ankle",
  ELBOW = "elbow",
  HIP = "hip",
  KNEE = "knee",
  NECK = "neck",
  SHOULDER = "shoulder",
  SPINE = "spine",
  WRIST = "wrist",
}

/**
 * JointDetails represents information about a joint that can be targeted by an exercise.
 */
export interface JointDetails {
  id: Joints;
  name: string;
}

/**
 * A record of all available joints, indexed by the Joints enum.
 * This provides a type-safe way to reference joints and their display names.
 */
export const jointsRegistry: Record<Joints, JointDetails> = {
  [Joints.ANKLE]: {
    id: Joints.ANKLE,
    name: "Ankle",
  },
  [Joints.ELBOW]: {
    id: Joints.ELBOW,
    name: "Elbow",
  },
  [Joints.HIP]: {
    id: Joints.HIP,
    name: "Hip",
  },
  [Joints.KNEE]: {
    id: Joints.KNEE,
    name: "Knee",
  },
  [Joints.NECK]: {
    id: Joints.NECK,
    name: "Neck",
  },
  [Joints.SHOULDER]: {
    id: Joints.SHOULDER,
    name: "Shoulder",
  },
  [Joints.SPINE]: {
    id: Joints.SPINE,
    name: "Spine",
  },
  [Joints.WRIST]: {
    id: Joints.WRIST,
    name: "Wrist",
  },
};

/**
 * Helper function to get joint details by type.
 */
export function getJointDetails(jointType: Joints): JointDetails {
  return jointsRegistry[jointType];
}

/**
 * Get multiple joint details at once
 */
export function getJointDetailsForTypes(types: Joints[]): JointDetails[] {
  return types.map((type) => jointsRegistry[type]);
}

/**
 * A flat array of all joints for convenience.
 * Use this when you need a simple array of all joints.
 */
export const jointsList: JointDetails[] = Object.values(jointsRegistry);
