// Images
import logo from "../assets/logo.svg";

// Utils
import "./css/AccountPage.css";

const Login = () => {
  return (
    <div className="auth_page">
      <div className="landing_logo">
        <img src={logo} alt="Logo" />
        <h1>NoteItAll</h1>
      </div>
      <div className="auth_container">
        <h2>Login</h2>

        <form>
          <div className="auth_input_wrapper">
            <label htmlFor="email">Edereço de email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="exemplo@gmail.com"
            />
          </div>
          <div className="auth_input_wrapper">
            <label htmlFor="email">Senha</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder=""
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
