import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders title', () => {
    render(<App />);
    const linkElement = screen.getByText(/Synonym app/i as any);
    expect(linkElement).toBeInTheDocument();
});

it('renders correctly', () => {
    const tree = render(<App forceConsistency={true} />)

    expect(tree).toMatchSnapshot()
})
