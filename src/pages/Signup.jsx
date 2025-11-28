// Hooks
import { Link } from "react-router-dom";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";

// Images
import logo from "../assets/logo.svg";
import google_icon from "../assets/google_icon.svg";

// Components
import Message from "../components/common/Message";

// Utils
import "./css/AccountPage.css";
import "../styles/globals.css";
import { auth, db } from "../lib/firebase";

const Signup = () => {
  document.title = "NoteItAll - Signup";

  /*
    LEMBRAR DE NÃO DEIXAR CONSOLE.LOG() NO CÓDIGO :)
  */

  const [message, setMessage] = useState();
  const [messageType, setMessageType] = useState("");
  const emailRef = useRef();
  const usernameRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const navigate = useNavigate();

  const signup_action = async (e) => {
    e.preventDefault();

    const email = emailRef.current.value.trim();
    const username = usernameRef.current.value.trim();
    const password = passwordRef.current.value.trim();
    const confirmPassword = confirmPasswordRef.current.value.trim();

    if (!email || !username || !password || !confirmPassword) {
      setMessageType("error");
      setMessage("Preencha tudo!");
      return;
    }

    if (password !== confirmPassword) {
      setMessageType("error");
      setMessage("As senhas não coincidem!");
      return;
    }

    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);

      await setDoc(doc(db, "users", cred.user.uid), {
        username,
        email,
        createdAt: Date.now(),
      });

      await sendEmailVerification(cred.user);

      navigate("/verify-email");
    } catch (error) {
      setMessageType("error");
      setMessage(error.message);
    }
  };

  return (
    <div className="auth_page">
      {message && messageType && (
        <Message type={messageType} message={message} />
      )}
      <div className="landing_logo">
        <img src={logo} alt="Logo" />
        <h1>NoteItAll</h1>
      </div>
      <div className="auth_container">
        <h2>Signup</h2>

        <form onSubmit={signup_action}>
          <div className="auth_input_wrapper">
            <label htmlFor="signup_email">Edereço de email</label>
            <input
              type="email"
              name="signup_email"
              id="signup_email"
              placeholder="exemplo@gmail.com"
              ref={emailRef}
            />
          </div>
          <div className="auth_input_wrapper">
            <label htmlFor="username">Nome de usuário</label>
            <input
              type="text"
              name="username"
              id="username"
              minLength={3}
              placeholder="Mínimo de 3 caracteres"
              autoComplete="off"
              ref={usernameRef}
            />
          </div>
          <div className="auth_input_wrapper">
            <label htmlFor="signup_password">Senha</label>
            <input
              type="password"
              name="signup_password"
              id="signup_password"
              minLength={8}
              placeholder="Mínimo de 8 caracteres"
              ref={passwordRef}
            />
          </div>
          <div className="auth_input_wrapper">
            <label htmlFor="confirm_password">Confirme sua senha</label>
            <input
              type="password"
              name="confirm_password"
              id="confirm_password"
              ref={confirmPasswordRef}
              placeholder="Confirme sua senha"
            />
          </div>
          <button className="submit_form_btn" type="submit">
            Criar Conta
          </button>
        </form>

        <div className="divider_wrapper">
          <div className="divider_line"></div>
          <p>Ou</p>
          <div className="divider_line"></div>
        </div>

        <p className="account_link">
          Já possui uma conta? <Link to="/login">Entre</Link>
        </p>

        <button className="auth_social_btn">
          <img src={google_icon} alt="Icon" />
          <span>Entre com o Google</span>
        </button>
      </div>
    </div>
  );
};

export default Signup;
