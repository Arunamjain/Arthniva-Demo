"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface DataPoint {
  month: string;
  revenue: number;
  expenses: number;
  profit: number;
}

export default function ProfitTrendChart({ data }: { data: DataPoint[] }) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="profitGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#10b981" stopOpacity={0.15} />
            <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
        <XAxis
          dataKey="month"
          tick={{ fontSize: 12, fill: "#94a3b8" }}
          axisLine={{ stroke: "#e2e8f0" }}
          tickLine={false}
        />
        <YAxis
          tick={{ fontSize: 12, fill: "#94a3b8" }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
        />
        <Tooltip
          formatter={(value) => [
            `₹${Number(value).toLocaleString("en-IN")}`,
            "Profit",
          ]}
          contentStyle={{
            backgroundColor: "#fff",
            border: "1px solid #e2e8f0",
            borderRadius: "8px",
            fontSize: "13px",
            boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.05)",
          }}
        />
        <Area
          type="monotone"
          dataKey="profit"
          stroke="#10b981"
          strokeWidth={2.5}
          fill="url(#profitGradient)"
          dot={{ r: 4, fill: "#10b981", strokeWidth: 0 }}
          activeDot={{ r: 6, fill: "#059669", strokeWidth: 0 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
