import { describe, expect, it } from "vitest";
import { Equipment } from "./enums";
import { equipmentList, getEquipment, getEquipmentDetails, getEquipmentDetailsForTypes } from "./equipmentData";



// Test getEquipmentDetails function
describe('getEquipmentDetails', () => {
    it('should return the correct equipment details for the specified type', () => {
      const equipment = getEquipmentDetails(Equipment.Treadmill);
      expect(equipment).toEqual({
        id: Equipment.Treadmill,
        name: 'Treadmill',
        description: 'A machine for walking or running while staying in one place.'
      });
    });
  
    // Test getEquipmentDetails with invalid equipment type
    it('should return undefined for an invalid equipment type', () => {
      const equipment = getEquipmentDetails('invalid' as Equipment);
      expect(equipment).toBeUndefined();
    });
  });
  
  // Test getEquipmentDetailsForTypes function
  describe('getEquipmentDetailsForTypes', () => {
    it('should return the correct equipment details for multiple types', () => {
      const equipment = getEquipmentDetailsForTypes([Equipment.Treadmill, Equipment.Dumbbells]);
      expect(equipment).toEqual([
        {
          id: Equipment.Treadmill,
          name: 'Treadmill',
          description: 'A machine for walking or running while staying in one place.'
        },
        {
          id: Equipment.Dumbbells,
          name: 'Dumbbells',
          description: 'A pair of handheld weights used for various exercises.'
        }
      ]);
    });
  
    // Test getEquipmentDetailsForTypes with empty array
    it('should return an empty array when no equipment types are provided', () => {
      const equipment = getEquipmentDetailsForTypes([]);
      expect(equipment).toHaveLength(0);
    });
  });



describe('getEquipment', () => {
    it('should return the correct equipment details for the specified type', () => {
      const equipment = getEquipment(Equipment.Treadmill);
      expect(equipment).toEqual({
        id: Equipment.Treadmill,
        name: 'Treadmill',
        description: 'A machine for walking or running while staying in one place.'
      });
    });
  
    it('should return undefined for an invalid equipment type', () => {
      const equipment = getEquipment('invalid' as Equipment);
      expect(equipment).toBeUndefined();
    });
  });


  describe('getEquipmentDetails', () => {
    it('should return the correct equipment details for the specified type', () => {
      const equipment = getEquipmentDetails(Equipment.Treadmill);
      expect(equipment).toEqual({
        id: Equipment.Treadmill,
        name: 'Treadmill',
        description: 'A machine for walking or running while staying in one place.'
      });
    });
  
    it('should return undefined for an invalid equipment type', () => {
      const equipment = getEquipmentDetails('invalid' as Equipment);
      expect(equipment).toBeUndefined();
    });
  });
  
  describe('getEquipmentDetailsForTypes', () => {
    it('should return the correct equipment details for multiple types', () => {
      const equipment = getEquipmentDetailsForTypes([Equipment.Treadmill, Equipment.Dumbbells]);
      expect(equipment).toEqual([
        {
          id: Equipment.Treadmill,
          name: 'Treadmill',
          description: 'A machine for walking or running while staying in one place.'
        },
        {
          id: Equipment.Dumbbells,
          name: 'Dumbbells',
          description: 'A pair of handheld weights used for various exercises.'
        }
      ]);
    });
  
    it('should return an empty array when no equipment types are provided', () => {
      const equipment = getEquipmentDetailsForTypes([]);
      expect(equipment).toHaveLength(0);
    });
  });
  
  describe('equipmentList', () => {
    it('should contain all equipment details', () => {
      expect(equipmentList).toHaveLength(equipmentList.length);
    });
  });