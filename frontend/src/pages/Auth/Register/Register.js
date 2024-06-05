import styles from './Register.module.css';

function Register() {
    return (
        <div className={styles.container}>
            <div className={styles["form-container"]}>
                <h1>Registro</h1>
                <form action=".." name="form" id="form" method="POST">
                    <label>Email</label>
                    <input type="email" id="name" name="email" placeholder="email" required />
                    <label>Senha</label>
                    <input type="password" id="password" name="password" placeholder="senha" required />
                    <input type="submit" value={'Registrar-se'} />
                </form>
            </div>
        </div>
    );
}

export default Register;
