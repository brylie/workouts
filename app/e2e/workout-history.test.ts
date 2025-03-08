import { expect, test } from '@playwright/test';

test.describe('Workout Generator and History Flow', () => {
  test('should generate workout and save completed exercise to history', async ({ page }) => {
    await page.goto('/workouts/workout');
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Workout Generator');
    
    await page.getByLabel('Number of Exercises').fill('2');
    await page.getByRole('button', { name: 'Generate Workout' }).click();
    
    await expect(page.getByRole('heading', { name: 'Your Workout' })).toBeVisible();
    await expect(page.locator('.bg-gray-800.p-6.rounded-lg').filter({ 
      has: page.getByText('Target Muscles:') 
    })).toHaveCount(2);
    
    await page.locator('#sets-0').fill('5');
    await page.locator('#reps-0').fill('10');
    await page.locator('#weight-0').fill('20');
    await page.locator('#time-0').fill('45s');
    
    await page.locator('button', { hasText: 'Mark as Complete' }).first().click();
    await expect(page.locator('button').filter({ hasText: 'Completed' }).first()).toBeVisible();
    
    await page.goto('/workouts/history');
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Exercise History');
    
    const today = new Date().toISOString().split('T')[0];
    await page.getByLabel('End Date').fill(today);
    await page.getByRole('button', { name: 'Filter' }).click();
    
    await expect(page.locator('table')).toBeVisible();
    
    const exerciseRow = page.locator('tr').filter({ has: page.locator('td', { hasText: '5' }) });
    await expect(exerciseRow.locator('td').nth(2)).toHaveText('5');
    await expect(exerciseRow.locator('td').nth(3)).toHaveText('10');
    await expect(exerciseRow.locator('td').nth(4)).toHaveText('20kg');
  });

  test('should show empty state when no history exists', async ({ page }) => {
    await page.goto('/workouts/history');
    
    const futureDate = new Date();
    futureDate.setFullYear(futureDate.getFullYear() + 1);
    const futureDateString = futureDate.toISOString().split('T')[0];
    
    await page.getByLabel('Start Date').fill(futureDateString);
    await page.getByLabel('End Date').fill(futureDateString);
    await page.getByRole('button', { name: 'Filter' }).click();
    
    await expect(page.getByText('No exercise history found for the selected date range.')).toBeVisible();
  });

  test('workout generator settings should affect generated workout', async ({ page }) => {
    await page.goto('/workouts/workout');
    await page.getByLabel('Number of Exercises').fill('3');
    await page.getByRole('button', { name: 'Generate Workout' }).click();
    
    await expect(page.locator('.bg-gray-800.p-6.rounded-lg').filter({ 
      has: page.getByText('Target Muscles:') 
    })).toHaveCount(3);
  });
});