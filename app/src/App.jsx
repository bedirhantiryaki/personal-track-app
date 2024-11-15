import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Link } from "react-router-dom";

function App() {
  return (
    <div>
      <h1>Personel Yönetimi</h1>
      <div>
        <Link to="/addEmployee">
          <button>Personel Ekle</button>
        </Link>
      </div>
      <div>
        <button>Personel Listele</button>
      </div>{" "}
    </div>
  );
}

export default App;
