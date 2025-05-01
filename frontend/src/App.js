import React, { useState } from 'react';
import LoginForm from './components/LoginForm';  // Import du composant Login
import Dashboard from './components/Dashboard';  // Import du Dashboard

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false); // état pour gérer la connexion

    const handleLoginSuccess = () => {
        setIsLoggedIn(true);  // L'utilisateur est connecté
    };

    return (
        <div className="App">
            {isLoggedIn ? (
                <Dashboard />  // Afficher le Dashboard après connexion
            ) : (
                <LoginForm onLoginSuccess={handleLoginSuccess} />  // Afficher le formulaire de connexion
            )}
        </div>
    );
}

export default App;