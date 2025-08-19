import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function MyTrips() {
  const [trips, setTrips] = useState([]);
  const navigate = useNavigate();

 
  useEffect(() => {
    const savedTrips = JSON.parse(localStorage.getItem("trips") || "[]");
    setTrips(savedTrips);
  }, []);

 
  const cancelTrip = (id) => {
    const updatedTrips = trips.filter((trip) => trip.id !== id);
    setTrips(updatedTrips);
    localStorage.setItem("trips", JSON.stringify(updatedTrips));
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 px-4">
      

      {trips.length === 0 ? (
      
        <div className="text-center py-20">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqeLcxSBWNj0kQ8wUXsYhCTOGCbNSbKWhfb2SYexFGhBR7yaz5V7WCTJtuQKlNNVFk7gE&usqp=CAU"
            alt="no trips"
            className="mx-auto h-20 w-20 mb-4 opacity-70"
          />
          <h3 className="text-lg font-semibold text-gray-700">
            No upcoming trips.
          </h3>
          <p className="text-gray-500 text-sm mb-6">
            When you book a trip, you will see your trip details here.
          </p>
          <button
            onClick={() => navigate("/book-a-new-trip")}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
          >
            Book a New Trip
          </button>
        </div>
      ) : (
       
        <div className="space-y-4">
          {trips.map((trip) => (
            <div
              key={trip.id}
              className="border rounded-lg p-4 flex items-center justify-between shadow-sm"
            >
              <div>
                <h3 className="text-lg font-semibold">{trip.endLocation}</h3>
                <p className="text-sm text-gray-500">
                  Date: {trip.startDate} to {trip.endDate}
                </p>
              </div>
              <button
                onClick={() => cancelTrip(trip.id)}
                className="border border-blue-500 text-blue-500 px-3 py-1 rounded hover:bg-blue-50 text-sm"
              >
                Cancel
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
