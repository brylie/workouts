import { expect, test } from '@playwright/test';
import { Muscles, Equipment } from '../src/lib/enums';

test.describe('Generate Workout Page', () => {
  // Increasing timeout for navigation and page load actions
  const navigationTimeout = 5000;

  test('should generate workout with filtered exercises', async ({ page }) => {
    // Navigate to workout page
    await page.goto('/workouts/workout');
    
    // Wait for the page to load
    await expect(page.getByRole('heading', { name: 'Workout Generator' })).toBeVisible({ timeout: navigationTimeout });
    
    // Set number of exercises to 2 for faster testing
    await page.locator('#exerciseCount').clear();
    await page.locator('#exerciseCount').fill('2');
    
    // Apply muscle filter (CHEST)
    await page.locator(`#muscle-filter-${Muscles.CHEST}`).click();
    
    // Generate workout
    await page.getByRole('button', { name: 'Generate Workout' }).click();
    
    // Wait for workout to generate
    await expect(page.getByText('Your Workout')).toBeVisible({ timeout: navigationTimeout });
    
    // Verify workout cards were generated
    const workoutCards = page.locator('.workout-item');
    await expect(workoutCards).toHaveCount(2, { timeout: navigationTimeout });
    
    // Verify that each exercise has the chest muscle
    for (let i = 0; i < 2; i++) {
      const card = workoutCards.nth(i);
      const muscleLabels = await card.locator('.bg-blue-600.px-2.py-1.rounded.text-sm').allInnerTexts();
      const hasChest = muscleLabels.some(label => label.includes('chest'));
      expect(hasChest).toBeTruthy();
    }
  });

  test('should generate workout with equipment filter', async ({ page }) => {
    // Navigate to workout page
    await page.goto('/workouts/workout');
    
    // Wait for the page to load
    await expect(page.getByRole('heading', { name: 'Workout Generator' })).toBeVisible({ timeout: navigationTimeout });
    
    // Set number of exercises to 2 for faster testing
    await page.locator('#exerciseCount').clear();
    await page.locator('#exerciseCount').fill('2');
    
    // Apply equipment filter (Dumbbells)
    await page.locator(`#equipment-filter-${Equipment.DUMBBELLS}`).click();
    
    // Generate workout
    await page.getByRole('button', { name: 'Generate Workout' }).click();
    
    // Wait for workout to generate
    await expect(page.getByText('Your Workout')).toBeVisible({ timeout: navigationTimeout });
    
    // Verify workout cards were generated
    const workoutCards = page.locator('.workout-item');
    await expect(workoutCards).toHaveCount(2, { timeout: navigationTimeout });
    
    // Verify at least one exercise has Dumbbells
    const hasExerciseWithDumbbells = await workoutCards.evaluate((cards) => {
      return Array.from(cards as HTMLElement[]).some(card => {
        const equipmentLabels = card.querySelectorAll('.bg-purple-600.px-2.py-1.rounded.text-sm');
        return Array.from(equipmentLabels).some(label => label.textContent?.includes('Dumbbells'));
      });
    });
    expect(hasExerciseWithDumbbells).toBeTruthy();
  });
  
  test('should apply multiple filters to workout generation', async ({ page }) => {
    // Navigate to workout page
    await page.goto('/workouts/workout');
    
    // Wait for the page to load
    await expect(page.getByRole('heading', { name: 'Workout Generator' })).toBeVisible({ timeout: navigationTimeout });
    
    // Set number of exercises to 1 for this specific test
    await page.locator('#exerciseCount').clear();
    await page.locator('#exerciseCount').fill('1');
    
    // Apply muscle filter (Biceps)
    await page.locator(`#muscle-filter-${Muscles.BICEPS}`).click();
    
    // Apply equipment filter (Dumbbells)
    await page.locator(`#equipment-filter-${Equipment.DUMBBELLS}`).click();
    
    // Generate workout
    await page.getByRole('button', { name: 'Generate Workout' }).click();
    
    // Wait for workout to generate
    await expect(page.getByText('Your Workout')).toBeVisible({ timeout: navigationTimeout });
    
    // Verify workout card was generated
    const workoutCard = page.locator('.workout-item').first();
    await expect(workoutCard).toBeVisible({ timeout: navigationTimeout });
    
    // Verify the exercise has both biceps and dumbbells
    const muscleLabels = await workoutCard.locator('.bg-blue-600.px-2.py-1.rounded.text-sm').allInnerTexts();
    const equipmentLabels = await workoutCard.locator('.bg-purple-600.px-2.py-1.rounded.text-sm').allInnerTexts();
    
    const hasBiceps = muscleLabels.some(label => label.includes('biceps'));
    const hasDumbbells = equipmentLabels.some(label => label.includes('Dumbbells'));
    
    expect(hasBiceps).toBeTruthy();
    expect(hasDumbbells).toBeTruthy();
  });
  
  test('should clear filters by clicking on already selected filters', async ({ page }) => {
    // Navigate to workout page
    await page.goto('/workouts/workout');
    
    // Wait for the page to load
    await expect(page.getByRole('heading', { name: 'Workout Generator' })).toBeVisible({ timeout: navigationTimeout });
    
    // Apply muscle filter (chest)
    await page.locator(`#muscle-filter-${Muscles.CHEST}`).click();
    
    // Verify filter is applied (button style change)
    await expect(page.locator(`#muscle-filter-${Muscles.CHEST}-text`)).toHaveClass(/bg-blue-600/, { timeout: navigationTimeout });
    
    // Click again to remove the filter
    await page.locator(`#muscle-filter-${Muscles.CHEST}`).click();
    
    // Verify filter is removed (button style change)
    await expect(page.locator(`#muscle-filter-${Muscles.CHEST}-text`)).not.toHaveClass(/bg-blue-600/, { timeout: navigationTimeout });
    
    // Set number of exercises to 3
    await page.locator('#exerciseCount').clear();
    await page.locator('#exerciseCount').fill('3');
    
    // Generate workout
    await page.getByRole('button', { name: 'Generate Workout' }).click();
    
    // Wait for workout to generate
    await expect(page.getByText('Your Workout')).toBeVisible({ timeout: navigationTimeout });
    
    // Verify we got 3 cards (which means no filters were applied)
    await expect(page.locator('.workout-item')).toHaveCount(3, { timeout: navigationTimeout });
  });
});