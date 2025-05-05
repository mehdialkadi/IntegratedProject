import React, { useState } from 'react';
import LoginForm from './components/LoginForm';  // Import du composant Login
import Dashboard from './components/Dashboard';
import { BrowserRouter, Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';
import LocataireAnnonces from "./components/LocataireAnnonces";
import LoginFormLocataire from "./components/LoginFormLocataire";
import LocataireDashboard from "./components/LocataireDashboard";
import LocataireReclamations from "./components/LocataireReclamations";
import LocataireCreateReclamation from "./components/LocataireCreateReclamation";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false); // état pour gérer la connexion
    const navigate = useNavigate();

    const handleLoginSuccess = (user) => {
        setIsLoggedIn(true);  // L'utilisateur est connecté
        navigate('/dashboard', { replace: true });
    };

    return (
            <Routes>
                {/* public home */}
                <Route path="/" element={<LoginForm onLoginSuccess={handleLoginSuccess} />} />

                {/* login route */}
                <Route
                    path="/login"
                    element={<LoginForm onLoginSuccess={handleLoginSuccess} />}
                />

                {/* protected dashboard */}
                <Route
                    path="/dashboard"
                    element={
                        isLoggedIn
                            ? <Dashboard />
                            : <Navigate to="/login" replace />
                    }
                />

                <Route path="/locataireAnnonces" element={<LocataireAnnonces />} />

                <Route path="/locataireReclamations" element={<LocataireReclamations />} />

                <Route path="/locataireCreateReclamation" element={<LocataireCreateReclamation />} />

                {/* fallback 404 */}
                <Route path="*" element={<h1>404 – Page non trouvée</h1>} />
            </Routes>
    );
}

export default App;