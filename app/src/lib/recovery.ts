/**
 * Constants for recovery calculations
 */
const FULLY_TRAINED_PERCENTAGE = 100; // Maximum recovery percentage
const MILLISECONDS_IN_HOUR = 1000 * 60 * 60; // Conversion factor for hours
const RECOVERED_THRESHOLD = 90; // Threshold percentage for fully recovered status
const RECOVERING_THRESHOLD = 50; // Threshold percentage for recovering status

// Define and export types for muscle recovery
export enum MuscleRecoveryStatus {
  RECOVERED = "recovered",
  RECOVERING = "recovering",
  OVERTRAINED = "overtrained",
}

export interface MuscleRecovery {
  id: string;
  status: MuscleRecoveryStatus;
  last_trained: Date | null;
  recovery_percentage: number;
}

import { musclesList } from "$lib/muscles";
import type { Muscles } from "$lib/muscles";
import { getCompletedExercisesByDateRange } from "$lib/database";
import { getExerciseById } from "$lib/exercises";

/**
 * Calculate the recovery percentage for a muscle based on last trained date and recovery hours
 *
 * @param lastTrainedDate - The date the muscle was last trained
 * @param recoveryHours - The number of hours needed for full recovery
 * @returns A number from 0 to 100 representing recovery percentage
 */
function calculateRecoveryPercentage(
  lastTrainedDate: Date | null,
  recoveryHours: number,
): number {
  // If the muscle was never trained, it's fully recovered
  if (!lastTrainedDate) {
    return FULLY_TRAINED_PERCENTAGE;
  }

  const currentTime = new Date();
  const hoursSinceTraining =
    (currentTime.getTime() - lastTrainedDate.getTime()) / MILLISECONDS_IN_HOUR;

  // Calculate recovery as a percentage
  const recoveryPercentage = Math.min(
    FULLY_TRAINED_PERCENTAGE,
    Math.round((hoursSinceTraining / recoveryHours) * 100),
  );

  return recoveryPercentage;
}

/**
 * Determine recovery status based on recovery percentage
 *
 * @param recoveryPercentage - The calculated recovery percentage
 * @returns The appropriate MuscleRecoveryStatus
 */
function determineRecoveryStatus(
  recoveryPercentage: number,
): MuscleRecoveryStatus {
  if (recoveryPercentage >= RECOVERED_THRESHOLD) {
    return MuscleRecoveryStatus.RECOVERED;
  } else if (recoveryPercentage >= RECOVERING_THRESHOLD) {
    return MuscleRecoveryStatus.RECOVERING;
  } else {
    return MuscleRecoveryStatus.OVERTRAINED;
  }
}

/**
 * Get recovery status for all muscles
 *
 * @param lookbackDays - Optional number of days to look back for exercise history (default: 7 days)
 * @returns An array of MuscleRecovery objects
 */
export async function getMuscleRecoveryStatus(
  lookbackDays = 7,
): Promise<MuscleRecovery[]> {
  // Calculate date range: from lookbackDays ago to now
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - lookbackDays);

  // Get all completed exercises within the date range
  const completedExercises = await getCompletedExercisesByDateRange(
    startDate,
    endDate,
  );

  // Create a map to track the last time each muscle was trained
  const lastTrainedByMuscle = new Map<string, Date>();

  // Process each completed exercise to find when muscles were last trained
  completedExercises.forEach((exercise) => {
    const exerciseDetail = getExerciseById(exercise.exercise_id);
    if (exerciseDetail) {
      // Get the date the exercise was completed
      const completedDate = new Date(exercise.completed_at);

      // Update the last trained date for each muscle used in this exercise
      exerciseDetail.muscles.forEach((muscleType) => {
        const muscleId = muscleType.toString();
        const currentLastTrained = lastTrainedByMuscle.get(muscleId);

        // Update only if this is more recent than what we have, or if we don't have a date yet
        if (!currentLastTrained || completedDate > currentLastTrained) {
          lastTrainedByMuscle.set(muscleId, completedDate);
        }
      });
    }
  });

  // Calculate recovery status for each muscle
  return musclesList.map((muscle) => {
    const lastTrainedDate = lastTrainedByMuscle.get(muscle.id) || null;
    const recoveryPercentage = calculateRecoveryPercentage(
      lastTrainedDate,
      muscle.recovery_hours,
    );
    const status = determineRecoveryStatus(recoveryPercentage);

    return {
      id: muscle.id,
      status,
      last_trained: lastTrainedDate,
      recovery_percentage: recoveryPercentage,
    };
  });
}

/**
 * Get recovery status for a specific muscle
 *
 * @param muscleId - The ID of the muscle to check
 * @param lookbackDays - Optional number of days to look back (default: 7 days)
 * @returns A MuscleRecovery object for the requested muscle
 */
export async function getSingleMuscleRecoveryStatus(
  muscleId: Muscles,
  lookbackDays = 7,
): Promise<MuscleRecovery | null> {
  const allMuscleStatuses = await getMuscleRecoveryStatus(lookbackDays);
  return allMuscleStatuses.find((muscle) => muscle.id === muscleId) || null;
}
