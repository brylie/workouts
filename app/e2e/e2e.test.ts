import { expect, test } from '@playwright/test';

test('home page has expected h1', async ({ page }) => {
	await page.goto('/');
	const heading = page.getByRole('heading', { level: 1 });
	await expect(heading).toBeVisible();
	await expect(heading).toHaveText('Welcome to Workouts');
});
