// Movimentation.js

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
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <div className={styles.container}>
            <FormMovimentation />
            <div>
                <table className={styles.tableMovimentation}>
                    <thead>
                        <tr>
                            <th>Tipo</th>
                            <th>Categoria</th>
                            <th>Descrição</th>
                            <th>Data</th>
                            <th>Valor</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listMoviment.map(item => (
                            <tr key={item.id}>
                                <td>{item.sigla}</td>
                                <td>{item.nome}</td>
                                <td>{item.description}</td>
                                <td>{item.date}</td>
                                <td>{item.value}</td>
                                <td className={styles.actions}>Editar Excluir</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Movimentation;
