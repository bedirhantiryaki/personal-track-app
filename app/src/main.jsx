import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import store from "./store";
import AddEmployee from "./components/AddEmployee";
import EmployeeList from "./components/EmployeeList";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/addEmployee" element={<AddEmployee />} />
          <Route path="/api/employees" element={<EmployeeList />} />
        </Routes>
      </Router>
    </Provider>
  </QueryClientProvider>
);
