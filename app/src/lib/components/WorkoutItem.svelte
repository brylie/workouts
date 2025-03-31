<script lang="ts">
	import type { WorkoutItem } from '$lib/types';

	export let item: WorkoutItem;
	export let index: number;
	export let savingIndex: number | null;

	export let onUpdate: (index: number, updates: Partial<WorkoutItem>) => void;
	export let onMarkComplete: (index: number) => void;
</script>

<div class="workout-item rounded-lg bg-gray-800 p-6">
	<h3 class="mb-2 text-xl font-semibold">{item.exercise.title}</h3>
	<p class="mb-4 text-gray-300">{item.exercise.description}</p>

	<div class="mb-4 space-y-4">
		{#if item.exercise.metrics.hasSets}
			<div class="grid grid-cols-2 gap-4">
				<div>
					<label for="sets-{index}" class="mb-2 block text-sm font-medium">Sets</label>
					<input
						type="number"
						id="sets-{index}"
						bind:value={item.sets}
						on:change={() => onUpdate(index, { sets: item.sets })}
						min="1"
						class="w-full rounded border border-gray-600 bg-gray-700 px-3 py-2 text-white"
					/>
				</div>
				{#if item.exercise.metrics.hasReps}
					<div>
						<label for="reps-{index}" class="mb-2 block text-sm font-medium">Reps</label>
						<input
							type="number"
							id="reps-{index}"
							bind:value={item.reps}
							on:change={() => onUpdate(index, { reps: item.reps })}
							min="1"
							class="w-full rounded border border-gray-600 bg-gray-700 px-3 py-2 text-white"
						/>
					</div>
				{/if}
			</div>
		{/if}
		{#if item.exercise.metrics.hasWeight}
			<div class="grid grid-cols-2 gap-4">
				<div>
					<label for="weight-{index}" class="mb-2 block text-sm font-medium">Weight (kg)</label>
					<input
						type="number"
						id="weight-{index}"
						bind:value={item.weight}
						on:change={() => onUpdate(index, { weight: item.weight })}
						min="0"
						step="0.5"
						class="w-full rounded border border-gray-600 bg-gray-700 px-3 py-2 text-white"
					/>
				</div>
			</div>
		{/if}
		{#if item.exercise.metrics.hasTime}
			<div>
				<label for="time-{index}" class="mb-2 block text-sm font-medium">Time (minutes)</label>
				<input
					type="numeric"
					id="time-{index}"
					bind:value={item.time}
					on:change={() => onUpdate(index, { time: item.time })}
					placeholder="e.g. 30"
					class="w-full rounded border border-gray-600 bg-gray-700 px-3 py-2 text-white"
				/>
			</div>
		{/if}
	</div>

	<div class="mb-4">
		<h4 class="mb-2 text-sm font-medium">Target Muscles:</h4>
		<div class="flex flex-wrap gap-2">
			{#each item.exercise.muscles as muscle}
				<span class="exercise-muscle rounded bg-blue-600 px-2 py-1 text-xs">{muscle}</span>
			{/each}
		</div>
	</div>

	{#if item.exercise.equipment}
		<div class="mb-4">
			<h4 class="mb-2 text-sm font-medium">Required Equipment:</h4>
			<div class="flex flex-wrap gap-2">
				{#each item.exercise.equipment as equipment}
					<span class="exercise-equipment rounded bg-purple-600 px-2 py-1 text-xs">{equipment}</span
					>
				{/each}
			</div>
		</div>
	{/if}

	<button
		on:click={() => onMarkComplete(index)}
		disabled={savingIndex === index}
		class="mt-4 w-full rounded bg-green-600 px-4 py-2 font-bold text-white transition-colors hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-gray-500"
	>
		{#if savingIndex === index}
			Saving...
		{:else if item.completed}
			Completed
		{:else}
			Mark as Complete
		{/if}
	</button>
</div>
