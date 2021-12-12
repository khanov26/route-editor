import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import App from "../App";

describe('App component', () => {
    it('adding a new point', () => {
        render(<App />);

        const input = screen.getByRole('textbox');
        const pointName = 'Москва';

        expect(screen.queryByText(pointName)).toBeNull();
        userEvent.type(input, `${pointName}{enter}`);
        expect(screen.getByText(pointName)).toBeInTheDocument();
        expect(input).toHaveDisplayValue('');
    });

    it('deleting a point', () => {
        render(<App />);

        const pointName = 'Москва';

        userEvent.type(screen.getByRole('textbox'), `${pointName}{enter}`);
        userEvent.click(screen.getByRole('button', {name: 'delete'}));
        expect(screen.queryByText(pointName)).toBeNull();
    });
});