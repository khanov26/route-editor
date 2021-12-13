import React, {useRef} from 'react';
import {Map, Placemark, Polyline, YMaps} from "react-yandex-maps";
import {Point} from "../types";

type Props = {
    points: Point[];
    mapCenter: Point['coordinates'];
    onMoveMapCenter: (coordinates: Point['coordinates']) => void;
    onMovePlacemark: (point: Point, coordinates: Point['coordinates']) => void;
};

const YandexMap: React.FC<Props> = ({points, mapCenter, onMoveMapCenter, onMovePlacemark}) => {
    const handleMoveMap = (e: any) => {
        const newCenter = e.originalEvent.map.getCenter();
        onMoveMapCenter(newCenter);
    };

    const ymaps = useRef<any>(null);

    return (
        <YMaps query={{apikey: process.env.REACT_APP_YANDEX_API_KEY}}>
            <Map width="100%" height="100%" state={{center: mapCenter, zoom: 9}}
                 onActionEnd={handleMoveMap} modules={['geocode']}
                 onLoad={y => {
                     ymaps.current = y;
                 }}
            >
                {points.map(point =>
                    <Placemark
                        key={point.coordinates.toString()}
                        geometry={point.coordinates}
                        properties={{
                            balloonContentHeader: point.title,
                        }}
                        options={{
                            draggable: true,
                        }}
                        modules={['geoObject.addon.balloon']}
                        onDragEnd={(e: any) => {
                            const coordinates = e.originalEvent.target.geometry.getCoordinates();
                            onMovePlacemark(point, coordinates);
                        }}
                        onClick={(e: any) => {
                            const targetPlacemark = e.get('target');
                            ymaps.current.geocode(point.coordinates)
                                .then((result: any) => {
                                    const geoObjectAddress = result.geoObjects.get(0).getAddressLine();
                                    targetPlacemark.properties.set({
                                        balloonContent: geoObjectAddress,
                                    });
                                })
                                .catch((error: any) => console.log(error));
                        }}
                    />
                )}
                <Polyline
                    geometry={points.map(point => point.coordinates)}
                    options={{
                        balloonCloseButton: false,
                        strokeColor: '#000',
                        strokeWidth: 4,
                        strokeOpacity: 0.5,
                    }}
                />
            </Map>
        </YMaps>
    );
};

export default YandexMap;