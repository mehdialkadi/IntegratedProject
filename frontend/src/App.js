import React, { useState } from 'react';
import LoginForm from './components/LoginForm';  // Import du composant Login
import Dashboard from './components/Dashboard';
import { BrowserRouter, Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';
import LocataireAnnonces from "./components/LocataireAnnonces";
import LoginFormLocataire from "./components/LoginFormLocataire";
import LocataireDashboard from "./components/LocataireDashboard";
import LocataireReclamations from "./components/LocataireReclamations";
import LocataireCreateReclamation from "./components/LocataireCreateReclamation";
import LoginFormProprietaire from "./components/LoginFormProprietaire";
import ProprietaireDashboard from "./components/ProprietaireDashboard";
import ProprietaireAnnonces from "./components/ProprietaireAnnonces";
import ProprietaireReunionsPage from "./components/ProprietaireReunionsPage";
import ProprietaireDocumentsCommuns from "./components/ProprietaireDocumentsCommuns";
import ProprietaireReclamations from "./components/ProprietaireReclamations";
import ProprietaireCreateReclamation from "./components/ProprietaireCreateReclamation";
import ProprietaireLogement from "./components/ProprietaireLogement";
import ProprietairePaiments from "./components/ProprietairePaiments";
import ProprietaireFacture from "./components/ProprietaireFacture";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false); // état pour gérer la connexion
    const navigate = useNavigate();

    const handleLoginSuccess = () => {
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

                <Route path="/ProprioAnnonces" element={<ProprietaireAnnonces />} />

                <Route path="/ProprioReunions" element={<ProprietaireReunionsPage />} />

                <Route path="/ProprioDocuments" element={<ProprietaireDocumentsCommuns />} />

                <Route path="/ProprioReclamations" element={<ProprietaireReclamations />} />

                <Route path="/ProprioCreateReclamation" element={<ProprietaireCreateReclamation />} />

                <Route path="/ProprioLogement/:logementId" element={<ProprietaireLogement />} />

                <Route path="/ProprioPaiments" element={<ProprietairePaiments />} />

                <Route path="/ProprioFactures" element={<ProprietaireFacture />} />

                {/* fallback 404 */}
                <Route path="*" element={<h1>404 – Page non trouvée</h1>} />
            </Routes>
    );
}

export default App;
