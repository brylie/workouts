import type { Equipment } from './types';
import { EquipmentType } from './enums';

/**
 * A record of all available equipment, indexed by the EquipmentType enum.
 * This provides a type-safe way to reference equipment.
 */
export const equipmentRegistry: Record<EquipmentType, Equipment> = {
  [EquipmentType.BackExtensionMachine]: { 
    id: EquipmentType.BackExtensionMachine, 
    name: 'Back Extension Machine', 
    description: 'A machine used for performing back extension exercises.' 
  },
  [EquipmentType.AbdominalCrunchMachine]: { 
    id: EquipmentType.AbdominalCrunchMachine, 
    name: 'Abdominal Crunch Machine', 
    description: 'A machine used for performing abdominal crunch exercises.' 
  },
  [EquipmentType.HipAbductorMachine]: { 
    id: EquipmentType.HipAbductorMachine, 
    name: 'Hip Abductor Machine', 
    description: 'A machine used for performing hip abductor exercises.' 
  },
  [EquipmentType.HipAdductorMachine]: { 
    id: EquipmentType.HipAdductorMachine, 
    name: 'Hip Adductor Machine', 
    description: 'A machine used for performing hip adductor exercises.' 
  },
  [EquipmentType.ShoulderPressMachine]: { 
    id: EquipmentType.ShoulderPressMachine, 
    name: 'Shoulder Press Machine', 
    description: 'A machine used for performing shoulder press exercises.' 
  },
  [EquipmentType.SeatedLegCurlMachine]: { 
    id: EquipmentType.SeatedLegCurlMachine, 
    name: 'Seated Leg Curl Machine', 
    description: 'A machine used for performing seated leg curl exercises.' 
  },
  [EquipmentType.LegExtensionsMachine]: { 
    id: EquipmentType.LegExtensionsMachine, 
    name: 'Leg Extensions Machine', 
    description: 'A machine used for performing leg extension exercises.' 
  },
  [EquipmentType.RotaryTorsoMachine]: { 
    id: EquipmentType.RotaryTorsoMachine, 
    name: 'Rotary Torso Machine', 
    description: 'A machine used for performing rotary torso exercises.' 
  },
  [EquipmentType.Treadmill]: { 
    id: EquipmentType.Treadmill, 
    name: 'Treadmill', 
    description: 'A machine for walking or running while staying in one place.' 
  },
  [EquipmentType.StationaryCycle]: { 
    id: EquipmentType.StationaryCycle, 
    name: 'Stationary Cycle', 
    description: 'A stationary bike used for cardio workouts.' 
  },
  [EquipmentType.Dumbbells]: { 
    id: EquipmentType.Dumbbells, 
    name: 'Dumbbells', 
    description: 'A pair of handheld weights used for various exercises.' 
  },
  [EquipmentType.Bench]: { 
    id: EquipmentType.Bench, 
    name: 'Bench', 
    description: 'A flat or adjustable bench used for exercises like bench press and dumbbell rows.' 
  },
  [EquipmentType.LatPulldownMachine]: { 
    id: EquipmentType.LatPulldownMachine, 
    name: 'Lat Pulldown Machine', 
    description: 'A machine used for performing lat pulldown exercises.' 
  },
  [EquipmentType.CableMachine]: { 
    id: EquipmentType.CableMachine, 
    name: 'Cable Machine', 
    description: 'A versatile machine with adjustable pulleys used for various resistance exercises.' 
  },
  [EquipmentType.SeatedRowingMachine]: { 
    id: EquipmentType.SeatedRowingMachine, 
    name: 'Seated Rowing Machine', 
    description: 'A machine used for performing seated row exercises.' 
  },
  [EquipmentType.LegPressMachine]: { 
    id: EquipmentType.LegPressMachine, 
    name: 'Leg Press Machine', 
    description: 'A machine used for performing leg press exercises.' 
  }
};

/**
 * Helper function to get equipment by its type.
 * This is completely type-safe and will provide autocompletion for equipment types.
 */
export function getEquipment(type: EquipmentType): Equipment {
  return equipmentRegistry[type];
}

/**
 * Helper function to get equipment details by type.
 * Use this function in the UI when you need to display equipment metadata.
 * @param equipmentType The equipment type to get details for
 * @returns The equipment details including name and description
 */
export function getEquipmentDetails(equipmentType: EquipmentType): Equipment {
  return equipmentRegistry[equipmentType];
}

/**
 * Get multiple equipment details at once
 * @param types Array of equipment types
 * @returns Array of equipment details
 */
export function getEquipmentDetailsForTypes(types: EquipmentType[]): Equipment[] {
  return types.map(type => equipmentRegistry[type]);
}

/**
 * A flat array of all equipment for convenience.
 * Use this when you need a simple array of all equipment.
 */
export const equipmentList: Equipment[] = Object.values(equipmentRegistry);