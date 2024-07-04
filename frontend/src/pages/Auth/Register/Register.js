import React, { useState } from 'react';
import axios from 'axios';
import styles from './Register.module.css';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/register', { email, senha: password });
      setSuccess('Registro bem-sucedido! Agora você pode fazer login.');
      setEmail('');
      setPassword('');
    } catch (error) {
      setError('Registro falhou. Tente novamente.');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h1>Registro</h1>
        {error && <p className={styles.error}>{error}</p>}
        {success && <p className={styles.success}>{success}</p>}
        <form onSubmit={handleSubmit}>
          <label>Email</label>
          <input type="email" name="email" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)} className={styles.inputField}/>
          <label>Senha</label>
          <input type="password" name="password" placeholder="Senha" required value={password} onChange={(e) => setPassword(e.target.value)} className={styles.inputField} />
          <input type="submit" value="Registrar-se" className={styles.submitButton} />
          <p style={{ textAlign: "center"}}>Já possui conta?<a href='/'> Clique aqui!</a></p>
        </form>
      </div>
    </div>
  );
}

export default Register;
