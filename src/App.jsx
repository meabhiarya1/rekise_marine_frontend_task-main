import "ol/ol.css";
import { Map, View } from "ol";
import { Tile as TileLayer } from "ol/layer";
import { OSM } from "ol/source";
import { Draw } from "ol/interaction";
import { Vector as VectorLayer } from "ol/layer";
import { Vector as VectorSource } from "ol/source";
import { useState } from "react";
import { useRef } from "react";

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

  return (
    <>
      <div className="underline text-sm text-indigo-400">
        <h1>Vite + React</h1>
      </div>
    </>
  );
}

export default App;
