export const getTrips = () => {
  const trips = localStorage.getItem("splitTourTrips");
  return trips ? JSON.parse(trips) : [];
};

export const saveTrip = (trip) => {
  const trips = getTrips();
  trips.push(trip);
  localStorage.setItem("splitTourTrips", JSON.stringify(trips));
};
