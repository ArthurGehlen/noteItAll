// Hooks
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Firebase Auth
import { sendEmailVerification } from "firebase/auth";

// Utils
import "./css/AccountPage.css";
import { useAuth } from "../context/AuthProvider";

// Components
import Alert from "@mui/joy/Alert";

function VerifyEmail() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [resending, setResending] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  // lógica pra atualizar a página quando o usuário confirmar o email
  useEffect(() => {
    if (!user) return;

    const interval = setInterval(async () => {
      await user.reload();
      if (user.emailVerified) navigate("/home");
    }, 2000);

    return () => clearInterval(interval);
  }, [user, navigate]);

  const resend_email = async () => {
    setResending(true);

    // no firebase precisa enviar o email manual :(
    try {
      await sendEmailVerification(user);
      setMessage("Email reenviado.");
      setMessageType("success");
    } catch (e) {
      setMessage("Erro ao reenviar.");
      setMessageType("danger");
    }

    setResending(false);
  };

  if (!user) return null;

  return (
    <div className="auth_page">
      {message && (
        <Alert color={messageType} variant="solid">
          {message}
        </Alert>
      )}
      <div className="auth_container">
        <h2>Verifique seu email</h2>
        <p>
          Enviamos um email para: <strong>{user.email}</strong>
        </p>
        <p style={{ marginTop: "2rem" }}>
          *A página será atualizada automaticamente quando você confirmar.
        </p>

        <button
          onClick={resend_email}
          disabled={resending}
          className="resend_btn"
        >
          {resending ? "Enviando..." : "Reenviar email de verificação"}
        </button>
      </div>
    </div>
  );
}

export default VerifyEmail;
