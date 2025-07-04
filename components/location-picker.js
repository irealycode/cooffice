'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useMapEvents, useMap } from "react-leaflet/hooks";
import { Button } from "@/components/ui/button"
import { forwardRef, useImperativeHandle, useRef } from 'react';
import L from 'leaflet';

import 'leaflet/dist/leaflet.css';
import { useState } from 'react';
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});
const width = innerWidth
const height = innerHeight



const LocationPicker = ({position,setPosition}) => {
    

    const MapClickHandler = () => {
        useMapEvents({
        click(e) {
            setPosition([e.latlng.lat, e.latlng.lng]);
        },
        });
        return null;
    };
    const svgIcon = L.icon({
        iconUrl: '/assets/images/pointer.svg',
        iconSize: [40, 40],
        iconAnchor: [20, 40],
        popupAnchor: [0, -40],
      });

  return (
    <MapContainer center={[33.5731, -7.5898]} zoomControl={false} zoom={6} scrollWheelZoom={true} style={{ height: height-200, width: height-200,maxHeight:width/2,maxWidth:width/2,position:'relative' }}>
        <TileLayer
            url="https://tile.jawg.io/2c0a554a-ba75-421c-83d4-7803285cba0b/{z}/{x}/{y}{r}.png?access-token=bIliUDh9A1HuFKGZRll5Yuji0g5UOTL8XxxFSiApb7FYxF5C1XGthws97nOQcQMy"
            attribution='Map tiles by Stamen Design'
        />
        <MapClickHandler />
        {position && <Marker position={position} icon={svgIcon}/>}
    </MapContainer>
  );
}

export default LocationPicker