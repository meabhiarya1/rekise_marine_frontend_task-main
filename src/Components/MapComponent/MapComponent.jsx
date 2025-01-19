import React, { forwardRef } from "react";

const MapComponent = forwardRef(
  ({ handleDrawingClick, handleModalOpen, isFirstClick }, ref) => {
    return (
      <main ref={ref} className="flex-grow relative">
        <div className="absolute top-0 left-0 w-full" style={{ zIndex: 1 }}>
          <header className="text-white p-4 flex justify-end items-center">
            <div className="space-x-4">
              {!isFirstClick && (
                <button
                  className="bg-blue-500 px-4 py-2 rounded text-white hover:bg-blue-600"
                  onClick={handleModalOpen}
                >
                  Open Mission Creation Modal
                </button>
              )}
              <button
                className="bg-blue-500 px-4 py-2 rounded text-white hover:bg-blue-600"
                onClick={handleDrawingClick}
              >
                Click Here To Draw on the Map
              </button>
            </div>
          </header>
        </div>
      </main>
    );
  }
);

export default MapComponent
