// Utils
import { useAuth } from "../context/AuthProvider";
import "./css/Home.css";

// Hooks
import { useState, useEffect } from "react";

// Components
import ContentPage from "../components/UI/ContentPage";
import Sidebar from "../components/UI/Sidebar";

function Home() {
  document.title = "NoteItAll - Home";

  const { logout, profile } = useAuth();
  const [username, setUsername] = useState("");

  useEffect(() => {
    if (profile && profile.username) {
      setUsername(profile.username);
    }
  }, [profile]);

  return (
    <ContentPage>
      <Sidebar />
    </ContentPage>
  );
}

export default Home;
