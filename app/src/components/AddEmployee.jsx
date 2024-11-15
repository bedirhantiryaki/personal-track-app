import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import "./AddEmployee.css";

const AddEmployee = () => {
  // Form verileri için state tanımlıyoruz
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    position: "",
  });

  // Form verileri her değiştiğinde state'i güncelleyen bir fonksiyon
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // API'ye POST isteği gönderen fonksiyon
  const addEmployee = async (newEmployee) => {
    const response = await fetch("http://localhost:5000/addEmployee", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newEmployee),
    });

    if (!response.ok) {
      throw new Error("Personel kaydedilemedi");
    }

    return response.json();
  };

  // useMutation ile mutasyon işlemi yapıyoruz
  const { mutate, isLoading, isError, error, isSuccess } =
    useMutation(addEmployee);

  // Form gönderildiğinde yapılacak işlem
  const handleSubmit = (e) => {
    e.preventDefault(); // Sayfanın yeniden yüklenmesini engelliyoruz
    console.log("Personel Kayıt Verileri:", formData);

    // Veriyi React Query'nin mutate fonksiyonu ile gönderiyoruz
    mutate(formData);
  };

  // Başarılı kaydetme mesajı
  if (isSuccess) {
    alert("Personel başarıyla kaydedildi!");
    setFormData({
      firstName: "",
      lastName: "",
      position: "",
    });
  }

  return (
    <div>
      <h1>Personel Kayıt Formu</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstName">Ad:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label htmlFor="lastName">Soyad:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label htmlFor="position">Pozisyon:</label>
          <select
            id="position"
            name="position"
            value={formData.position}
            onChange={handleInputChange}
            required
          >
            <option value="">Pozisyon Seçin</option>
            <option value="Manager">Yönetici</option>
            <option value="Developer">Geliştirici</option>
            <option value="Designer">Tasarımcı</option>
            <option value="QA">Kalite Kontrol</option>
            <option value="HR">İK</option>
          </select>
        </div>

        <div>
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Kaydediliyor..." : "Kaydet"}
          </button>
        </div>

        {isError && <div style={{ color: "red" }}>{error.message}</div>}
      </form>
    </div>
  );
};

export default AddEmployee;
