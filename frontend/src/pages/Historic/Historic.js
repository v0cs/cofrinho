import { useEffect, useState } from "react";
import styles from './Historic.module.css'
import PeriodButton from "../../components/PeriodButton";

function Historic() {

    const [listHistoric, setlistHistoric] = useState([]);

    useEffect(() => {
        // GET MOVIMENTATION
        fetch('https://brasilapi.com.br/api/ibge/uf/v1')
            .then((response) => response.json())
            .then((data) => {
                setlistHistoric(data);
            })
    }, []);

    return (
        <div className={styles.table_container}>
            <div>
             <PeriodButton/>
            </div>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Tipo</th>
                        <th>Categoria</th>
                        <th>Descrição</th>
                        <th>Data</th>
                        <th>Valor</th>
                    </tr>
                </thead>
                <tbody>
                    {listHistoric.map((i) => (
                        <tr key={i.id}>
                            <td>{i.sigla}</td>
                            <td>{i.nome}</td>
                            <td>{i.description}</td>
                            <td>{i.date}</td>
                            <td>{i.value}</td>
                        </tr>
                    ))
                    }
                </tbody>
            </table>
        </div>
    );
}

export default Historic;