export default function InputCard({ label, value, setValue, placeholder }) {
  return (
    <div className="relative rounded-lg overflow-hidden">
      <div className="absolute -inset-1 bg-linear-to-r from-green-300 via-blue-300 to-purple-300 rounded-lg opacity-60 blur-sm"></div>

      <div className="relative bg-white rounded-lg p-6 shadow-md flex flex-col z-10 transition-transform duration-200 hover:scale-105">
        <label className="font-semibold text-gray-700 mb-2">{label}</label>
        <input
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          className="p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 text-gray-800 text-lg transition"
        />
      </div>
    </div>
  );
}
