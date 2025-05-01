import React, { useState } from 'react';
import axios from 'axios';

const LoginForm = ({ onLoginSuccess }) => {
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

        axios.post('/api/auth/login', { email, password })
            .then(response => {
                if (response.data === 'Email ou mot de passe incorrect') {
                    setMessage(response.data);
                } else {
                    setMessage('Connexion réussie');
                    onLoginSuccess();
                }
            })
            .catch(error => {
                console.error(error);
                setMessage('Une erreur est survenue. Veuillez réessayer plus tard.');
            });
    };

    return (
        <div className="login-container">
            <h2>Connexion Syndic</h2>
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

export default LoginForm;
