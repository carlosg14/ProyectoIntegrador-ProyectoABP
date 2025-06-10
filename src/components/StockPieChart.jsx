import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from "recharts";

function StockPieChart({ data }) {
  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            label
          >
            <Cell fill="#7A7A78" />
            <Cell fill="#D3C0B2" />
          </Pie>
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default StockPieChart;