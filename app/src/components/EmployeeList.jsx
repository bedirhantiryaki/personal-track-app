import React from "react";
import { useQuery } from "@tanstack/react-query";
import "./EmployeeList.css"; // EmployeeList'e özel stil

const fetchEmployees = async () => {
  const response = await fetch("http://localhost:5000/api/employees");
  if (!response.ok) {
    throw new Error("Personel verileri alınamadı");
  }
  const data = await response.json();
  return data;
};

const EmployeeList = () => {
  const {
    data: employees,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["employees"],
    queryFn: fetchEmployees,
  });

  if (isLoading) {
    return (
      <div className="container">
        <p className="loading">Yükleniyor...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <p className="error">{error.message}</p>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Personel Listesi</h1>
      <table>
        <thead>
          <tr>
            <th>Ad</th>
            <th>Soyad</th>
            <th>Pozisyon</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee._id}>
              <td>{employee.firstName}</td>
              <td>{employee.lastName}</td>
              <td>{employee.position}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;
