import "ol/ol.css";
import { Map, View } from "ol";
import { Tile as TileLayer } from "ol/layer";
import { OSM } from "ol/source";
import { Draw } from "ol/interaction";
import { Vector as VectorLayer } from "ol/layer";
import { Vector as VectorSource } from "ol/source";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import MapComponent from "./Components/MapComponent/MapComponent";
import MissionCreationModal from "./Components/MissionCreationModal/MissionCreationModal";
import PolygonToolModal from "./Components/PolygonToolModal/PolygonToolModal";

function App() {
  const mapElement = useRef(null);
  const [isFirstClick, setIsFirstClick] = useState(true);
  const [map, setMap] = useState(null);
  const [vectorSource] = useState(new VectorSource());
  const [isDrawing, setIsDrawing] = useState(false);
  const [lineStringModalOpen, setLineStringModalOpen] = useState(false);
  const [polygonModalOpen, setPolygonModalOpen] = useState(false);
  const [lineStringCoordinates, setLineStringCoordinates] = useState([]);
  const [polygonCoordinates, setPolygonCoordinates] = useState([]);
  const [dropdownIndex, setDropdownIndex] = useState(null);

  useEffect(() => {
    if (!mapElement.current) return;

    const vectorLayer = new VectorLayer({ source: vectorSource });

    const mapInstance = new Map({
      target: mapElement.current,
      layers: [new TileLayer({ source: new OSM() }), vectorLayer],
      view: new View({ center: [0, 0], zoom: 3 }),
    });

    setMap(mapInstance);

    return () => mapInstance.setTarget(null);
  }, [vectorSource]);

  const startDrawing = (type, insertIndex = null) => {
    if (!map) return;

    setIsDrawing(true);
    const draw = new Draw({ source: vectorSource, type });
    map.addInteraction(draw);

    draw.on("drawend", (event) => {
      const geometry = event.feature.getGeometry();
      if (!geometry) return;

      const newCoordinates = geometry.getCoordinates();
      if (type === "LineString") {
        setLineStringCoordinates((prev) => [...prev, ...newCoordinates]);
        setLineStringModalOpen(true);
      } else if (type === "Polygon") {
        setPolygonCoordinates(newCoordinates);
        setPolygonModalOpen(true);
      }
      setIsDrawing(false);
      map.removeInteraction(draw);
    });

    const handleKeyDown = (event) => {
      if (event.key === "Enter") {
        draw.finishDrawing();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      map.removeInteraction(draw);
    };
  };

  return (
    <>
      <div className="underline text-sm text-indigo-400">
        <h1>Vite + React</h1>
      </div>
    </>
  );
}

export default App;
