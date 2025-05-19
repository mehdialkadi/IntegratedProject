import React, { useState } from 'react';

const LoginForm = ({ onLoginSuccess }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    // Fonction pour gérer la soumission du formulaire
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Vérifier que les champs ne sont pas vides
        if (!email || !password) {
            setMessage('Veuillez remplir tous les champs');
            return;
        }

        // Vérification que l'email et le mot de passe sont corrects
        if (email === 'syndic@gmail.com' && password === 'syndic') {
            setMessage('Connexion réussie');
            onLoginSuccess();  // Appel de la fonction onLoginSuccess pour mettre à jour isLoggedIn
        } else {
            setMessage('Email ou mot de passe incorrect');
        }
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