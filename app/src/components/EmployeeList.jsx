import React, { useState, useEffect } from "react";
import "./EmployeeList.css"; // Stil dosyanız varsa ekleyebilirsiniz

const EmployeeList = () => {
  // State tanımlıyoruz
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true); // Veri yükleniyor durumu
  const [error, setError] = useState(null); // Hata durumu

  // Verileri API'den almak için useEffect kullanıyoruz
  useEffect(() => {
    // API'den verileri alıyoruz
    const fetchEmployees = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/employees");
        if (!response.ok) {
          throw new Error("Personel verileri alınamadı");
        }
        const data = await response.json();
        setEmployees(data); // Alınan veriyi state'e kaydediyoruz
      } catch (error) {
        setError(error.message); // Hata oluşursa hatayı state'e kaydediyoruz
      } finally {
        setLoading(false); // Yükleme durumu tamamlanıyor
      }
    };

    fetchEmployees();
  }, []); // useEffect sadece component ilk yüklendiğinde çalışacak

  if (loading) {
    return <div>Yükleniyor...</div>; // Yükleniyor mesajı
  }

  if (error) {
    return <div>{error}</div>; // Hata mesajı
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
