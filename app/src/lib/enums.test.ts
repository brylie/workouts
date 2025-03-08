import { describe, expect, it } from "vitest";
import { Equipment, Muscles, WorkoutType, Units } from "./enums";

describe('Muscles enum', () => {
    it('should contain the expected muscle groups', () => {
      // Upper body
      expect(Muscles.Chest).toBe('chest');
      expect(Muscles.Shoulders).toBe('shoulders');
      expect(Muscles.Triceps).toBe('triceps');
      expect(Muscles.Biceps).toBe('biceps');
      expect(Muscles.Lats).toBe('lats');
      expect(Muscles.Forearms).toBe('forearms');
      expect(Muscles.Trapezius).toBe('trapezius');
      expect(Muscles.Neck).toBe('neck');

      // Core
      expect(Muscles.Abdominals).toBe('abdominals');
      expect(Muscles.Obliques).toBe('obliques');
      expect(Muscles.LowerBack).toBe('lower_back');

      // Lower body
      expect(Muscles.Abductors).toBe('abductors');
      expect(Muscles.Adductors).toBe('adductors');
      expect(Muscles.Glutes).toBe('glutes');
      expect(Muscles.Hamstrings).toBe('hamstrings');
      expect(Muscles.Quadriceps).toBe('quadriceps');
      expect(Muscles.Calves).toBe('calves');
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

describe('WorkoutType enum', () => {
    it('should contain the expected workout types', () => {
      expect(WorkoutType.Strength).toBe('strength');
      expect(WorkoutType.Hypertrophy).toBe('hypertrophy');
      expect(WorkoutType.Endurance).toBe('endurance');
      expect(WorkoutType.Power).toBe('power');
      expect(WorkoutType.Circuit).toBe('circuit');
      expect(WorkoutType.Cardio).toBe('cardio');
      expect(WorkoutType.Flexibility).toBe('flexibility');
      expect(WorkoutType.Recovery).toBe('recovery');
      expect(WorkoutType.HIIT).toBe('hiit');
    });
});

describe('Units enum', () => {
    it('should contain the expected units', () => {
      expect(Units.Kilograms).toBe('kg');
      expect(Units.Pounds).toBe('lbs');
      expect(Units.Seconds).toBe('sec');
      expect(Units.Minutes).toBe('min');
    });
});