'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useMapEvents, useMap } from "react-leaflet/hooks";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { forwardRef, useImperativeHandle, useRef } from 'react';
import L from 'leaflet';
import { Badge } from "@/components/ui/badge"

import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import { MapPin, Star, Users } from "lucide-react"
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});
const width = innerWidth
const height = innerHeight

function OverLay({locations,selectedSpace}) {
    const parentMap = useMap();
    return (
        <div className="fixed bottom-4 right-4 shadow-lg" style={{zIndex:9999,width:(width/2)-30,cursor:'default'}} >
            <Card
                  className={`cursor-default transition-all hover:shadow-md ${
                   true ? "ring-2 ring-blue-200" : ""
                  }`}
                  onClick={() => mapRef.current?.selectSpace(space.lat, space.lng,space.id)}
                >
                  <CardContent className="p-0">
                    <div className="flex">
                      <div className="relative flex-shrink-0">
                        <img
                          src={selectedSpace.images[0] || "/placeholder.svg"}
                          alt={selectedSpace.name}
                          style={{height:170}}
                          className="rounded-l-lg"
                        />
                      </div>
                      <div className="flex-1 p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-semibold text-lg">{selectedSpace.name}</h3>
                            <p className="text-sm text-gray-600 flex items-center">
                              <MapPin className="w-4 h-4 mr-1" />
                              {selectedSpace.address}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-xl font-bold">DH {selectedSpace.price}</p>
                            <p className="text-sm text-gray-600">per day</p>
                          </div>
                        </div>

                        <div className="flex items-center mb-2">
                          <div className="flex items-center">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="ml-1 text-sm font-medium">{selectedSpace.rating}</span>
                            <span className="ml-1 text-sm text-gray-600">({selectedSpace.reviews} reviews)</span>
                          </div>
                          <Badge
                            variant={selectedSpace.availability === "Available" ? "default" : "secondary"}
                            className="ml-auto"
                          >
                            {selectedSpace.availability}
                          </Badge>
                        </div>

                        <div className="flex items-center text-sm text-gray-600 mb-2">
                          <Users className="w-4 h-4 mr-1" />
                          <span>Up to {selectedSpace.capacity} people</span>
                        </div>

                        <div className="flex flex-wrap gap-1">
                          {selectedSpace.amenities.slice(0, 3).map((amenity) => (
                            <Badge key={amenity} variant="outline" className="text-xs">
                              {amenity}
                            </Badge>
                          ))}
                          {selectedSpace.amenities.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{selectedSpace.amenities.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                    <Button className='absolute bottom-2 right-2 bg-blue-500 hover:bg-blue-400' >
                        Book Now
                    </Button>
                </Card>
                
        </div>
    );
}

function FlyToLocation({ lat, lng }) {
    const map = useMap();
  
    useEffect(() => {
      if (lat && lng) {
        map.flyTo([lat, lng], 13, {
          duration: 1.5,
        });
      }
    }, [lat, lng, map]);
  
    return null;
}

const Map = forwardRef(function MapFunc({locations,onMarkerClick},ref) {
    const [selectedSpace, setSelectedSpace] = useState(null)
    const [focusPoint, setFocusPoint] = useState(null);

    const selectSpace = (lat,lng,id) =>{
        setFocusPoint({ lat: lat, lng: lng })
        setSelectedSpace(locations.filter(s=>s.id===id)[0])
    }
    const deSelectSpace = () =>{
        setSelectedSpace(null)
    }


    useImperativeHandle(ref, () => ({
        selectSpace,
        deSelectSpace
    }));
    
    const svgIcon = L.icon({
        iconUrl: '/assets/images/pointer.svg',
        iconSize: [40, 40],
        iconAnchor: [20, 40],
        popupAnchor: [0, -40],
      });

    const handleMarkerClick = (loc, e) => {
        const point = e.target._map.latLngToContainerPoint(e.latlng);
        setSelectedSpace(loc)
        setFocusPoint({ lat: loc.lat, lng: loc.lng });
        onMarkerClick(loc)
        console.log(loc)
    };
  return (
    <MapContainer center={[33.5731, -7.5898]} zoomControl={false} zoom={6} scrollWheelZoom={true} style={{ height: height-64, width: (width/2) -10,position:'relative' }}>
      <TileLayer
        url="https://tile.jawg.io/2c0a554a-ba75-421c-83d4-7803285cba0b/{z}/{x}/{y}{r}.png?access-token=bIliUDh9A1HuFKGZRll5Yuji0g5UOTL8XxxFSiApb7FYxF5C1XGthws97nOQcQMy"
        attribution='Map tiles by Stamen Design'
      />
      {locations.map((loc, idx) => (
        <Marker key={idx} position={[loc.lat, loc.lng]} icon={svgIcon} eventHandlers={{
            click: (e) => handleMarkerClick(loc, e),
          }}
          whenReady={(map) => {
            map.target.on("click", function (e) {
              this.dragging.enable();
            });
          }
          }>
          {/* <Popup autoOpen={true}>
            <strong>{loc.name}</strong><br />
            {loc.address}
          </Popup> */}
          
        </Marker>
      ))}
      {selectedSpace && <OverLay locations={locations} selectedSpace={selectedSpace} />}
      {focusPoint && <FlyToLocation lat={focusPoint.lat} lng={focusPoint.lng} />}
    </MapContainer>
  );
})

export default Map