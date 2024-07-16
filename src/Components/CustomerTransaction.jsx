import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { CustomerContext } from "../Contexts/CustomerContext";

export default function TransactionGraph() {
  const [totalAmount, settotalAmount] = useState("");
  let { transactions, customers } = useContext(CustomerContext);
  let { id } = useParams();

  const customerTransactions = transactions.filter(
    (transaction) => transaction.customer_id == id
  );
  const data = [];
  for (let i = 0; i < customerTransactions.length; i++) {
    const transaction = customerTransactions[i];
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

  useEffect(() => {
    const selectedTransactions = transactions.filter(
      (transaction) => transaction.customer_id == id
    );
    settotalAmount(
      selectedTransactions.reduce(
        (sum, transaction) => sum + transaction.amount,
        0
      )
    );
  }, []);

  return (
    <>
      {customers
        .filter((customer) => customer.id == id)
        .map((customer) => (
          <>
            <h2 className="text-center text-lg font-bold mb-4 text-violet-700">
              {customer.name}
            </h2>
          </>
        ))}
      <p className="text-center text-lg font-semibold mb-4 text-gray-900 dark:text-white">
        Total amount of transaction:{" "}
        <span className="text-violet-700">{totalAmount}$</span>
      </p>
      <div className="flex justify-center items-center">
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
          barSize={40}
        >
          <XAxis
            dataKey="date"
            scale="point"
            padding={{ left: 100, right: 100 }}
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <CartesianGrid strokeDasharray="3 3" />
          <Bar dataKey="amount" fill="#6420BB" background={{ fill: "#ccc" }} />
        </BarChart>
      </div>
    </>
  );
}
