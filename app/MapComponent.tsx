"use client";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L, { DivIcon } from "leaflet";

const pinkMarker: DivIcon = L.divIcon({
  html: `<div style="
    width:24px;
    height:24px;
    border-radius:50%;
    background:#fbcfe8;
    border:2px solid #ec4899;
    box-shadow:0 0 2px #ec4899;
  "></div>`,
  iconSize: [24, 24],
  className: "",
});


const cities: {
  name: string;
  coords: [number, number];
  category: string;
  link1: string
  link2: string
}[] = [
  { name: "Los Angeles", coords: [34.05, -118.25], category: "Catering", link1: "" , link2: "" },
  { name: "Ronnie.DIY", coords: [36.93, -121.76], category: "Decor", link1: "https://www.instagram.com/ronnie.diy/", link2: "https://www.tiktok.com/@ronnie.diy?_r=1&_t=ZT-91d9aBIUNI5" },
  { name: "San Diego", coords: [32.7157, -117.1611], category: "Coffee", link1: "" , link2: "" },
  { name: "San Jose", coords: [37.3382, -121.8863], category: "Coffee", link1: "" , link2: "" },
  { name: "San Francisco", coords: [37.7749, -122.4194], category: "Flowers", link1: "" , link2: "" },
  { name: "Sacramento", coords: [38.5816, -121.4944], category: "Other", link1: "" , link2: "" },
  { name: "Fresno", coords: [36.7378, -119.7871], category: "Ribbon Eternal Bouquets", link1: "", link2: "" },
  { name: "Oakland", coords: [37.8044, -122.2711], category: "Decor", link1: "" , link2: "" },
  { name: "Long Beach", coords: [33.7701, -118.1937], category: "Desserts", link1: ""  , link2: ""},
];

const californiaBounds = [
  [32.5, -124.5],
  [42.0, -114.1]
];

type MapComponentProps = {
  selectedCategories: string[]; // adjust if you use unions/types
};

export default function MapComponent({selectedCategories, onMarkerSelect}: MapComponentProps) {
  const visibleCities = cities.filter(city => selectedCategories.includes(city.category));
  return (
    <div>
      <MapContainer
        center={[36.7783, -119.4179]}
        zoom={6}
        minZoom={6}
        maxZoom={10}
        scrollWheelZoom={true}
        maxBounds={californiaBounds}
        maxBoundsViscosity={1.0}
        style={{ height: "80vh", width: "35vw", minWidth: "320px", minHeight: "400px" }}
      >
        <TileLayer
          url="https://cartodb-basemaps-a.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"
        />
        {visibleCities.map(city => (
          <Marker
            key={city.name}
            position={city.coords}
            icon={pinkMarker as any}
            eventHandlers={{
              click: () => onMarkerSelect(city),
            }}
          >
          <Popup>{city.name}</Popup>
          </Marker>
       ))}
      </MapContainer>
    </div>
  );
}
