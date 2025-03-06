import type { EquipmentDetails } from './types';
import { Equipment } from './enums';

/**
 * A record of all available equipment, indexed by the EquipmentType enum.
 * This provides a type-safe way to reference equipment.
 */
export const equipmentRegistry: Record<Equipment, EquipmentDetails> = {
  [Equipment.BackExtensionMachine]: { 
    id: Equipment.BackExtensionMachine, 
    name: 'Back Extension Machine', 
    description: 'A machine used for performing back extension exercises.' 
  },
  [Equipment.AbdominalCrunchMachine]: { 
    id: Equipment.AbdominalCrunchMachine, 
    name: 'Abdominal Crunch Machine', 
    description: 'A machine used for performing abdominal crunch exercises.' 
  },
  [Equipment.HipAbductorMachine]: { 
    id: Equipment.HipAbductorMachine, 
    name: 'Hip Abductor Machine', 
    description: 'A machine used for performing hip abductor exercises.' 
  },
  [Equipment.HipAdductorMachine]: { 
    id: Equipment.HipAdductorMachine, 
    name: 'Hip Adductor Machine', 
    description: 'A machine used for performing hip adductor exercises.' 
  },
  [Equipment.ShoulderPressMachine]: { 
    id: Equipment.ShoulderPressMachine, 
    name: 'Shoulder Press Machine', 
    description: 'A machine used for performing shoulder press exercises.' 
  },
  [Equipment.SeatedLegCurlMachine]: { 
    id: Equipment.SeatedLegCurlMachine, 
    name: 'Seated Leg Curl Machine', 
    description: 'A machine used for performing seated leg curl exercises.' 
  },
  [Equipment.LegExtensionsMachine]: { 
    id: Equipment.LegExtensionsMachine, 
    name: 'Leg Extensions Machine', 
    description: 'A machine used for performing leg extension exercises.' 
  },
  [Equipment.RotaryTorsoMachine]: { 
    id: Equipment.RotaryTorsoMachine, 
    name: 'Rotary Torso Machine', 
    description: 'A machine used for performing rotary torso exercises.' 
  },
  [Equipment.Treadmill]: { 
    id: Equipment.Treadmill, 
    name: 'Treadmill', 
    description: 'A machine for walking or running while staying in one place.' 
  },
  [Equipment.StationaryCycle]: { 
    id: Equipment.StationaryCycle, 
    name: 'Stationary Cycle', 
    description: 'A stationary bike used for cardio workouts.' 
  },
  [Equipment.Dumbbells]: { 
    id: Equipment.Dumbbells, 
    name: 'Dumbbells', 
    description: 'A pair of handheld weights used for various exercises.' 
  },
  [Equipment.Bench]: { 
    id: Equipment.Bench, 
    name: 'Bench', 
    description: 'A flat or adjustable bench used for exercises like bench press and dumbbell rows.' 
  },
  [Equipment.LatPulldownMachine]: { 
    id: Equipment.LatPulldownMachine, 
    name: 'Lat Pulldown Machine', 
    description: 'A machine used for performing lat pulldown exercises.' 
  },
  [Equipment.CableMachine]: { 
    id: Equipment.CableMachine, 
    name: 'Cable Machine', 
    description: 'A versatile machine with adjustable pulleys used for various resistance exercises.' 
  },
  [Equipment.SeatedRowingMachine]: { 
    id: Equipment.SeatedRowingMachine, 
    name: 'Seated Rowing Machine', 
    description: 'A machine used for performing seated row exercises.' 
  },
  [Equipment.LegPressMachine]: { 
    id: Equipment.LegPressMachine, 
    name: 'Leg Press Machine', 
    description: 'A machine used for performing leg press exercises.' 
  }
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
export function getEquipmentDetails(equipmentType: Equipment): EquipmentDetails {
  return equipmentRegistry[equipmentType];
}

/**
 * Get multiple equipment details at once
 * @param types Array of equipment types
 * @returns Array of equipment details
 */
export function getEquipmentDetailsForTypes(types: Equipment[]): EquipmentDetails[] {
  return types.map(type => equipmentRegistry[type]);
}

/**
 * A flat array of all equipment for convenience.
 * Use this when you need a simple array of all equipment.
 */
export const equipmentList: EquipmentDetails[] = Object.values(equipmentRegistry);