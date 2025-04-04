import { describe, test, expect, vi } from "vitest";
import { render, fireEvent } from "@testing-library/svelte";
import ExerciseFilter from "./ExerciseFilter.svelte";
import { Muscles, musclesList } from "../muscles";
import { Equipment } from "../equipment";
import type { ExerciseFilters } from "$lib/exercises";

describe("ExerciseFilter", () => {
  const defaultFilters: ExerciseFilters = {
    muscles: [],
    equipment: [],
  };

  test("starts in collapsed state", () => {
    const { container } = render(ExerciseFilter, {
      props: {
        filters: defaultFilters,
        onFilterChange: vi.fn(),
      },
    });

    const checkbox = container.querySelector(
      '#exercise-filter-collapse > input[type="checkbox"]',
    ) as HTMLInputElement;
    expect(checkbox.checked).toBe(false);
  });

  test("can be expanded and collapsed", async () => {
    const { container } = render(ExerciseFilter, {
      props: {
        filters: defaultFilters,
        onFilterChange: vi.fn(),
      },
    });

    const checkbox = container.querySelector(
      '#exercise-filter-collapse > input[type="checkbox"]',
    ) as HTMLInputElement;
    await fireEvent.click(checkbox);
    expect(checkbox.checked).toBe(true);

    await fireEvent.click(checkbox);
    expect(checkbox.checked).toBe(false);
  });

  test("shows correct badge counts for active filters", () => {
    const activeFilters: ExerciseFilters = {
      muscles: [Muscles.CHEST, Muscles.LOWER_BACK],
      equipment: [Equipment.DUMBBELLS],
    };

    const { container } = render(ExerciseFilter, {
      props: {
        filters: activeFilters,
        onFilterChange: vi.fn(),
      },
    });

    const muscleBadge = container.querySelector(".badge.bg-blue-600");
    const equipmentBadge = container.querySelector(".badge.bg-purple-600");

    expect(muscleBadge?.textContent?.trim()).toBe("2 muscles");
    expect(equipmentBadge?.textContent?.trim()).toBe("1 equipment");
  });

  test("hides badges when no filters are active", () => {
    const { container } = render(ExerciseFilter, {
      props: {
        filters: defaultFilters,
        onFilterChange: vi.fn(),
      },
    });

    const muscleBadge = container.querySelector(".badge.bg-blue-600");
    const equipmentBadge = container.querySelector(".badge.bg-purple-600");

    expect(muscleBadge).not.toBeInTheDocument();
    expect(equipmentBadge).not.toBeInTheDocument();
  });

  test("renders all muscle options", () => {
    const { container } = render(ExerciseFilter, {
      props: {
        filters: defaultFilters,
        onFilterChange: vi.fn(),
      },
    });

    // Check each muscle enum value has a corresponding filter
    Object.values(Muscles).forEach((muscleId) => {
      const filterInput = container.querySelector(`#muscle-filter-${muscleId}`);
      const filterLabel = container.querySelector(
        `#muscle-filter-${muscleId}-text`,
      );

      expect(filterInput).toBeInTheDocument();
      expect(filterLabel).toBeInTheDocument();
      // Check for display name from musclesList instead of enum ID
      expect(filterLabel?.textContent?.trim()).toBe(
        musclesList.find((m) => m.id === muscleId)?.name,
      );
    });
  });

  test("renders all equipment options", () => {
    const { container } = render(ExerciseFilter, {
      props: {
        filters: defaultFilters,
        onFilterChange: vi.fn(),
      },
    });

    // Check each equipment option has a corresponding filter
    [Equipment.DUMBBELLS, Equipment.KETTLEBELL].forEach((equipment) => {
      const filterInput = container.querySelector(
        `#equipment-filter-${equipment}`,
      );
      const filterLabel = container.querySelector(
        `#equipment-filter-${equipment}-text`,
      );

      expect(filterInput).toBeInTheDocument();
      expect(filterLabel).toBeInTheDocument();
    });
  });

  test("calls onFilterChange when muscle filter is clicked", async () => {
    const handleFilterChange = vi.fn();
    const { container } = render(ExerciseFilter, {
      props: {
        filters: defaultFilters,
        onFilterChange: handleFilterChange,
      },
    });

    // Click the chest muscle filter
    const chestFilter = container.querySelector(
      `#muscle-filter-${Muscles.CHEST}`,
    );
    await fireEvent.click(chestFilter!);

    expect(handleFilterChange).toHaveBeenCalledWith({
      muscles: [Muscles.CHEST],
      equipment: [],
    });
  });

  test("calls onFilterChange when equipment filter is clicked", async () => {
    const handleFilterChange = vi.fn();
    const { container } = render(ExerciseFilter, {
      props: {
        filters: defaultFilters,
        onFilterChange: handleFilterChange,
      },
    });

    // Click the dumbbells equipment filter
    const dumbbellsFilter = container.querySelector(
      `#equipment-filter-${Equipment.DUMBBELLS}`,
    );
    await fireEvent.click(dumbbellsFilter!);

    expect(handleFilterChange).toHaveBeenCalledWith({
      muscles: [],
      equipment: [Equipment.DUMBBELLS],
    });
  });

  test("updates visual state when filters are active", () => {
    const activeFilters: ExerciseFilters = {
      muscles: [Muscles.CHEST],
      equipment: [Equipment.DUMBBELLS],
    };

    const { container } = render(ExerciseFilter, {
      props: {
        filters: activeFilters,
        onFilterChange: vi.fn(),
      },
    });

    // Check active muscle filter has correct styling
    const chestFilterText = container.querySelector(
      `#muscle-filter-${Muscles.CHEST}-text`,
    );
    expect(chestFilterText).toHaveClass("bg-blue-600");

    // Check active equipment filter has correct styling
    const dumbbellsFilterText = container.querySelector(
      `#equipment-filter-${Equipment.DUMBBELLS}-text`,
    );
    expect(dumbbellsFilterText).toHaveClass("bg-purple-600");
  });

  test("removes filter when clicking an active filter", async () => {
    const activeFilters: ExerciseFilters = {
      muscles: [Muscles.CHEST],
      equipment: [Equipment.DUMBBELLS],
    };

    const handleFilterChange = vi.fn();
    const { container } = render(ExerciseFilter, {
      props: {
        filters: activeFilters,
        onFilterChange: handleFilterChange,
      },
    });

    // Click the active chest filter to remove it
    const chestFilter = container.querySelector(
      `#muscle-filter-${Muscles.CHEST}`,
    );
    await fireEvent.click(chestFilter!);

    expect(handleFilterChange).toHaveBeenCalledWith({
      muscles: [],
      equipment: [Equipment.DUMBBELLS],
    });
  });

  test('shows singular "muscle" text when one muscle filter is active', () => {
    const singleMuscleFilter: ExerciseFilters = {
      muscles: [Muscles.CHEST],
      equipment: [],
    };

    const { container } = render(ExerciseFilter, {
      props: {
        filters: singleMuscleFilter,
        onFilterChange: vi.fn(),
      },
    });

    const muscleBadge = container.querySelector(".badge.bg-blue-600");
    expect(muscleBadge?.textContent?.trim()).toBe("1 muscle");
  });

  test("shows plural 'muscles' text when multiple muscle filters are active", () => {
    const multipleMuscleFilters: ExerciseFilters = {
      muscles: [Muscles.CHEST, Muscles.LOWER_BACK],
      equipment: [],
    };
    const { container } = render(ExerciseFilter, {
      props: {
        filters: multipleMuscleFilters,
        onFilterChange: vi.fn(),
      },
    });

    const muscleBadge = container.querySelector(".badge.bg-blue-600");
    expect(muscleBadge?.textContent?.trim()).toBe("2 muscles");
  });
});
