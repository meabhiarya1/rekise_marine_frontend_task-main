export const calculateDistance = (startPoint, endPoint) => {
  const earthRadius = 6371e3; // Earth's radius in meters

  const startLatitudeRadians = (startPoint[1] * Math.PI) / 180;
  const startLongitudeRadians = (startPoint[0] * Math.PI) / 180;
  const endLatitudeRadians = (endPoint[1] * Math.PI) / 180;
  const endLongitudeRadians = (endPoint[0] * Math.PI) / 180;

  const latitudeDifferenceRadians = endLatitudeRadians - startLatitudeRadians;
  const longitudeDifferenceRadians =
    endLongitudeRadians - startLongitudeRadians;

  const a =
    Math.sin(latitudeDifferenceRadians / 2) *
      Math.sin(latitudeDifferenceRadians / 2) +
    Math.cos(startLatitudeRadians) *
      Math.cos(endLatitudeRadians) *
      Math.sin(longitudeDifferenceRadians / 2) *
      Math.sin(longitudeDifferenceRadians / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = earthRadius * c;

  return distance;
};
