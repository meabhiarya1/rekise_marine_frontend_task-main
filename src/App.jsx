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
import { calculateDistance } from "./calculateDistance/calculateDistance";
import { toast } from "react-toastify";

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

  const handleImportPolygon = () => {
    if (!polygonCoordinates.length || dropdownIndex === null) {
      toast.error("No polygon data or dropdown index specified.");
      console.error("No polygon data or dropdown index specified.");
      return;
    }

    setLineStringCoordinates((prev) => {
      const updated = [...prev];
      updated.splice(dropdownIndex, 0, ...polygonCoordinates);
      return updated;
    });

    console.log("Polygon imported into LineString.");
    toast.success("Polygon imported into LineString.");
    setPolygonModalOpen(false);
    setDropdownIndex(null);
  };

  const handleGenerateData = () => {
    if (lineStringCoordinates.length < 2) {
      toast.error("Not enough coordinates to generate data.");
      console.error("Not enough coordinates to generate data.");
      return;
    }
    // Convert coordinates data to CSV format
    const headers = ["WP", "Latitude", "Longitude", "Distance (m)"];
    const rows = lineStringCoordinates.map((coordinate, index) => {
      const nextCoordinate = lineStringCoordinates[index + 1]; // Get the next coordinate
      const distance = nextCoordinate
        ? calculateDistance(coordinate, nextCoordinate) // Calculate distance if the next coordinate exists
        : 0; // If it's the last coordinate, distance is 0

      return [
        index, // WP
        coordinate[0], // Latitude
        coordinate[1], // Longitude
        +distance, // Distance to the next point
      ];
    });

    // Combine headers and rows into a CSV string
    const csvContent = [
      headers.join(","), // Header row
      ...rows.map((row) => row.join(",")), // Data rows
    ].join("\n");

    // Create a Blob from the CSV content
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

    // Create a link element to trigger the download
    const link = document.createElement("a");
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", "coordinates.csv"); // The name of the file to download
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click(); // Trigger the download
      document.body.removeChild(link); // Clean up the link element
    }
  };

  const handleDropdownAction = (action, index) => {
    setLineStringModalOpen(false);
    setPolygonModalOpen(true);
    const insertIndex = action === "before" ? index : index + 1;
    setDropdownIndex(insertIndex);
    startDrawing("Polygon", insertIndex);
  };

  const handleDrawingClick = () => {
    setIsFirstClick(false);
    if (isFirstClick) {
      setLineStringModalOpen(true);
    }
    startDrawing("LineString");
  };

  const handleMissionModalOpen = () => {
    setLineStringModalOpen(true);
  };

  const handlePolygonModalClose = () => {
    setPolygonModalOpen(false);
  };

  const handlePolygonModalBackButton = () => {
    setPolygonModalOpen(false);
    setLineStringModalOpen(true);
  };

  return (
    <>
      <div className="h-screen flex flex-col">
        <MapComponent
          ref={mapElement}
          isFirstClick={isFirstClick}
          handleModalOpen={handleMissionModalOpen}
          handleDrawingClick={handleDrawingClick}
        />
        <MissionCreationModal
          open={lineStringModalOpen}
          onClose={setLineStringModalOpen}
          coordinates={lineStringCoordinates}
          setDropdownIndex={setDropdownIndex}
          dropdownIndex={dropdownIndex}
          handleDropdownAction={handleDropdownAction}
          handleGenerateData={handleGenerateData}
        />
        <PolygonToolModal
          open={polygonModalOpen}
          onClose={handlePolygonModalClose}
          coordinates={polygonCoordinates}
          handleImportPolygon={handleImportPolygon}
          handlePolygonModalBackButton={handlePolygonModalBackButton}
        />
      </div>
    </>
  );
}

export default App;
