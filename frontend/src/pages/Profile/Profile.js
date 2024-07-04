import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Profile.module.css';

function Profile() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:5000/api/profile', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setEmail(response.data.email);
            } catch (error) {
                console.error(error);
            }
        };

        fetchProfile();
    }, []);

    const handleChangePassword = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError('As senhas não coincidem');
            return;
        }
        try {
            const token = localStorage.getItem('token');
            await axios.put('http://localhost:5000/api/profile/password', { password }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setPassword('');
            setConfirmPassword('');
            setError('');
            alert('Senha alterada com sucesso!');
        } catch (error) {
            setError('Erro ao alterar a senha. Tente novamente.');
        }
    };

    const handleDeleteAccount = async () => {
        if (window.confirm('Tem certeza que deseja excluir sua conta? Esta ação é irreversível.')) {
            try {
                const token = localStorage.getItem('token');
                await axios.delete('http://localhost:5000/api/profile', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                alert('Conta excluída com sucesso!');
                window.location.href = "/";
                // Redirecionar para a página inicial ou realizar logout
            } catch (error) {
                setError('Erro ao excluir a conta. Tente novamente.');
            }
        }
    };

    return (
        <div className={styles.container}>
            <h1>Perfil do Usuário</h1>

            {/* Detalhes do perfil */}
            <div className={styles.profileDetails}>
                <h2>Email:</h2>
                <p>{email}</p>
            </div>

            {/* Alterar senha */}
            <div className={styles.passwordChange}>
                <h2>Alterar Senha</h2>
                <form className={styles.form} onSubmit={handleChangePassword}>
                    <label htmlFor="newPassword" className={styles.label}>Nova Senha:</label>
                    <input
                        type="password"
                        id="newPassword"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className={styles.input}
                    />
                    <label htmlFor="confirmPassword" className={styles.label}>Confirmar Nova Senha:</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        className={styles.input}
                    />
                    <input type="submit" value="Alterar Senha" className={styles.submit} />
                </form>
                {error && <p className={styles.error}>{error}</p>}
            </div>

            {/* Excluir conta */}
            <div className={styles.deleteAccount}>
                <h2>Excluir Conta</h2>
                <p>Esta ação é irreversível. Todos os dados associados à sua conta serão perdidos.</p>
                <button onClick={handleDeleteAccount} className={styles.deleteButton}>Excluir Conta</button>
                {error && <p className={styles.error}>{error}</p>}
            </div>
        </div>
    );
}

export default Profile;
