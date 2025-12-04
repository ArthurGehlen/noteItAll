// Utils
import { useAuth } from "../context/AuthProvider";
import "./css/Home.css";

// Hooks
import { useState, useEffect } from "react";

function Home() {
  document.title = "NoteItAll - Home";

  const { logout, profile } = useAuth();
  const [userData, setUserData] = useState(null); // guarda os dados completos do usuário, no momento não irei usar isso mas futuramente pode ser útil :D
  const [username, setUsername] = useState("");

  useEffect(() => {
    if (profile && profile.username) {
      setUsername(profile.username);
      setUserData(profile);
    }
  }, [profile]);

  return (
    <div>
      <h1>Bem-vindo, {username}</h1>

      <button onClick={logout}>Sair</button>
    </div>
  );
}

export default Home;
