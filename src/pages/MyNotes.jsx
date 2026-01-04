// Utils
import "./css/MyNotes.css";
import { useAuth } from "../context/AuthProvider";
import { db } from "../lib/firebase";
import noteColors from "../utils/noteColors";
import greetings from "../utils/greetings";

// Images
import empty_notes from "../assets/empty_notes.svg";
import add_img from "../assets/add_img.svg";

// Components
import MainComponent from "../components/UI/MainComponent";
import Sidebar from "../components/UI/Sidebar";
import Header from "../components/UI/Header";
import ContentComponent from "../components/UI/ContentComponent";

// Hooks
import { useEffect, useRef, useState } from "react";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
  addDoc,
  increment,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";

const MyNotes = () => {
  const [notes, setNotes] = useState([]);
  const [isCreationModeActive, setIsCreationModeActive] = useState(false);

  const noteTitleRef = useRef();
  const noteContentRef = useRef();
  const [noteColor, setNoteColor] = useState(null);
  const [isFavoriteNote, setIsFavoriteNote] = useState(false);

  const { user, profile } = useAuth();

  useEffect(() => {
    const q = query(
      collection(db, "notes"),
      where("uid", "==", user.uid),
      orderBy("updatedAt", "desc")
    );

    const unsub = onSnapshot(q, (snap) => {
      setNotes(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });

    return unsub;
  }, [user]);

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

  const create_note = async (e) => {
    e.preventDefault();

    await addDoc(collection(db, "notes"), {
      title: noteTitleRef.current.value,
      content: noteContentRef.current.value,
      color: noteColor,
      favorite: isFavoriteNote,
      uid: user.uid,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    await updateDoc(doc(db, "users", user.uid), {
      notesCount: increment(1),
    });

    setIsCreationModeActive(false);
  };

  const delete_note = async (note) => {
    await deleteDoc(doc(db, "notes", note.id));
  };

  return (
    <MainComponent>
      <Sidebar current_link="Minhas Notas" />
      <ContentComponent>
        <Header />
        <div className="user_greetings_container">
          <p>{greetings(profile.username)}</p>
          <button onClick={() => setIsCreationModeActive(true)}>
            <img src={add_img} alt="Add" />
            <span>Nova nota</span>
          </button>
        </div>

        {notes.length === 0 ? (
          <div className="empty_notes_container">
            <img src={empty_notes} alt="Empty Notes" />
            <p>Ops! Parece que está vazio, que tal fazer algumas anotações?</p>
            <button onClick={() => setIsCreationModeActive(true)}>
              <img src={add_img} alt="Add" />
              <span>Nova nota</span>
            </button>
          </div>
        ) : (
          <div className="notes_grid">
            {notes.map((note) => (
              <div
                className="note"
                key={note.id}
                style={{ backgroundColor: note.color }}
              >
                {" "}
                {/* haja classe kkkkkk */}
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

        {isCreationModeActive && (
          <div className="modal">
            <div
              className="overlay"
              onClick={() => setIsCreationModeActive(false)}
            />

            <form className="creation_menu" onSubmit={create_note}>
              <h2>Nova Anotação</h2>

              <div className="input_wrapper">
                <label htmlFor="title">Título</label>
                <input
                  type="text"
                  id="title"
                  maxLength={50}
                  placeholder="max: 50 caracteres"
                  ref={noteTitleRef}
                  required
                />
              </div>

              <div className="input_wrapper">
                <label htmlFor="content">No que está pensando?</label>
                <textarea
                  id="content"
                  placeholder="max: 245 caracteres"
                  maxLength={245}
                  ref={noteContentRef}
                  required
                />
              </div>

              <div className="input_wrapper checkbox">
                <input
                  type="checkbox"
                  id="favorite"
                  onChange={() => setIsFavoriteNote(!isFavoriteNote)}
                />
                <label htmlFor="favorite">Favorito?</label>
              </div>

              <div className="colors_wrapper">
                Cores:
                <div className="colors_container">
                  {noteColors.noteColorsLight.map((color) => (
                    <div
                      key={color}
                      className={`color ${
                        noteColor == color ? "active_color" : ""
                      }`}
                      onClick={() => setNoteColor(color)}
                      style={{ backgroundColor: color }}
                    ></div>
                  ))}
                </div>
              </div>

              <button type="submit">Criar Nota</button>
            </form>
          </div>
        )}
      </ContentComponent>
    </MainComponent>
  );
};

export default MyNotes;
