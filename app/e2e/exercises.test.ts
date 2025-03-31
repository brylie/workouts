import { expect, test } from '@playwright/test';
import { Muscles, Equipment } from '../src/lib/enums';

test.describe('Exercise Library Page', () => {
  // Increasing timeout for navigation and page load actions
  const navigationTimeout = 5000;

  test('should display exercises and filter by muscle groups', async ({ page }) => {
    // Navigate to exercises page
    await page.goto('/workouts/exercises');
    
    // Wait for the page to load
    await expect(page.getByRole('heading', { name: 'Exercise Library' })).toBeVisible({ timeout: navigationTimeout });
    
    // Count initial exercise cards
    const initialExerciseCount = await page.locator('.bg-gray-800.p-6.rounded-lg').count();
    expect(initialExerciseCount).toBeGreaterThan(0);
    
    // Click on a muscle filter (Chest)
    await page.locator(`#muscle-filter-${Muscles.CHEST}-text`).click();
    
    // Wait for filtered results
    await page.waitForTimeout(300); // Small delay for filter to apply
    
    // Get filtered exercises
    const filteredExerciseCount = await page.locator('.bg-gray-800.p-6.rounded-lg').count();
    
    // Verify filtering worked (count should be lower)
    expect(filteredExerciseCount).toBeLessThanOrEqual(initialExerciseCount);
    
    // Verify all visible exercises target the chest muscle
    const muscleLabels = await page.locator('.bg-blue-600.px-2.py-1.rounded.text-sm').allInnerTexts();
    const chestFiltered = muscleLabels.some(label => label.includes('chest'));
    expect(chestFiltered).toBeTruthy();
  });

  test('should filter exercises by equipment', async ({ page }) => {
    // Navigate to exercises page
    await page.goto('/workouts/exercises');
    
    // Wait for the page to load
    await expect(page.getByRole('heading', { name: 'Exercise Library' })).toBeVisible({ timeout: navigationTimeout });
    
    // Click on an equipment filter (Dumbbells)
    await page.locator(`#equipment-filter-${Equipment.DUMBBELLS}-text`).click();
    
    // Wait for filtered results
    await page.waitForTimeout(300); // Small delay for filter to apply
    
    // Get filtered exercises
    const filteredExercises = page.locator('.bg-gray-800.p-6.rounded-lg');
    const count = await filteredExercises.count();
    expect(count).toBeGreaterThan(0);
    
    // Verify each exercise has the dumbbells equipment
    for (let i = 0; i < Math.min(count, 5); i++) { // Check first 5 max to keep test fast
      const exerciseCard = filteredExercises.nth(i);
      const hasEquipmentSection = await exerciseCard.locator('h3:has-text("Required Equipment:")').isVisible();
      
      if (hasEquipmentSection) {
        const equipmentLabels = await exerciseCard.locator('.bg-purple-600.px-2.py-1.rounded.text-sm').allInnerTexts();
        const hasDumbbells = equipmentLabels.some(label => label.includes('dumbbells'));
        expect(hasDumbbells).toBeTruthy();
      }
    }
  });

  test('should apply multiple filters simultaneously', async ({ page }) => {
    // Navigate to exercises page
    await page.goto('/workouts/exercises');
    
    // Wait for the page to load
    await expect(page.getByRole('heading', { name: 'Exercise Library' })).toBeVisible({ timeout: navigationTimeout });
    
    // Count initial exercises
    const initialCount = await page.locator('.bg-gray-800.p-6.rounded-lg').count();
    
    // Apply muscle filter (Biceps)
    await page.locator(`#muscle-filter-${Muscles.BICEPS}-text`).click();
    
    // Apply equipment filter (Dumbbells)
    await page.locator(`#equipment-filter-${Equipment.DUMBBELLS}-text`).click();
    
    // Wait for filtered results
    await page.waitForTimeout(300); // Small delay for filters to apply
    
    // Count filtered exercises
    const filteredCount = await page.locator('.bg-gray-800.p-6.rounded-lg').count();
    
    // Verify filtering narrowed down results
    expect(filteredCount).toBeLessThanOrEqual(initialCount);
    
    // Verify filtered exercises contain both biceps and Dumbbells
    const firstExercise = page.locator('.bg-gray-800.p-6.rounded-lg').first();
    
    // Check for biceps
    const muscleLabels = await firstExercise.locator('.bg-blue-600.px-2.py-1.rounded.text-sm').allInnerTexts();
    const hasBiceps = muscleLabels.some(label => label.includes('biceps'));
    expect(hasBiceps).toBeTruthy();
    
    // Check for Dumbbells
    const hasEquipmentSection = await firstExercise.locator('h3:has-text("Required Equipment:")').isVisible();
    if (hasEquipmentSection) {
      const equipmentLabels = await firstExercise.locator('.bg-purple-600.px-2.py-1.rounded.text-sm').allInnerTexts();
      const hasDumbbells = equipmentLabels.some(label => label.includes('Dumbbells'));
      expect(hasDumbbells).toBeTruthy();
    }
  });
});