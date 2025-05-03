import React, { useState } from 'react';
import './LoginForm.css'; // Assure-toi que le chemin est correct

const LoginForm = ({ onLoginSuccess }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email || !password) {
            setMessage('Veuillez remplir tous les champs');
            return;
        }
        if (email === 'syndic@gmail.com' && password === 'syndic') {
            setMessage('Connexion réussie');
            onLoginSuccess();
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
            {message && <p>{message}</p>}
        </div>
    );
};

export default LoginForm;
