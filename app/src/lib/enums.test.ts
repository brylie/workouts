import { describe, expect, it } from "vitest";
import { Equipment, Muscles } from "./enums";


describe('Muscles enum', () => {
    it('should contain the expected muscle groups', () => {
      expect(Muscles.ABDOMINALS).toBe('abdominals');
      expect(Muscles.LATS).toBe('lats');
      expect(Muscles.BICEPS).toBe('biceps');
      expect(Muscles.CHEST).toBe('chest');
      expect(Muscles.GLUTES).toBe('glutes');
      expect(Muscles.HAMSTRINGS).toBe('hamstrings');
      expect(Muscles.QUADRICEPS).toBe('quadriceps');
      expect(Muscles.SHOULDERS).toBe('shoulders');
      expect(Muscles.TRICEPS).toBe('triceps');
      expect(Muscles.LOWER_BACK).toBe('lower_back');
      expect(Muscles.CALVES).toBe('calves');
      expect(Muscles.TRAPEZIUS).toBe('trapezius');
      expect(Muscles.ABDUCTORS).toBe('abductors');
      expect(Muscles.ADDUCTORS).toBe('adductors');
      expect(Muscles.FOREARMS).toBe('forearms');
      expect(Muscles.NECK).toBe('neck');
    });
  });
  
  describe('Equipment enum', () => {
    it('should contain the expected equipment types', () => {
      expect(Equipment.BACK_EXTENSION_MACHINE).toBe('back-extension-machine');
      expect(Equipment.ABDOMINAL_CRUNCH_MACHINE).toBe('abdominal-crunch-machine');
      expect(Equipment.HIP_ABDUCTOR_MACHINE).toBe('hip-abductor-machine');
      expect(Equipment.HIP_ADDUCTOR_MACHINE).toBe('hip-adductor-machine');
      expect(Equipment.SHOULDER_PRESS_MACHINE).toBe('shoulder-press-machine');
      expect(Equipment.SEATED_LEG_CURL_MACHINE).toBe('seated-leg-curl-machine');
      expect(Equipment.LEG_EXTENSIONS_MACHINE).toBe('leg-extensions-machine');
      expect(Equipment.ROTARY_TORSO_MACHINE).toBe('rotary-torso-machine');
      expect(Equipment.TREADMILL).toBe('treadmill');
      expect(Equipment.STATIONARY_CYCLE).toBe('stationary-cycle');
      expect(Equipment.DUMBBELLS).toBe('dumbbells');
      expect(Equipment.BENCH).toBe('bench');
      expect(Equipment.LAT_PULLDOWN_MACHINE).toBe('lat-pulldown-machine');
      expect(Equipment.CABLE_MACHINE).toBe('cable-machine');
      expect(Equipment.SEATED_ROWING_MACHINE).toBe('seated-rowing-machine');
      expect(Equipment.LEG_PRESS_MACHINE).toBe('leg-press-machine');
      expect(Equipment.KETTLEBELL).toBe('kettlebell');
    });
  });