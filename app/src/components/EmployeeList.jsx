import React, { useState, useEffect } from "react";
import "./EmployeeList.css";

const fetchEmployees = async () => {
  const response = await fetch("http://localhost:5000/api/employees");
  if (!response.ok) {
    throw new Error("Personel verileri alınamadı");
  }
  const data = await response.json();
  return data;
};

const deleteEmployee = async (id) => {
  const response = await fetch(`http://localhost:5000/api/employees/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Personel silinemedi");
  }
};

const updateEmployee = async ({ id, updatedData }) => {
  const response = await fetch(`http://localhost:5000/api/employees/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedData),
  });
  if (!response.ok) {
    throw new Error("Personel güncellenemedi");
  }
  return response.json();
};

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [updatedData, setUpdatedData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchEmployees();
        setEmployees(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteEmployee(id);
      setEmployees((prevEmployees) =>
        prevEmployees.filter((employee) => employee._id !== id)
      );
    } catch (err) {
      setError("Personel silinemedi");
    }
  };

  const handleEdit = (employee) => {
    setEditingEmployee(employee);
    setUpdatedData({
      firstName: employee.firstName,
      lastName: employee.lastName,
      position: employee.position,
    });
  };

  const handleUpdate = async () => {
    try {
      await updateEmployee({ id: editingEmployee._id, updatedData });
      setEmployees((prevEmployees) =>
        prevEmployees.map((employee) =>
          employee._id === editingEmployee._id
            ? { ...employee, ...updatedData }
            : employee
        )
      );
      setEditingEmployee(null);
    } catch (err) {
      setError("Personel güncellenemedi");
    }
  };

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
        <p className="error">{error}</p>
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
            <th>İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee._id}>
              <td>{employee.firstName}</td>
              <td>{employee.lastName}</td>
              <td>{employee.position}</td>
              <td>
                <button onClick={() => handleEdit(employee)}>Düzenle</button>
                <button onClick={() => handleDelete(employee._id)}>Sil</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingEmployee && (
        <div className="edit-modal">
          <h2>Düzenle</h2>
          <form onSubmit={(e) => e.preventDefault()}>
            <label>
              Ad:
              <input
                type="text"
                value={updatedData.firstName}
                onChange={(e) =>
                  setUpdatedData({ ...updatedData, firstName: e.target.value })
                }
              />
            </label>
            <label>
              Soyad:
              <input
                type="text"
                value={updatedData.lastName}
                onChange={(e) =>
                  setUpdatedData({ ...updatedData, lastName: e.target.value })
                }
              />
            </label>
            <label>
              Pozisyon:
              <input
                type="text"
                value={updatedData.position}
                onChange={(e) =>
                  setUpdatedData({ ...updatedData, position: e.target.value })
                }
              />
            </label>
            <button type="button" onClick={handleUpdate}>
              Kaydet
            </button>
            <button type="button" onClick={() => setEditingEmployee(null)}>
              İptal
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default EmployeeList;
