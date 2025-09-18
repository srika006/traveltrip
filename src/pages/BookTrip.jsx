import { useState } from "react";

const STEPS = [
  { key: "details", displayText: "Your Details" },
  { key: "dates", displayText: "Date Selection" },
  { key: "guests", displayText: "Guests" },
  { key: "assistance", displayText: "Travel Assistance" },
  { key: "confirm", displayText: "Confirmation" },
];

const initialState = {
  name: "",
  startLocation: "",
  endLocation: "",
  startDate: "",
  endDate: "",
  adults: 1,
  children: 0,
  infants: 0,
  travelAssistance: false,
  assistanceOption: "",
};

export default function BookTrip() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [confirmed, setConfirmed] = useState(false);

  const handleInputChange = (name, value) => {
    setData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const increment = (name) => {
    setData(prev => ({
      ...prev,
      [name]: prev[name] + 1
    }));
  };

  const decrement = (name, min) => {
    setData(prev => ({
      ...prev,
      [name]: Math.max(min, prev[name] - 1)
    }));
  };

  const validateCurrentStep = () => {
    const newErrors = {};
    const currentStep = STEPS[step].key;

    if (currentStep === "details") {
      if (!data.name.trim()) newErrors.name = "Enter your name";
      if (!data.startLocation.trim()) newErrors.startLocation = "Enter your start location";
      if (!data.endLocation.trim()) newErrors.endLocation = "Enter your end location";
    }
    
    if (currentStep === "dates") {
      if (!data.startDate) newErrors.startDate = "Select start date";
      if (!data.endDate) newErrors.endDate = "Select end date";
      if (data.startDate && data.endDate && new Date(data.endDate) < new Date(data.startDate)) {
        newErrors.endDate = "End date cannot be before start date";
      }
    }
    
    if (currentStep === "assistance") {
      if (data.travelAssistance && !data.assistanceOption) {
        newErrors.assistanceOption = "Please choose a travel assistance option";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateCurrentStep()) {
      setStep(prev => Math.min(prev + 1, STEPS.length - 1));
    }
  };

  const handlePrev = () => {
    setStep(prev => Math.max(0, prev - 1));
  };

  const handleCancel = () => {
    setData(initialState);
    setConfirmed(false);
    setStep(0);
    setErrors({});
  };

  const handleConfirm = () => {
    // Store trip data in state instead of localStorage
    const newTrip = {
      ...data,
      id: Date.now(),
      confirmed: true,
      bookingDate: new Date().toISOString().split('T')[0] 
    };
    console.log("Trip would be saved:", newTrip);
    setConfirmed(true);
  };

  const handleBookNewTrip = () => {
    setData(initialState);
    setConfirmed(false);
    setStep(0);
    setErrors({});
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 px-4">
      <div className="flex flex-col lg:flex-row bg-grey-900 rounded-lg shadow-lg overflow-hidden min-h-96">
        
        
        <div className="lg:w-1/4 bg-white p-4 lg:p-6 border-b lg:border-b-0 lg:border-r">
          <ol className="flex lg:flex-col lg:space-y-6 space-x-4 lg:space-x-0 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0">
            {STEPS.map((st, idx) => {
              const completed = idx < step || (confirmed && idx === STEPS.length - 1);
              const active = idx === step && !confirmed;

              return (
                <li key={st.key} className="flex items-center gap-2 lg:gap-3 flex-shrink-0">
                  {completed ? (
                    <div className="h-6 w-6 lg:h-8 lg:w-8 flex items-center justify-center rounded-full bg-green-500 text-white">
                      ✓
                    </div>
                  ) : (
                    <span className={`h-6 w-6 lg:h-8 lg:w-8 flex items-center justify-center rounded-full border text-sm ${
                      active ? "border-indigo-600 text-indigo-600" : "border-gray-300 text-gray-400"
                    }`}>
                      {idx + 1}
                    </span>
                  )}
                  <span className={`text-xs lg:text-sm whitespace-nowrap ${
                    completed ? "text-gray-900 font-medium" : active ? "text-indigo-700 font-semibold" : "text-gray-500"
                  }`}>
                    {st.displayText}
                  </span>
                </li>
              );
            })}
          </ol>
        </div>

        {/* Main Content */}
        <div className="flex-1 bg-indigo-900 text-white p-6 lg:p-10 flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-lg p-6 lg:p-8 w-full max-w-md text-gray-800">
            
            
            {!confirmed && step === 0 && (
              <div className="space-y-4">
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    value={data.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="Enter your name"
                    className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 transition-colors ${
                      errors.name ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-indigo-200"
                    }`}
                  />
                  {errors.name && <p className="text-sm text-red-600 mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Location</label>
                  <input
                    type="text"
                    value={data.startLocation}
                    onChange={(e) => handleInputChange("startLocation", e.target.value)}
                    placeholder="Enter start location"
                    className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 transition-colors ${
                      errors.startLocation ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-indigo-200"
                    }`}
                  />
                  {errors.startLocation && <p className="text-sm text-red-600 mt-1">{errors.startLocation}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">End Location</label>
                  <input
                    type="text"
                    value={data.endLocation}
                    onChange={(e) => handleInputChange("endLocation", e.target.value)}
                    placeholder="Enter end location"
                    className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 transition-colors ${
                      errors.endLocation ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-indigo-200"
                    }`}
                  />
                  {errors.endLocation && <p className="text-sm text-red-600 mt-1">{errors.endLocation}</p>}
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={handleNext}
                    className="px-4 py-2 rounded-lg text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

          
            {!confirmed && step === 1 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                  <input
                    type="date"
                    value={data.startDate}
                    onChange={(e) => handleInputChange("startDate", e.target.value)}
                    className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 transition-colors ${
                      errors.startDate ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-indigo-200"
                    }`}
                  />
                  {errors.startDate && <p className="text-sm text-red-600 mt-1">{errors.startDate}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                  <input
                    type="date"
                    value={data.endDate}
                    onChange={(e) => handleInputChange("endDate", e.target.value)}
                    className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 transition-colors ${
                      errors.endDate ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-indigo-200"
                    }`}
                  />
                  {errors.endDate && <p className="text-sm text-red-600 mt-1">{errors.endDate}</p>}
                </div>

                <div className="flex justify-between">
                  <button
                    onClick={handlePrev}
                    className="px-4 py-2 rounded-lg text-sm font-medium bg-gray-200 text-gray-800 hover:bg-gray-300"
                  >
                    Previous
                  </button>
                  <button
                    onClick={handleNext}
                    className="px-4 py-2 rounded-lg text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-700"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

           
            {!confirmed && step === 2 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between border rounded-lg px-3 py-2">
                  <span className="text-sm font-medium">Adults</span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => decrement("adults", 1)}
                      className="h-8 w-8 rounded-lg border hover:bg-gray-50"
                    >
                      −
                    </button>
                    <span className="w-6 text-center">{data.adults}</span>
                    <button
                      type="button"
                      onClick={() => increment("adults")}
                      className="h-8 w-8 rounded-lg border hover:bg-gray-50"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between border rounded-lg px-3 py-2">
                  <span className="text-sm font-medium">Children</span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => decrement("children", 0)}
                      className="h-8 w-8 rounded-lg border hover:bg-gray-50"
                    >
                      −
                    </button>
                    <span className="w-6 text-center">{data.children}</span>
                    <button
                      type="button"
                      onClick={() => increment("children")}
                      className="h-8 w-8 rounded-lg border hover:bg-gray-50"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between border rounded-lg px-3 py-2">
                  <span className="text-sm font-medium">Infants</span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => decrement("infants", 0)}
                      className="h-8 w-8 rounded-lg border hover:bg-gray-50"
                    >
                      −
                    </button>
                    <span className="w-6 text-center">{data.infants}</span>
                    <button
                      type="button"
                      onClick={() => increment("infants")}
                      className="h-8 w-8 rounded-lg border hover:bg-gray-50"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex justify-between">
                  <button
                    onClick={handlePrev}
                    className="px-4 py-2 rounded-lg text-sm font-medium bg-gray-200 text-gray-800 hover:bg-gray-300"
                  >
                    Previous
                  </button>
                  <button
                    onClick={handleNext}
                    className="px-4 py-2 rounded-lg text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-700"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            
            {!confirmed && step === 3 && (
              <div className="space-y-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={data.travelAssistance}
                    onChange={(e) => handleInputChange("travelAssistance", e.target.checked)}
                    className="h-4 w-4"
                  />
                  <span className="text-sm font-medium">Travel assistance needed</span>
                </label>

                {data.travelAssistance && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Assistance Options</label>
                    <select
                      value={data.assistanceOption}
                      onChange={(e) => handleInputChange("assistanceOption", e.target.value)}
                      className="w-full border rounded-lg px-3 py-2"
                    >
                      <option value="">Select an option</option>
                      <option value="Car">Car</option>
                      <option value="Train">Train</option>
                      <option value="Flight">Flight</option>
                      <option value="Bus">Bus</option>
                    </select>
                    {errors.assistanceOption && (
                      <p className="text-sm text-red-600">{errors.assistanceOption}</p>
                    )}
                  </div>
                )}

                <div className="flex justify-between">
                  <button
                    onClick={handlePrev}
                    className="px-4 py-2 rounded-lg text-sm font-medium bg-gray-200 text-gray-800 hover:bg-gray-300"
                  >
                    Previous
                  </button>
                  <button
                    onClick={handleNext}
                    className="px-4 py-2 rounded-lg text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-700"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            
            {!confirmed && step === 4 && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="border rounded-lg p-3">
                    <div className="text-xs text-gray-500">Name</div>
                    <div className="text-sm font-medium">{data.name}</div>
                  </div>
                  <div className="border rounded-lg p-3">
                    <div className="text-xs text-gray-500">Start Location</div>
                    <div className="text-sm font-medium">{data.startLocation}</div>
                  </div>
                  <div className="border rounded-lg p-3">
                    <div className="text-xs text-gray-500">End Location</div>
                    <div className="text-sm font-medium">{data.endLocation}</div>
                  </div>
                  <div className="border rounded-lg p-3">
                    <div className="text-xs text-gray-500">Start Date</div>
                    <div className="text-sm font-medium">{data.startDate}</div>
                  </div>
                  <div className="border rounded-lg p-3">
                    <div className="text-xs text-gray-500">End Date</div>
                    <div className="text-sm font-medium">{data.endDate}</div>
                  </div>
                  <div className="border rounded-lg p-3">
                    <div className="text-xs text-gray-500">Guests</div>
                    <div className="text-sm font-medium">
                      {data.adults} Adults, {data.children} Children, {data.infants} Infants
                    </div>
                  </div>
                  <div className="border rounded-lg p-3">
                    <div className="text-xs text-gray-500">Travel Assistance</div>
                    <div className="text-sm font-medium">
                      {data.travelAssistance ? `Yes - ${data.assistanceOption}` : "No"}
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 justify-between">
                  <button
                    onClick={handleCancel}
                    className="px-4 py-2 rounded-lg text-sm font-medium bg-gray-200 text-gray-800 hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleConfirm}
                    className="px-4 py-2 rounded-lg text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-700"
                  >
                    Confirm
                  </button>
                </div>
              </div>
            )}

            
            {confirmed && (
              <div className="text-center space-y-4">
                <div className="mx-auto h-16 w-16 rounded-full bg-green-500 flex items-center justify-center text-white text-2xl">
                  ✓
                </div>
                <h3 className="text-xl font-semibold">Confirmed</h3>
                <p className="text-gray-600">Your trip has been booked successfully.</p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    onClick={() => console.log("Navigate to /my-trips")}
                    className="px-4 py-2 rounded-lg text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-700"
                  >
                    View My Trips
                  </button>
                  <button
                    onClick={handleBookNewTrip}
                    className="px-4 py-2 rounded-lg text-sm font-medium bg-gray-200 text-gray-800 hover:bg-gray-300"
                  >
                    Book New Trip
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}