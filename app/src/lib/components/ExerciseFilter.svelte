<script lang="ts">
import type { ExerciseFilters } from '../types';
import { Equipment, equipmentList } from '../equipment';
import { Muscles, musclesList } from '../muscles';

const { filters, onFilterChange }: { filters: ExerciseFilters; onFilterChange: (filters: ExerciseFilters) => void } = $props();

const muscleOptions = $derived([...musclesList].sort((a, b) => a.name.localeCompare(b.name)));
const equipmentOptions = $derived([...equipmentList].sort((a, b) => a.name.localeCompare(b.name)));

const activeMuscleCount = $derived(filters.muscles?.length || 0);
const activeEquipmentCount = $derived(filters.equipment?.length || 0);
const muscleLabelText = $derived(activeMuscleCount === 1 ? 'muscle' : 'muscles');

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

<div class="collapse collapse-arrow bg-gray-800 rounded-lg">
    <input type="checkbox" />
    <div class="collapse-title text-lg font-medium flex items-center gap-3">
        Filters
        {#if activeMuscleCount > 0}
            <div class="badge badge-md bg-blue-600 border-blue-600">
                {activeMuscleCount} {muscleLabelText}
            </div>
        {/if}
        {#if activeEquipmentCount > 0}
            <div class="badge badge-md bg-purple-600 border-purple-600">
                {activeEquipmentCount} equipment
            </div>
        {/if}
    </div>
    <div class="collapse-content">
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
                            onchange={(e) => handleMuscleChange(muscle.id, e.currentTarget.checked)}
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
                            onchange={(e) => handleEquipmentChange(equipment.id, e.currentTarget.checked)}
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
</div>