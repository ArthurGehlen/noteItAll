// Utils
import { useAuth } from "../context/AuthProvider";
import "./css/Home.css";
import { auth } from "../lib/firebase";

// Hooks
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Home() {
  document.title = "NoteItAll - Home";

  const { user } = useAuth();
  const [username, setUsername] = useState("");

  useEffect(() => {
    const loadUserData = async () => {
      if (!user) return;
    };

    loadUserData();
  }, [user]);

  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <div>
      <h1>Bem-vindo, {user?.email}</h1> {/* por hora só puxa o email, mais pra frente puxar o username */}

      <button onClick={handleLogout}>Sair</button>
    </div>
  );
}

export default Home;
