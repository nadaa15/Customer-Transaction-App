import axios from "axios";
import React, { createContext, useState } from "react";

export let CustomerContext = createContext();

export default function CustomerContextProvider(props) {
  const [customers, setCustomers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [filteredCustomer, setfilteredCustomer] = useState([]);
  function getCustomers() {
    axios.get("http://localhost:5000/customers").then((response) => {
      setCustomers(response.data);
      setfilteredCustomer(response.data);
    });
  }

  function getTransactions() {
    axios.get("http://localhost:5000/transactions").then((response) => {
      setTransactions(response.data);
    });
  }

  return (
    <>
      <CustomerContext.Provider
        value={{
          getCustomers,
          getTransactions,
          customers,
          setCustomers,
          transactions,
          setTransactions,
          filteredCustomer,
          setfilteredCustomer,
        }}
      >
        {props.children}
      </CustomerContext.Provider>
    </>
  );
}
