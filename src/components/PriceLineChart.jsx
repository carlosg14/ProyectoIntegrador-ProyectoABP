import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

function PriceLineChart({ data }) {
  // data debe ser un array de objetos con { nombre, precio, index }
  return (
    <div style={{ width: "80%", height: 200 }}>
      <ResponsiveContainer>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="index" label={{ value: "Producto", position: "insideBottomRight", offset: 0 }} />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="precio" stroke="#D3C0B2" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default PriceLineChart;