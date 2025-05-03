import React, { useState } from 'react';
import axios from 'axios';

const LoginFormLocataire = ({ onLoginSuccess }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    axios.defaults.withCredentials = true;

    // Fonction pour gérer la soumission du formulaire
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Vérifier que les champs ne sont pas vides
        if (!email || !password) {
            setMessage('Veuillez remplir tous les champs');
            return;
        }

        axios.post('/api/locataires/findLocataireByEmailAndPassword', { email, password })
            .then(response => {
                setMessage('Connexion réussie');
                onLoginSuccess();
            })
            .catch(error => {
                if (error.response) {
                    // The request was made and the server responded
                    if (error.response.status === 401) {
                        setMessage('Email ou mot de passe incorrect');
                    } else {
                        // some other non-2xx status
                        setMessage(`Erreur : ${error.response.status}`);
                    }
                } else if (error.request) {
                    // The request was made but no response was received
                    setMessage('Pas de réponse du serveur — vérifiez votre connexion.');
                } else {
                    // Something happened in setting up the request
                    setMessage(`Erreur Axios : ${error.message}`);
                }
            });
    };

    return (
        <div className="login-container">
            <h2>Connexion Locataire</h2>
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="input-group">
                    <label htmlFor="password">Mot de passe:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <button type="submit">Se connecter</button>
            </form>

            {message && <p>{message}</p>}  {/* Affichage du message de connexion */}
        </div>
    );
};

export default LoginFormLocataire;
