import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CustomerContext } from "../Contexts/CustomerContext";
import TotalTransaction from "./TotalTransaction";

export default function CustomerTable() {
  let {
    getCustomers,
    getTransactions,
    customers,
    transactions,
    filteredCustomer,
    setfilteredCustomer,
  } = useContext(CustomerContext);

  function filterByName(value) {
    setfilteredCustomer(
      customers.filter((customer) =>
        customer.name.toLowerCase().includes(value.toLowerCase())
      )
    );
  }
  const filterByAmount = (value) => {
    transactions.forEach((transaction) => {
      if (value == "") {
        setfilteredCustomer(customers);
      } else if (transaction.amount == value) {
        const customer = customers.filter(
          (customer) => customer.id == transaction.customer_id
        );
        if (customer) {
          setfilteredCustomer(customer);
        }
      }
    });
  };

  useEffect(() => {
    getCustomers();
    getTransactions();
  }, []);

  return (
    <>
      <div className="ms-0 md:ms-64">
        <TotalTransaction />
        <div className="mb-6 flex flex-col justify-center items-center lg:flex-row lg:justify-around">
          <input
            onInput={(e) => filterByName(e.target.value)}
            type="search"
            id="default-search"
            className="block mb-4 w-full lg:mb-0 lg:w-1/3 p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-violet-500 focus:border-violet-500  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-violet-500 dark:focus:border-violet-500"
            placeholder="Filter by name..."
          />
          <input
            onInput={(e) => filterByAmount(e.target.value)}
            type="search"
            id="default-search"
            className="block w-full lg:w-1/3 p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-violet-500 focus:border-violet-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-violet-500 dark:focus:border-violet-500"
            placeholder="Filter by transaction amount..."
          />
        </div>

        <table className="relative overflow-x-auto w-full text-sm text-center mb-10 shadow rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-sm text-gray-900 uppercase rounded-3xl bg-violet-300 dark:bg-violet-800 dark:text-gray-100">
            <tr>
              <th scope="col" className="px-6 py-3">
                id
              </th>
              <th scope="col" className="px-6 py-3">
                Customer name
              </th>
              <th scope="col" className="px-6 py-3">
                Transaction data
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomer.map((customer) => (
              <tr
                key={customer.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {customer.id}
                </th>
                <th scope="row" className="">
                  <Link to={`/transaction/${customer.id}`}>
                    <p className="text-xs lg:text-sm mx-auto px-2 py-1 text-white rounded-xl font-medium whitespace-nowrap hover:scale-110 transition-all duration-300 w-fit h-fit bg-violet-600">
                      {customer.name}
                    </p>
                  </Link>
                </th>
                {transactions
                  .filter(
                    (transaction) => transaction.customer_id == customer.id
                  )
                  .map((transaction) => (
                    <>
                      <td
                        key={transaction.id}
                        className="flex flex-col py-2 text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        ${transaction.amount} on {transaction.date}
                      </td>
                    </>
                  ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
