import React from "react";
import Draggable from "react-draggable";
import { Dialog } from "@headlessui/react";
import { RxCross2 } from "react-icons/rx";
import WayPointCoordinatesList from "../WayPointCoordinatesList/WayPointCoordinatesList";

const MissionCreationModal = ({
  open,
  onClose,
  coordinates,
  setDropdownIndex,
  dropdownIndex,
  handleDropdownAction,
  handleGenerateData,
}) => {
  return (
    <Dialog open={open} onClose={() => onClose(false)} as="div">
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <Draggable
          handle=".draggable-handle"
          cancel=".non-draggable" // Prevent buttons and other elements from being draggable
        >
          <div className="bg-white rounded-lg shadow-lg p-3 relative">
            {/* Draggable Handle */}
            <div className="draggable-handle cursor-move bg-gray-100 p-2 rounded-t-lg flex justify-between items-center">
              <h2 className="text-lg font-bold text-gray-800">
                Mission Creation
              </h2>
              <button
                onClick={() => onClose(false)}
                className="text-gray-300 hover:text-gray-900 non-draggable"
              >
                <RxCross2 size={28} />
              </button>
            </div>

            <hr className="my-4 -mx-3 border-gray-100 border-4" />

            {coordinates.length ? (
              <WayPointCoordinatesList
                coordinates={coordinates}
                setDropdownIndex={setDropdownIndex}
                dropdownIndex={dropdownIndex}
                handleDropdownAction={handleDropdownAction}
                
              />
            ) : (
              <h3 className="text-lg font-bold text-gray-800">
                Waypoint Navigation
              </h3>
            )}

            {coordinates.length < 4 && (
              <div className="border-2 border-dotted border-gray-400 bg-gray-200 text-gray-600 text-sm p-4 my-3 rounded">
                Click on the map to mark points of the route and then press ↵ to
                complete the route.
              </div>
            )}
            <hr className="my-4 -mx-3 border-gray-300 shadow-sm" />

            <div className="flex justify-end">
              <button
                onClick={handleGenerateData}
                className="bg-indigo-500 text-white px-4 py-2 rounded shadow non-draggable"
              >
                Generate Data
              </button>
            </div>
          </div>
        </Draggable>
      </div>
    </Dialog>
  );
};

export default MissionCreationModal;
