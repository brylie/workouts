<script lang="ts">
import { getRandomWorkoutItems } from '$lib/exerciseData';
import type { WorkoutItem } from '$lib/types';

let numberOfExercises = 5;
let generatedWorkout: WorkoutItem[] = [];

function generateWorkout() {
    generatedWorkout = getRandomWorkoutItems(numberOfExercises);
}

function markAsComplete(index: number) {
    generatedWorkout = generatedWorkout.map((item, i) => {
        if (i === index) {
            return { ...item, completed: !item.completed };
        }
        return item;
    });
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

        {#if generatedWorkout.length > 0}
            <div class="space-y-6">
                <h2 class="text-2xl font-bold mb-4">Your Workout</h2>
                
                <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {#each generatedWorkout as item, index}
                        <div class="bg-gray-800 p-6 rounded-lg">
                            <h3 class="text-xl font-semibold mb-2">{item.exercise.title}</h3>
                            <p class="text-gray-300 mb-4">{item.exercise.description}</p>
                            
                            <div class="mb-4">
                                <h4 class="text-sm font-medium mb-2">Sets & Reps:</h4>
                                <p class="text-gray-300">{item.sets} sets × {item.reps} reps</p>
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
                                class="mt-4 w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition-colors"
                            >
                                {item.completed ? 'Completed' : 'Mark as Complete'}
                            </button>
                        </div>
                    {/each}
                </div>
            </div>
        {/if}
    </div>
</div>