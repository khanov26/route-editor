import React from 'react';
import {Point} from "../types";
import {Draggable} from "react-beautiful-dnd";

type Props = {
    point: Point;
    onRemove: (point: Point) => void;
    index: number;
};

const RoutePoint: React.FC<Props> = ({point, onRemove, index}) => {
    return (
        <Draggable draggableId={point.coordinates.toString()} index={index}>
            {provided =>
                <li className="list-group-item d-flex justify-content-between align-items-center"
                    ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                    <span className="overflow-hidden" style={{textOverflow: "ellipsis"}}>{point.title}</span>
                    <button className="btn btn-sm" aria-label="delete" onClick={() => onRemove(point)}>&times;</button>
                </li>
            }
        </Draggable>
    );
};

export default RoutePoint;