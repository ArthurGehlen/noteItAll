// Hooks
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

// Images
import logo from "../assets/logo.svg";
import google_icon from "../assets/google_icon.svg";

// Utils
import "./css/AccountPage.css";
import "../styles/globals.css";
import { useAuth } from "../context/AuthProvider";

// Components
import Message from "../components/common/Message";

const Login = () => {
  document.title = "NoteItAll - Login";

  const emailRef = useRef();
  const passwordRef = useRef();

  /*
    NÃO DEIXAR CONSOLE.LOG() NO CÓDIGO :D
  */

  const { login_action, auth_with_google } = useAuth();
  const navigate = useNavigate();

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  // mesma lógica do signup :D
  const handle_submit = async (e) => {
    e.preventDefault();

    const email = emailRef.current.value.trim();
    const password = passwordRef.current.value.trim();

    const result = await login_action(email, password);

    if (!result.ok) {
      setMessageType("error");
      setMessage(result.error);
      return;
    }

    navigate("/home");
  };

  const handle_google_login = async () => {
    // try/catch é considerado gambiarra??
    try {
      await auth_with_google();
      navigate("/home");
    } catch (erro) {
      setMessageType("error");
      setMessage(erro);
    }
  };

  return (
    <div className="auth_page">
      {message && <Message type={messageType} message={message} />}

      <div className="landing_logo">
        <img src={logo} alt="Logo" />
        <h1>NoteItAll</h1>
      </div>

      <div className="auth_container">
        <h2>Login</h2>

        <form onSubmit={handle_submit}>
          <div className="auth_input_wrapper">
            <label>Email</label>
            <input type="email" ref={emailRef} />
          </div>

          <div className="auth_input_wrapper">
            <label>Senha</label>
            <input type="password" ref={passwordRef} />
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

        <button className="auth_social_btn" onClick={handle_google_login}>
          <img src={google_icon} alt="Icon" />
          <span>Entre com o Google</span>
        </button>
      </div>
    </div>
  );
};

export default Login;
