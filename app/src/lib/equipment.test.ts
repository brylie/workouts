import { describe, expect, it } from "vitest";
import {
  Equipment,
  getEquipmentDetails,
  getEquipmentDetailsForTypes,
  equipmentRegistry,
  equipmentList,
  type EquipmentDetails,
} from "./equipment";

describe("equipment", () => {
  it("should define EquipmentDetails interface", () => {
    const equipment: EquipmentDetails = {
      id: Equipment.DUMBBELLS,
      name: "Dumbbells",
      description: "A pair of handheld weights used for various exercises.",
    };
    expect(equipment).toBeDefined();
    expect(equipment.id).toBe("dumbbells");
    expect(equipment.name).toBe("Dumbbells");
    expect(equipment.description).toBe(
      "A pair of handheld weights used for various exercises.",
    );
  });

  describe("getEquipmentDetails", () => {
    it("should return correct details for equipment", () => {
      const details = getEquipmentDetails(Equipment.DUMBBELLS);
      expect(details).toEqual({
        id: Equipment.DUMBBELLS,
        name: "Dumbbells",
        description: "A pair of handheld weights used for various exercises.",
      });
    });

    it("should return details for all equipment types", () => {
      Object.values(Equipment).forEach((equipmentType) => {
        const details = getEquipmentDetails(equipmentType);
        expect(details).toBeDefined();
        expect(details.id).toBe(equipmentType);
        expect(details.name).toBeTruthy();
        expect(details.description).toBeTruthy();
      });
    });
  });

  describe("getEquipmentDetailsForTypes", () => {
    it("should return details for multiple equipment", () => {
      const equipment = [
        Equipment.DUMBBELLS,
        Equipment.BENCH,
        Equipment.KETTLEBELL,
      ];
      const details = getEquipmentDetailsForTypes(equipment);

      expect(details).toHaveLength(3);
      expect(details).toEqual([
        {
          id: Equipment.DUMBBELLS,
          name: "Dumbbells",
          description: "A pair of handheld weights used for various exercises.",
        },
        {
          id: Equipment.BENCH,
          name: "Bench",
          description:
            "A flat or adjustable bench used for exercises like bench press and dumbbell rows.",
        },
        {
          id: Equipment.KETTLEBELL,
          name: "Kettlebell",
          description:
            "A cast-iron or cast-steel weight used for ballistic exercises that combine strength, cardio, and flexibility training.",
        },
      ]);
    });

    it("should return empty array for empty input", () => {
      const details = getEquipmentDetailsForTypes([]);
      expect(details).toEqual([]);
    });
  });

  describe("equipmentList", () => {
    it("should contain all equipment from registry", () => {
      expect(equipmentList).toHaveLength(Object.keys(equipmentRegistry).length);

      equipmentList.forEach((equipment) => {
        expect(equipmentRegistry[equipment.id]).toEqual(equipment);
      });
    });

    it("should have unique equipment ids", () => {
      const ids = equipmentList.map((equipment) => equipment.id);
      const uniqueIds = [...new Set(ids)];
      expect(ids).toHaveLength(uniqueIds.length);
    });
  });
});

describe("Equipment enum", () => {
  it("should contain the expected equipment types", () => {
    expect(Equipment.BACK_EXTENSION_MACHINE).toBe("back-extension-machine");
    expect(Equipment.ABDOMINAL_CRUNCH_MACHINE).toBe("abdominal-crunch-machine");
    expect(Equipment.HIP_ABDUCTOR_MACHINE).toBe("hip-abductor-machine");
    expect(Equipment.HIP_ADDUCTOR_MACHINE).toBe("hip-adductor-machine");
    expect(Equipment.SHOULDER_PRESS_MACHINE).toBe("shoulder-press-machine");
    expect(Equipment.SEATED_LEG_CURL_MACHINE).toBe("seated-leg-curl-machine");
    expect(Equipment.LEG_EXTENSIONS_MACHINE).toBe("leg-extensions-machine");
    expect(Equipment.ROTARY_TORSO_MACHINE).toBe("rotary-torso-machine");
    expect(Equipment.TREADMILL).toBe("treadmill");
    expect(Equipment.STATIONARY_CYCLE).toBe("stationary-cycle");
    expect(Equipment.DUMBBELLS).toBe("dumbbells");
    expect(Equipment.BENCH).toBe("bench");
    expect(Equipment.LAT_PULLDOWN_MACHINE).toBe("lat-pulldown-machine");
    expect(Equipment.CABLE_MACHINE).toBe("cable-machine");
    expect(Equipment.SEATED_ROWING_MACHINE).toBe("seated-rowing-machine");
    expect(Equipment.LEG_PRESS_MACHINE).toBe("leg-press-machine");
    expect(Equipment.KETTLEBELL).toBe("kettlebell");
  });
});
