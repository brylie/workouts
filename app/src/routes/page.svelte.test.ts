import { describe, test, expect } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/svelte';
import Layout from './+layout.svelte';
import Page from './+page.svelte';

describe('Layout component', () => {
  it('should render children correctly', () => {
    const { container } = render(Layout, { props: { children: '<div>Test</div>' } });
    expect(container).toMatchSnapshot();
  });
});

describe('Page component', () => {
  it('should render the welcome message correctly', () => {
    const { container } = render(Page);
    expect(container).toMatchSnapshot();
  });
});

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
