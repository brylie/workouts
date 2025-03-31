import { describe, test, expect, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/svelte';
import ExerciseFilter from './ExerciseFilter.svelte';
import { Muscles, Equipment } from '$lib/enums';
import type { ExerciseFilters } from '$lib/types';

describe('ExerciseFilter', () => {
    const defaultFilters: ExerciseFilters = {
        muscles: [],
        equipment: []
    };

    test('renders all muscle options', () => {
        const { container } = render(ExerciseFilter, {
            props: {
                filters: defaultFilters,
                onFilterChange: vi.fn()
            }
        });

        // Check each muscle enum value has a corresponding filter
        Object.values(Muscles).forEach(muscle => {
            const filterInput = container.querySelector(`#muscle-filter-${muscle}`);
            const filterLabel = container.querySelector(`#muscle-filter-${muscle}-text`);
            
            expect(filterInput).toBeInTheDocument();
            expect(filterLabel).toBeInTheDocument();
            expect(filterLabel?.textContent?.trim()).toBe(muscle);
        });
    });

    test('renders all equipment options', () => {
        const { container } = render(ExerciseFilter, {
            props: {
                filters: defaultFilters,
                onFilterChange: vi.fn()
            }
        });

        // Check each equipment option has a corresponding filter
        [Equipment.DUMBBELLS, Equipment.KETTLEBELL].forEach(equipment => {
            const filterInput = container.querySelector(`#equipment-filter-${equipment}`);
            const filterLabel = container.querySelector(`#equipment-filter-${equipment}-text`);
            
            expect(filterInput).toBeInTheDocument();
            expect(filterLabel).toBeInTheDocument();
        });
    });

    test('calls onFilterChange when muscle filter is clicked', async () => {
        const handleFilterChange = vi.fn();
        const { container } = render(ExerciseFilter, {
            props: {
                filters: defaultFilters,
                onFilterChange: handleFilterChange
            }
        });

        // Click the chest muscle filter
        const chestFilter = container.querySelector(`#muscle-filter-${Muscles.CHEST}`);
        await fireEvent.click(chestFilter!);

        expect(handleFilterChange).toHaveBeenCalledWith({
            muscles: [Muscles.CHEST],
            equipment: []
        });
    });

    test('calls onFilterChange when equipment filter is clicked', async () => {
        const handleFilterChange = vi.fn();
        const { container } = render(ExerciseFilter, {
            props: {
                filters: defaultFilters,
                onFilterChange: handleFilterChange
            }
        });

        // Click the dumbbells equipment filter
        const dumbbellsFilter = container.querySelector(`#equipment-filter-${Equipment.DUMBBELLS}`);
        await fireEvent.click(dumbbellsFilter!);

        expect(handleFilterChange).toHaveBeenCalledWith({
            muscles: [],
            equipment: [Equipment.DUMBBELLS]
        });
    });

    test('updates visual state when filters are active', () => {
        const activeFilters: ExerciseFilters = {
            muscles: [Muscles.CHEST],
            equipment: [Equipment.DUMBBELLS]
        };

        const { container } = render(ExerciseFilter, {
            props: {
                filters: activeFilters,
                onFilterChange: vi.fn()
            }
        });

        // Check active muscle filter has correct styling
        const chestFilterText = container.querySelector(`#muscle-filter-${Muscles.CHEST}-text`);
        expect(chestFilterText).toHaveClass('bg-blue-600');

        // Check active equipment filter has correct styling
        const dumbbellsFilterText = container.querySelector(`#equipment-filter-${Equipment.DUMBBELLS}-text`);
        expect(dumbbellsFilterText).toHaveClass('bg-purple-600');
    });

    test('removes filter when clicking an active filter', async () => {
        const activeFilters: ExerciseFilters = {
            muscles: [Muscles.CHEST],
            equipment: [Equipment.DUMBBELLS]
        };

        const handleFilterChange = vi.fn();
        const { container } = render(ExerciseFilter, {
            props: {
                filters: activeFilters,
                onFilterChange: handleFilterChange
            }
        });

        // Click the active chest filter to remove it
        const chestFilter = container.querySelector(`#muscle-filter-${Muscles.CHEST}`);
        await fireEvent.click(chestFilter!);

        expect(handleFilterChange).toHaveBeenCalledWith({
            muscles: [],
            equipment: [Equipment.DUMBBELLS]
        });
    });
});