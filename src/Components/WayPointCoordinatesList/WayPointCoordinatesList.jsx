import { TbArrowBarUp } from "react-icons/tb";
import { calculateDistance } from "../../calculateDistance/calculateDistance";
import { LuArrowLeftToLine, LuArrowRightFromLine } from "react-icons/lu";

const WayPointCoordinatesList = ({
  coordinates,
  setDropdownIndex,
  dropdownIndex,
  handleDropdownAction,
}) => {
  return (
    <div className="px-4">
      <div className="max-h-[400px] overflow-y-auto border border-gray-200 rounded-lg relative">
        <table className="min-w-full divide-y divide-gray-200 ">
          <thead>
            <tr>
              <th className="w-12 px-3 py-2">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-gray-300"
                />
              </th>
              <th className="px-3 py-2 text-left text-sm font-semibold text-black">
                WP
              </th>
              <th className="px-3 py-2 text-left text-sm font-semibold text-black">
                Coordinates
              </th>
              <th className="px-3 py-2 text-right text-sm font-semibold text-black flex items-center gap-2">
                Distance (m)
                <TbArrowBarUp size={20} className="text-blue-400" />
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 ">
            {coordinates.map((waypoint, index) => {
              const isArrayOf = Array.isArray(waypoint[0]); // Check if it is a polygon
              const distance =
                index === 0 || isArrayOf
                  ? "--"
                  : calculateDistance(coordinates[index - 1], waypoint);

              return (
                <tr key={index} className="hover:bg-gray-100 bg-gray-50 ">
                  <td className="px-3 py-2 flex items-center gap-4">
                    <div className="w-2 h-5 bg-gray-200 rounded-lg"></div>
                    <input
                      type="checkbox"
                      checked={false}
                      className="w-4 h-4 rounded border-gray-300"
                    />
                  </td>
                  <td className="px-3 py-2 text-sm">
                    {`${index}`.padStart(2, "0")}
                  </td>
                  <td className="px-3 py-2 text-sm">
                    {isArrayOf
                      ? "Polygon"
                      : `${waypoint[0].toFixed(2)}, ${waypoint[1].toFixed(2)}`}
                  </td>
                  <td className="px-3 py-2 text-sm text-right">
                    {distance === "--" ? distance : distance.toFixed(2)}{" "}
                    {/* Display the distance */}
                  </td>
                  <td className="px-3 py-2  ">
                    <button
                      className="text-gray-500 hover:text-gray-700"
                      onClick={() => setDropdownIndex(index)}
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                        />
                      </svg>
                    </button>
                    {dropdownIndex === index && (
                      <ul className="absolute bg-white border text-xs rounded shadow-md mt-2 w-48">
                        <li
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex gap-2 items-center"
                          onClick={() => handleDropdownAction("before", index)}
                        >
                          <LuArrowLeftToLine />
                          Insert Polygon Before
                        </li>
                        <li
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex gap-2 items-center"
                          onClick={() => handleDropdownAction("after", index)}
                        >
                          <LuArrowRightFromLine />
                          Insert Polygon After
                        </li>
                      </ul>
                    )}
                  </td>{" "}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WayPointCoordinatesList;
