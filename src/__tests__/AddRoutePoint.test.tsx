import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AddRoutePoint from "../components/AddRoutePoint";

const onAdd = jest.fn();

describe('AddRoutePoint component', () => {
    it('rendering', () => {
        render(<AddRoutePoint onAdd={onAdd} />);

        expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('typing in the input field', () => {
        render(<AddRoutePoint onAdd={onAdd} />);

        const inputElement = screen.getByRole('textbox');
        const typingText = 'Москва';

        expect(inputElement).toHaveDisplayValue('');
        userEvent.type(inputElement, typingText);
        expect(inputElement).toHaveDisplayValue(typingText);
    });
});