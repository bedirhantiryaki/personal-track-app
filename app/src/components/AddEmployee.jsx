import React, { useState } from "react";
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

  // Form gönderildiğinde yapılacak işlem
  const handleSubmit = (e) => {
    e.preventDefault(); // Sayfanın yeniden yüklenmesini engelliyoruz
    console.log("Personel Kayıt Verileri:", formData);
    // Burada formu göndermek için API'ye veya başka bir işleme yönlendirebilirsiniz
    alert("Personel başarıyla kaydedildi!");
    setFormData({
      firstName: "",
      lastName: "",
      position: "",
    }); // Formu sıfırlıyoruz
  };

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
          <button type="submit">Kaydet</button>
        </div>
      </form>
    </div>
  );
};

export default AddEmployee;
