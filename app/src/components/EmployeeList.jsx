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
  const [editingEmployeeId, setEditingEmployeeId] = useState(null);

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

  const handleEditChange = (id, field, value) => {
    setEmployees((prevEmployees) =>
      prevEmployees.map((employee) =>
        employee._id === id ? { ...employee, [field]: value } : employee
      )
    );
  };

  const handleUpdate = async (id) => {
    const updatedEmployee = employees.find((employee) => employee._id === id);
    try {
      await updateEmployee({ id, updatedData: updatedEmployee });
      setEditingEmployeeId(null);
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
              <td>
                {editingEmployeeId === employee._id ? (
                  <input
                    type="text"
                    value={employee.firstName}
                    onChange={(e) =>
                      handleEditChange(
                        employee._id,
                        "firstName",
                        e.target.value
                      )
                    }
                  />
                ) : (
                  employee.firstName
                )}
              </td>
              <td>
                {editingEmployeeId === employee._id ? (
                  <input
                    type="text"
                    value={employee.lastName}
                    onChange={(e) =>
                      handleEditChange(employee._id, "lastName", e.target.value)
                    }
                  />
                ) : (
                  employee.lastName
                )}
              </td>
              <td>
                {editingEmployeeId === employee._id ? (
                  <input
                    type="text"
                    value={employee.position}
                    onChange={(e) =>
                      handleEditChange(employee._id, "position", e.target.value)
                    }
                  />
                ) : (
                  employee.position
                )}
              </td>
              <td>
                {editingEmployeeId === employee._id ? (
                  <>
                    <button onClick={() => handleUpdate(employee._id)}>
                      Kaydet
                    </button>
                    <button onClick={() => setEditingEmployeeId(null)}>
                      İptal
                    </button>
                  </>
                ) : (
                  <>
                    <button onClick={() => setEditingEmployeeId(employee._id)}>
                      Düzenle
                    </button>
                    <button onClick={() => handleDelete(employee._id)}>
                      Sil
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;
