// Hooks
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import VerifyEmail from "./pages/VerifyEmail";
import Home from "./pages/Home";
import MyNotes from "./pages/MyNotes";
import Favorites from "./pages/Favorites";

// Routes
import PrivateRoute from "./routes/PrivateRoute";
import EmailVerifiedRoute from "./routes/EmailVerifiedRoute"; // proteger as rotas que precisam de login (home, notes, etc...)

// Ao terminar as páginas, dar deploy :) <- remover isso

// TODO: fazer rota para erro (not found) <Route path="*" /> <= NÃO É CERTEZA!

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route
          path="/home" // todas as rotas do site tem que seguir esse mesmo padrão de rota
          element={
            <PrivateRoute>
              <EmailVerifiedRoute>
                <Home />
              </EmailVerifiedRoute>
            </PrivateRoute>
          }
        />
        <Route
          path="/my-notes"
          element={
            <PrivateRoute>
              <EmailVerifiedRoute>
                <MyNotes />
              </EmailVerifiedRoute>
            </PrivateRoute>
          }
        />
        <Route
          path="/favorites"
          element={
            <PrivateRoute>
              <EmailVerifiedRoute>
                <Favorites />
              </EmailVerifiedRoute>
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
