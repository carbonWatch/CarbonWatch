import express from "express";
import cors from "cors";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.post("/api/calculate", (req, res) => {
  const { electricity, fuel, flights, meat, car, publicTransport, water, waste, shopping } = req.body;

  const elec = parseFloat(electricity) || 0;
  const f = parseFloat(fuel) || 0;
  const fl = parseFloat(flights) || 0;
  const m = parseFloat(meat) || 0;
  const c = parseFloat(car) || 0;
  const pt = parseFloat(publicTransport) || 0;
  const w = parseFloat(water) || 0;
  const ws = parseFloat(waste) || 0;
  const sh = parseFloat(shopping) || 0;

  const details = {
    electricity: elec * 0.233,
    fuel: f * 2.31,
    flights: fl * 0.15,
    meat: m * 5,
    car: c * 0.21,
    publicTransport: pt * 0.05,
    water: w * 0.001,
    waste: ws * 0.5,
    shopping: (sh/270) * 0.2,
  };

  const total = Object.values(details).reduce((a, b) => a + b, 0);

  res.json({ total: total.toFixed(2), details });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
