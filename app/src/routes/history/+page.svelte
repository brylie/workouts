<script lang="ts">
import { getCompletedExercisesByDateRange, deleteCompletedExercise } from '$lib/database';
import type { CompletedExercise } from '$lib/types';
import { onMount } from 'svelte';

let startDate: string;
let endDate: string;
let isLoading = false;
let error: string | null = null;
let completedExercises: CompletedExercise[] = [];

// Format date for display
function formatDate(date: Date): string {
    return new Date(date).toLocaleDateString();
}

// Load exercise history for the selected date range
async function loadHistory() {
    isLoading = true;
    error = '';

    try {
        const start = new Date(startDate);
        const end = new Date(endDate);
        // Set end date to end of day for inclusive range
        end.setHours(23, 59, 59, 999);
        
        completedExercises = await getCompletedExercisesByDateRange(start, end);
    } catch (err) {
        console.error('Failed to load exercise history', err);
        error = 'Failed to load exercise history. Please try again later.';
        completedExercises = [];
    } finally {
        isLoading = false;
    }
}

onMount(() => {
    // Set default date range to last 7 days
    const end = new Date();
    const start = new Date();
    start.setDate(start.getDate() - 7);
    
    endDate = end.toISOString().split('T')[0];
    startDate = start.toISOString().split('T')[0];
    
    loadHistory();
});
</script>

<div class="min-h-screen bg-gray-900 text-white">
    <div class="container mx-auto px-4 py-8">
        <h1 class="text-4xl font-bold mb-8">Exercise History</h1>

        <div class="max-w-4xl mx-auto bg-gray-800 p-6 rounded-lg mb-8">
            <form on:submit|preventDefault={loadHistory} class="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                <div>
                    <label for="startDate" class="block text-sm font-medium mb-2">Start Date</label>
                    <input 
                        type="date" 
                        id="startDate"
                        bind:value={startDate}
                        class="w-full px-3 py-2 bg-gray-700 rounded border border-gray-600 text-white"
                    />
                </div>
                <div>
                    <label for="endDate" class="block text-sm font-medium mb-2">End Date</label>
                    <input 
                        type="date" 
                        id="endDate"
                        bind:value={endDate}
                        class="w-full px-3 py-2 bg-gray-700 rounded border border-gray-600 text-white"
                    />
                </div>
                <button 
                    type="submit"
                    class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors"
                    disabled={isLoading}
                >
                    {isLoading ? 'Loading...' : 'Filter'}
                </button>
            </form>
        </div>

        {#if error}
            <div class="max-w-4xl mx-auto mb-6 bg-red-800 text-white p-4 rounded-lg">
                <p>{error}</p>
            </div>
        {/if}
        
        {#if isLoading}
            <div class="max-w-4xl mx-auto text-center">
                <p>Loading exercise history...</p>
            </div>
        {:else}
            {#if completedExercises.length === 0}
                <div class="max-w-4xl mx-auto text-center">
                    <p>No exercise history found for the selected date range.</p>
                </div>
            {:else}
                <div class="max-w-4xl mx-auto overflow-x-auto">
                    <table class="min-w-full divide-y divide-gray-700">
                        <thead class="border-b border-gray-700">
                            <tr>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                    Date
                                </th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                    Exercise ID
                                </th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                    Sets
                                </th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                    Reps
                                </th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                    Weight
                                </th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                    Time
                                </th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-700">
                            {#each completedExercises as exercise}
                                <tr>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm">
                                        {formatDate(exercise.completed_at)}
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm">
                                        {exercise.exercise_id}
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm">
                                        {exercise.metrics.sets ?? '-'}
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm">
                                        {exercise.metrics.reps ?? '-'}
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm">
                                        {exercise.metrics.weight ? `${exercise.metrics.weight}kg` : '-'}
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm">
                                        {exercise.metrics.time ?? '-'}
                                    </td>
                                </tr>
                            {/each}
                        </tbody>
                    </table>
                </div>
            {/if}
        {/if}
    </div>
</div>