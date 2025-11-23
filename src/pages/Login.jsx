// Hooks
import { Link } from "react-router-dom";

// Images
import logo from "../assets/logo.svg";
import google_icon from "../assets/google_icon.svg";

// Utils
import "./css/AccountPage.css";
import "../styles/globals.css";

const Login = () => {
  document.title = "NoteItAll - Login";

  const login_action = (e) => {
    e.preventDefault();
  };

  return (
    <div className="auth_page">
      <div className="landing_logo">
        <img src={logo} alt="Logo" />
        <h1>NoteItAll</h1>
      </div>
      <div className="auth_container">
        <h2>Login</h2>

        <form onSubmit={login_action}>
          <div className="auth_input_wrapper">
            <label htmlFor="login_email">Edereço de email</label>
            <input type="email" name="login_email" id="login_email" />
          </div>
          <div className="auth_input_wrapper">
            <label htmlFor="login_password">Senha</label>
            <input type="password" name="login_password" id="login_password" />
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
