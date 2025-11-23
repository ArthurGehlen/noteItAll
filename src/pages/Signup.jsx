// Hooks
import { Link } from "react-router-dom";

// Images
import logo from "../assets/logo.svg";
import google_icon from "../assets/google_icon.svg";

// Utils
import "./css/AccountPage.css";
import "../styles/globals.css";

const Signup = () => {
  document.title = "NoteItAll - Signup";

  const signup_action = (e) => {
    e.preventDefault();
  };

  return (
    <div className="auth_page">
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
            />
          </div>
          <div className="auth_input_wrapper">
            <label htmlFor="confirm_password">Confirme sua senha</label>
            <input
              type="password"
              name="confirm_password"
              id="confirm_password"
              placeholder=""
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
