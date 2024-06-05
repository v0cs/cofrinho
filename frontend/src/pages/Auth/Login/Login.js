import styles from './Login.module.css';

function Login() {
  return (
    <div className={styles.container}>
      <div className={styles["form-container"]}>
        <h1>Login</h1>
        <form action=".." name="form" id="form" method="POST">
          <label>Email</label>
          <input type="email" id="name" name="email" placeholder="email" required />
          <label>Senha</label>
          <input type="password" id="password" name="password" placeholder="senha" required />
          <input type="submit" value={'Logar'} />
        </form>
        <p>Não tem conta?<a href='/register'> Clique aqui!</a></p>
      </div>
    </div>
  );
}

export default Login;
