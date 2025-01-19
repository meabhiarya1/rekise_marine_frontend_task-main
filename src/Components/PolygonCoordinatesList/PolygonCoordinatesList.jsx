import { TbArrowBarUp } from "react-icons/tb";
import { calculateDistance } from "../../calculateDistance/calculateDistance";

export const PolygonCoordinatesList = ({ coordinates }) => {
  return (
    <>
      <div className="px-4">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 border-b border-gray-200">
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
            <tbody className="border border-gray-200 rounded-lg divide-y divide-gray-200">
              {coordinates[0].map((arr, index) => {
                const distance =
                  index === 0 ? "--" : calculateDistance(arr[0], arr);
                return (
                  <tr key={index} className="hover:bg-gray-100 bg-gray-50">
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
                      {arr[0]}, {arr[1]}
                    </td>
                    <td className="px-3 py-2 text-sm text-right">
                      {distance === "--"
                        ? distance
                        : String(arr[0]).slice(0, 2) +
                          "." +
                          String(arr[1]).slice(3, 5)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default PolygonCoordinatesList;
