/**
 * Constants for recovery calculations
 */
const FULLY_TRAINED_PERCENTAGE = 100; // Maximum recovery percentage
const MILLISECONDS_IN_HOUR = 1000 * 60 * 60; // Conversion factor for hours
const OVERTRAINED_EXERCISE_COUNT = 2; // Number of exercises within recovery period that causes overtraining
const RECOVERY_HOURS_DEFAULT = 24; // Default recovery hours for a muscle

// Define and export types for muscle recovery
export enum MuscleRecoveryStatus {
  RECOVERED = "recovered",
  RECOVERING = "recovering",
  OVERTRAINED = "overtrained",
}

export interface MuscleRecovery {
  id: string;
  name: string;
  muscleGroup: string;
  status: MuscleRecoveryStatus;
  lastTrainedDate: Date | null;
  recoveryHours: number; // Recovery hours for the muscle
  recoveryPercentage: number;
  exerciseCount: number; // Number of exercises performed during recovery period
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
export function calculateRecoveryPercentage(
  lastTrainedDate: Date | null,
  recoveryHours: number,
): number {
  // If the muscle was never trained, it's fully recovered
  if (!lastTrainedDate) {
    return FULLY_TRAINED_PERCENTAGE;
  }

  // If recovery hours are zero, use the default
  // This is a fallback to avoid division by zero
  if (recoveryHours <= 0) {
    recoveryHours = RECOVERY_HOURS_DEFAULT;
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
 * Determine recovery status based on exercise count within recovery period
 *
 * @param exerciseCount - The number of times the muscle has been trained in its recovery period
 * @param recoveryPercentage - The calculated recovery percentage (for fully recovered determination)
 * @returns The appropriate MuscleRecoveryStatus
 */
function determineRecoveryStatusByExerciseCount(
  exerciseCount: number,
  recoveryPercentage: number,
): MuscleRecoveryStatus {
  if (recoveryPercentage >= FULLY_TRAINED_PERCENTAGE) {
    return MuscleRecoveryStatus.RECOVERED; // Fully recovered when recovery period has elapsed
  } else if (exerciseCount >= OVERTRAINED_EXERCISE_COUNT) {
    return MuscleRecoveryStatus.OVERTRAINED; // Overtrained if multiple exercises in recovery period
  } else if (exerciseCount > 0) {
    return MuscleRecoveryStatus.RECOVERING; // Recovering if trained once in recovery period
  } else {
    return MuscleRecoveryStatus.RECOVERED; // Default (should not reach here normally)
  }
}

/**
 * Get recovery status for all muscles
 *
 * @param lookbackDays - Optional number of days to look back for exercise history (default: 7 days)
 * @returns An array of MuscleRecovery objects
 */
export async function getMuscleRecoveryStatusForAllMuscles(
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

  // Create maps to track muscle training data
  const lastTrainedByMuscle = new Map<string, Date>();
  const exerciseDatesForMuscle = new Map<string, Date[]>();

  // Process each completed exercise
  completedExercises.forEach((exercise) => {
    const exerciseDetail = getExerciseById(exercise.exercise_id);
    if (exerciseDetail) {
      // Get the date the exercise was completed
      const completedDate = new Date(exercise.completed_at);

      // Update training data for each muscle used in this exercise
      exerciseDetail.muscles.forEach((muscleType) => {
        const muscleId = muscleType.toString();

        // Track last trained date
        const currentLastTrained = lastTrainedByMuscle.get(muscleId);
        if (!currentLastTrained || completedDate > currentLastTrained) {
          lastTrainedByMuscle.set(muscleId, completedDate);
        }

        // Track all exercise dates for this muscle
        const currentDates = exerciseDatesForMuscle.get(muscleId) || [];
        exerciseDatesForMuscle.set(muscleId, [...currentDates, completedDate]);
      });
    }
  });

  // Calculate recovery status for each muscle
  return musclesList.map((muscle) => {
    const lastTrainedDate = lastTrainedByMuscle.get(muscle.id) || null;
    const recoveryPercentage = calculateRecoveryPercentage(
      lastTrainedDate,
      muscle.recoveryHours,
    );

    // Count exercises performed within the muscle's recovery window
    let exerciseCount = 0;
    if (lastTrainedDate) {
      const allExerciseDates = exerciseDatesForMuscle.get(muscle.id) || [];
      const now = new Date();

      // Count exercises for this muscle that are still within their recovery period
      exerciseCount = allExerciseDates.filter((date) => {
        const recoveryEndTime = new Date(date.getTime());
        recoveryEndTime.setHours(
          recoveryEndTime.getHours() + muscle.recoveryHours,
        );
        return recoveryEndTime >= now;
      }).length;
    }

    const status = determineRecoveryStatusByExerciseCount(
      exerciseCount,
      recoveryPercentage,
    );

    return {
      id: muscle.id,
      name: muscle.name,
      status,
      lastTrainedDate,
      recoveryPercentage,
      exerciseCount,
      muscleGroup: muscle.muscleGroup,
      recoveryHours: muscle.recoveryHours,
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
  const allMuscleStatuses =
    await getMuscleRecoveryStatusForAllMuscles(lookbackDays);
  return allMuscleStatuses.find((muscle) => muscle.id === muscleId) || null;
}
