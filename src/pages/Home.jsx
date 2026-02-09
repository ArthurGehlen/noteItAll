// Utils
import { useAuth } from "../context/AuthProvider";
import "./css/Home.css";
import { db } from "../lib/firebase";

// Components
import MainComponent from "../components/UI/MainComponent";
import ContentComponent from "../components/UI/ContentComponent";
import Sidebar from "../components/UI/Sidebar";
import Header from "../components/UI/Header";
import Note from "../components/UI/Note";
// import CircularProgress from "@mui/joy/CircularProgress"; vou deixar salvo aqui :)

// Hooks
import { useEffect, useState } from "react";

// Firestore
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
  increment,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";

function Home() {
  const [favoriteNotes, setFavoriteNotes] = useState([]);
  document.title = "NoteItAll - Home";

  const { profile, user } = useAuth();

  useEffect(() => {
    const q = query(
      collection(db, "notes"),
      where("uid", "==", user.uid),
      where("favorite", "==", true),
      orderBy("updatedAt", "desc"),
    );

    const unsub = onSnapshot(q, (snap) => {
      setFavoriteNotes(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });

    return unsub;
  }, [user]);

  return (
    <MainComponent>
      <Sidebar current_link="Home" />
      <ContentComponent>
        <Header />

        <div className="home_favorites">
          <h2>Favoritos</h2>
          <div className="favorites_carrosse  l">
            {favoriteNotes.map((note) => (
              <Note note_obj={note} key={note.id} />
            ))}
          </div>
        </div>
        <div className="statistics_wrapper">
          <h2>Estatísticas</h2>
          <div className="statistics_container">
            <div
              className="statistic_card"
              style={{ backgroundColor: "#3B82F6" }}
            >
              <h3>Quantidade de notas</h3>
              <p>{profile.notesCount}</p>
            </div>
            <div
              className="statistic_card"
              style={{ backgroundColor: "#FACC15" }}
            >
              <h3>Quantidade de favoritos</h3>
              <p>{profile.favoritesCount}</p>
            </div>
          </div>
        </div>
      </ContentComponent>
    </MainComponent>
  );
}

export default Home;
