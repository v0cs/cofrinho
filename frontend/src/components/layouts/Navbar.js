import { Link } from "react-router-dom";
import Container from "./Container";

import styles from "./Navbar.module.css";

function Navbar() {
  return (
    <div className={styles.navbar}>
      <Container>
        <ul className={styles.list}>
          <li className={styles.item}>
            <Link to="/">Login</Link>
          </li>
          <li className={styles.item}>
            <Link to="/register">Cadastro</Link>
          </li>
          <li className={styles.item}>
            <Link to="/movimentation">Movimentação</Link>
          </li>
          <li className={styles.item}>
            <Link to="/historic">Histórico</Link>
          </li>
          <li className={styles.item}>
            <Link to="/profile">Usuário</Link>
          </li>
        </ul>
      </Container>
    </div>
  );
}

export default Navbar;