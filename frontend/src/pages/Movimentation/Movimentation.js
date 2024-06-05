import styles from './Movimentation.module.css';

function Movimentation() {
    return (
        <div className={styles.table_container}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Data</th>
                        <th>Categoria</th>
                        <th>Descrição</th>
                        <th>Valor</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>TESTE</td>
                        <td>TESTE</td>
                        <td>TESTE</td>
                        <td>TESTE</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default Movimentation;
