import { describe, test, expect } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/svelte';
import Page from './+page.svelte';

describe('/+page.svelte', () => {
	test('should render welcome message', () => {
		render(Page);
		const heading = screen.getByRole('heading', { level: 1 });
		expect(heading).toHaveTextContent('Welcome to Workouts');
		const paragraphs = screen.getAllByRole('paragraph');
		expect(paragraphs[0]).toHaveTextContent('Track your exercises and stay fit with our app.');
		expect(paragraphs[1]).toHaveTextContent('Get started by exploring the features and creating your workout plan.');
	});
});
