import { Dialog } from "@headlessui/react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { PolygonCoordinatesList } from "../PolygonCoordinatesList/PolygonCoordinatesList";

const PolygonToolModal = ({
  open,
  onClose,
  coordinates,
  handleImportPolygon,
  handlePolygonModalBackButton,
}) => {
  return (
    <Dialog open={open} onClose={onClose} as="div">
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-lg p-3 relative">
          <div
            onClick={handlePolygonModalBackButton}
            className="flex items-center pb-2 text-gray-500 hover:text-gray-800 cursor-pointer"
          >
            <IoIosArrowRoundBack size={29} />
            Mission Planner
          </div>

          <h2 className="text-xl font-bold text-gray-800">Polygon Tool</h2>
          {coordinates.length ? (
            <PolygonCoordinatesList coordinates={coordinates} />
          ) : (
            <div className="border-2 border-dotted border-gray-400 bg-gray-200 text-gray-600 text-sm p-4 my-3 rounded">
              Click on the map to mark points of the polygon's perimeter,
              <br /> and then press ↵ to close and complete the polygon.
            </div>
          )}

          <hr className="my-4 -mx-3 border-gray-300 shadow-sm" />

          <div className="flex justify-between">
            <button onClick={onClose} className="text-black px-4 py-2 ">
              Discard
            </button>
            <button
              onClick={handleImportPolygon}
              className="bg-sky-700 text-white px-4 py-2 rounded shadow"
            >
              Import Points
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default PolygonToolModal;
