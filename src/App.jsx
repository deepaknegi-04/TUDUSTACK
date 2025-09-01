import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { RecoilRoot } from 'recoil';
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import Dashboard from "./pages/Dashboard";
import HeroSection from "./pages/HeroSection";
import { AuthProvider, useAuth } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <RecoilRoot>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HeroSection />} />
            <Route path="/login" element={<PublicRoute>
              <LoginPage />
            </PublicRoute>} />
            <Route path="/signup" element={
              <PublicRoute> <SignupPage /></PublicRoute>
            } />
            <Route path="/dashboard" element={<ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>} />
            <Route path="*" element={<Navigate to="/" />} />

          </Routes>
        </BrowserRouter>
      </RecoilRoot>
    </AuthProvider>
  );
}

function PublicRoute({ children }) {
  const { isAuth } = useAuth();

  if (isAuth === null) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  return isAuth ? <Navigate to="/dashboard" /> : children;
}

function ProtectedRoute({ children }) {
  const { isAuth } = useAuth();

  if (isAuth === null) return <div>Loading..</div>;
  return isAuth ? children : <Navigate to={"/login"} />;
}

export default App;
