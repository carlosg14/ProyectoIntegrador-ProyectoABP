import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

function BarChartCategory({ data }) {
  return (
    <div style={{ width: "80%", height: 200 }}>
      <ResponsiveContainer>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="cantidad" fill="#DC3C0C" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default BarChartCategory;