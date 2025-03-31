<script lang="ts">
import type { ExerciseFilters } from '$lib/types';
import { Muscles, Equipment } from '$lib/enums';
import { equipmentList } from '$lib/equipmentData';

export let filters: ExerciseFilters;
export let onFilterChange: (filters: ExerciseFilters) => void;

// Convert enums to arrays for selection
const muscleOptions = Object.values(Muscles);
const equipmentOptions = equipmentList;

function handleMuscleChange(muscle: Muscles, checked: boolean) {
    const updatedMuscles = checked
        ? [...(filters.muscles || []), muscle]
        : (filters.muscles || []).filter(m => m !== muscle);
    
    onFilterChange({
        ...filters,
        muscles: updatedMuscles
    });
}

function handleEquipmentChange(equipment: Equipment, checked: boolean) {
    const updatedEquipment = checked
        ? [...(filters.equipment || []), equipment]
        : (filters.equipment || []).filter(e => e !== equipment);
    
    onFilterChange({
        ...filters,
        equipment: updatedEquipment
    });
}
</script>

<div class="bg-gray-800 p-6 rounded-lg">
    <div class="mb-6">
        <h3 class="text-lg font-medium mb-3">Target Muscles</h3>
        <div class="flex flex-wrap gap-2">
            {#each muscleOptions as muscle}
                <label class="inline-flex items-center">
                    <input
                        type="checkbox"
                        class="hidden"
                        checked={filters.muscles?.includes(muscle)}
                        on:change={(e) => handleMuscleChange(muscle, e.currentTarget.checked)}
                    />
                    <span class="cursor-pointer px-3 py-1 rounded text-sm transition-colors {filters.muscles?.includes(muscle) ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'}">
                        {muscle}
                    </span>
                </label>
            {/each}
        </div>
    </div>

    <div>
        <h3 class="text-lg font-medium mb-3">Equipment</h3>
        <div class="flex flex-wrap gap-2">
            {#each equipmentOptions as equipment}
                <label class="inline-flex items-center">
                    <input
                        type="checkbox"
                        class="hidden"
                        checked={filters.equipment?.includes(equipment.id)}
                        on:change={(e) => handleEquipmentChange(equipment.id, e.currentTarget.checked)}
                    />
                    <span class="cursor-pointer px-3 py-1 rounded text-sm transition-colors {filters.equipment?.includes(equipment.id) ? 'bg-purple-600' : 'bg-gray-700 hover:bg-gray-600'}" title={equipment.description || undefined}>
                        {equipment.name}
                    </span>
                </label>
            {/each}
        </div>
    </div>
</div>