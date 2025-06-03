import React, { useState } from 'react';
import './LoginForm.css'; // Import du CSS avec styles + icônes

const LoginForm = ({ onLoginSuccess }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);

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
                    <label htmlFor="email">Email :</label>
                    <div className="input-wrapper">
                        <i className="fas fa-envelope"></i>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="ex: syndic@gmail.com"
                            required
                        />
                    </div>
                </div>

                <div className="input-group">
                    <label htmlFor="password">Mot de passe :</label>
                    <div className="input-wrapper">
                        <i className="fas fa-lock"></i>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="ex: syndic"
                            required
                        />
                        <span className="toggle-password" onClick={() => setShowPassword(!showPassword)}>
              <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
            </span>
                    </div>
                </div>

                <button type="submit">Se connecter</button>
            </form>

            {message && <p>{message}</p>}
        </div>
    );
};

export default LoginForm;
