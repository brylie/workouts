<script lang="ts">
import { getRandomWorkoutItems } from '$lib/exerciseData';
import type { WorkoutItem, CompletedExerciseV2, CompletedExerciseMetrics } from '$lib/types';
import { saveCompletedExercise } from '$lib/database';
import { browser } from '$app/environment';
import WorkoutItemComponent from '$lib/components/WorkoutItem.svelte';

let numberOfExercises = 5;
let generatedWorkout: WorkoutItem[] = [];
let savingIndex: number | null = null;
let saveError: string | null = null;

function generateWorkout() {
    generatedWorkout = getRandomWorkoutItems(numberOfExercises);
    saveError = null;
}

function updateWorkoutItem(index: number, updates: Partial<WorkoutItem>) {
    generatedWorkout = generatedWorkout.map((item, i) => 
        i === index ? { ...item, ...updates } : item
    );
}

async function markAsComplete(index: number) {
    const item = generatedWorkout[index];
    
    // Toggle the completed state
    generatedWorkout = generatedWorkout.map((item, i) => {
        if (i === index) {
            return { ...item, completed: !item.completed };
        }
        return item;
    });

    if (browser && item && item.exercise.id) {
        // If the item is now marked as complete, save to database
        if (!item.completed) {
            try {
                savingIndex = index;
                
                // Convert WorkoutItem metrics to CompletedExerciseMetrics
                const metrics: CompletedExerciseMetrics = {
                    sets: item.sets,
                    reps: item.reps,
                    weight: item.weight,
                    time: item.time
                };

                const completedExercise: CompletedExerciseV2 = {
                    exercise_id: item.exercise.id,
                    completed_at: new Date(),
                    metrics
                };
                
                await saveCompletedExercise(completedExercise);
                saveError = null;
            } catch (error) {
                console.error('Failed to save completed exercise:', error);
                saveError = 'Failed to save exercise record';
                
                // Revert the UI state if saving failed
                generatedWorkout = generatedWorkout.map((item, i) => {
                    if (i === index) {
                        return { ...item, completed: false };
                    }
                    return item;
                });
            } finally {
                savingIndex = null;
            }
        }
    }
}
</script>

<div class="min-h-screen bg-gray-900 text-white">
    <div class="container mx-auto px-4 py-8">
        <h1 class="text-4xl font-bold mb-8">Workout Generator</h1>
        
        <div class="max-w-md mx-auto bg-gray-800 p-6 rounded-lg mb-8">
            <form on:submit|preventDefault={generateWorkout} class="space-y-4">
                <div>
                    <label for="exerciseCount" class="block text-sm font-medium mb-2">
                        Number of Exercises
                    </label>
                    <input 
                        type="number" 
                        id="exerciseCount"
                        bind:value={numberOfExercises}
                        min="1"
                        max="15"
                        class="w-full px-3 py-2 bg-gray-700 rounded border border-gray-600 text-white"
                    />
                </div>
                
                <button 
                    type="submit"
                    class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors"
                >
                    Generate Workout
                </button>
            </form>
            
            <div class="mt-4 p-3 bg-gray-700 rounded text-sm">
                <p class="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span><strong>Training Tip:</strong> For optimal strength and mobility, aim to exercise each muscle group twice per week.</span>
                </p>
            </div>
        </div>

        {#if saveError}
            <div class="max-w-md mx-auto mb-6 bg-red-800 text-white p-4 rounded-lg">
                <p>{saveError}</p>
            </div>
        {/if}
        
        {#if generatedWorkout.length > 0}
            <div class="space-y-6">
                <h2 class="text-2xl font-bold mb-4">Your Workout</h2>
                
                <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {#each generatedWorkout as item, index}
                        <WorkoutItemComponent
                            {item}
                            {index}
                            {savingIndex}
                            onUpdate={updateWorkoutItem}
                            onMarkComplete={markAsComplete}
                        />
                    {/each}
                </div>
            </div>
        {/if}
    </div>
</div>