<script lang="ts">
import type { ExerciseFilters } from '../types';
import { Equipment, equipmentList } from '../equipment';
import { Muscles, musclesList } from '../muscles';

export let filters: ExerciseFilters;
export let onFilterChange: (filters: ExerciseFilters) => void;

// Use the pre-populated lists for selection
const muscleOptions = musclesList;
const equipmentOptions = equipmentList;

function handleMuscleChange(muscleId: Muscles, checked: boolean) {
    const updatedMuscles = checked
        ? [...(filters.muscles || []), muscleId]
        : (filters.muscles || []).filter(m => m !== muscleId);
    
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
                <label class="inline-flex items-center" id="muscle-filter-{muscle.id}-label">
                    <input
                        type="checkbox"
                        class="hidden"
                        id="muscle-filter-{muscle.id}"
                        checked={filters.muscles?.includes(muscle.id)}
                        on:change={(e) => handleMuscleChange(muscle.id, e.currentTarget.checked)}
                    />
                    <span 
                        id="muscle-filter-{muscle.id}-text"
                        class="cursor-pointer px-3 py-1 rounded text-sm transition-colors {filters.muscles?.includes(muscle.id) ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'}"
                    >
                        {muscle.name}
                    </span>
                </label>
            {/each}
        </div>
    </div>

    <div>
        <h3 class="text-lg font-medium mb-3">Equipment</h3>
        <div class="flex flex-wrap gap-2">
            {#each equipmentOptions as equipment}
                <label class="inline-flex items-center" id="equipment-filter-{equipment.id}-label">
                    <input
                        type="checkbox"
                        class="hidden"
                        id="equipment-filter-{equipment.id}"
                        checked={filters.equipment?.includes(equipment.id)}
                        on:change={(e) => handleEquipmentChange(equipment.id, e.currentTarget.checked)}
                    />
                    <span 
                        id="equipment-filter-{equipment.id}-text"
                        class="cursor-pointer px-3 py-1 rounded text-sm transition-colors {filters.equipment?.includes(equipment.id) ? 'bg-purple-600' : 'bg-gray-700 hover:bg-gray-600'}"
                        title={equipment.description || undefined}
                    >
                        {equipment.name}
                    </span>
                </label>
            {/each}
        </div>
    </div>
</div>