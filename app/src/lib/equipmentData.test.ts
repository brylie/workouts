import { describe, expect, it } from "vitest";
import { Equipment } from "./enums";
import { equipmentList, getEquipment, getEquipmentDetails, getEquipmentDetailsForTypes } from "./equipmentData";

// Test getEquipmentDetails function
describe('getEquipmentDetails', () => {
    it('should return the correct equipment details for the specified type', () => {
      const equipment = getEquipmentDetails(Equipment.Dumbbells);
      expect(equipment).toEqual({
        id: Equipment.Dumbbells,
        name: 'Dumbbells',
        description: 'A pair of handheld weights used for various exercises.'
      });
    });
  
    it('should return undefined for an invalid equipment type', () => {
      const equipment = getEquipmentDetails('invalid' as Equipment);
      expect(equipment).toBeUndefined();
    });
});
  
describe('getEquipmentDetailsForTypes', () => {
    it('should return the correct equipment details for multiple types', () => {
      const equipment = getEquipmentDetailsForTypes([Equipment.Dumbbells, Equipment.Bench]);
      expect(equipment).toEqual([
        {
          id: Equipment.Dumbbells,
          name: 'Dumbbells',
          description: 'A pair of handheld weights used for various exercises.'
        },
        {
          id: Equipment.Bench,
          name: 'Bench',
          description: 'A flat or adjustable bench used for exercises like bench press and dumbbell rows.'
        }
      ]);
    });
  
    it('should return an empty array when no equipment types are provided', () => {
      const equipment = getEquipmentDetailsForTypes([]);
      expect(equipment).toHaveLength(0);
    });
});

describe('getEquipment', () => {
    it('should return the correct equipment details for the specified type', () => {
      const equipment = getEquipment(Equipment.Dumbbells);
      expect(equipment).toEqual({
        id: Equipment.Dumbbells,
        name: 'Dumbbells',
        description: 'A pair of handheld weights used for various exercises.'
      });
    });
  
    it('should return undefined for an invalid equipment type', () => {
      const equipment = getEquipment('invalid' as Equipment);
      expect(equipment).toBeUndefined();
    });
});
  
describe('equipmentList', () => {
    it('should contain all equipment details', () => {
      // Check that equipmentList contains all enum values
      expect(equipmentList).toHaveLength(Object.values(Equipment).length);
    });
});