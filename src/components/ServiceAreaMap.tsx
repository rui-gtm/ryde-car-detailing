import { useEffect, useRef, useState } from "react";
import { CircleMarker, MapContainer, Polygon, Popup, TileLayer, useMap } from "react-leaflet";
import { DomEvent } from "leaflet";
import type { LatLngTuple } from "leaflet";
import { Maximize, Minimize, Minus, Plus } from "lucide-react";
import "leaflet/dist/leaflet.css";
import { BUSINESS } from "@/data/business";

const CENTER: LatLngTuple = [BUSINESS.geo.latitude, BUSINESS.geo.longitude];

// Zone reach in km from the business, every 30 degrees clockwise from north
// (N, NNE, ENE, E, ESE, SSE, S, SSW, WSW, W, WNW, NNW). Values are smoothly
// interpolated into an organic shape, so tweak a number to push that side of
// the zone in or out. Green = no outcall fee, Red = $30 outcall fee.
const GREEN_REACH_KM = [4, 4.3, 4.3, 4, 3.5, 1.8, 1.6, 1.6, 1.8, 2.2, 3, 4];
const RED_REACH_KM = [8, 9, 10, 10.5, 9.5, 8, 6.5, 6.5, 7.5, 8.5, 8.5, 8];

const GREEN = "#22c55e";
const RED = "#ef4444";

const KM_PER_DEG_LAT = 111.32;

const buildZone = (reachKm: number[], points = 72): LatLngTuple[] => {
  const n = reachKm.length;
  const [lat, lng] = CENTER;
  return Array.from({ length: points }, (_, i) => {
    const pos = (i / points) * n;
    const i0 = Math.floor(pos) % n;
    const i1 = (i0 + 1) % n;
    const t = (1 - Math.cos((pos - Math.floor(pos)) * Math.PI)) / 2;
    const r = reachKm[i0] * (1 - t) + reachKm[i1] * t;
    const bearing = (i / points) * 2 * Math.PI;
    return [
      lat + (r * Math.cos(bearing)) / KM_PER_DEG_LAT,
      lng + (r * Math.sin(bearing)) / (KM_PER_DEG_LAT * Math.cos((lat * Math.PI) / 180)),
    ] as LatLngTuple;
  });
};

const RED_ZONE = buildZone(RED_REACH_KM);
const GREEN_ZONE = buildZone(GREEN_REACH_KM);

const roundButton =
  "flex h-11 w-11 items-center justify-center rounded-full bg-neutral-900/90 text-white shadow-lg ring-1 ring-white/10 transition hover:bg-neutral-800";

const MapOverlay = () => {
  const map = useMap();
  const ref = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    DomEvent.disableClickPropagation(ref.current);
    DomEvent.disableScrollPropagation(ref.current);
  }, []);

  useEffect(() => {
    const onChange = () => {
      setIsFullscreen(document.fullscreenElement === map.getContainer());
      setTimeout(() => map.invalidateSize(), 100);
    };
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, [map]);

  const toggleFullscreen = () => {
    if (document.fullscreenElement) {
      void document.exitFullscreen();
    } else {
      void map.getContainer().requestFullscreen?.();
    }
  };

  return (
    <div ref={ref}>
      <div className="absolute right-3 top-3 z-[1000] rounded-lg bg-neutral-900/90 px-4 py-3 text-sm text-white shadow-lg ring-1 ring-white/10">
        <div className="flex items-center gap-2.5">
          <span className="h-3.5 w-3.5 rounded-sm" style={{ backgroundColor: GREEN }} />
          No Outcall Fee
        </div>
        <div className="mt-2 flex items-center gap-2.5">
          <span className="h-3.5 w-3.5 rounded-sm" style={{ backgroundColor: RED }} />
          $30 Outcall Fee
        </div>
      </div>

      <div className="absolute bottom-4 right-3 z-[1000] flex flex-col gap-2">
        <button type="button" onClick={() => map.zoomIn()} aria-label="Zoom in" className={roundButton}>
          <Plus className="h-5 w-5" />
        </button>
        <button type="button" onClick={() => map.zoomOut()} aria-label="Zoom out" className={roundButton}>
          <Minus className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={toggleFullscreen}
          aria-label={isFullscreen ? "Exit full screen" : "View map full screen"}
          className={roundButton}
        >
          {isFullscreen ? <Minimize className="h-5 w-5" /> : <Maximize className="h-5 w-5" />}
        </button>
      </div>
    </div>
  );
};

const ServiceAreaMap = () => (
  <MapContainer
    center={CENTER}
    zoom={12}
    minZoom={10}
    maxZoom={17}
    scrollWheelZoom={false}
    zoomControl={false}
    className="h-[420px] md:h-[520px] w-full rounded-xl z-0 bg-[#1a1a1a]"
    aria-label="Service area map showing the no-fee zone and the outcall fee zone around Ryde NSW"
  >
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
      className="dark-map-tiles"
    />

    <Polygon
      positions={RED_ZONE}
      pathOptions={{ color: "#f87171", weight: 2, fillColor: RED, fillOpacity: 0.3 }}
    >
      <Popup>Red Zone: $30 outcall fee</Popup>
    </Polygon>
    <Polygon
      positions={GREEN_ZONE}
      pathOptions={{ color: "#4ade80", weight: 3, fillColor: GREEN, fillOpacity: 0.3 }}
    >
      <Popup>Green Zone: no outcall fee</Popup>
    </Polygon>

    {/* Soft glow behind the pin */}
    <CircleMarker
      center={CENTER}
      radius={14}
      interactive={false}
      pathOptions={{ stroke: false, fillColor: "#22d3ee", fillOpacity: 0.25 }}
    />
    <CircleMarker
      center={CENTER}
      radius={7}
      pathOptions={{ color: "#ffffff", weight: 3, fillColor: "#22d3ee", fillOpacity: 1 }}
    >
      <Popup>
        <strong>{BUSINESS.name}</strong>
        <br />
        {BUSINESS.addressDisplay}
      </Popup>
    </CircleMarker>

    <MapOverlay />
  </MapContainer>
);

export default ServiceAreaMap;
