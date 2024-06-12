import { useEffect, useState } from "react";
import styles from './Category.module.css';

function Category() {
    const [listCategory, setlistCategory] = useState([]);

    useEffect(() => {
        // GET Category
        fetch('https://brasilapi.com.br/api/ibge/uf/v1')
            .then((response) => response.json())
            .then((data) => {
                setlistCategory(data);
            })
    }, []);

    return (
        <div className={styles.container}>
            <form className={styles.form}>
                <label htmlFor="description">Cadastrar Categoria:</label>
                <input type="text" name="description" id="description" required className={styles.input} />
                <input type="submit" value="Cadastrar" className={styles.submit} />
            </form>
            <table className={styles.table_category}>
                <thead>
                    <tr>
                        <th>Categoria</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {listCategory.map((i) => (
                        <tr key={i.id}>
                            <td>{i.nome}</td>
                            <td>Teste</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Category;
