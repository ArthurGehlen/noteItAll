// Images
import favorite_img from "../../assets/favorite_icon.svg";
import delete_icon from "../../assets/delete_icon.svg";
import active_favorite_icon from "../../assets/active_favorite_icon.svg";

// Utils
import "./Note.css";
import { convert_date } from "../../utils/convertDate";
import { db } from "../../lib/firebase";

// Hooks
import { increment, updateDoc, doc, deleteDoc } from "firebase/firestore";

const Note = ({ note_obj, onError, onSucces }) => {
  const delete_note = async (note_id) => {
    try {
      await deleteDoc(doc(db, "notes", note_id));

      await updateDoc(doc(db, "users", user.uid), {
        notesCount: increment(-1),
      });

      onSucces("Nota deletada com sucesso!");
    } catch (err) {
      onError("Erro ao deletar a nota.");
    }
  };

  const favorite_note = async (note) => {
    try {
      const noteRef = doc(db, "notes", note.id);

      await updateDoc(noteRef, {
        favorite: !note.favorite,
        updatedAt: Date.now(),
      });
    } catch (err) {
      onError("Erro ao favoritar a nota.");
    }
  };

  return (
    <div
      className="note"
      key={note_obj.id}
      style={{ backgroundColor: note_obj.color }}
    >
      {" "}
      {/* haja classe kkkkkk */}
      <header className="note_header">
        <div className="note_actions">
          <button
            className="delete_icon"
            onClick={() => delete_note(note_obj.id)}
          >
            <img src={delete_icon} style={{fill: "white"}} alt="Delete" />
          </button>
          <button
            className="favorite_icon"
            onClick={() => favorite_note(note_obj)}
          >
            <img
              src={note_obj.favorite ? active_favorite_icon : favorite_img}
              alt="Favorite"
            />
          </button>
        </div>
        <h2 className="note_title">{note_obj.title}</h2>
        <p className="note_content">{note_obj.content}</p>
        <div className="note_divider"></div>
      </header>
      <div className="note_date_container">
        <p className="note_timestamp">
          Criado em: {convert_date(note_obj.createdAt)}
        </p>
        <p className="note_timestamp">
          Atualizado em: {convert_date(note_obj.updatedAt)}
        </p>
      </div>
    </div>
  );
};

export default Note;
