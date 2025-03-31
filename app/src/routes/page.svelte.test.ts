import { describe, it, test, expect } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/svelte';
import Page from './+page.svelte';

describe('Page component', () => {
	it('should have the correct structure with semantic elements', () => {
		render(Page);
		const welcomePage = screen.getByTestId('welcome-page');
		const heading = screen.getByTestId('welcome-heading');
		const description = screen.getByTestId('welcome-description');

		expect(welcomePage).toBeInTheDocument();
		expect(heading).toHaveTextContent('Welcome to Workouts');
		expect(description).toHaveTextContent('Track your exercises and stay fit with our app.');
	});
});

describe('/+page.svelte', () => {
	test('should render welcome message', () => {
		render(Page);
		const heading = screen.getByRole('heading', { level: 1 });
		expect(heading).toHaveTextContent('Welcome to Workouts');
		const paragraphs = screen.getAllByRole('paragraph');
		expect(paragraphs[0]).toHaveTextContent('Track your exercises and stay fit with our app.');
	});
});
