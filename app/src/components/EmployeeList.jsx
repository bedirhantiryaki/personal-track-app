import React from "react";
import { useQuery } from "@tanstack/react-query";
import "./EmployeeList.css"; // Stil dosyanız varsa ekleyebilirsiniz

const fetchEmployees = async () => {
  const response = await fetch("http://localhost:5000/api/employees");
  if (!response.ok) {
    throw new Error("Personel verileri alınamadı");
  }
  return response.json();
};

const EmployeeList = () => {
  // React Query'nin useQuery hook'unu kullanıyoruz
  const {
    data: employees,
    error,
    isLoading,
  } = useQuery(["employees"], fetchEmployees);

  if (isLoading) {
    return <div>Yükleniyor...</div>; // Yükleniyor mesajı
  }

  if (error) {
    return <div>{error.message}</div>; // Hata mesajı
  }

  return (
    <div>
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
