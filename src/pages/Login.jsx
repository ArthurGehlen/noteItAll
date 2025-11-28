// Hooks
import { Link, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";

// Images
import logo from "../assets/logo.svg";
import google_icon from "../assets/google_icon.svg";

// Utils
import "./css/AccountPage.css";
import "../styles/globals.css";
import { auth } from "../lib/firebase";

// Components
import Message from "../components/common/Message";
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  document.title = "NoteItAll - Login";

  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const login_action = async (e) => {
    e.preventDefault();

    const email = emailRef.current.value.trim();
    const password = passwordRef.current.value.trim();

    if (!email || !password) {
      setMessageType("error");
      setMessage("Preencha tudo.");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/home");
    } catch (error) {
      setMessageType("error");
      setMessage(error);
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
        <h2>Login</h2>

        <form onSubmit={login_action}>
          <div className="auth_input_wrapper">
            <label htmlFor="login_email">Edereço de email</label>
            <input
              type="email"
              name="login_email"
              id="login_email"
              ref={emailRef}
            />
          </div>
          <div className="auth_input_wrapper">
            <label htmlFor="login_password">Senha</label>
            <input
              type="password"
              name="login_password"
              id="login_password"
              ref={passwordRef}
            />
          </div>
          <button className="submit_form_btn" type="submit">
            Entrar
          </button>
        </form>

        <div className="divider_wrapper">
          <div className="divider_line"></div>
          <p>Ou</p>
          <div className="divider_line"></div>
        </div>

        <p className="account_link">
          Não possui uma conta? <Link to="/signup">Crie uma</Link>
        </p>

        <button className="auth_social_btn">
          <img src={google_icon} alt="Icon" />
          <span>Entre com o Google</span>
        </button>
      </div>
    </div>
  );
};

export default Login;
