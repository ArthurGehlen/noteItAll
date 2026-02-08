// Utils
import "./css/MyNotes.css";
import { useAuth } from "../context/AuthProvider";
import { db } from "../lib/firebase";
import noteColors from "../utils/noteColors";

// Images
import empty_notes from "../assets/empty_notes.svg";
import add_img from "../assets/add_img.svg";

// Components
import MainComponent from "../components/UI/MainComponent";
import Sidebar from "../components/UI/Sidebar";
import Header from "../components/UI/Header";
import ContentComponent from "../components/UI/ContentComponent";
import Button from "@mui/joy/Button";
import Divider from "@mui/joy/Divider";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import DialogActions from "@mui/joy/DialogActions";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import Alert from "@mui/joy/Alert";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import Note from "../components/UI/Note";

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
  const [noteToDelete, setNoteToDelete] = useState(null);
  const [deleteNoteMode, setDeleteNoteMode] = useState(false);
  const [messageType, setMessageType] = useState(""); // danger ou success
  const [message, setMessage] = useState("");
  const [modalMessage, setModalMessage] = useState("");

  const noteTitleRef = useRef();
  const noteContentRef = useRef();
  const [noteColor, setNoteColor] = useState(null);
  const [isFavoriteNote, setIsFavoriteNote] = useState(false);
  // state pra lidar com erros
  const [errorStates, setErrorStates] = useState({
    title: false,
    color: false,
  });

  const { user } = useAuth();

  useEffect(() => {
    const q = query(
      collection(db, "notes"),
      where("uid", "==", user.uid),
      orderBy("updatedAt", "desc"),
    );

    const unsub = onSnapshot(q, (snap) => {
      setNotes(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });

    return unsub;
  }, [user]);

  // fazer verificação... percebi que tem como criar a nota sem cor
  // criar states pra lidar com erros :)
  const create_note = async (e) => {
    e.preventDefault();

    const hasTitleError = !noteTitleRef.current.value;
    const hasColorError = !noteColor;

    setErrorStates({
      title: hasTitleError,
      color: hasColorError,
    });

    if (hasTitleError && hasColorError) {
      setMessageType("danger");
      setModalMessage("A anotação deve ter uma cor e título!");
      return;
    }
    if (hasTitleError) {
      setMessageType("danger");
      setModalMessage("A anotação deve ter um título!");
      return;
    }
    if (hasColorError) {
      setMessageType("danger");
      setModalMessage("Escolha uma cor para a anotação!");
      return;
    }

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
    setModalMessage("");
    setMessageType("");
  };

  // caralho... dps de sla quantas tentativas deu certo
  // tinha até desistido kkkkkkkkk
  useEffect(() => {
    const sidebar = document.querySelector(".sidebar_hidden");
    if (!sidebar) return;

    if (isCreationModeActive) {
      sidebar.style.zIndex = "1";
    } else {
      sidebar.style.zIndex = "3";
    }
  }, [isCreationModeActive]);

  const delete_note = async (note) => {
    try {
      await deleteDoc(doc(db, "notes", note.id));

      await updateDoc(doc(db, "users", user.uid), {
        notesCount: increment(-1),
      });

      if (note.favorite) {
        await updateDoc(doc(db, "users", user.uid), {
          favoritesCount: increment(-1),
        });
      }

      setMessageType("success");
      setMessage("Nota deletada com sucesso!");
    } catch (err) {
      setMessageType("danger");
      setMessage("Erro ao deletar a nota");
    }
  };

  const favorite_note = async (note) => {
    try {
      const is_favoriting = !note.favorite;

      if (is_favoriting) {
        await updateDoc(doc(db, "users", user.uid), {
          favoritesCount: increment(1),
        });
      } else {
        await updateDoc(doc(db, "users", user.uid), {
          favoritesCount: increment(-1),
        });
      }

      await updateDoc(doc(db, "notes", note.id), {
        favorite: is_favoriting,
        updatedAt: Date.now(),
      });
    } catch {
      setMessageType("danger");
      setMessage("Erro ao favoritar a nota.");
    }
  };

  return (
    <MainComponent>
      <Sidebar current_link="Minhas Notas" />
      <ContentComponent>
        <Header
          page="my-notes"
          handle_click={() =>
            setIsCreationModeActive(true)
          } /* separando o link pra criar notas e o botão de criar notas */
        />
        {message && (
          <Alert color={messageType} variant="solid">
            {message}
          </Alert>
        )}

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
              <Note
                note_obj={note}
                key={note.id}
                handle_delete={() => {
                  setNoteToDelete(note);
                  setDeleteNoteMode(true);
                }}
                handle_favorite={() => favorite_note(note)}
              />
            ))}
          </div>
        )}

        {deleteNoteMode && (
          <Modal open={deleteNoteMode} onClose={() => setDeleteNoteMode(false)}>
            <ModalDialog variant="outlined" role="alertdialog">
              <DialogTitle>
                <WarningRoundedIcon />
                Atenção
              </DialogTitle>

              <Divider />

              <DialogContent>
                Você tem certeza que quer deletar essa anotação?
              </DialogContent>

              <DialogActions>
                <Button
                  variant="solid"
                  color="danger"
                  onClick={async () => {
                    await delete_note(noteToDelete);
                    setDeleteNoteMode(false);
                    setNoteToDelete(null);
                  }}
                >
                  Sim
                </Button>

                <Button
                  variant="plain"
                  color="neutral"
                  onClick={() => {
                    setDeleteNoteMode(false);
                    setNoteToDelete(null);
                  }}
                >
                  Cancelar
                </Button>
              </DialogActions>
            </ModalDialog>
          </Modal>
        )}

        {isCreationModeActive && (
          <div className="modal">
            <div
              className="overlay"
              onClick={() => {
                setIsCreationModeActive(false);
                setErrorStates({ title: false, color: false });
                setModalMessage("");
                setMessageType("");
              }}
            />

            {modalMessage && (
              <Alert color={messageType} variant="solid">
                {modalMessage}
              </Alert>
            )}

            <form className="creation_menu" onSubmit={create_note}>
              <h2>Nova Anotação</h2>

              <div className="input_wrapper">
                <label
                  htmlFor="title"
                  className={errorStates["title"] ? "label_error_state" : ""}
                  style={{ fontWeight: "bold" }}
                >
                  Título
                </label>
                <input
                  type="text"
                  id="title"
                  maxLength={50}
                  placeholder="max: 50 caracteres"
                  className={errorStates["title"] ? "input_error_state" : ""}
                  ref={noteTitleRef}
                />
              </div>

              <div className="input_wrapper">
                <label htmlFor="content" style={{ fontWeight: "bold" }}>
                  No que está pensando?
                </label>
                <textarea
                  id="content"
                  placeholder="max: 245 caracteres (opcional)"
                  maxLength={245}
                  ref={noteContentRef}
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
                <span
                  style={{ fontWeight: "bold" }}
                  className={errorStates["color"] ? "label_error_state" : ""}
                >
                  Cores:
                </span>
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
