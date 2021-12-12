import React from 'react';
import { render, screen } from '@testing-library/react';
import RoutePointsList from "../components/RoutePointsList";
import {Point} from "../types";

const points: Point[] = [
    {
        title: 'Москва',
        coordinates: [55.75, 37.57],
    }
];

const onRemove = jest.fn();
const onOrderList = jest.fn();

describe('RoutePointsList component', () => {
    it('rendering', () => {
        render(<RoutePointsList points={points} onRemove={onRemove} onOrderList={onOrderList} />);

        expect(screen.getByRole('list')).toBeInTheDocument();
    });

    it('rendering no points', () => {
        render(<RoutePointsList points={[]} onRemove={onRemove} onOrderList={onOrderList} />);

        expect(screen.queryByRole('list')).toBeNull();
    });
});