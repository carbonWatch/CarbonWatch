import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

export default function Results({ data, carbonFootprint, reset }) {
  const footprint = parseFloat(carbonFootprint.total);

  let message = "";
  let emoji = "";
  let colorClass = "";

  if (footprint < 15) {
    message = "Great! Your carbon footprint is low 🌿";
    emoji = "🌱";
    colorClass = "from-green-400 to-green-600";
  } else if (footprint < 35) {
    message = "Moderate footprint. Try reducing emissions ⚡";
    emoji = "⚠️";
    colorClass = "from-yellow-400 to-yellow-600";
  } else {
    message = "High footprint! Take action now 🔥";
    emoji = "🔥";
    colorClass = "from-red-400 to-red-600";
  }

  const labels = Object.keys(data);
  const values = Object.values(carbonFootprint?.details || {}).map((v) => parseFloat(v));

  const suggestions = [];
  const maxValue = Math.max(...values);
  const maxIndex = values.indexOf(maxValue);
  const maxLabel = labels[maxIndex];

  switch (maxLabel) {
    case "electricity":
      suggestions.push("⚡ Reduce electricity usage: turn off unused devices, switch to LED lights.");
      break;
    case "fuel":
      suggestions.push("⛽ Use public transport or carpool more often.");
      break;
    case "flights":
      suggestions.push("✈️ Limit air travel; consider trains or buses for shorter trips.");
      break;
    case "meat":
      suggestions.push("🥩 Reduce meat consumption; try more plant-based meals.");
      break;
    case "car":
      suggestions.push("🚗 Walk, bike, or use public transport instead of driving alone.");
      break;
    case "publicTransport":
      suggestions.push("🚌 Optimize public transport usage; choose eco-friendly options.");
      break;
    case "water":
      suggestions.push("💧 Save water: fix leaks and take shorter showers.");
      break;
    case "waste":
      suggestions.push("🗑️ Reduce, reuse, recycle your waste to lower footprint.");
      break;
    case "shopping":
      suggestions.push("🛍️ Buy sustainably: fewer fast-fashion items, support eco-friendly brands.");
      break;
    default:
      suggestions.push("🌿 Keep maintaining eco-friendly habits!");
  }

  const pieData = {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: [
          "#4ade80", "#facc15", "#f87171", "#60a5fa", "#a78bfa",
          "#f472b6", "#34d399", "#fbbf24", "#f43f5e"
        ],
        borderColor: "#ffffff",
        borderWidth: 1,
      },
    ],
  };

  const barData = {
    labels,
    datasets: [
      {
        label: "CO₂ Contribution (kg/month)",
        data: values,
        backgroundColor: [
          "#4ade80", "#facc15", "#f87171", "#60a5fa", "#a78bfa",
          "#f472b6", "#34d399", "#fbbf24", "#f43f5e"
        ],
        borderRadius: 6,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false }, tooltip: { enabled: true } },
    scales: {
      y: { beginAtZero: true, ticks: { color: "#fff" } },
      x: { ticks: { color: "#fff" } },
    },
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: 1,
    plugins: {
      legend: { position: "bottom" },
      tooltip: { enabled: true },
    },
  };

  return (
    <div className={`p-8 rounded-3xl shadow-2xl w-full max-w-5xl bg-linear-to-br ${colorClass} text-white text-center space-y-6`}>
      <h2 className="text-5xl font-bold">{emoji} Your Carbon Footprint</h2>
      <p className="text-6xl font-mono font-extrabold">{footprint} kg CO₂/month</p>
      <p className="text-xl mb-6">{message}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-3xl shadow-lg h-80 md:h-96 flex flex-col justify-center">
          <h3 className="text-lg font-bold mb-2 text-gray-700">Contribution Pie Chart</h3>
          <Pie data={pieData} options={pieOptions} />
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-lg h-80 md:h-96 flex flex-col justify-center">
          <h3 className="text-lg font-bold mb-2 text-gray-700">Contribution Bar Chart</h3>
          <Bar data={barData} options={barOptions} />
        </div>
      </div>

      <div className="bg-white p-6 rounded-3xl shadow-lg text-gray-800 text-left">
        <h3 className="text-xl font-bold mb-3">💡 Suggestions to Reduce Your Footprint</h3>
        <ul className="list-disc list-inside space-y-2">
          {suggestions.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ul>
      </div>

      <button
        className="bg-white text-black font-bold py-3 px-8 rounded-2xl hover:scale-105 transform transition text-xl mt-4"
        onClick={reset}
      >
        Recalculate 🔄
      </button>
    </div>
  );
}
