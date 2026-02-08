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
  increment,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";

// Images
import empty_notes_favorites from "../assets/empty_notes_favorites.svg";
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

const Favorites = () => {
  const [notes, setNotes] = useState([]);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [noteToDelete, setNoteToDelete] = useState(null);
  const [deleteNoteMode, setDeleteNoteMode] = useState("");
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
      <Sidebar current_link="Favoritos" />
      <ContentComponent>
        <Header />
        {message && (
          <Alert color={messageType} variant="solid">
            {message}
          </Alert>
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
      </ContentComponent>
    </MainComponent>
  );
};

export default Favorites;
