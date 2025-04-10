/**
 * Equipment represents the different types of equipment that can be used in an exercise.
 */
export interface EquipmentDetails {
  id: Equipment;
  name: string;
  description?: string;
}

/**
 * EquipmentType is an enum representing the different types of equipment available.
 * This provides type safety and autocompletion when referring to equipment.
 */
export enum Equipment {
  DUMBBELLS = "dumbbells",
  BENCH = "bench",
  KETTLEBELL = "kettlebell",
}

/**
 * A record of all available equipment, indexed by the EquipmentType enum.
 * This provides a type-safe way to reference equipment.
 */
export const equipmentRegistry: Record<Equipment, EquipmentDetails> = {
  [Equipment.DUMBBELLS]: {
    id: Equipment.DUMBBELLS,
    name: "Dumbbells",
    description: "A pair of handheld weights used for various exercises.",
  },
  [Equipment.BENCH]: {
    id: Equipment.BENCH,
    name: "Bench",
    description:
      "A flat or adjustable bench used for exercises like bench press and dumbbell rows.",
  },
  [Equipment.KETTLEBELL]: {
    id: Equipment.KETTLEBELL,
    name: "Kettlebell",
    description:
      "A cast-iron or cast-steel weight used for ballistic exercises that combine strength, cardio, and flexibility training.",
  },
};

/**
 * Helper function to get equipment by its type.
 * This is completely type-safe and will provide autocompletion for equipment types.
 */
export function getEquipment(type: Equipment): EquipmentDetails {
  return equipmentRegistry[type];
}

/**
 * Helper function to get equipment details by type.
 * Use this function in the UI when you need to display equipment metadata.
 * @param equipmentType The equipment type to get details for
 * @returns The equipment details including name and description
 */
export function getEquipmentDetails(
  equipmentType: Equipment,
): EquipmentDetails {
  return equipmentRegistry[equipmentType];
}

/**
 * Get multiple equipment details at once
 * @param types Array of equipment types
 * @returns Array of equipment details
 */
export function getEquipmentDetailsForTypes(
  types: Equipment[],
): EquipmentDetails[] {
  return types.map((type) => equipmentRegistry[type]);
}

/**
 * A flat array of all equipment for convenience.
 * Use this when you need a simple array of all equipment.
 */
export const equipmentList: EquipmentDetails[] =
  Object.values(equipmentRegistry);
