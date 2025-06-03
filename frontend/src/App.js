import React, { useState } from 'react';
import LoginForm from './components/LoginForm';  // Import du composant Login
<<<<<<< HEAD
import Dashboard from './components/Dashboard';  // Import du Dashboard
=======
import Dashboard from './components/Dashboard';
import { BrowserRouter, Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';
import LocataireAnnonces from "./components/LocataireAnnonces";
import LoginFormLocataire from "./components/LoginFormLocataire";
import LocataireDashboard from "./components/LocataireDashboard";
import LocataireReclamations from "./components/LocataireReclamations";
import LocataireCreateReclamation from "./components/LocataireCreateReclamation";
import LoginFormProprietaire from "./components/LoginFormProprietaire";
import ProprietaireDashboard from "./components/ProprietaireDashboard";
>>>>>>> 33a274518afa793a1d777033c1bf2ac3f46dbac4

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false); // état pour gérer la connexion

    const handleLoginSuccess = () => {
        setIsLoggedIn(true);  // L'utilisateur est connecté
    };

    return (
<<<<<<< HEAD
        <div className="App">
            {isLoggedIn ? (
                <Dashboard />  // Afficher le Dashboard après connexion
            ) : (
                <LoginForm onLoginSuccess={handleLoginSuccess} />  // Afficher le formulaire de connexion
            )}
        </div>
=======
            <Routes>
                {/* public home */}
                <Route path="/" element={<LoginFormProprietaire onLoginSuccess={handleLoginSuccess} />} />

                {/* login route */}
                <Route
                    path="/login"
                    element={<LoginFormProprietaire onLoginSuccess={handleLoginSuccess} />}
                />

                {/* protected dashboard */}
                <Route
                    path="/dashboard"
                    element={
                        isLoggedIn
                            ? <ProprietaireDashboard />
                            : <Navigate to="/login" replace />
                    }
                />

                <Route path="/locataireAnnonces" element={<LocataireAnnonces />} />

                <Route path="/locataireReclamations" element={<LocataireReclamations />} />

                <Route path="/locataireCreateReclamation" element={<LocataireCreateReclamation />} />

                {/* fallback 404 */}
                <Route path="*" element={<h1>404 – Page non trouvée</h1>} />
            </Routes>
>>>>>>> 33a274518afa793a1d777033c1bf2ac3f46dbac4
    );
}

export default App;
