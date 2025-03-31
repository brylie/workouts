<script lang="ts">
import type { WorkoutItem } from '$lib/types';

export let item: WorkoutItem;
export let index: number;
export let savingIndex: number | null;

export let onUpdate: (index: number, updates: Partial<WorkoutItem>) => void;
export let onMarkComplete: (index: number) => void;
</script>

<div class="workout-item bg-gray-800 p-6 rounded-lg">
    <h3 class="text-xl font-semibold mb-2">{item.exercise.title}</h3>
    <p class="text-gray-300 mb-4">{item.exercise.description}</p>
    
    <div class="space-y-4 mb-4">
        {#if item.exercise.metrics.hasSets}
        <div class="grid grid-cols-2 gap-4">
            <div>
                <label for="sets-{index}" class="block text-sm font-medium mb-2">Sets</label>
                <input 
                    type="number" 
                    id="sets-{index}"
                    bind:value={item.sets}
                    on:change={() => onUpdate(index, { sets: item.sets })}
                    min="1"
                    class="w-full px-3 py-2 bg-gray-700 rounded border border-gray-600 text-white"
                />
            </div>
            {#if item.exercise.metrics.hasReps}
            <div>
                <label for="reps-{index}" class="block text-sm font-medium mb-2">Reps</label>
                <input 
                    type="number" 
                    id="reps-{index}"
                    bind:value={item.reps}
                    on:change={() => onUpdate(index, { reps: item.reps })}
                    min="1"
                    class="w-full px-3 py-2 bg-gray-700 rounded border border-gray-600 text-white"
                />
            </div>
            {/if}
        </div>
        {/if}
        {#if item.exercise.metrics.hasWeight}
        <div class="grid grid-cols-2 gap-4">
            <div>
                <label for="weight-{index}" class="block text-sm font-medium mb-2">Weight (kg)</label>
                <input 
                    type="number" 
                    id="weight-{index}"
                    bind:value={item.weight}
                    on:change={() => onUpdate(index, { weight: item.weight })}
                    min="0"
                    step="0.5"
                    class="w-full px-3 py-2 bg-gray-700 rounded border border-gray-600 text-white"
                />
            </div>
        </div>
        {/if}
        {#if item.exercise.metrics.hasTime}
            <div>
                <label for="time-{index}" class="block text-sm font-medium mb-2">Time (minutes)</label>
                <input 
                    type="numeric" 
                    id="time-{index}"
                    bind:value={item.time}
                    on:change={() => onUpdate(index, { time: item.time })}
                    placeholder="e.g. 30"
                    class="w-full px-3 py-2 bg-gray-700 rounded border border-gray-600 text-white"
                />
            </div>
        {/if}
    </div>

    <div class="mb-4">
        <h4 class="text-sm font-medium mb-2">Target Muscles:</h4>
        <div class="flex flex-wrap gap-2">
            {#each item.exercise.muscles as muscle}
                <span class="exercise-muscle bg-blue-600 px-2 py-1 rounded text-xs">{muscle}</span>
            {/each}
        </div>
    </div>

    {#if item.exercise.equipment}
        <div class="mb-4">
            <h4 class="text-sm font-medium mb-2">Required Equipment:</h4>
            <div class="flex flex-wrap gap-2">
                {#each item.exercise.equipment as equipment}
                    <span class="exercise-equipment bg-purple-600 px-2 py-1 rounded text-xs">{equipment}</span>
                {/each}
            </div>
        </div>
    {/if}

    <button 
        on:click={() => onMarkComplete(index)}
        disabled={savingIndex === index}
        class="mt-4 w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed"
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