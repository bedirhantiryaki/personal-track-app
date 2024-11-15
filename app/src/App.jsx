import { useState } from "react";
import { Link } from "react-router-dom";
import "./App.css";
function App() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div>
      <h1>Personel Yönetimi</h1>

      {/* Personel Arama Alanı */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Personel Ara"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <button>Arama</button>
      </div>

      <div>
        <Link to="/addEmployee">
          <button>Personel Ekle</button>
        </Link>
      </div>
      <div>
        <Link to="api/employees">
          <button>Personel Listele</button>
        </Link>
      </div>
    </div>
  );
}

export default App;
