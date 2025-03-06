import { describe, expect, it } from "vitest";
import { Equipment, Muscles } from "./enums";


describe('Muscles enum', () => {
    it('should contain the expected muscle groups', () => {
      expect(Muscles.Abdominals).toBe('abdominals');
      expect(Muscles.Lats).toBe('lats');
      expect(Muscles.Biceps).toBe('biceps');
      expect(Muscles.Chest).toBe('chest');
      expect(Muscles.Glutes).toBe('glutes');
      expect(Muscles.Hamstrings).toBe('hamstrings');
      expect(Muscles.Quadriceps).toBe('quadriceps');
      expect(Muscles.Shoulders).toBe('shoulders');
      expect(Muscles.Triceps).toBe('triceps');
      expect(Muscles.LowerBack).toBe('lower_back');
      expect(Muscles.Calves).toBe('calves');
      expect(Muscles.Trapezius).toBe('trapezius');
      expect(Muscles.Abductors).toBe('abductors');
      expect(Muscles.Adductors).toBe('adductors');
      expect(Muscles.Forearms).toBe('forearms');
      expect(Muscles.Neck).toBe('neck');
    });
  });
  
  describe('Equipment enum', () => {
    it('should contain the expected equipment types', () => {
      expect(Equipment.BackExtensionMachine).toBe('back-extension-machine');
      expect(Equipment.AbdominalCrunchMachine).toBe('abdominal-crunch-machine');
      expect(Equipment.HipAbductorMachine).toBe('hip-abductor-machine');
      expect(Equipment.HipAdductorMachine).toBe('hip-adductor-machine');
      expect(Equipment.ShoulderPressMachine).toBe('shoulder-press-machine');
      expect(Equipment.SeatedLegCurlMachine).toBe('seated-leg-curl-machine');
      expect(Equipment.LegExtensionsMachine).toBe('leg-extensions-machine');
      expect(Equipment.RotaryTorsoMachine).toBe('rotary-torso-machine');
      expect(Equipment.Treadmill).toBe('treadmill');
      expect(Equipment.StationaryCycle).toBe('stationary-cycle');
      expect(Equipment.Dumbbells).toBe('dumbbells');
      expect(Equipment.Bench).toBe('bench');
      expect(Equipment.LatPulldownMachine).toBe('lat-pulldown-machine');
      expect(Equipment.CableMachine).toBe('cable-machine');
      expect(Equipment.SeatedRowingMachine).toBe('seated-rowing-machine');
      expect(Equipment.LegPressMachine).toBe('leg-press-machine');
    });
  });