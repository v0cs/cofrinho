import React, { useState } from 'react';
import axios from 'axios';
import styles from './Login.module.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { email, senha: password });
      localStorage.setItem('token', response.data.token);
      window.location.href = '/movimentation'; 
    } catch (error) {
      setError('Login falhou. Verifique suas credenciais e tente novamente.');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles["form-container"]}>
        <h1>Login</h1>
        {error && <p className={styles.error}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <label>Email</label>
          <input type="email" name="email" placeholder="email" required value={email} onChange={(e) => setEmail(e.target.value)}/>
          <label>Senha</label>
          <input type="password" name="password" placeholder="senha" required value={password} onChange={(e) => setPassword(e.target.value)} />
          <input type="submit" value="Logar" />
        </form>
        <p>Não tem conta?<a href='/register'> Clique aqui!</a></p>
      </div>
    </div>
  );
}

export default Login;
