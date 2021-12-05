import React, {useRef, useState} from 'react';
import AddRoutePoint from "./components/AddRoutePoint";
import RoutePointsList from "./components/RoutePointsList";
import {Point} from "./types";
import YandexMap from "./components/YandexMap";

function App() {
    const [points, setPoints] = useState<Point[]>([]);

    const mapCenter = useRef<Point['coordinates']>([55.75, 37.57]);

    const updateMapCenter = (coordinates: Point['coordinates']) => {
        mapCenter.current = coordinates;
    };

    const handleMovePlacemark = (movedPoint: Point, newCoordinates: Point['coordinates']) => {
        setPoints(points.map(point => {
            if (point === movedPoint) {
                return {
                    ...point,
                    coordinates: newCoordinates,
                }
            }
            return point;
        }));
    };

    const handleAddPoint = (title: string) => {
        const coordinates = mapCenter.current;
        const newPoint: Point = {
            title,
            coordinates,
        };
        setPoints([...points, newPoint]);
    };

    const handleRemovePoint = (pointToBeRemoved: Point) => {
        setPoints(points.filter(point => point !== pointToBeRemoved));
    }

    return (
        <div className="container">
            <div className="row pt-3">
                <div className="col-12 col-md-5 mb-1">
                    <div className="pb-2">
                        <AddRoutePoint onAdd={handleAddPoint}/>
                    </div>
                    <div>
                        <RoutePointsList points={points} onRemove={handleRemovePoint}
                                         onOrderList={orderedList => setPoints(orderedList)}/>
                    </div>
                </div>
                <div className="col-12 col-md-7 mt-3 mt-md-0" style={{aspectRatio: '1 / 1'}}>
                    <YandexMap points={points} mapCenter={mapCenter.current} onMoveMapCenter={updateMapCenter}
                               onMovePlacemark={handleMovePlacemark}/>
                </div>
            </div>
        </div>
    );
}

export default App;
