// Hooks
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// Components
import Message from "../components/common/Message";

// Utils
import { useAuth } from "../context/AuthProvider";
import "./css/AccountPage.css";

// Images
import logo from "../assets/logo.svg";
import google_icon from "../assets/google_icon.svg";

const Signup = () => {
  const { signup_action } = useAuth();

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  /* MANTER EM useRef :) */
  const emailRef = useRef();
  const usernameRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const navigate = useNavigate();

  const handle_submit = async (e) => {
    e.preventDefault();

    // sou um genio kkkkk
    const result = await signup_action(
      emailRef.current.value,
      usernameRef.current.value,
      passwordRef.current.value,
      confirmPasswordRef.current.value
    );

    if (!result.ok) {
      setMessageType("error");
      setMessage(result.error);
      return;
    }

    navigate("/verify-email");
  };

  return (
    <div className="auth_page">
      {message && <Message type={messageType} message={message} />}

      <div className="landing_logo">
        <img src={logo} alt="Logo" />
        <h1>NoteItAll</h1>
      </div>

      <div className="auth_container">
        <h2>Signup</h2>

        <form onSubmit={handle_submit}>
          <div className="auth_input_wrapper">
            <label>Email</label>
            <input type="email" ref={emailRef} />
          </div>

          <div className="auth_input_wrapper">
            <label>Nome de usuário</label>
            <input type="text" minLength={3} ref={usernameRef} />
          </div>

          <div className="auth_input_wrapper">
            <label>Senha</label>
            <input type="password" minLength={8} ref={passwordRef} />
          </div>

          <div className="auth_input_wrapper">
            <label>Confirmar senha</label>
            <input type="password" ref={confirmPasswordRef} />
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
          Já possui uma conta? <Link to="/login">Entrar</Link>
        </p>

        <button className="auth_social_btn">
          <img src={google_icon} alt="icon" />
          <span>Entre com o Google</span>
        </button>
      </div>
    </div>
  );
};

export default Signup;
