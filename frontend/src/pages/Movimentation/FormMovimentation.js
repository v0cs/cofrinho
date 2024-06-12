import { useEffect, useState } from "react";
import styles from './FormMovimentation.module.css';

function FormMovimentation() {
    const [listType, setListType] = useState([]);

    useEffect(() => {
        // GET CATEGORY
        fetch('https://brasilapi.com.br/api/ibge/uf/v1')
            .then((response) => response.json())
            .then((data) => {
                setListType(data);
            })
            .catch(error => console.error('Error fetch data:', error));
    }, []);

    return (
        <div>
            <form className={styles.form}>
                <label className={styles.label} htmlFor="type">Tipo</label>
                <select id="type" name="type" required className={styles.input}> 
                    <option value="Despesa">Despesa</option>
                    <option value="Receita">Receita</option>
                </select>
                <label className={styles.label} htmlFor="category">Categoria</label>
                <select id="category" name="category" required className={styles.input}>
                    <option value="" disabled selected>Selecione uma categoria</option>
                    {listType.map((i) => (
                        <option key={i.id} value={i.id}>{i.sigla}</option>
                    ))}
                </select>

                <label className={styles.label} htmlFor="description">Descrição</label>
                <input type="textarea" name="description" id="description" required className={styles.input} />
                <label className={styles.label} htmlFor="date">Data</label>
                <input type="date" name="date" id="date" required className={styles.input} />
                <label className={styles.label} htmlFor="value">Valor</label>
                <input type="number" name="value" id="value" min={0} required className={styles.input} />
                <input type="submit" value={"Registrar"} className={styles.submit} />
            </form>
        </div>
    )
}

export default FormMovimentation;