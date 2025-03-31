<script lang="ts">
	import type { ExerciseFilters } from '$lib/types';
	import { Equipment, equipmentList } from '$lib/equipment';
	import { Muscles, musclesList } from '$lib/muscles';

	const {
		filters,
		onFilterChange,
	}: { filters: ExerciseFilters; onFilterChange: (filters: ExerciseFilters) => void } = $props();

	const muscleOptions = $derived([...musclesList].sort((a, b) => a.name.localeCompare(b.name)));
	const equipmentOptions = $derived(
		[...equipmentList].sort((a, b) => a.name.localeCompare(b.name)),
	);

	const activeMuscleCount = $derived(filters.muscles?.length || 0);
	const activeEquipmentCount = $derived(filters.equipment?.length || 0);
	const muscleLabelText = $derived(activeMuscleCount === 1 ? 'muscle' : 'muscles');

	// Combine count and text to prevent formatting from breaking them apart
	const muscleBadgeText = $derived(`${activeMuscleCount} ${muscleLabelText}`);
	const equipmentBadgeText = $derived(`${activeEquipmentCount} equipment`);

	function handleMuscleChange(muscleId: Muscles, checked: boolean) {
		const updatedMuscles = checked
			? [...(filters.muscles || []), muscleId]
			: (filters.muscles || []).filter((m) => m !== muscleId);

		onFilterChange({
			...filters,
			muscles: updatedMuscles,
		});
	}

	function handleEquipmentChange(equipment: Equipment, checked: boolean) {
		const updatedEquipment = checked
			? [...(filters.equipment || []), equipment]
			: (filters.equipment || []).filter((e) => e !== equipment);

		onFilterChange({
			...filters,
			equipment: updatedEquipment,
		});
	}
</script>

<div id="exercise-filter-collapse" class="collapse-arrow collapse rounded-lg bg-gray-800">
	<input type="checkbox" />
	<div class="collapse-title flex items-center gap-3 text-lg font-medium">
		Filters
		{#if activeMuscleCount > 0}
			<div id="muscle-count-badge" class="badge badge-md border-blue-600 bg-blue-600">
				{muscleBadgeText}
			</div>
		{/if}
		{#if activeEquipmentCount > 0}
			<div id="equipment-count-badge" class="badge badge-md border-purple-600 bg-purple-600">
				{equipmentBadgeText}
			</div>
		{/if}
	</div>
	<div class="collapse-content">
		<div class="mb-6">
			<h3 class="mb-3 text-lg font-medium">Target Muscles</h3>
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
							class="cursor-pointer rounded px-3 py-1 text-sm transition-colors {filters.muscles?.includes(
								muscle.id,
							)
								? 'bg-blue-600'
								: 'bg-gray-700 hover:bg-gray-600'}"
						>
							{muscle.name}
						</span>
					</label>
				{/each}
			</div>
		</div>

		<div>
			<h3 class="mb-3 text-lg font-medium">Equipment</h3>
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
							class="cursor-pointer rounded px-3 py-1 text-sm transition-colors {filters.equipment?.includes(
								equipment.id,
							)
								? 'bg-purple-600'
								: 'bg-gray-700 hover:bg-gray-600'}"
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
