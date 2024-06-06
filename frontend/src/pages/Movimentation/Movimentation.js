import { useEffect, useState } from "react";

import FormMovimentation from './FormMovimentation';
import styles from './Movimentation.module.css';

function Movimentation() {
    const [listMoviment, setlistMoviment] = useState([]);

    useEffect(() => {
        // GET MOVIMENTATION
        fetch('https://brasilapi.com.br/api/ibge/uf/v1')
            .then((response) => response.json())
            .then((data) => {
                setlistMoviment(data);
            })
    }, []);

    return (

        <div className={styles.table_container}>
            <FormMovimentation />
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
                    {listMoviment.map((i) => (
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

export default Movimentation;
