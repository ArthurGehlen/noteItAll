// Utils
import "./css/Favorites.css";
import { db } from "../lib/firebase";
import { useAuth } from "../context/AuthProvider";

// Hooks
import { useEffect } from "react";
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

// Images
import empty_notes from "../assets/empty_notes.svg";
import add_img from "../assets/add_img.svg";
import favorite_img from "../assets/favorite_icon.svg";
import delete_icon from "../assets/delete_icon.svg";
import active_favorite_icon from "../assets/active_favorite_icon.svg";

// Components
import MainComponent from "../components/UI/MainComponent";
import Sidebar from "../components/UI/Sidebar";
import ContentComponent from "../components/UI/ContentComponent";
import Header from "../components/UI/Header";
import Message from "../components/common/Message";

const Favorites = () => {
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

  return (
    <MainComponent>
      <Sidebar current_link="Favoritos" />
      <ContentComponent>
        <Header />
      </ContentComponent>
    </MainComponent>
  );
};

export default Favorites;
