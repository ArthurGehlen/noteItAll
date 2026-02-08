// Images
import favorite_img from "../../assets/favorite_icon.svg";
import delete_icon from "../../assets/delete_icon.svg";
import active_favorite_icon from "../../assets/active_favorite_icon.svg";

// Utils
import "./Note.css";
import { convert_date } from "../../utils/convertDate";

const Note = ({ note_obj, handle_delete, handle_favorite }) => {
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
          <button className="delete_icon" onClick={handle_delete}>
            <img src={delete_icon} style={{ fill: "white" }} alt="Delete" />
          </button>
          <button className="favorite_icon" onClick={handle_favorite}>
            <img
              src={note_obj.favorite ? active_favorite_icon : favorite_img}
              alt="Favorite"
            />
          </button>
        </div>
        <div className="note_title">
          <h2>{note_obj.title}</h2>
          <div className="note_divider" style={{ marginTop: "1rem" }}></div>
        </div>
        <p className="note_content">{note_obj.content}</p>
      </header>
      <div className="note_date_container">
        <div className="note_divider" style={{ marginBottom: "1rem" }}></div>
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
