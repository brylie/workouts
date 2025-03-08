<script lang="ts">
import { onMount } from 'svelte';
import { db, getCompletedExercisesByDateRange } from '$lib/database';
import type { CompletedExercise } from '$lib/types';
import { browser } from '$app/environment';

let completedExercises: CompletedExercise[] = [];
let isLoading = true;
let errorMessage = '';
let startDate: string;
let endDate: string;

// Set default date range to the past 30 days
const today = new Date();
const thirtyDaysAgo = new Date();
thirtyDaysAgo.setDate(today.getDate() - 30);
startDate = thirtyDaysAgo.toISOString().split('T')[0]; // YYYY-MM-DD format
endDate = today.toISOString().split('T')[0]; // YYYY-MM-DD format

// Function to format a date for display
function formatDate(date: Date): string {
    return new Date(date).toLocaleDateString();
}

// Load completed exercises from the database
async function loadExercises() {
    if (!browser) return;
    
    isLoading = true;
    errorMessage = '';
    
    try {
        const start = new Date(startDate);
        const end = new Date(endDate);
        // Set end date to end of day
        end.setHours(23, 59, 59, 999);
        
        completedExercises = await getCompletedExercisesByDateRange(start, end);
    } catch (error) {
        console.error('Failed to load exercise history', error);
        errorMessage = 'Failed to load exercise history. Please try again later.';
        completedExercises = [];
    } finally {
        isLoading = false;
    }
}

onMount(() => {
    loadExercises();
});
</script>

<div class="min-h-screen bg-gray-900 text-white">
    <div class="container mx-auto px-4 py-8">
        <h1 class="text-4xl font-bold mb-8">Exercise History</h1>
        
        <div class="bg-gray-800 p-6 rounded-lg mb-8">
            <h2 class="text-2xl font-semibold mb-4">Filter History</h2>
            
            <form on:submit|preventDefault={loadExercises} class="flex flex-col md:flex-row gap-4">
                <div class="flex-1">
                    <label for="startDate" class="block text-sm font-medium mb-2">
                        Start Date
                    </label>
                    <input 
                        type="date" 
                        id="startDate"
                        bind:value={startDate}
                        class="w-full px-3 py-2 bg-gray-700 rounded border border-gray-600 text-white"
                    />
                </div>
                
                <div class="flex-1">
                    <label for="endDate" class="block text-sm font-medium mb-2">
                        End Date
                    </label>
                    <input 
                        type="date" 
                        id="endDate"
                        bind:value={endDate}
                        class="w-full px-3 py-2 bg-gray-700 rounded border border-gray-600 text-white"
                    />
                </div>
                
                <div class="flex items-end">
                    <button 
                        type="submit"
                        class="w-full md:w-auto px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded transition-colors"
                    >
                        Filter
                    </button>
                </div>
            </form>
        </div>
        
        {#if errorMessage}
            <div class="bg-red-800 p-4 rounded-lg mb-4">
                <p>{errorMessage}</p>
            </div>
        {/if}
        
        {#if isLoading}
            <div class="text-center py-8">
                <p class="text-lg">Loading exercise history...</p>
            </div>
        {:else}
            {#if completedExercises.length === 0}
                <div class="bg-gray-800 p-6 rounded-lg text-center">
                    <p class="text-xl">No exercise history found for the selected date range.</p>
                    <p class="text-gray-400 mt-2">Complete some exercises to see them here!</p>
                </div>
            {:else}
                <div class="overflow-x-auto">
                    <table class="min-w-full bg-gray-800 rounded-lg overflow-hidden">
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
                                        {exercise.sets}
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm">
                                        {exercise.reps ?? '-'}
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm">
                                        {exercise.weight ? `${exercise.weight}kg` : '-'}
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