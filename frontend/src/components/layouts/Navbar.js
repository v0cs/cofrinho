import { Link } from "react-router-dom";
import Container from "./Container";

import { TbChartHistogram } from "react-icons/tb";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";

import styles from "./Navbar.module.css";

function Navbar() {
  return (
    <div className={styles.navbar}>
      <Container>
        <ul className={styles.list}>
          <li className={styles.item}>
            <Link to="/movimentation"><FaMoneyBillTransfer/> Movimentação</Link>
          </li>
          <li className={styles.item}>
            <Link to="/category"><FaMoneyBillTransfer/> Categoria</Link>
          </li>
          <li className={styles.item}>
            <Link to="/historic"><TbChartHistogram />  Histórico</Link>
          </li>
          <li className={styles.item}>
            <Link to="/profile"><FaUser /> Usuário</Link>
          </li>
        </ul>
      </Container>
    </div>
  );
}

export default Navbar;