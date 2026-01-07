import { useState } from "react";
import InputCard from "./components/InputCard";
import Results from "./components/Results";
import logo from "./assets/logo.svg";

export default function App() {
  const [data, setData] = useState({
    electricity: "",
    fuel: "",
    flights: "",
    meat: "",
    car: "",
    publicTransport: "",
    water: "",
    waste: "",
    shopping: "",
  });

  const [showResults, setShowResults] = useState(false);
  const [carbonFootprint, setCarbonFootprint] = useState({ total: 0, details: {} });

  const calculateCarbon = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/calculate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      setCarbonFootprint(result);
      setShowResults(true);
    } catch (error) {
      console.error("Error calculating carbon footprint:", error);
    }
  };

  const reset = () => {
    setData({
      electricity: "",
      fuel: "",
      flights: "",
      meat: "",
      car: "",
      publicTransport: "",
      water: "",
      waste: "",
      shopping: "",
    });
    setCarbonFootprint({ total: 0, details: {} });
    setShowResults(false);
  };

  const inputFields = [
    { label: "⚡ Electricity (kWh/month)", key: "electricity", placeholder: "kWh" },
    { label: "⛽ Fuel (liters/month)", key: "fuel", placeholder: "liters" },
    { label: "✈️ Flights/year", key: "flights", placeholder: "number" },
    { label: "🥩 Meat consumption (kg/week)", key: "meat", placeholder: "kg" },
    { label: "🚗 Car travel (km/week)", key: "car", placeholder: "km" },
    { label: "🚌 Public transport (km/week)", key: "publicTransport", placeholder: "km" },
    { label: "💧 Water usage (liters/day)", key: "water", placeholder: "liters" },
    { label: "🗑️ Waste per week (kg)", key: "waste", placeholder: "kg" },
    { label: "🛍️ Shopping & products (₹/month)", key: "shopping", placeholder: "₹" },
  ];

  return (
    <div className="min-h-screen flex items-start justify-center bg-linear-to-br from-green-100 via-blue-100 to-purple-100 p-6 font-sans">
      {!showResults ? (
        <div className="w-full max-w-5xl space-y-10 mt-12">
          <div className="flex flex-col items-center mb-8 animate-fadeInDown">
            <img src={logo} alt="CarbonWatch Logo" className="h-20 w-auto mb-3" />
            <h1 className="text-5xl font-extrabold font-mono text-gray-800 text-center">
              CarbonWatch
            </h1>
            <p className="text-gray-600 mt-2 text-lg text-center max-w-md">
              Track your carbon footprint and find simple ways to reduce your emissions.
            </p>
          </div>


          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {inputFields.map((field) => (
              <div key={field.key} className="animate-slideUp">
                <InputCard
                  label={field.label}
                  value={data[field.key]}
                  setValue={(value) => setData({ ...data, [field.key]: value })}
                  placeholder={field.placeholder}
                />
              </div>
            ))}
          </div>

          <button
            className="mt-6 w-full bg-linear-to-r from-green-500 to-blue-500 text-white py-4 rounded-lg font-semibold text-xl hover:scale-105 transform transition shadow-md hover:shadow-lg"
            onClick={calculateCarbon}
          >
            Calculate Your Footprint
          </button>
        </div>
      ) : (
        <Results data={data} carbonFootprint={carbonFootprint} reset={reset} />
      )}
    </div>
  );
}
