import React, { useContext } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { CustomerContext } from "../Contexts/CustomerContext";

export default function TotalTransactions() {
  let { transactions } = useContext(CustomerContext);
  const data = [];
  for (let i = 0; i < transactions.length; i++) {
    const transaction = transactions[i];
    const date = transaction.date;
    let existing = null;

    for (let j = 0; j < data.length; j++) {
      if (data[j].date === date) {
        existing = data[j];
        break;
      }
    }

    if (existing) {
      existing.amount += transaction.amount;
    } else {
      data.push({ date, amount: transaction.amount });
    }
  }

  return (
    <>
      <h2 className="text-center text-2xl mb-4 font-bold text-violet-500">
        Total transactions amount
      </h2>
      <div className="flex justify-center items-center mb-8">
        <AreaChart
          width={900}
          height={400}
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="amount"
            stroke="#8884d8"
            fill="#8884d8"
          />
        </AreaChart>
      </div>
    </>
  );
}
