import "./App.css";
import CustomerTable from "./Components/CustomerTable";
import { RouterProvider, createHashRouter } from "react-router-dom";
import CustomerTransaction from "./Components/CustomerTransaction";
import Layout from "./Components/Layout";
import CustomerContextProvider from "./Contexts/CustomerContext";
import NotFound from "./Components/NotFound";
import "@fortawesome/fontawesome-free/css/all.min.css";

function App() {
  let router = createHashRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        { index: true, element: <CustomerTable /> },
        { path: "transaction/:id", element: <CustomerTransaction /> },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);
  return (
    <>
      <CustomerContextProvider>
        <RouterProvider router={router}></RouterProvider>
      </CustomerContextProvider>
    </>
  );
}

export default App;
