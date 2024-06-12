import { useEffect, useState } from "react";
import FormMovimentation from './FormMovimentation';
import styles from './Movimentation.module.css';
import Category from "../Category/Category";

function Movimentation() {
    const [listMoviment, setlistMoviment] = useState([]);

    useEffect(() => {
        // GET MOVIMENTATION
        fetch('https://brasilapi.com.br/api/ibge/uf/v1')
            .then((response) => response.json())
            .then((data) => {
                setlistMoviment(data);
            })
            .catch(error => console.error('Error fetch data:', error));
    }, []);

    return (
        <div className={styles.container}>
            <Category />
            <div className={styles.movimentationContainer}>
                <FormMovimentation />
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
                        {listMoviment.map((i) => (
                            <tr key={i.id}>
                                <td>{i.sigla}</td>
                                <td>{i.nome}</td>
                                <td>{i.description}</td>
                                <td>{i.date}</td>
                                <td>{i.value}</td>
                                <td>Editar Excluir</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Movimentation;
