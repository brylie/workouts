<script lang="ts">
import { getRandomWorkoutItems } from '$lib/exerciseData';
import type { WorkoutItem, CompletedExercise } from '$lib/types';
import { saveCompletedExercise } from '$lib/database';
import { browser } from '$app/environment';

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
                const completedExercise: CompletedExercise = {
                    exercise_id: item.exercise.id,
                    completed_at: new Date(),
                    sets: item.sets,
                    reps: item.reps,
                    weight: item.weight,
                    time: item.time
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
                        <div class="bg-gray-800 p-6 rounded-lg">
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
                                            on:change={() => updateWorkoutItem(index, { sets: item.sets })}
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
                                            on:change={() => updateWorkoutItem(index, { reps: item.reps })}
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
                                            on:change={() => updateWorkoutItem(index, { weight: item.weight })}
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
                                            on:change={() => updateWorkoutItem(index, { time: item.time })}
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
                                        <span class="bg-blue-600 px-2 py-1 rounded text-xs">{muscle}</span>
                                    {/each}
                                </div>
                            </div>

                            {#if item.exercise.equipment}
                                <div class="mb-4">
                                    <h4 class="text-sm font-medium mb-2">Required Equipment:</h4>
                                    <div class="flex flex-wrap gap-2">
                                        {#each item.exercise.equipment as equipment}
                                            <span class="bg-purple-600 px-2 py-1 rounded text-xs">{equipment}</span>
                                        {/each}
                                    </div>
                                </div>
                            {/if}

                            <button 
                                on:click={() => markAsComplete(index)}
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
                    {/each}
                </div>
            </div>
        {/if}
    </div>
</div>