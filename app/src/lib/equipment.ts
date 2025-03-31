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
	BACK_EXTENSION_MACHINE = 'back-extension-machine',
	ABDOMINAL_CRUNCH_MACHINE = 'abdominal-crunch-machine',
	HIP_ABDUCTOR_MACHINE = 'hip-abductor-machine',
	HIP_ADDUCTOR_MACHINE = 'hip-adductor-machine',
	SHOULDER_PRESS_MACHINE = 'shoulder-press-machine',
	SEATED_LEG_CURL_MACHINE = 'seated-leg-curl-machine',
	LEG_EXTENSIONS_MACHINE = 'leg-extensions-machine',
	ROTARY_TORSO_MACHINE = 'rotary-torso-machine',
	TREADMILL = 'treadmill',
	STATIONARY_CYCLE = 'stationary-cycle',
	DUMBBELLS = 'dumbbells',
	BENCH = 'bench',
	LAT_PULLDOWN_MACHINE = 'lat-pulldown-machine',
	CABLE_MACHINE = 'cable-machine',
	SEATED_ROWING_MACHINE = 'seated-rowing-machine',
	LEG_PRESS_MACHINE = 'leg-press-machine',
	KETTLEBELL = 'kettlebell',
}

/**
 * A record of all available equipment, indexed by the EquipmentType enum.
 * This provides a type-safe way to reference equipment.
 */
export const equipmentRegistry: Record<Equipment, EquipmentDetails> = {
	[Equipment.BACK_EXTENSION_MACHINE]: {
		id: Equipment.BACK_EXTENSION_MACHINE,
		name: 'Back Extension Machine',
		description: 'A machine used for performing back extension exercises.',
	},
	[Equipment.ABDOMINAL_CRUNCH_MACHINE]: {
		id: Equipment.ABDOMINAL_CRUNCH_MACHINE,
		name: 'Abdominal Crunch Machine',
		description: 'A machine used for performing abdominal crunch exercises.',
	},
	[Equipment.HIP_ABDUCTOR_MACHINE]: {
		id: Equipment.HIP_ABDUCTOR_MACHINE,
		name: 'Hip Abductor Machine',
		description: 'A machine used for performing hip abductor exercises.',
	},
	[Equipment.HIP_ADDUCTOR_MACHINE]: {
		id: Equipment.HIP_ADDUCTOR_MACHINE,
		name: 'Hip Adductor Machine',
		description: 'A machine used for performing hip adductor exercises.',
	},
	[Equipment.SHOULDER_PRESS_MACHINE]: {
		id: Equipment.SHOULDER_PRESS_MACHINE,
		name: 'Shoulder Press Machine',
		description: 'A machine used for performing shoulder press exercises.',
	},
	[Equipment.SEATED_LEG_CURL_MACHINE]: {
		id: Equipment.SEATED_LEG_CURL_MACHINE,
		name: 'Seated Leg Curl Machine',
		description: 'A machine used for performing seated leg curl exercises.',
	},
	[Equipment.LEG_EXTENSIONS_MACHINE]: {
		id: Equipment.LEG_EXTENSIONS_MACHINE,
		name: 'Leg Extensions Machine',
		description: 'A machine used for performing leg extension exercises.',
	},
	[Equipment.ROTARY_TORSO_MACHINE]: {
		id: Equipment.ROTARY_TORSO_MACHINE,
		name: 'Rotary Torso Machine',
		description: 'A machine used for performing rotary torso exercises.',
	},
	[Equipment.TREADMILL]: {
		id: Equipment.TREADMILL,
		name: 'Treadmill',
		description: 'A machine for walking or running while staying in one place.',
	},
	[Equipment.STATIONARY_CYCLE]: {
		id: Equipment.STATIONARY_CYCLE,
		name: 'Stationary Cycle',
		description: 'A stationary bike used for cardio workouts.',
	},
	[Equipment.DUMBBELLS]: {
		id: Equipment.DUMBBELLS,
		name: 'Dumbbells',
		description: 'A pair of handheld weights used for various exercises.',
	},
	[Equipment.BENCH]: {
		id: Equipment.BENCH,
		name: 'Bench',
		description:
			'A flat or adjustable bench used for exercises like bench press and dumbbell rows.',
	},
	[Equipment.LAT_PULLDOWN_MACHINE]: {
		id: Equipment.LAT_PULLDOWN_MACHINE,
		name: 'Lat Pulldown Machine',
		description: 'A machine used for performing lat pulldown exercises.',
	},
	[Equipment.CABLE_MACHINE]: {
		id: Equipment.CABLE_MACHINE,
		name: 'Cable Machine',
		description:
			'A versatile machine with adjustable pulleys used for various resistance exercises.',
	},
	[Equipment.SEATED_ROWING_MACHINE]: {
		id: Equipment.SEATED_ROWING_MACHINE,
		name: 'Seated Rowing Machine',
		description: 'A machine used for performing seated row exercises.',
	},
	[Equipment.LEG_PRESS_MACHINE]: {
		id: Equipment.LEG_PRESS_MACHINE,
		name: 'Leg Press Machine',
		description: 'A machine used for performing leg press exercises.',
	},
	[Equipment.KETTLEBELL]: {
		id: Equipment.KETTLEBELL,
		name: 'Kettlebell',
		description:
			'A cast-iron or cast-steel weight used for ballistic exercises that combine strength, cardio, and flexibility training.',
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
export function getEquipmentDetails(equipmentType: Equipment): EquipmentDetails {
	return equipmentRegistry[equipmentType];
}

/**
 * Get multiple equipment details at once
 * @param types Array of equipment types
 * @returns Array of equipment details
 */
export function getEquipmentDetailsForTypes(types: Equipment[]): EquipmentDetails[] {
	return types.map((type) => equipmentRegistry[type]);
}

/**
 * A flat array of all equipment for convenience.
 * Use this when you need a simple array of all equipment.
 */
export const equipmentList: EquipmentDetails[] = Object.values(equipmentRegistry);
