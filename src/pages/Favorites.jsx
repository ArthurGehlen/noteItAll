// Utils
import "./css/Favorites.css";
import "../styles/globals.css";
import { db } from "../lib/firebase";
import { useAuth } from "../context/AuthProvider";

// Hooks
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";

// Images
import empty_notes_favorites from "../assets/empty_notes_favorites.svg";
import add_img from "../assets/add_img.svg";

// Components
import MainComponent from "../components/UI/MainComponent";
import Sidebar from "../components/UI/Sidebar";
import ContentComponent from "../components/UI/ContentComponent";
import Header from "../components/UI/Header";
import Message from "../components/common/Message";
import Note from "../components/UI/Note";

const Favorites = () => {
  const [notes, setNotes] = useState([]);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    const q = query(
      collection(db, "notes"),
      where("uid", "==", user.uid),
      where("favorite", "==", true),
      orderBy("updatedAt", "desc"),
    );

    const unsub = onSnapshot(q, (snap) => {
      setNotes(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });

    return unsub;
  }, [user]);

  const handle_note_error = (msg) => {
    setMessageType("error");
    setMessage(msg);
  };

  const handle_note_success = (msg) => {
    setMessageType("success");
    setMessage(msg);
  };

  return (
    <MainComponent>
      <Sidebar current_link="Favoritos" />
      <ContentComponent>
        <Header />
        {message && (
          <Message message={message} type={messageType} time={4000} />
        )}
        {notes.length === 0 ? (
          <div className="empty_notes_container">
            <img src={empty_notes_favorites} alt="Empty Notes" />
            <p>Ops! Parece que está vazio, que tal fazer algumas anotações?</p>
            <Link to="/my-notes">
              <img src={add_img} alt="Add" />
              <span>Nova nota</span>
            </Link>
          </div>
        ) : (
          <div className="notes_grid">
            {notes.map((note) => (
              <Note
                note_obj={note}
                key={note.id}
                onError={handle_note_error}
                onSuccess={handle_note_success}
              />
            ))}
          </div>
        )}
      </ContentComponent>
    </MainComponent>
  );
};

export default Favorites;
