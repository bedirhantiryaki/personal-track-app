import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // React Router'ı import ediyoruz
import App from "./App";
import store from "./store"; // Redux store'u import ediyoruz
import AddEmployee from "./components/AddEmployee"; // AddEmployee component'ini import ediyoruz
import EmployeeList from "./components/EmployeeList";
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    {/* Redux Provider ile Store'u sağlıyoruz */}
    <Router>
      <Routes>
        {/* Ana sayfa ve personel ekleme sayfalarını yönlendirme */}
        <Route path="/" element={<App />} />
        <Route path="/addEmployee" element={<AddEmployee />} />
        <Route path="/api/employees" element={<EmployeeList />} />
      </Routes>
    </Router>
  </Provider>
);
