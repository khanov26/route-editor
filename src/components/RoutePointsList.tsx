import React from 'react';
import {Point} from "../types";
import RoutePoint from "./RoutePoint";
import {DragDropContext, Droppable, DropResult} from "react-beautiful-dnd";

type Props = {
    points: Point[];
    onRemove: (point: Point) => void;
    onOrderList: (orderedList: Point[]) => void;
};

const RoutePointsList: React.FC<Props> = ({points, onRemove, onOrderList}) => {
    if (points.length === 0) {
        return null;
    }

    const handleDragEnd = (result: DropResult) => {
        if (!result.destination) {
            return;
        }

        const orderedList = [...points];
        const [movedItem] = orderedList.splice(result.source.index, 1);
        orderedList.splice(result.destination.index, 0, movedItem);
        onOrderList(orderedList);
    };

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="routePoints">
                {(provided => (
                    <ul className="list-group" ref={provided.innerRef} {...provided.droppableProps}>
                        {points.map((point, index) =>
                            <RoutePoint point={point} onRemove={onRemove} index={index}
                                        key={point.coordinates.toString()}/>
                        )}
                        {provided.placeholder}
                    </ul>
                ))}
            </Droppable>
        </DragDropContext>
    );
};

export default RoutePointsList;