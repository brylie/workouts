import { expect, test } from '@playwright/test';

test.describe('Workout Generator and History Flow', () => {
	// Increasing timeout for navigation and page load actions
	const navigationTimeout = 5000;

	test('should generate workout and save completed exercise to history', async ({ page }) => {
		// Navigate to workout page with full URL and wait for page to load
		await page.goto('/workouts/workout');

		// First wait for the page content to be available
		await expect(page.locator('h1')).toBeVisible({ timeout: navigationTimeout });
		await expect(page.locator('h1')).toHaveText('Workout Generator', {
			timeout: navigationTimeout,
		});

		// Fill in exercise count and generate workout
		await page.locator('#exerciseCount').fill('2');
		await page.getByRole('button', { name: 'Generate Workout' }).click();

		// Wait for workout to generate
		await expect(page.getByText('Your Workout')).toBeVisible({ timeout: navigationTimeout });

		// Wait for exercise cards to appear
		const exerciseCards = page.locator('.workout-item');
		await expect(exerciseCards).toHaveCount(2, { timeout: navigationTimeout });

		// Get the first exercise card
		const firstExerciseCard = exerciseCards.first();

		// Fill in metrics based on what's available
		const filledMetrics = {
			sets: null,
			reps: null,
			weight: null,
			time: null,
		};

		// Check and fill each metric if available
		const setsInput = firstExerciseCard.locator('input[id^="sets-"]');
		if (await setsInput.isVisible()) {
			await setsInput.clear();
			await setsInput.fill('5');
			filledMetrics.sets = '5';
		}

		const repsInput = firstExerciseCard.locator('input[id^="reps-"]');
		if (await repsInput.isVisible()) {
			await repsInput.clear();
			await repsInput.fill('10');
			filledMetrics.reps = '10';
		}

		const weightInput = firstExerciseCard.locator('input[id^="weight-"]');
		if (await weightInput.isVisible()) {
			await weightInput.clear();
			await weightInput.fill('20');
			filledMetrics.weight = '20';
		}

		const timeInput = firstExerciseCard.locator('input[id^="time-"]');
		if (await timeInput.isVisible()) {
			await timeInput.clear();
			await timeInput.fill('45');
			filledMetrics.time = '45';
		}

		// Find and click Mark as Complete button
		const completeButton = firstExerciseCard.locator('button:has-text("Mark as Complete")');
		await expect(completeButton).toBeVisible({ timeout: navigationTimeout });
		await completeButton.click();

		// Wait for button text to change to Completed
		await expect(firstExerciseCard.locator('button:has-text("Completed")')).toBeVisible({
			timeout: navigationTimeout,
		});

		// Navigate to history page
		await page.goto('/workouts/history');

		// More specific selector for the history page container
		await expect(page.getByRole('heading', { name: 'Exercise History' })).toBeVisible({
			timeout: navigationTimeout,
		});
		await expect(page.locator('h1')).toBeVisible({ timeout: navigationTimeout });
		await expect(page.locator('h1')).toHaveText('Exercise History', { timeout: navigationTimeout });

		// Set today's date for the end date filter
		const today = new Date().toISOString().split('T')[0];
		const endDateInput = page.locator('input[id="endDate"]');

		await endDateInput.click();
		await endDateInput.clear();
		await endDateInput.fill(today);

		// Click filter button
		await page.locator('button:has-text("Filter")').click();

		// Wait for table to appear
		await expect(page.locator('table')).toBeVisible({ timeout: navigationTimeout });

		// Verify the history entry contains our metrics
		if (filledMetrics.sets) {
			// First make sure table has loaded data
			await expect(page.locator('table tbody tr')).toBeVisible({ timeout: navigationTimeout });

			// Look for our data in any row
			const tableText = await page.locator('table').innerText();
			expect(tableText).toContain(filledMetrics.sets);

			if (filledMetrics.reps) {
				expect(tableText).toContain(filledMetrics.reps);
			}

			if (filledMetrics.weight) {
				expect(tableText).toContain(filledMetrics.weight);
			}
		}
	});

	test('should show empty state when no history exists', async ({ page }) => {
		await page.goto('/workouts/history');

		// More specific selector for history page verification
		await expect(page.getByRole('heading', { name: 'Exercise History' })).toBeVisible({
			timeout: navigationTimeout,
		});
		await expect(page.locator('h1')).toBeVisible({ timeout: navigationTimeout });
		await expect(page.locator('h1')).toHaveText('Exercise History', { timeout: navigationTimeout });

		// Set future date when no exercises would exist
		const futureDate = new Date();
		futureDate.setFullYear(futureDate.getFullYear() + 1);
		const futureDateString = futureDate.toISOString().split('T')[0];

		// Enter start date
		const startDateInput = page.locator('input[id="startDate"]');
		await startDateInput.click();
		await startDateInput.clear();
		await startDateInput.fill(futureDateString);

		// Enter end date
		const endDateInput = page.locator('input[id="endDate"]');
		await endDateInput.click();
		await endDateInput.clear();
		await endDateInput.fill(futureDateString);

		// Click filter button
		await page.locator('button:has-text("Filter")').click();

		// Check for empty state message
		await expect(
			page.locator('p:has-text("No exercise history found for the selected date range.")'),
		).toBeVisible({ timeout: navigationTimeout });
	});

	test('workout generator settings should affect generated workout', async ({ page }) => {
		await page.goto('/workouts/workout');

		// More specific selector for workout page verification
		await expect(page.getByRole('heading', { name: 'Workout Generator' })).toBeVisible({
			timeout: navigationTimeout,
		});
		await expect(page.locator('h1')).toBeVisible({ timeout: navigationTimeout });
		await expect(page.locator('h1')).toHaveText('Workout Generator', {
			timeout: navigationTimeout,
		});

		// Set number of exercises to 3
		await page.locator('#exerciseCount').clear();
		await page.locator('#exerciseCount').fill('3');

		// Generate workout
		await page.locator('button:has-text("Generate Workout")').click();

		// Check that 3 exercise cards are generated
		await expect(page.locator('.workout-item')).toHaveCount(3, { timeout: navigationTimeout });
	});
});
