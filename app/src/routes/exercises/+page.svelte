<script lang="ts">
	import { allExercises } from '$lib/exercises';
	import type { ExerciseFilters } from '$lib/types';
	import ExerciseFilter from '$lib/components/ExerciseFilter.svelte';

	let filters = $state<ExerciseFilters>({
		muscles: [],
		equipment: [],
	});

	const filteredExercises = $derived(
		allExercises.filter((exercise) => {
			// Apply muscle filter
			if (filters.muscles?.length) {
				if (!filters.muscles.some((muscle) => exercise.muscles.includes(muscle))) {
					return false;
				}
			}

			// Apply equipment filter
			if (filters.equipment?.length) {
				if (!exercise.equipment?.some((eq) => filters.equipment!.includes(eq))) {
					return false;
				}
			}

			return true;
		}),
	);

	// Sort filtered exercises by title
	const sortedExercises = $derived(
		[...filteredExercises].sort((a, b) => a.title.localeCompare(b.title)),
	);

	function handleFilterChange(newFilters: ExerciseFilters) {
		filters.muscles = newFilters.muscles;
		filters.equipment = newFilters.equipment;
	}
</script>

<div class="min-h-screen bg-gray-900 text-white">
	<div class="container mx-auto px-4 py-8">
		<h1 class="mb-8 text-4xl font-bold">Exercise Library</h1>

		<div class="mb-8">
			<ExerciseFilter {filters} onFilterChange={handleFilterChange} />
		</div>

		<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
			{#each sortedExercises as exercise}
				<div class="exercise-card rounded-lg bg-gray-800 p-6">
					<h2 class="exercise-title mb-2 text-2xl font-semibold">{exercise.title}</h2>
					<p class="exercise-description mb-4 text-gray-300">{exercise.description}</p>

					<div class="mb-4">
						<h3 class="mb-2 text-lg font-medium">Target Muscles:</h3>
						<div class="flex flex-wrap gap-2">
							{#each exercise.muscles as muscle}
								<span class="exercise-muscle rounded bg-blue-600 px-2 py-1 text-sm">{muscle}</span>
							{/each}
						</div>
					</div>

					{#if exercise.equipment}
						<div>
							<h3 class="mb-2 text-lg font-medium">Required Equipment:</h3>
							<div class="flex flex-wrap gap-2">
								{#each exercise.equipment as equipment}
									<span class="exercise-equipment rounded bg-purple-600 px-2 py-1 text-sm"
										>{equipment}</span
									>
								{/each}
							</div>
						</div>
					{/if}
				</div>
			{/each}
		</div>
	</div>
</div>
