// Utils
import "./css/MyNotes.css";
import { useAuth } from "../context/AuthProvider";
import { db } from "../lib/firebase";

// Images
import empty_notes from "../assets/empty_notes.svg";
import add_img from "../assets/add_img.svg";

// Components
import MainComponent from "../components/UI/MainComponent";
import Sidebar from "../components/UI/Sidebar";
import Header from "../components/UI/Header";
import ContentComponent from "../components/UI/ContentComponent";
import { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";

const MyNotes = () => {
  const [notes, setNotes] = useState(["a"]);

  const { profile, user } = useAuth();

  useEffect(() => {
    const q = query(
      collection(db, "notes"),
      where("uid", "==", user.uid),
      orderBy("updatedAt", "desc")
    );

    // fetch em "realtime"
    const unsub = onSnapshot(q, (snap) => {
      const list = snap.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      }));
      setNotes(list);
    });

    return () => unsub();
  }, []);

  const convert_date = (date) => {
    const new_date = new Date(date);

    // usei o padStart só pra garantir que vai ser 2 digitos
    // ex: dia 5, sem o padStart iria retornar 5/12
    const day = String(new_date.getDate()).padStart(2, "0");
    const month = String(new_date.getMonth() + 1).padStart(2, "0");
    const year = new_date.getFullYear();

    const hours = String(new_date.getHours()).padStart(2, "0");
    const minutes = String(new_date.getMinutes()).padStart(2, "0");

    return `${day}/${month}/${year} às ${hours}:${minutes}`;
  };

  return (
    <MainComponent>
      <Sidebar current_link="Minhas Notas" />
      <ContentComponent>
        <Header />

        {notes.length === 0 ? (
          <div className="empty_notes_container">
            <img src={empty_notes} alt="Empty Notes" />
            <p>Ops! Parece que está vazio, que tal fazer algumas anotações?</p>
            <button>
              <img src={add_img} alt="Add" />
              <span>Nova nota</span>
            </button>
          </div>
        ) : (
          <div className="notes_grid">
            {notes.map((note) => (
              <div className="note" key={note.uid}>
                <header className="note_header">
                  <h2 className="note_title">{note.title}</h2>
                  <p className="note_content">{note.content}</p>
                  <div className="note_divider"></div>
                </header>
                <div className="note_date_container">
                  <p className="note_timestamp">
                    Criado em: {convert_date(note.createdAt)}
                  </p>
                  <p className="note_timestamp">
                    Atualizado em: {convert_date(note.updatedAt)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </ContentComponent>
    </MainComponent>
  );
};

export default MyNotes;
